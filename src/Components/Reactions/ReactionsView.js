import {
	HStack, Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { postService } from "../../services/post.service";
import Reaction from "./Reaction";
import { REACTION_LIST } from "./reactionList";

const ReactionsView = ({parentId}) => {
	const [selectedReaction, setSelectedReaction ] = useState();
	const onReactionClicked = (id) => {
		postService.addReaction({parentId, iconId:id}).then((d)=>{
			if(d === true ){
				console.log("success")
			}
			else {
					console.log("failed");
			}
		})
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
