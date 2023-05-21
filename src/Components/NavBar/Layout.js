import {
	Avatar,
	Flex,
	Button,
	HStack,
	Menu,
	MenuItem,
	MenuList,
	MenuButton,
	Icon,
	Text,
	Box,
} from "@chakra-ui/react";
//import Logo from '../public/logo.svg';
import React, { useEffect, useState } from "react";
import loginService from "../../services/login.service";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { DATA, FACULTY_NAV, STUDENT_NAV } from "./navigationData";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../Helpers/userHelper";
import Notification from "../Notifications/Notification";

export default function Layout() {
	const navigate = useNavigate();
	const [userData, setUserData] = useState();

	useEffect(() => {
		setUserData(getCurrentUser());
		console.log(userData);
	}, []);

	const onLogoutClick = () => {
		loginService.logOff();
		navigate("/login");
	};
	return (
		<div
			style={{
				height: "100vh",
				overflow: "hidden",
			}}
		>
			<Flex
				layerStyle="navbarStyle"
				align="center"
				justify="space-between"
			>
				{/* <Image src={Logo.src} h="50px" /> */}

				<HStack spacing="10">
					{(userData?.userType === 2
						? FACULTY_NAV
						: userData?.userType === 3
						? STUDENT_NAV
						: DATA
					).map((item, i) => (
						<Link key={i} to={item.link}>
							<Button variant="nav">{item.label}</Button>
						</Link>
					))}
				</HStack>

				<HStack>
					<Notification />

					<HStack>
						<Menu>
							<MenuButton m={0} as={Button} variant="nav">
								<Avatar
									size="sm"
									name={`${userData?.firstName} ${userData?.lastName}`}
								/>
							</MenuButton>
							<MenuList layerStyle="onSurfaceStyle">
								<MenuItem>
									<Link
										to="/settings"
										style={{ width: "100%" }}
									>
										Settings
									</Link>
								</MenuItem>

								{(userData?.userType === 1 ||
									userData?.userType === 0) && (
									<MenuItem>
										<Link
											to="/administration"
											style={{ width: "100%" }}
										>
											Administration
										</Link>
									</MenuItem>
								)}
								<MenuItem onClick={onLogoutClick}>
									Logout
								</MenuItem>
							</MenuList>
						</Menu>
					</HStack>
				</HStack>
			</Flex>

			<Outlet />
		</div>
	);
}
