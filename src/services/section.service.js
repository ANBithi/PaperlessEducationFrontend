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
async function generatePayslip(belongsTo, month , year) {
	let request = {
		id : belongsTo,
		month : month,
		year : year
	};
	let response =  await fetch(`http://localhost:5000/api/finance/GeneratePayslip?id=${request.id}&month=${request.month}&year=${request.year}`,{
	  method: "GET",
	  headers: {'Content-Type': 'application/json'}		
	})
	if (response.ok){
	  let JsonResponse = await response.json(); 
	  return JsonResponse;
	  }    
}

async function addFinance(finance){
	let {salaryPerHour, type } = finance;
	salaryPerHour = parseInt(salaryPerHour);
	type = parseInt (type);
	let request = {...finance , salaryPerHour, type};
	let response = await fetch("http://localhost:5000/api/finance/Add", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});
	if (response.ok) {
		return await response.json();
	}
}

const sectionService = { getSectionDetail, generatePayslip, addFinance };
export default sectionService;