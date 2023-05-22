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

async function addQuestion(request) {
	return fetch(`http://localhost:5000/api/exam/addQuestion`, {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);
}
async function updateQuestion(question) {
	return fetch(`http://localhost:5000/api/exam/updateQuestion`, {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(question),
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

async function getAllExams() {
	return fetch(
		`http://localhost:5000/api/exam/getAllExamsByUser`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

async function getQuestions(examId, includeAnswers) {
	return fetch(
		`http://localhost:5000/api/exam/getQuestions?examId=${examId}&includeAnswers=${includeAnswers}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

const examService = {
	addExamMetadata,
	getExamMetaData,
	updateQuestion,
	getUpcomingExams,
	getQuestions,
	addQuestion,
	getAllExams
};
export default examService;
