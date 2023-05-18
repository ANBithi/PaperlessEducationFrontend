import { authHeader } from "../Helpers/authHeader";
import { handleResponse } from "../Helpers/handleResponse";
import { getCurrentUser } from "../Helpers/userHelper";
const currentUser = getCurrentUser(); 
async function postMessage (body) {
    let request =  { ...body,
        createdBy : currentUser.id,
        creatorType : currentUser.userType
      }
	  return fetch("http://localhost:5000/api/message/add", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);
}
async function retrieveMessage(courseId){
	return fetch(
		`http://localhost:5000/api/message/getAll?belongsTo=${courseId}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}
async function getSingle (id) {

	return fetch(
		`http://localhost:5000/api/message/getSingle?chatId=${id}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

export const chatService = {postMessage, retrieveMessage,getSingle};