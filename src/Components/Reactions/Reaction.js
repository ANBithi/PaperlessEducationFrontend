import { Center, useColorMode } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Reaction = ({parentId ,reaction, isSelected, handleOnClicked }) => {
	const { colorMode } = useColorMode();
	return (
		<Center
			color={reaction.color}
			borderRadius={"4px"}
			bg = { isSelected=== true ? colorMode === "light" ? "primary.100" : "primary.800" : 'transparent' }
			layerStyle = "hoverStyle"
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
