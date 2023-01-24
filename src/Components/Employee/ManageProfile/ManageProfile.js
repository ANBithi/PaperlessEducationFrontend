import { HStack, Flex, Button, useToast, Avatar, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../../Helpers/userHelper";
import ManageProfileForm from "./ManageProfileForm";

const ManageProfile = () => {
	const [showProfileEdit, setShowProfileEdit] = useState(false);
	const toast = useToast();
	const [userData, setUserData] = useState();

	useEffect(() => {
		setUserData(getCurrentUser());
	}, []);
	const onShowProfileEdit = () => {
		setShowProfileEdit(true);
	};
	return (
		<Flex layerStyle="pageStyle">
			<Flex flexDirection="column" w="100%">
			<Avatar
								alignSelf= "center"
								size="2xl"
								name={`${userData?.firstName} ${userData?.lastName}`}
								src="https://bit.ly/broken-link"
								mb= "5px"
							/>
				<Text layerStyle="sectionHeaderStyle"  alignSelf= "center">{userData?.firstName} {userData?.lastName}</Text>
				
				<Button w="10%" disabled = {showProfileEdit} onClick={onShowProfileEdit} alignSelf= "right">
					Edit Profile
				</Button>
				{showProfileEdit === true && <ManageProfileForm />}
			</Flex>
		</Flex>
	);
};
export default ManageProfile;
