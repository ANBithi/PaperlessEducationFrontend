import { authHeader } from "../Helpers/authHeader";
import { handleResponse } from "../Helpers/handleResponse";

async function addInstitute (request) {

	return fetch("http://localhost:5000/api/institute/addInstitute", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);
	// let response =  await fetch("http://localhost:5000/api/institute/addInstitute",{
	// 	method: "POST",
	// 	headers: {'Content-Type': 'application/json'}, 
	// 	body: JSON.stringify(request)
	//   })
	//   if (response.ok) {
	// 	return await response.json();
	// }
}
async function addHolidays (date) {

	return fetch("http://localhost:5000/api/institute/addHoliday", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(date),
	}).then(handleResponse);

	// let response =  await fetch("http://localhost:5000/api/institute/addHoliday",{
	// 	method: "POST",
	// 	headers: {'Content-Type': 'application/json'}, 
	// 	body: JSON.stringify(date)
	//   })
	//   if (response.ok) {
	// 	return await response.json();
	// }
}

async function getHolidays (){
	return fetch(
		`http://localhost:5000/api/institute/getHolidays`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

const instituteService = {getHolidays, addHolidays, addInstitute}
export default instituteService;