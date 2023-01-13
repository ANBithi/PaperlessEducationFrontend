import { getCurrentUserId, getCurrentUser } from "../Helpers/userHelper";

async function getAllCourse() {
	let user = getCurrentUser();
	let response = await fetch(`http://localhost:5000/api/section/getAllSections?user=${user.id}&type=${user.userType}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		return await response.json();
	}
}


const courseService = { getAllCourse};
export default courseService;
