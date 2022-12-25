async function addInstitute (request) {
	let response =  await fetch("http://localhost:5000/api/institute/addInstitute",{
		method: "POST",
		headers: {'Content-Type': 'application/json'}, 
		body: JSON.stringify(request)
	  })
	  if (response.ok) {
		return await response.json();
	}
}
async function addHolidays (date) {
	let response =  await fetch("http://localhost:5000/api/institute/addHoliday",{
		method: "POST",
		headers: {'Content-Type': 'application/json'}, 
		body: JSON.stringify(date)
	  })
	  if (response.ok) {
		return await response.json();
	}
}

async function getHolidays (){
    let response = await fetch(`http://localhost:5000/api/institute/getHolidays`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (response.ok) {
		return await response.json();
	}
}

const instituteService = {getHolidays, addHolidays, addInstitute}
export default instituteService;