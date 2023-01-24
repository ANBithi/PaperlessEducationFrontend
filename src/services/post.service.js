import { authHeader } from "../Helpers/authHeader";
import { getCurrentUser } from "../Helpers/userHelper";
async function addPost(post) {
	let user = getCurrentUser();
	let request = { ...post, createdBy: user.id, creatorType: user.userType };
	console.log(request);
	let response = await fetch("http://localhost:5000/api/post/add", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}
async function getAllPost(belongsTo) {
	let response = await fetch(
		`http://localhost:5000/api/post/getAll?belongsTo=${belongsTo}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	);
	if (response.ok) {
		return await response.json();
	}
}

async function getSingle(id) {
	let response = await fetch(
		`http://localhost:5000/api/post/getSingle?postId=${id}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	);
	if (response.ok) {
		return await response.json();
	}
}
async function addReaction(reaction) {
	let user = getCurrentUser();
	let request = { ...reaction, createdBy: user.id };
	console.log(request);
	let response = await fetch("http://localhost:5000/api/post/addReaction", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}
async function getAllReactions(parentId) {
	let response = await fetch(
		`http://localhost:5000/api/post/getAllReactions?parentId=${parentId}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	);
	if (response.ok) {
		return await response.json();
	}
}

async function getAllComments(parentId) {
	let response = await fetch(
		`http://localhost:5000/api/post/getAllComments?parentId=${parentId}`,
		{
			method: "GET",
			headers: { ...authHeader(), "Content-Type": "application/json" },
		}
	);
	if (response.ok) {
		return await response.json();
	}
}

async function postComment(request) {
	let user = getCurrentUser();
	request = { ...request, createdById: user.id };
	let response = await fetch("http://localhost:5000/api/post/postComment", {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}

export const postService = {
	addPost,
	getAllPost,
	getSingle,
	addReaction,
	getAllReactions,
	getAllComments,
	postComment,
};
