import { parse } from "@fortawesome/fontawesome-svg-core";
import { authHeader } from "../Helpers/authHeader";

async function addExamMetadata(data) {
    let {totalMarks, countPercentile} = data;
    totalMarks = parseInt(totalMarks);
    countPercentile = parseInt(countPercentile);
    data = {...data, totalMarks, countPercentile};
    console.log(data);
	let response = await fetch("http://localhost:5000/api/exam/addMetadata", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	if (response.ok) {
		return await response.json();
	}
}
async function addQuestions(id,questions) {
	debugger;
	var request = {id, questions}
	console.log(request);
	let response = await fetch("http://localhost:5000/api/exam/addQuestions", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}
async function getExamMetaData(sectionId) {
	let response =  await fetch(`http://localhost:5000/api/exam/GetMetadata?sectionId=${sectionId}`,{
	  method: "GET",
	  headers: {...authHeader(),'Content-Type': 'application/json'}		
	})
	if (response.ok){
		return await response.json();
	  }    
}

const examService = {
    addExamMetadata,
	getExamMetaData,
	addQuestions
}
export default examService;