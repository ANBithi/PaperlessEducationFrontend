import { Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({ icon, ...rest }) => {
	return (
		<Center
		layerStyle ={"themeIconStyle"}
			borderRadius={"4px"}
			//bg = {isSelected=== true? "primary.100" : 'transparent' }
			_hover={{
				backgroundColor: "primary.100",
			}}
			h="24px"
			w="24px"
			{...rest}
		>
			<FontAwesomeIcon icon={icon} />
		</Center>
	);
};


export default IconButton