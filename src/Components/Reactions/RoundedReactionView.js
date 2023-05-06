import { background, Box, Center, Circle } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoundedReactionView = ({ reaction, handleOnClicked }) => {
	return (
		<Center
			color={reaction.color}
			borderRadius={"32px"}
			bg="primary.100"
			h="32px"
			w="32px"
			onClick={() => {
				handleOnClicked(reaction.id);
			}}
		>
			
			<FontAwesomeIcon
				icon={reaction.iconFilled}
			/>
		</Center>
	);
};
export default RoundedReactionView;
