import React, { useEffect, useRef } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { getCurrentUserId } from "../../../Helpers/userHelper";

const Messages = ({ messages}) => {
	let currentUser = getCurrentUserId();



	const AlwaysScrollToBottom = () => {
		const elementRef = useRef();
		useEffect(() => elementRef.current.scrollIntoView());
		return <div ref={elementRef} />;
	};

	return (
		<Flex w="100%" flexDirection="column">
			{messages.map((item, index) => {
				if (item.createdBy === currentUser) {
					return (
						<Flex key={index} w="100%" justify="flex-end">
							<Flex
								rounded="5px"
								my="2%"
								border="1px solid"
								borderColor="primary.200"
								minW="100px"
								maxW="90%"
								p="2%"
							>
								<Text fontSize="14px">{item.messageBody}</Text>
							</Flex>
						</Flex>
					);
				} else {
					return (
						<Flex key={index} w="100%">
							<Avatar
								name={item.creatorName}								
								bg="blue.300"
								size = "sm"
							></Avatar>
							<Flex
								bg="primary.200"
								rounded="5px"
								my="2%"
								ml="2%"
								minW="30%"
								maxW="100%"
								p="2%"
							>
								<Text fontSize="14px">{item.messageBody}</Text>
							</Flex>
						</Flex>
					);
				}
			})}
			<AlwaysScrollToBottom />
		</Flex>
	);
};

export default Messages;
