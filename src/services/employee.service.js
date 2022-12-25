import { getCurrentUserId } from "../Helpers/userHelper";

function updatePersonalInfo(updatedInfo) {
	return true;
}
async function getEmployeeContact(type) {
	let request = {
		type: type,
		belongsTo: getCurrentUserId(),
	}

	let response =  await fetch(`http://localhost:5000/api/employee/getContact?belongsTo=${request.belongsTo}&type=${request.type}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		var contactResponse = await response.json();  
		return contactResponse;
		}    
}

async function getEmployeeAddress(type) {
	let request = {
		type: type,
		belongsTo: getCurrentUserId(),
	}

	let response =  await fetch(`http://localhost:5000/api/employee/getAddress?belongsTo=${request.belongsTo}&type=${request.type}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		let addressResponse = await response.json();  
		return addressResponse;
		}    
}

async function addContact(contact, type) {
	let request = {...contact, type : type, belongsTo : getCurrentUserId()};
	
	let response =  await fetch("http://localhost:5000/api/employee/addContact",{
		method: "POST",
		headers: {'Content-Type': 'application/json'}, 
		body: JSON.stringify(request)
	  })
	
	  if (response.ok){
		var addContactResponse = await response.json();  
		if (addContactResponse.isContactAdded === true){
		  return({success: addContactResponse.isContactAdded, message : addContactResponse.message});  
		}
		else {
		  return ({success : addContactResponse.isContactAdded, message: addContactResponse.message});
		}    
}
}

async function addAddress (address, type) {
	let request = {...address, type : type, belongsTo : getCurrentUserId()};
	let response =  await fetch("http://localhost:5000/api/employee/addAddress",{
		method: "POST",
		headers: {'Content-Type': 'application/json'}, 
		body: JSON.stringify(request)
	  })
	  if (response.ok){
		var addAddressResponse = await response.json();  
		if (addAddressResponse.isAddressAdded === true){
		  return({success: addAddressResponse.isAddressAdded, message : addAddressResponse.message});  
		}
		else {
		  return ({success : addAddressResponse.isAddressAdded, message: addAddressResponse.message});
		}    
}
}
async function saveQualification(qualification) {
	let request = {...qualification, belongsTo : getCurrentUserId()};
	console.log(request);
	let response =  await fetch("http://localhost:5000/api/employee/AddProfQualification",{
		method: "POST",
		headers: {'Content-Type': 'application/json'}, 
		body: JSON.stringify(request)
	  })
	
	  if (response.ok) {
		return await response.json();
	}
}
async function getProfQualification() {
	let request = {
		belongsTo: getCurrentUserId(),
	}

	let response =  await fetch(`http://localhost:5000/api/employee/GetProfQualification?belongsTo=${request.belongsTo}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		return await response.json();
		}  
}

async function saveExperience(experience) {
	let request = {...experience, belongsTo : getCurrentUserId()};
	console.log(request);
	let response =  await fetch("http://localhost:5000/api/employee/AddExperience",{
		method: "POST",
		headers: {'Content-Type': 'application/json'}, 
		body: JSON.stringify(request)
	  })
	
	  if (response.ok) {
		return await response.json();
	}
}

async function getExperiences() {
	let request = {
		belongsTo: getCurrentUserId(),
	}

	let response =  await fetch(`http://localhost:5000/api/employee/GetExperience?belongsTo=${request.belongsTo}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		return await response.json();
		}  
}
async function saveAcademicInfo(academic) {
	let {scale, cgpaOrMarks} = academic;
	scale = parseFloat(scale);
	cgpaOrMarks = parseFloat(cgpaOrMarks);

	let request = {...academic, cgpaOrMarks, scale, belongsTo : getCurrentUserId()};
	console.log(request);
	let response =  await fetch("http://localhost:5000/api/employee/AddAcademic",{
		method: "POST",
		headers: {'Content-Type': 'application/json'}, 
		body: JSON.stringify(request)
	  })
	
	  if (response.ok) {
		return await response.json();
	}
}

async function getAcademic() {
	let request = {
		belongsTo: getCurrentUserId(),
	}

	let response =  await fetch(`http://localhost:5000/api/employee/getAcademic?belongsTo=${request.belongsTo}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		return await response.json();
		}  
}
async function addProfileInfo(profile){
	let request = {...profile, belongsTo : getCurrentUserId()};
	let response = await fetch("http://localhost:5000/api/employee/createInfo", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}
async function updateProfileInfo(profile){
	let request = {...profile, belongsTo : getCurrentUserId()};
	let response = await fetch("http://localhost:5000/api/employee/UpdateInfo", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}
async function getProfileInfo() {
	let belongsTo = getCurrentUserId();
	let response =  await fetch(`http://localhost:5000/api/employee/getInfo?belongsTo=${belongsTo}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		return await response.json();
		}    
}
async function remove (id , repoType) {
	let response = await fetch(`http://localhost:5000/api/employee/remove?id=${id}&repoType=${repoType}`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		return await response.json();
	}
}
const employeeService = {
	updatePersonalInfo,
	addContact,
	saveQualification,
	getProfQualification,
	saveExperience,
	getExperiences,
        saveAcademicInfo,
		getAcademic,
		addProfileInfo,
		getProfileInfo,
		getEmployeeContact,
		getEmployeeAddress,
		addAddress,
		remove,
		updateProfileInfo
};

export default employeeService;
