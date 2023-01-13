import { HStack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
const ReactionsTrigger = () => {
	return (
		<HStack
			
			w="200px"
			justify="center"
			align="center"
			_hover={{ cursor: "pointer" }}
		>
			<FontAwesomeIcon icon={faThumbsUp} />
			<Text>Like</Text>
		</HStack>
	);
};
export default ReactionsTrigger;
