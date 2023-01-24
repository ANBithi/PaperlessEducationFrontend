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
const examService = {
    addExamMetadata,
}
export default examService;