import { Text, VStack } from "@chakra-ui/react";
const FacultyProfile = ({ userData }) => {
	return (
		<VStack
			w="full"
			layerStyle="onSurfaceStyle"
			boxShadow={"md"}
			rounded="8px"
			padding="16px"
		>
			<Text fontSize="18px" layerStyle="sectionHeaderStyle">
				{userData.name}
			</Text>
			<Text color="gray.500">{userData.email}</Text>
			<Text>{userData.designation}</Text>
			<Text>{userData.department}</Text>
		</VStack>
	);
};

export default FacultyProfile;
