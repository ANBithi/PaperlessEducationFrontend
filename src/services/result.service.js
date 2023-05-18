import { authHeader } from "../Helpers/authHeader";
import { handleResponse } from "../Helpers/handleResponse";

async function addResult (request) {

	return fetch("http://localhost:5000/api/result/add", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);
}

async function getResults(userId){
	return fetch(
		`http://localhost:5000/api/result/getAll?belongsTo=${userId}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}
export const resultService = {addResult, getResults}
