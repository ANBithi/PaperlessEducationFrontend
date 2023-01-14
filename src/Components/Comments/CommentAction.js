import { HStack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
const CommentAction = ({ handleEvent, post, label, component }) => {
	return (
		<HStack
			p={2}
			justify="center"
			align="center"
			_hover={{ cursor: "pointer" }}
			onClick={() => {
				handleEvent(post);
			}}
		>
			{component !== undefined ? (
				component
			) : (
				<>
					<FontAwesomeIcon icon={faComments} />
					<Text>{label}</Text>
				</>
			)}
		</HStack>
	);
};

export default CommentAction;
