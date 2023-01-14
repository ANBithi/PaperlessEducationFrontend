import { HStack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { postService } from "../../services/post.service";
import Reaction from "./Reaction";
import { REACTION_LIST } from "./reactionList";

const ReactionsView = ({
	parentId,
	userReaction,
	setUserReaction,
	onReactionClicked,
}) => {
	return (
		<HStack spacing={0}>
			{REACTION_LIST.map((reaction) => {
				return (
					<Reaction
						parentId={parentId}
						key={reaction.id}
						reaction={reaction}
						isSelected={reaction.id === userReaction?.iconId}
						handleOnClicked={onReactionClicked}
					/>
				);
			})}
		</HStack>
	);
};

export default ReactionsView;
