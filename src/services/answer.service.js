import { authHeader } from "../Helpers/authHeader";
import { handleResponse } from "../Helpers/handleResponse";


async function addAnswer(answer) {

	return fetch("http://localhost:5000/api/answer/addAnswer", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(answer),
	}).then(handleResponse);
}



const answerService = {
addAnswer,
}

export default answerService;