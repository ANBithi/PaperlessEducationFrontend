import { Center, Text, VStack } from "@chakra-ui/react";
import EmptyIcon from "../EmptyIcon";

const EmptyState = ({ icon, message }) => {
	return (
		<Center paddingY="40px" height={"100%"} width={"100%"}>
			<VStack>
				<div style={{ opacity: "0.5" }}>
					<EmptyIcon></EmptyIcon>
				</div>
				<Text style={{ fontSize: "24px" }}>Its empty here </Text>
				<Text>{message}</Text>
			</VStack>
		</Center>
	);
};

export default EmptyState;
