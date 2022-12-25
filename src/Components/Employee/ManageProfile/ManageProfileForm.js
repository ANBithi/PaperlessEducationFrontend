import { HStack, VStack, Input, Text, Button, useToast, Flex, Center,} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../Helpers/userHelper";
import loginService from "../../../services/login.service";
import userService from "../../../services/user.service";
const ManageProfileForm = () => {
	const navigate = useNavigate();
	const [defaultValues, setDefaultValues] = useState();
	const [isValidated, setIsValidated] = useState(false);
	const [shouldRedirect, setShouldRedirect] = useState(false);
	const [oldPassword, setOldPassword] = useState();
	const [newPassword, setNewPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [isPasswordMatch, setIsPasswordMatch] = useState(undefined);
	const toast = useToast();
	useEffect(()=>{
		let user = getCurrentUser();
		let manageUser = {
			employeeName : `${user.firstName} ${user.lastName}`,
			designation : user.designation,
			profileStatus : user.profileStatus,
		};
		setDefaultValues(manageUser);
	}, [])
	const onChangePassword = () => {
		userService.changePassword(oldPassword, newPassword).then(d=>{
			if (d.responseStatus){
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: d.message,
					position: "bottom-right",
					variant: "subtle",
					status: "success",
					duration: 1000,
					isClosable: true,
				});
				setShouldRedirect(true);
				setInterval(() => {
				loginService.logOff();
				navigate("/login");
				}, 1000);
				
			}
			else {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: d.message,
					position: "bottom-right",
					variant: "subtle",
					status: "error",
					duration: 1000,
					isClosable: true,
				});
			}
		})
	};
	const validate = (oldPassword, newPassword, confirmPassword) => {
		if(oldPassword === null || oldPassword === undefined)
		{
			return;
		}
		if(newPassword === null || newPassword === undefined)
		{
			return;
		}
		if(confirmPassword === null || confirmPassword === undefined)
		{
			return;
		}
		if( confirmPassword === newPassword ) {
			setIsPasswordMatch(true);
		}
		else {
			setIsPasswordMatch(false);
			return;
		}
		setIsValidated(true);
	}
	const onNewPasswordChange = (e) => {
		let value = e.target.value;
		setNewPassword(value)
		validate(oldPassword, value, confirmPassword);
	}
	const onOldPasswordChange = (e) => {
		let value = e.target.value;
		setOldPassword(value);
		validate(value, newPassword, confirmPassword);

	}
	const onConfirmPasswordChange = (e) => {
		let value = e.target.value;
		setConfirmPassword(value);
		validate(oldPassword, newPassword, value);
	}
	return (
		<>
			{
				shouldRedirect === false ?
				<VStack layerStyle="sectionStyle" align="start">
			<Text layerStyle="sectionHeaderStyle">
				Manage Profile
			</Text>
			{/* designation input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Designation</Text>
				<Input
					defaultValue={defaultValues?.designation}
					layerStyle="inputStyle"
					disabled = "true"
				/>
			</HStack>
			{/* employee title input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Name</Text>
				<Input
					readOnly={true}
					defaultValue={defaultValues?.employeeName}
					layerStyle="inputStyle"
				/>
			</HStack>
			{/* old password input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Old Password</Text>
				<Input
				type="password"
					name="oldPassword"
					layerStyle="inputStyle"
					onChange={onOldPasswordChange}
				/>
			</HStack>
			{/* new password input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">New Password</Text>
				<Input
				type="password"
					name="newPassword"
					layerStyle="inputStyle"
					onChange={onNewPasswordChange}
				/>
			</HStack>
			{/* confirm password input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Confirm Password</Text>
				<Input
				type="password"
					name="confirmPassword"
					layerStyle="inputStyle"
					onChange={onConfirmPasswordChange}
				/>
			</HStack>
			{
				isPasswordMatch === false && (
					<Text size = "sm" color= "red">Password didn't match</Text>
				)
			}
			{/* profile status input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Profile Status</Text>
				<Input
					readOnly={true}
					defaultValue={defaultValues?.profileStatus}
					layerStyle="inputStyle"
				/>
			</HStack>

			<HStack layerStyle="pageButtonStyle">
					<Button disabled = {!isValidated}  fontWeight="normal" onClick={onChangePassword}>
						Change Password
					</Button>
				</HStack>
		</VStack>
		: <Center>

<Text>Password Changed</Text>
<Text>Redirecting to login page </Text>

		</Center> 
				
			}

		</>
	);
};

export default ManageProfileForm;
