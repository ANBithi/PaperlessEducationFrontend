import { Flex, useToast, Avatar, Text } from "@chakra-ui/react";
import { useState } from "react";
import userService from "../../../services/user.service";
import FacultyProfile from "../../Profile/FacultyProfile";
import StudentProfile from "../../Profile/StudentProfile";
import DataFetcher from "../../DataFetcher";
const ManageProfile = () => {
	const [userData, setUserData] = useState();
	const fetchData = async () => {
		var res = await userService.getUserProfileData();
		if (res) {
			setUserData(res);
		}
	};
	return (
		<DataFetcher
			onDataFetched={fetchData}
			isEmpty={userData === undefined || userData?.length === 0}
		>
			<Flex flexDirection="column" layerStyle="pageStyle">
				<Avatar
					alignSelf="center"
					size="2xl"
					name={`${userData?.name}`}
					mb="5px"
				/>
				<Text layerStyle="sectionHeaderStyle" alignSelf="center">
					{userData?.firstName} {userData?.lastName}
				</Text>
				{userData?.userType === 2 ? (
					<FacultyProfile userData={userData}></FacultyProfile>
				) : userData?.userType === 3 ? (
					<StudentProfile userData={userData}></StudentProfile>
				) : (
					<></>
				)}

			</Flex>
		</DataFetcher>
	);
};
export default ManageProfile;
