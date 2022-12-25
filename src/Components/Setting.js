import { IconButton, Flex, Text, useColorMode, HStack, Center } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Setting = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Flex layerStyle="pageStyle">
			<HStack spacing={2} align="start">
				<Center h = "10%">
                <Text layerStyle="sectionHeaderStyle">Change Theme :</Text>
                </Center>
				<IconButton
                h = "10%"
					layerStyle="themeIconStyle"
					onClick={toggleColorMode}
					icon={
						colorMode === "light" ? (
							<SunIcon _hover={{ transform: "scale(1.5)" }} />
						) : (
							<MoonIcon _hover={{ transform: "scale(1.5)" }} />
						)
					}
				/>
			</HStack>
		</Flex>
	);
};
export default Setting;
