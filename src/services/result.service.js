import { authHeader } from "../Helpers/authHeader";

async function addResult (request) {
	let response =  await fetch("http://localhost:5000/api/result/add",{
		method: "POST",
		headers: {...authHeader(), 'Content-Type': 'application/json'}, 
		body: JSON.stringify(request)
	  })
	  if (response.ok) {
		return await response.json();
	}
}

async function getResults(userId){
    let response =  await fetch(`http://localhost:5000/api/result/getAll?belongsTo=${userId}`,{
		method: "GET",
		headers: {...authHeader(),'Content-Type': 'application/json'}, 
	  })
	  if (response.ok) {
		return await response.json();
	}
}
export const resultService = {addResult, getResults}
