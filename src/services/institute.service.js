import { authHeader } from "../Helpers/authHeader";
import { handleResponse, withToast } from "../Helpers/handleResponse";

async function addInstitute(request) {
	return fetch("http://localhost:5000/api/institute/addInstitute", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);
}
async function addHolidays(date) {
	return fetch("http://localhost:5000/api/institute/addHoliday", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(date),
	}).then(handleResponse);
}

async function getHolidays() {
	return fetch(`http://localhost:5000/api/institute/getHolidays`, {
		method: "GET",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	}).then(handleResponse);
}

const instituteService = { getHolidays, addHolidays, addInstitute };
export default instituteService;
