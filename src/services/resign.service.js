import { getCurrentUserId } from "../Helpers/userHelper";

async function applyResign(resign){
	let request = {...resign, belongsTo : getCurrentUserId()};
	let response = await fetch("http://localhost:5000/api/resign/apply", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}
async function cancelResign(id) {
	let response = await fetch(`http://localhost:5000/api/resign/remove?id=${id}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		return await response.json();
	}
}

async function getAllRequests() {
	let userId  = getCurrentUserId();

	let response =  await fetch(`http://localhost:5000/api/resign/getAll?supervisedTo=${userId}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		return await response.json();
		}  
}
async function getUserRequest() {
	let userId  = getCurrentUserId();
	let response =  await fetch(`http://localhost:5000/api/resign/GetUserResign?belongsTo=${userId}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		return await response.json();
		}  
}

async function approvalRequest(supervisor, id, type) {

	let request = { supervisor, id, type };
    console.log(request);
	let response = await fetch("http://localhost:5000/api/resign/Approval", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}
async function rejectRequest(id) {
    let supervisor = getCurrentUserId();
	let request = { supervisor, id };
    console.log(request);
	let response = await fetch("http://localhost:5000/api/resign/Denial", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}

const resignService = {
    applyResign,
    getAllRequests,
   approvalRequest,
   getUserRequest,
   rejectRequest,
   cancelResign
}
export default resignService;