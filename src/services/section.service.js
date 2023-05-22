import { authHeader } from "../Helpers/authHeader";
import { handleResponse } from "../Helpers/handleResponse"
async function getSectionDetail(sectionId) {
      return fetch(`http://localhost:5000/api/section/sectionDetail?sectionId=${sectionId}`,{
		method: "GET",
		headers: {...authHeader(),'Content-Type': 'application/json'}		
	  }).then(handleResponse)
}

async function getAllStudents(sectionId) {
	return fetch(`http://localhost:5000/api/section/getAllStudents?sectionId=${sectionId}`,{
	  method: "GET",
	  headers: {...authHeader(),'Content-Type': 'application/json'}		
	}).then(handleResponse)
}
async function getStudentDetails(studentId) {
	return fetch(`http://localhost:5000/api/section/getStudentDetails?studentId=${studentId}`,{
	  method: "GET",
	  headers: {...authHeader(),'Content-Type': 'application/json'}		
	}).then(handleResponse)
}





const sectionService = { getSectionDetail, getAllStudents, getStudentDetails};
export default sectionService;