
async function getNotifications (currentUser, type) {
	let response =  await fetch(`http://localhost:5000/api/notification/getNotifications?currentUser=${currentUser}&type=${type}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}, 
	  })
	  if (response.ok) {
		return await response.json();
	}
}
export const notificationService = {getNotifications}