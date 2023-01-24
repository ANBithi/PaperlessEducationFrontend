import { authHeader } from "../Helpers/authHeader";
import { getCurrentUser } from "../Helpers/userHelper";
const currentUser = getCurrentUser(); 
async function postMessage (body) {
    let request =  { ...body,
        createdBy : currentUser.id,
        creatorType : currentUser.userType
      }
      let response =  await fetch("http://localhost:5000/api/message/add",{
		method: "POST",
		headers: { ...authHeader(), 'Content-Type': 'application/json'}, 
		body: JSON.stringify(request)
	  })
	  if (response.ok) {
		return await response.json();
}
}
async function retrieveMessage(courseId){
    let response =  await fetch(`http://localhost:5000/api/message/getAll?belongsTo=${courseId}`,{
		method: "GET",
		headers: {...authHeader(),'Content-Type': 'application/json'}, 
	  })
	  if (response.ok) {
		return await response.json();
	}
}
async function getSingle (id) {
	let response =  await fetch(`http://localhost:5000/api/message/getSingle?chatId=${id}`,{
		method: "GET",
		headers: {...authHeader(),'Content-Type': 'application/json'}, 
	  })
	  if (response.ok) {
		return await response.json();
	}
}

export const chatService = {postMessage, retrieveMessage,getSingle};