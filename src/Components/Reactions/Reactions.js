import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import CustomPopover from "../HelperComponents/CustomPopover";
import ReactionsTrigger from "./ReactionsTrigger";
import ReactionsView from "./ReactionsView";

const Reactions = ({parentId, userReaction, setUserReaction, onReactionClicked}) => {
    const reactionsTrigger = <ReactionsTrigger userReaction={userReaction}/>;
    const reactionsView = <ReactionsView  setUserReaction={setUserReaction}userReaction={userReaction} parentId = {parentId} onReactionClicked = {onReactionClicked}/>;
	return (
            <CustomPopover
             trigger = "hover"
             placement = "top"
             popoverTrigger = {reactionsTrigger}
             popoverContent = {reactionsView}
             >
             </CustomPopover>
	);
};
export default Reactions;
