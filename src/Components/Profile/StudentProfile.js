import { Divider, HStack, Text, VStack } from "@chakra-ui/react";

const StudentProfile = ({ userData }) => {
	return (
		<VStack
			w="full"
			layerStyle="onSurfaceStyle"
			boxShadow={"md"}
			rounded="8px"
			padding="16px"
		>
			<Text fontSize="18px" layerStyle="sectionHeaderStyle">
				{userData.name} ({userData.studentId})
			</Text>
			<Text color="gray.500">{userData.email}</Text>
			<Text>{userData.department}</Text>
			<Divider
				h="2px"
				w="full"
				layerStyle={"onSecondarySurfaceStyle"}
			></Divider>
			<Text
				fontSize="18px"
				alignSelf="start"
				layerStyle={"sectionHeaderStyle"}
			>
				Advisor Details
			</Text>
			<HStack w="full" alignSelf={"start"}>
				<Text layerStyle={"sectionHeaderStyle"}>Advisor :</Text>
				<Text>{userData.advisor}</Text>
			</HStack>
			<HStack w="full" alignSelf={"start"}>
				<Text layerStyle={"sectionHeaderStyle"}>Designation :</Text>
				<Text>{userData.designation}</Text>
			</HStack>
			<HStack w="full" alignSelf={"start"}>
				<Text layerStyle={"sectionHeaderStyle"}>Contact :</Text>
				<Text>{userData.advisorContact}</Text>
			</HStack>
			<Divider
				h="2px"
				w="full"
				layerStyle={"onSecondarySurfaceStyle"}
			></Divider>
			<HStack w="full" alignSelf={"start"}>
				<Text layerStyle={"sectionHeaderStyle"}>Admission year :</Text>
				<Text>{userData.admissionYear}</Text>
			</HStack>
			<HStack w="full" alignSelf={"start"}>
				<Text layerStyle={"sectionHeaderStyle"}>Batch :</Text>
				<Text>{userData.batch}</Text>
			</HStack>
		</VStack>
	);
};

export default StudentProfile;
