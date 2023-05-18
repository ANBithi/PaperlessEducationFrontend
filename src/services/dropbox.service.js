import { handleResponse } from "../Helpers/handleResponse";

const ACCESS_KEY = "sl.BVgYC3vbsf0tWGYRT0XMT2XwQAb8feqxmuRSd4cS0KbkXzIsSPJNv_hh5xs1Lrkpl0oZQilK8VxU6AncWKe8UEcPf5qN8lV2Eoklaye2cLwlC0Vd5BWo0VhgIaGb1Nh_NqbCPcBZ";
const APP_KEY_AND_SECRET = "MDN5c3lmandzbmV6cGs3OjU2cG5qdmFkOGRxYWFmZQ==";

async function checkDropBox() {
    let request = {query: "foo"};
	return fetch(
		"https://api.dropboxapi.com/2/check/app",
		{
			method: "POST",
		headers: { "Content-Type": "application/json" , 
        "Authorization": `Bearer ${APP_KEY_AND_SECRET}`,},
        body : JSON.stringify(request)
		}
	).then(handleResponse);
}  

async function uploadFile(path, file) {
    let fileUploadArgs = {
        "autorename": false,
        "mode": "add",
        "mute": false,
        "path": path,
        "strict_conflict": false
    }

    return fetch(
		"https://content.dropboxapi.com/2/files/upload",
		{
        method: "POST",
		headers: {"Content-Type": "application/octet-stream", 
        "Authorization": `Bearer ${ACCESS_KEY}`,
        "Dropbox-API-Arg" : JSON.stringify(fileUploadArgs),},
        body :file,
		}
	).then(handleResponse);


	// let response = await fetch("https://content.dropboxapi.com/2/files/upload", {
	// 	method: "POST",
	// 	headers: {"Content-Type": "application/octet-stream", 
    //     "Authorization": `Bearer ${ACCESS_KEY}`,
    //     "Dropbox-API-Arg" : JSON.stringify(fileUploadArgs),},
    //     body :file,
	// });
	// if (response.ok) {
	// 	return await response.json();
	// }
}

async function CreateSharedLink(path) {
    let request = {
        "path": path,
        "settings": {
            "access": "viewer",
            "allow_download": true,
            "audience": "public",
            "requested_visibility": "public"
        }
    }
    return fetch(
		"https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings",
		{
            method: "POST",
            headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ACCESS_KEY}`,
            },
            body : JSON.stringify(request),
		}
	).then(handleResponse);
	// let response = await fetch("https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings", {
	// 	method: "POST",
	// 	headers: { 
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${ACCESS_KEY}`,
    //     },
    //     body : JSON.stringify(request),
	// });
	// if (response.ok) {
    //    let {url, preview_type} = await response.json();
	// 	return await {url, preview_type} ;
	// }
}

async function getFileRequest() {
    let request = {
       "id" : "id:VNJRS_gui-oAAAAAAAAADg"
    }

	return fetch(
		"https://api.dropboxapi.com/2/file_requests/get",
		{
		method: "POST",
		headers: { 
        "Authorization": `Bearer ${ACCESS_KEY}`,
        "Dropbox-API-Arg" : JSON.stringify(request),},
		}
	).then(handleResponse);

	// let response = await fetch("https://api.dropboxapi.com/2/file_requests/get", {
	// 	method: "POST",
	// 	headers: { 
    //     "Authorization": `Bearer ${ACCESS_KEY}`,
    //     "Dropbox-API-Arg" : JSON.stringify(request),},
	// });
	// if (response.ok) {
	// 	return await response.json();
	// }
}

   
const dropboxService = {checkDropBox, uploadFile, CreateSharedLink, getFileRequest}
export default dropboxService;