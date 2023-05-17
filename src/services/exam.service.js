import { authHeader } from "../Helpers/authHeader";
import { handleResponse } from "../Helpers/handleResponse";

async function addExamMetadata(data) {
	let { totalMarks, countPercentile } = data;
	totalMarks = parseInt(totalMarks);
	countPercentile = parseInt(countPercentile);
	data = { ...data, totalMarks, countPercentile };

	return fetch("http://localhost:5000/api/exam/addMetadata", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(data),
	}).then(handleResponse);
}
async function updateQuestions(id, questions) {
	var request = { id, questions };
	return fetch(`http://localhost:5000/api/exam/updateQuestions`, {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);
}
async function getExamMetaData(sectionId) {
	return fetch(
		`http://localhost:5000/api/exam/GetMetadata?sectionId=${sectionId}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

async function getUpcomingExams(sectionId) {
	return fetch(
		`http://localhost:5000/api/exam/getUpcomingExams?sectionId=${sectionId}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

async function getQuestions(examId) {
	return fetch(
		`http://localhost:5000/api/exam/getQuestions?examId=${examId}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

const examService = {
	addExamMetadata,
	getExamMetaData,
	updateQuestions,
	getUpcomingExams,
	getQuestions
};
export default examService;
