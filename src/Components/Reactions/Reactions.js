import { HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import CustomPopover from "../HelperComponents/CustomPopover";
import ReactionsTrigger from "./ReactionsTrigger";
import ReactionsView from "./ReactionsView";

const Reactions = () => {
    const reactionsTrigger = <ReactionsTrigger/>;
    const reactionsView = <ReactionsView/>;
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
