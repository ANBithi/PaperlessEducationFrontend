import { authHeader } from "../Helpers/authHeader";
import { handleResponse } from "../Helpers/handleResponse";
import { getCurrentUserId, getCurrentUser } from "../Helpers/userHelper";

async function getActivityStatusById(id, activityFor) {
	return fetch(`http://localhost:5000/api/userActivity/getSingleById?givenId=${id}&activityForId=${activityFor}`, {
		method: "GET",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	}).then(handleResponse);
}


const activityService = { getActivityStatusById};
export default activityService;
