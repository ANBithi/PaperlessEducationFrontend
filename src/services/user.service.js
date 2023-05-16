import { authHeader } from "../Helpers/authHeader";
import { getCurrentUserId, getCurrentUser } from "../Helpers/userHelper";

async function createUser (user) {
	let {userType} = user;
	userType = parseInt(userType);
	let currentUser = getCurrentUser();
	let createdBy = `${currentUser.firstName} ${currentUser.lastName}`;
	let createdById = currentUser.id;
	let request = {...user, userType, createdBy, createdById }
	console.log(request);
	let response =  await fetch("http://localhost:5000/api/user/create",{
		method: "POST",
		headers: {...authHeader(),'Content-Type': 'application/json'}, 
		body: JSON.stringify(request)
	  })
	  if (response.ok) {
		return await response.json();
	}
}
async function addStudents (user) {
	let currentUser = getCurrentUser();
	let createdBy = `${currentUser.firstName} ${currentUser.lastName}`;
	let createdById = currentUser.id;
	let request = {...user, createdBy, createdById }
	console.log(request);
	let response =  await fetch("http://localhost:5000/api/user/addStudents",{
		method: "POST",
		headers: {...authHeader(),'Content-Type': 'application/json'}, 
		body: JSON.stringify(request)
	  })
	  if (response.ok) {
		return await response.json();
	}
}
async function changePassword(oldPassword, newPassword) {
	let request = {
	  id : getCurrentUserId(),
	  oldPassword,
	  newPassword
	}
	let response =  await fetch("http://localhost:5000/api/user/changePassword",{
	 method: "POST",
	 headers: {...authHeader(),'Content-Type': 'application/json'}, 
	 body: JSON.stringify(request)
   })
  
   if (response.ok) {
	return await response.json();
  }
   }

   async function updateUserInteraction(type) {
	let user = getCurrentUser();
	let request = {createdById: user.id, type};
	console.log(request);
	let response = await fetch("http://localhost:5000/api/user/userInteraction", {
		method: "POST",
		headers: {...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}


async function getUserProfileData() {
	let response = await fetch("http://localhost:5000/api/user/userProfile", {
		method: "GET",
		headers: {...authHeader(), "Content-Type": "application/json" },
	});
	if (response.ok) {
		return await response.json();
	}
}
const userService = {changePassword, createUser, addStudents, updateUserInteraction, getUserProfileData}

export default userService;