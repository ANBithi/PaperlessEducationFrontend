const DATA = [
	{
		label: "Home",
		link: "",
        
	},
	// {
	// 	label: "Leave",
	// 	link: "/leave",
	// 	subMenu: [
	// 		{
	// 			label: "Leave Application",
	// 			link: "/leave-application",
	// 		},
	// 		// {
	// 		// 	label: "Leave Decline",
	// 		// 	link: "/leave-decline",
	// 		// },
    //         {
    //             label: "Leave Cancel",
	// 			link: "/leave-cancel",
    //         },
    //         {
    //             label: "Applied Leave Status",
    //             link: "/applied-leave-status"
    //         },
    //         {
    //             label: "Pending Leave Request Status",
    //             link: "/pending-leave-request-status"
    //         },
	// 	],
	// },
	{
		label: "Profile",
		link: "/profile",
		subMenu: [
			{
				label: "Manage Profile",
				link: "/manage-profile",
			},
			{
				label: "Contact Information",
				link: "/contact-info",
			},
            {
                label: "Personal Information",
                link: "/personal-info"
            },
            {
                label: "Academic Qualification",
                link: "/academic"
            },
            {
                label: "Professional Qualification",
                link: "/professional"
            },
            {
                label: "Experience",
                link: "/experience"
            }
		],
	},
];

const FACULTY_NAV = [
	{
		label: "Home",
		link: "",
        
	},
	{
		label: "Profile",
		link: "/manage-profile",
		subMenu: [
			{
				label: "Manage Profile",
				link: "/manage-profile",
			},
			{
				label: "Contact Information",
				link: "/contact-info",
			},
            {
                label: "Personal Information",
                link: "/personal-info"
            },
            {
                label: "Academic Qualification",
                link: "/academic"
            },
            {
                label: "Professional Qualification",
                link: "/professional"
            },
            {
                label: "Experience",
                link: "/experience"
            }
		],
	},
	{
		label: "Courses",
		link: "/courses",
	},
	{
		label: "Exam",
		link: "/exam",
	},
	{
		label: "Results",
		link: "/results",
	}
];
const STUDENT_NAV = [
	{
		label: "Home",
		link: "",
        
	},
	{
		label: "Profile",
		link: "/manage-profile",
		// subMenu: [
		// 	{
		// 		label: "Manage Profile",
		// 		link: "/manage-profile",
		// 	},
		// 	{
		// 		label: "Contact Information",
		// 		link: "/contact-info",
		// 	},
        //     {
        //         label: "Personal Information",
        //         link: "/personal-info"
        //     },
        //     {
        //         label: "Academic Qualification",
        //         link: "/academic"
        //     },
        //     {
        //         label: "Professional Qualification",
        //         link: "/professional"
        //     },
        //     {
        //         label: "Experience",
        //         link: "/experience"
        //     }
		// ],
	},
	{
		label: "Courses",
		link: "/courses",
		
	},
	{
		label: "Enroll",
		link: "/enroll",
	},
	{
		label: "Exam",
		link: "/exam",
	},
	{
		label: "Results",
		link: "/std-results",
	},
];

export {DATA, FACULTY_NAV, STUDENT_NAV};