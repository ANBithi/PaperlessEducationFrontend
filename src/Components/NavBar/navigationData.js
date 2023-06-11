const NAV_ITEMS = [
	{
		label: "Home",
		link: "",
        
	},
	{
		label: "Courses",
		link: "/courses",
		userTypes: [0, 2, 3],
		isAuthorized: true
	},
	{
		label: "Administration",
		link: "/administration",
		userTypes : [0, 1],
		isAuthorized : true
	},
	{
		label: "Enroll",
		link: "/enroll",
		userTypes : [0, 3],
		isAuthorized : true
	},
	{
		label: "Exam",
		link: "/exam",
		userTypes: [0, 2],
		isAuthorized: true
	},
	{
		label: "Results",
		link: "/results",
		userTypes: [0, 2],
		isAuthorized: true
	},
	{
		label: "Results",
		link: "/std-results",
		userTypes : [3],
		isAuthorized : true
	},
];

export {NAV_ITEMS};