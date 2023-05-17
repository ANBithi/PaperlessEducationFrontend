import {
	HStack,
	VStack,
	Input,
	Text,
	Button,
	useToast,
	Flex,
	Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../Helpers/userHelper";
import loginService from "../../../services/login.service";
import userService from "../../../services/user.service";

const initialPage = { page: "", message: "" };

const ChangePasswordForm = ({otp}) => {
	const navigate = useNavigate();
	const [isValidated, setIsValidated] = useState(false);
	const [shouldRedirect, setShouldRedirect] = useState(false);
	const [newPassword, setNewPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [isPasswordMatch, setIsPasswordMatch] = useState(undefined);
	const [redirectedPage, setRedirectedPage] = useState(initialPage);
	const toast = useToast();


const NavigateComponent = () => {
	if(redirectedPage.page === "success") return <Success message={redirectedPage.message}/>;
	if(redirectedPage.page === "failed") return <Failed message={redirectedPage.message}/>;
	if(redirectedPage.page === "") return <></>;
}

	const onChangePassword = () => {
		userService.changePassword(newPassword, otp).then((d) => {
			if (d.responseStatus) {
				setRedirectedPage({
					page : "success",
					message : d.message
				})
				setShouldRedirect(true);
					loginService.logOff();
					navigate("/login");
			} else {
				setRedirectedPage({
					page : "failed",
					message : d.message
				})
				setShouldRedirect(true);
			}
		});
	};
	const validate = (newPassword, confirmPassword) => {
		if (newPassword === null || newPassword === undefined) {
			return;
		}
		if (confirmPassword === null || confirmPassword === undefined) {
			return;
		}
		if (confirmPassword === newPassword) {
			setIsPasswordMatch(true);
		} else {
			setIsPasswordMatch(false);
			return;
		}
		setIsValidated(true);
	};
	const onNewPasswordChange = (e) => {
		let value = e.target.value;
		setNewPassword(value);
		validate(value, confirmPassword);
	};
	const onConfirmPasswordChange = (e) => {
		let value = e.target.value;
		setConfirmPassword(value);
		validate(newPassword, value);
	};
	return (
		<>
			{shouldRedirect === false ? (
				<VStack w = "full" align="start">
					<Text layerStyle="sectionHeaderStyle">Change Password</Text>
					{/* new password input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="30%">New Password</Text>
						<Input
							type="password"
							name="newPassword"
							variant={"unstyled"}
							onChange={onNewPasswordChange}
						/>
					</HStack>
					{/* confirm password input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="30%">Confirm Password</Text>
						<Input
							type="password"
							name="confirmPassword"
							variant={"unstyled"}
							onChange={onConfirmPasswordChange}
						/>
					</HStack>
					{isPasswordMatch === false && (
						<Text size="sm" color="red">
							Password didn't match
						</Text>
					)}

					<HStack layerStyle="pageButtonStyle">
						<Button
							disabled={!isValidated}
							fontWeight="normal"
							onClick={onChangePassword}
						>
							Change Password
						</Button>
					</HStack>
				</VStack>
			) : (
				<NavigateComponent/>
			)}
		</>
	);
};

export default ChangePasswordForm;


const Success = ({message}) => {
	return (
		<Center bg = "green.400" p = "16px" rounded = "8px" w = "full">
			<Text>{message}</Text>
			<Text>Redirecting to login page </Text>
		</Center>
	);
}


const Failed = ({message}) => {
	return (
		<Center bg = "red.400" p = "16px" rounded = "8px" w = "full">
			<Text>{message}</Text>
		</Center>
	);
}