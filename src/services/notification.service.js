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
}
export const notificationService = {getNotifications}