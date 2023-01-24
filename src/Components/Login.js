import {
	VStack,
	Heading,
	Text,
	Input,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Link,
	useColorModeValue,
	useToast,
	Center
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login.service";
const Login = () => {
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const navigate = useNavigate();
    const color = useColorModeValue('primary.900', 'primary.100');
	const toast = useToast();
	const onSignIn = (e) => {
		e.preventDefault();
		//alert(`Email: ${userEmail} & Password: ${userPassword}`);
		let user = {
			email : userEmail,
			password : userPassword,
		}
		loginService.logIn(user).then((data) => {			
         	if (data?.success === true) {			
			localStorage.setItem('user', JSON.stringify(data.authData));
			localStorage.setItem("loggedIn-status", JSON.stringify(data.success));
			navigate("/");
		}
		else {
		   toast({
			containerStyle: {
				fontSize: "14px",
				fontWeight: "normal",
			},
			title: data.message,
			position: "bottom-right",
			variant: "subtle",
			status: "error",
			duration: 1000,
			isClosable: true,
		});
		}
		});
	};
	const onEmailInputChange = (e) => {
		let value = e.target.value;
		setUserEmail((prevUserEmail) => (prevUserEmail = value));
	};
	const onPasswordInputChange = (e) => {
		let value = e.target.value;
		setUserPassword((prevUserPassword) => (prevUserPassword = value));
	};
	return (
		<Center h="full" w="full" color = {color}>
			<VStack w="50%">
				<Heading mt="12%">Welcome Back</Heading>
				<Text fontSize="14px">
					Welcome back! Please enter your details.
				</Text>
				<Flex w="60%" flexDirection="column">
					<FormControl isRequired>
						<FormLabel fontSize="12px" fontWeight="bold" ml="2%">
							Email
						</FormLabel>
						<Input
							w="full"
							type="email"
							placeholder="Enter your email"
							fontSize="14px"
							onChange={onEmailInputChange}
						></Input>
					</FormControl>
					<FormControl isRequired>
						<FormLabel fontSize="12px" fontWeight="bold" ml="2%">
							Password
						</FormLabel>
						<Input
							type="password"
							fontSize="14px"
							placeholder="Enter your password"
							onChange={onPasswordInputChange}
							w="full"
						></Input>
					</FormControl>
				</Flex>
				{/* <Flex
					w="60%"
					layerStyle="flexMarginStyle"
					textStyle="smallAndBoldStyle"
					justify = "center"
				>
					<Link mr="2%">
						Forgot password
					</Link>
				</Flex> */}
				<Button
					type="submit"
					layerStyle="customButton"
					onClick={onSignIn}
					w = "60%"
				>
					Sign in
				</Button>
			</VStack>
			
		</Center>
	);
};
export default Login;
