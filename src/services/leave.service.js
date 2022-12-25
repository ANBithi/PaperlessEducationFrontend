import {getCurrentUserId } from "../Helpers/userHelper";

async function applyLeave(leaveApplication) {
	const { leaveData, leaveType, supervisor, reason } = leaveApplication;
	let request = { ...leaveData, leaveType, supervisor,reason , belongsTo: getCurrentUserId() };
	console.log(request);
	let response = await fetch("http://localhost:5000/api/leave/apply", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}

async function getAppliedLeaveStatus() {
    let belongsTo = getCurrentUserId();
      let response =  await fetch(`http://localhost:5000/api/leave/appliedStatus?belongsTo=${belongsTo}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		let JsonResponse = await response.json(); 
		return JsonResponse;
		}    
}
async function getPendingLeaveRequest(supervisor) {
    let id = getCurrentUserId();
      let response =  await fetch(`http://localhost:5000/api/leave/pendingRequest?id=${id}&supervisor=${supervisor}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		let JsonResponse = await response.json(); 
		return JsonResponse;
		}    
}

async function changeLeaveStatus(status, id) {

	let request = { status, id };
    console.log(request);
	let response = await fetch("http://localhost:5000/api/leave/changeStatus", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}
async function cancelLeave(id) {
	let response = await fetch(`http://localhost:5000/api/leave/remove?id=${id}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		return await response.json();
	}
}

const leaveService = { applyLeave, getAppliedLeaveStatus, getPendingLeaveRequest,changeLeaveStatus,cancelLeave };
export default leaveService;
