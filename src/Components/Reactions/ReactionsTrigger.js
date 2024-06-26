import { HStack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { REACTION_LIST } from "./reactionList";
import { useEffect, useState } from "react";
const ReactionsTrigger = ({userReaction}) => {
	const [icon, setIcon] = useState();
	useEffect(() => {
		if(userReaction === undefined) { return }		
		var found = REACTION_LIST.find(x=> x.id === userReaction.iconId);		
		setIcon(found);		
	}, [userReaction])
	return (
		<HStack						
			justify="center"
			align="center"
			color={icon !== undefined? icon.color: ''}
			_hover={{ cursor: "pointer" }}
		>
			<FontAwesomeIcon icon={icon === undefined? faThumbsUp: icon.iconFilled} />
			<Text>{icon !== undefined? icon.name: 'Like'}</Text>
		</HStack>
	);
};
export default ReactionsTrigger;
