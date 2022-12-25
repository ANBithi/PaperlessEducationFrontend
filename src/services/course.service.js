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

async function getWorkBookData() {
    let belongsTo = getCurrentUserId();
      let response =  await fetch(`http://localhost:5000/api/workbook/entriedData?belongsTo=${belongsTo}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		let JsonResponse = await response.json(); 
		return JsonResponse;
		}    
}

async function getTotalHours(belongsTo) {
      let response =  await fetch(`http://localhost:5000/api/workbook/getTotalHours?belongsTo=${belongsTo}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		let JsonResponse = await response.json(); 
		return JsonResponse;
		}    
}

async function getTotalWorkDays(belongsTo) {
	let response =  await fetch(`http://localhost:5000/api/workbook/getTotalWorkDays?belongsTo=${belongsTo}`,{
	  method: "GET",
	  headers: {'Content-Type': 'application/json'}		
	})
	if (response.ok){
	  let JsonResponse = await response.json(); 
	  return JsonResponse;
	  }    
}

const courseService = { getAllCourse, getWorkBookData,getTotalHours, getTotalWorkDays };
export default courseService;
