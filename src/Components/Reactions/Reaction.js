import { Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Reaction = ({parentId ,reaction, isSelected, handleOnClicked }) => {
	return (
		<Center
			color={reaction.color}
			borderRadius={"4px"}
			bg = {isSelected=== true? "primary.100" : 'transparent' }
			_hover={{ backgroundColor: "primary.100" }}
			h="48px"
			w="48px"
			title={reaction.name}
			onClick={() => {
				handleOnClicked(reaction.id, parentId);
			}}
		>
			
			<FontAwesomeIcon
				icon={isSelected === true ? reaction.iconFilled : reaction.icon}
			/>
		</Center>
	);
};
export default Reaction;
