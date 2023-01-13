import {
	HStack, Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Reaction from "./Reaction";
import { REACTION_LIST } from "./reactionList";

const ReactionsView = () => {
	const [selectedReaction, setSelectedReaction ] = useState();
	const onReactionClicked = (id) => {
		setSelectedReaction(id);
	}
	return (
		<HStack spacing={0}>
		{
			REACTION_LIST.map((reaction) => {
				return (<Reaction key={reaction.id} reaction={reaction} isSelected={reaction.id === selectedReaction} handleOnClicked = {onReactionClicked}  />)
			})
		}
		</HStack>
	);
};

export default ReactionsView;
