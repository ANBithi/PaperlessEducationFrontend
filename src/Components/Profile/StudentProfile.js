import { Divider, HStack, Text, VStack } from "@chakra-ui/react";
import DataRow from "../HelperComponents/DataRow";

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
			{
				userData.advisor ?
				<>
				<Text
				fontSize="18px"
				alignSelf="start"
				layerStyle={"sectionHeaderStyle"}
			>
				Adviser Details
			</Text>
			<DataRow title={"Adviser :"} value={userData.advisor.name}/>
			<DataRow title={"Designation :"} value={userData.advisor.designation}/>

			<DataRow title={"Contact :"} value={userData.advisor.email}/>
				</> 
				: 
				<Text>Unassigned Advisor, please talk to admin office.</Text>
			}
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
