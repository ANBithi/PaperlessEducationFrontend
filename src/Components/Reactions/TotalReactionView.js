import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { findReactionTypes } from "../../Helpers/reactionHelper.js";
import { postService } from "../../services/post.service";
import Reaction from "./Reaction.js";
import { REACTION_LIST } from "./reactionList";
import RoundedReactionView from "./RoundedReactionView.js";

function TotalReactionView({ parentId }) {
	const [foundReactions, setFoundReactions] = useState([]);
	const [reactions, setReactions] = useState([]);
	useEffect(() => {
		postService.getAllReactions(parentId).then((count) => {
			if (count) {
				setReactions(count);
				setFoundReactions(findReactionTypes(count));
			}
		});
	}, []);
	return (
		<HStack alignSelf='start' style={{marginLeft: '54px'}} >
			{reactions.length > 0 && (
				<>
					{foundReactions.map((k, i) => {
						return (
							<Box
								style={{
									borderRadius: "32px",
									marginLeft: i > 0 ? "-6px" : "0",
								}}
								outline="2px solid"
								outlineColor="primary.50"
							>
								<RoundedReactionView
									key={i}
									reaction={k.view}
									isSelected={false}
									handleOnClicked={() => {}}
								/>
							</Box>
						);
					})}
					<Text>{reactions.length}</Text>
				</>
			)}
		</HStack>
	);
}

export default TotalReactionView;
