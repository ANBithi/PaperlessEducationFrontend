import { getCurrentUserId } from "../Helpers/userHelper";

/// functions
function isLoggedIn() {
   let loggedIn = localStorage.getItem("loggedIn-status");
    return JSON.parse(loggedIn);
    }
function logOff() {
  localStorage.setItem("loggedIn-status", false);
}

async function logIn(user) {
   let response =  await fetch("http://localhost:5000/api/auth/login",{
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(user)
  })

  if (response.ok){
    let loginResponse = await response.json();  
    if (loginResponse.isAuthorized === true){
      return({success: loginResponse.isAuthorized, user : loginResponse.user});  
    }
    else {
      return ({success : loginResponse.isAuthorized, message: loginResponse.message});
    }    
  }
  
  // if (response.status === 404) {
  //   var message = await response.text();
  //   return ({success : response.ok, message: message});
  // }
}

async function checkProfileStatus() {
  let request = {
    id : getCurrentUserId()
  }
  let response =  await fetch("http://localhost:5000/api/auth/CheckAndUpdate",{
   method: "POST",
   headers: {'Content-Type': 'application/json'}, 
   body: JSON.stringify(request)
 })

 if (response.ok) {
  return await response.json();
}
 }

const loginService = {isLoggedIn, logOff, logIn, checkProfileStatus}
export default loginService;