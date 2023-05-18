import { handleResponse } from "../Helpers/handleResponse";

/// functions
function isLoggedIn() {
   let loggedIn = localStorage.getItem("loggedIn-status");
    return JSON.parse(loggedIn);
    }
function logOff() {
  localStorage.setItem("loggedIn-status", false);
  localStorage.setItem("user", {});
}

async function logIn(user) {
  return fetch("http://localhost:5000/api/auth/login", {
		method: "POST",
		headers: {"Content-Type": "application/json" },
		body: JSON.stringify(user),
	}).then(handleResponse);
}

const loginService = {isLoggedIn, logOff, logIn}
export default loginService;