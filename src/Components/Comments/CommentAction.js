import { HStack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
const CommentAction = ({ handleEvent, post}) => {
	return (
		<HStack
			p={2}
			w="600px"
			justify="center"
			align="center"
            _hover = {{cursor:"pointer"}}
			onClick={() => {
				handleEvent(post);
			}}
		>
			<FontAwesomeIcon icon={faComments} />
			<Text>Comments</Text>
		</HStack>
	);
};

export default CommentAction;
