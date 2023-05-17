import { HStack, Flex, Button, useToast, Avatar, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../../Helpers/userHelper";
import ManageProfileForm from "./ChangePasswordForm";
import userService from "../../../services/user.service";
import FacultyProfile from "../../Profile/FacultyProfile";
import StudentProfile from "../../Profile/StudentProfile";
import DataFetcher from "../../DataFetcher";
const ManageProfile = () => {
	const [showProfileEdit, setShowProfileEdit] = useState(false);
	const toast = useToast();
	const [userData, setUserData] = useState();
	const fetchData = async () => {
		var res = await userService.getUserProfileData();
		if (res.response) {
			setUserData(res.data);
		}
	};
	const onShowProfileEdit = () => {
		setShowProfileEdit(true);
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
				{/* <Button w="10%" disabled = {showProfileEdit} onClick={onShowProfileEdit} alignSelf= "right">
					Edit Profile
				</Button> */}
				{/* {showProfileEdit === true && <ManageProfileForm />} */}
			</Flex>
		</DataFetcher>
	);
};
export default ManageProfile;
