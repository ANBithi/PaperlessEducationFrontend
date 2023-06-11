import { authHeader } from "../Helpers/authHeader";
import { handleResponse, withToast } from "../Helpers/handleResponse";

async function addCourse(course) {
	return fetch("http://localhost:5000/api/course/add", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(course),
	})
		.then(withToast)
		.then(handleResponse);
}


async function getAllCourse() {	
	return fetch(`http://localhost:5000/api/section/getAllSections`, {
		method: "GET",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	}).then(handleResponse);
}
async function getAllCourseByFaculty() {	
	return fetch(`http://localhost:5000/api/section/getAllSectionsByFaculty`, {
		method: "GET",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	}).then(handleResponse);
}
async function getAllCourseByStudent() {
	return fetch(`http://localhost:5000/api/section/getAllSectionsByStudent`, {
		method: "GET",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	}).then(handleResponse);
}

async function getDepartmentCoursesByStudent() {
	return fetch(`http://localhost:5000/api/course/getAllCoursesByStudent`, {
		method: "GET",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	}).then(handleResponse);
}

async function getAllCourseByDepartment(departmentId) {	
	return fetch(`http://localhost:5000/api/course/getAllCourses?departmentId=${departmentId}`, {
		method: "GET",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	}).then(handleResponse);
}


const courseService = { getAllCourse, getAllCourseByDepartment, addCourse,
	getAllCourseByFaculty,getAllCourseByStudent, getDepartmentCoursesByStudent };
export default courseService;
