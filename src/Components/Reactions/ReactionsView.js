import { HStack } from "@chakra-ui/react";
import Reaction from "./Reaction";
import { REACTION_LIST } from "./reactionList";

const ReactionsView = ({
	parentId,
	userReaction,
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
