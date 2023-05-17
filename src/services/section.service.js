import { authHeader } from "../Helpers/authHeader";
import { handleResponse } from "../Helpers/handleResponse"
async function getSectionDetail(sectionId) {
      return fetch(`http://localhost:5000/api/section/sectionDetail?sectionId=${sectionId}`,{
		method: "GET",
		headers: {...authHeader(),'Content-Type': 'application/json'}		
	  }).then(handleResponse)
	//   if (response.ok){
	// 	let JsonResponse = await response.json(); 
	// 	return JsonResponse;
	// 	}    
}




const sectionService = { getSectionDetail};
export default sectionService;