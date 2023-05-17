import { IconButton, Flex, Text, useColorMode, HStack, Center, Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import userService from "../services/user.service";

const Setting = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const onChangeClick = () => {
		userService.initiateChangePassword().then((p)=>{
			console.log(p.url);
		})
	}


	return (
		<Flex layerStyle="pageStyle" flexDirection={"column"}>
			<HStack mt = "16px" spacing={2} align="start">
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

			<HStack mt = "16px" spacing={2} alignSelf="start" justify = "center">
                <Text layerStyle="sectionHeaderStyle">Change Password :</Text>
				<Button onClick={onChangeClick}>Change</Button>
			</HStack>
			
		</Flex>
	);
};
export default Setting;
