import { Box, HStack, Text, useDisclosure, useColorMode } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { findReactionTypes } from "../../Helpers/reactionHelper.js";
import AllReactionsModal from "./AllReactionsModal.js";
import RoundedReactionView from "./RoundedReactionView.js";

function TotalReactionView({
	reactions,
}) {
	const { colorMode } = useColorMode();
	const [foundReactions, setFoundReactions] = useState([]);

	const { onOpen, isOpen, onClose } = useDisclosure();

	const onReactionsClick = () => {
		onOpen();
	};

	useEffect(() => {
		if (reactions === undefined) {
			return;
		}
		setFoundReactions(findReactionTypes(reactions));
	}, [reactions]);

	return (
		<HStack
            className="reactions-list"
			alignSelf="start"
			py="6px"
			px="8px"
			borderRadius="4px"
			layerStyle = "hoverStyle"
			onClick={onReactionsClick}
			style={{ marginLeft: "-6px" }}
		>
			{foundReactions.length > 0 && (
				<>
					{foundReactions.map((k, i) => {
						return (
							<Box
                                key = {k.view.name}
								style={{
									borderRadius: "32px",
									marginLeft: i > 0 ? "-6px" : "0",
								}}
								outline="2px solid"
								outlineColor= {colorMode === "light" ? "primary.300" : "primary.800"}
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
			<AllReactionsModal
				reactions={foundReactions}
				isOpen={isOpen}
				onClose={onClose}
			></AllReactionsModal>
		</HStack>
	);
}

export default TotalReactionView;
