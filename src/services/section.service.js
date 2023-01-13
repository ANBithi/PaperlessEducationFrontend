async function getSectionDetail(sectionId) {
      let response =  await fetch(`http://localhost:5000/api/section/sectionDetail?sectionId=${sectionId}`,{
		method: "GET",
		headers: {'Content-Type': 'application/json'}		
	  })
	  if (response.ok){
		let JsonResponse = await response.json(); 
		return JsonResponse;
		}    
}


const sectionService = { getSectionDetail};
export default sectionService;