import { authHeader } from "../Helpers/authHeader";
import { handleResponse } from "../Helpers/handleResponse";
import { getCurrentUserId, getCurrentUser } from "../Helpers/userHelper";

async function createUser(user) {
	let { userType } = user;
	userType = parseInt(userType);
	let currentUser = getCurrentUser();
	let createdBy = `${currentUser.firstName} ${currentUser.lastName}`;
	let createdById = currentUser.id;
	let request = { ...user, userType, createdBy, createdById };

	return fetch("http://localhost:5000/api/user/create", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);
	// let response = await fetch("http://localhost:5000/api/user/create", {
	// 	method: "POST",
	// 	headers: { ...authHeader(), "Content-Type": "application/json" },
	// 	body: JSON.stringify(request),
	// });
	// if (response.ok) {
	// 	return await response.json();
	// }
}
async function addStudents(user) {
	let currentUser = getCurrentUser();
	let createdBy = `${currentUser.firstName} ${currentUser.lastName}`;
	let createdById = currentUser.id;
	let request = { ...user, createdBy, createdById };

	return fetch("http://localhost:5000/api/user/addStudents", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);
	// let response = await fetch("http://localhost:5000/api/user/addStudents", {
	// 	method: "POST",
	// 	headers: { ...authHeader(), "Content-Type": "application/json" },
	// 	body: JSON.stringify(request),
	// });
	// if (response.ok) {
	// 	return await response.json();
	// }
}
async function changePassword(newPassword, otp) {
	let request = {
		newPassword,
		"otp" : parseInt(otp),
	};

	return fetch("http://localhost:5000/api/user/changePassword", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);
}

async function updateUserInteraction(type) {
	let request = {type};

	return fetch("http://localhost:5000/api/user/userInteraction", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);
}

async function getUserProfileData() {
	return fetch(
		"http://localhost:5000/api/user/userProfile",
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

async function initiateChangePassword() {

	return fetch(
		"http://localhost:5000/api/user/initiateChangePassword",
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}
const userService = {
	changePassword,
	createUser,
	addStudents,
	updateUserInteraction,
	getUserProfileData,
	initiateChangePassword,
};

export default userService;
