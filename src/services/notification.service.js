import { authHeader } from "../Helpers/authHeader";
import { handleResponse } from "../Helpers/handleResponse";

async function getNotifications (currentUser, type) {

	return fetch(
		`http://localhost:5000/api/notification/getNotifications?currentUser=${currentUser}&type=${type}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);

	// let response =  await fetch(`http://localhost:5000/api/notification/getNotifications?currentUser=${currentUser}&type=${type}`,{
	// 	method: "GET",
	// 	headers: {...authHeader(), 'Content-Type': 'application/json'}, 
	//   })
	//   if (response.ok) {
	// 	return await response.json();
	// }
}
export const notificationService = {getNotifications}