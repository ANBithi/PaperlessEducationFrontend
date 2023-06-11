import { authHeader } from "../Helpers/authHeader";
import { handleResponse, withToast } from "../Helpers/handleResponse";

async function addDepartment(department) {
	return fetch("http://localhost:5000/api/department/add", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(department),
	})
		.then(withToast)
		.then(handleResponse);
}

async function getDepartments() {
	return fetch(`http://localhost:5000/api/department/getDepartments`, {
		method: "GET",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	}).then(handleResponse);
}

async function getFacultiesByDepartment(departmentId) {
	return fetch(
		`http://localhost:5000/api/department/getFacultiesByDepartment?departmentId=${departmentId}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

const departmentService = {
	getDepartments,
	getFacultiesByDepartment,
	addDepartment,
};
export default departmentService;
