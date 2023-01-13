import {
	faHeart,
	faFaceSurprise,
	faFaceSadTear,
    faThumbsUp,
    faLightbulb
} from "@fortawesome/free-regular-svg-icons";
import {
	faHeart as faHeartSolid,	
	faFaceSurprise as faFaceSurpriseSolid,
	faFaceSadTear as faFaceSadTearSolid,
    faThumbsUp as faThumbsUpSolid,
    faLightbulb as faLightbulbSolid 
} from "@fortawesome/free-solid-svg-icons";

export const REACTION_LIST = [
	{
        id: '0',
		name: "Like",
		icon: faThumbsUp ,
        color: 'blue.500',
		iconFilled:  faThumbsUpSolid ,
	},
	{
        id: '1',
		name: "Heart",
		icon:  faHeart,
        color: 'red.500',
		iconFilled:  faHeartSolid ,
	},
	{
        id: '2',
		name: "Insightful",
		icon:  faLightbulb ,
		iconFilled:  faLightbulbSolid ,
        color: 'green.500',
	},
	{
        id: '3',
		name: "Wow",
		icon:  faFaceSurprise ,
		iconFilled:  faFaceSurpriseSolid ,
        color: 'purple.500',
	},
	{
        id: '4',
		name: "Sad",
		icon:  faFaceSadTear ,
		iconFilled:  faFaceSadTearSolid ,
        color: 'yellow.500',

	},
];
