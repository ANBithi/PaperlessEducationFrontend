import { authHeader } from "../Helpers/authHeader";
import { handleResponse } from "../Helpers/handleResponse";
import { getCurrentUser } from "../Helpers/userHelper";
async function addPost(post) {
	let user = getCurrentUser();
	let request = { ...post, createdBy: user.id, creatorType: user.userType };

	return fetch("http://localhost:5000/api/post/add", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);
}
async function getAllPost(belongsTo) {
	return fetch(
		`http://localhost:5000/api/post/getAll?belongsTo=${belongsTo}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

async function getSingle(id) {
	return fetch(
		`http://localhost:5000/api/post/getSingle?postId=${id}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

async function getSingleComment(id) {
	return fetch(
		`http://localhost:5000/api/post/getSingleComment?commentId=${id}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}
async function addReaction(reaction) {
	let user = getCurrentUser();
	let request = { ...reaction, createdBy: user.id };

	
	return fetch("http://localhost:5000/api/post/addReaction", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);

}
async function getAllReactions(parentId) {

	return fetch(
		`http://localhost:5000/api/post/getAllReactions?parentId=${parentId}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);

}

async function getAllComments(parentId) {
	return fetch(
		`http://localhost:5000/api/post/getAllComments?parentId=${parentId}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	).then(handleResponse);
}

async function postComment(request) {
	let user = getCurrentUser();
	request = { ...request, createdById: user.id };

	return fetch("http://localhost:5000/api/post/postComment", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	}).then(handleResponse);

}

export const postService = {
	addPost,
	getAllPost,
	getSingle,
	getSingleComment,
	addReaction,
	getAllReactions,
	getAllComments,
	postComment,
};
