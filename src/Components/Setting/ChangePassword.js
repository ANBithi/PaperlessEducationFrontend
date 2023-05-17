import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ChangePasswordForm from "../Employee/ManageProfile/ChangePasswordForm";
import { getCurrentUserId } from "../../Helpers/userHelper";

const ChangePassword = () => {
	const { userId, otp } = useParams();
    const currentUserId = getCurrentUserId();
	return (
            (currentUserId === userId) ?
		<Center h="full" layerStyle={"noNavPageStyle"}>
			<VStack
				minW = "60%"
				maxW="400px"
				p="30px"
				rounded="8px"
				boxShadow={"md"}
				layerStyle={"onSurfaceStyle"}
			>
			<ChangePasswordForm otp={otp}/>
			</VStack>
		</Center>
        :
		<Center h="full" layerStyle={"noNavPageStyle"}>
			<VStack
				minW = "60%"
				maxW="400px"
				p="30px"
				rounded="8px"
				boxShadow={"md"}
				layerStyle={"onSurfaceStyle"}
			>
			<Text>Invalid Request</Text>
			</VStack>
		</Center>
	);
};

export default ChangePassword;
