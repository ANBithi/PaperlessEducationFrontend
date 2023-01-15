import React from "react";
import { HStack, Box } from "@chakra-ui/react";
import Reactions from "../Reactions/Reactions";
import CommentAction from "../Comments/CommentAction";
import ReactionsTrigger from "../Reactions/ReactionsTrigger";

const PostActions = ({
	onReactionClicked,
	setUserReaction,
	userReaction,
	postId,
	onCommentsClick,
}) => {
	return (
        <Box width= "full" background = "background.200" roundedBottom = "16px" 
        paddingX = "20px" paddingY= "8px">
        <HStack style = {{paddingLeft : "48px"}} justify="space-between" w="full">
			<Reactions
				onReactionClicked={onReactionClicked}
				setUserReaction={setUserReaction}
				userReaction={userReaction}
				parentId={postId}
				reactionsTrigger={
					<ReactionsTrigger userReaction={userReaction} />
				}
			></Reactions>

			<CommentAction
				handleEvent={onCommentsClick}
				post={postId}
				label={"Comments"}
			></CommentAction>
		</HStack>
        </Box>
	);
};

export default PostActions;
