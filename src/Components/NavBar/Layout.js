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
} from "@chakra-ui/react";
//import Logo from '../public/logo.svg';
import React, { useEffect, useState } from "react";
import loginService from "../../services/login.service";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { DATA, FACULTY_NAV, STUDENT_NAV } from "./navigationData";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../Helpers/userHelper";

export default function Layout() {
	const navigate = useNavigate();
	const [userData, setUserData] = useState();

	useEffect(() => {
		setUserData(JSON.parse(localStorage.getItem("userDetails")));
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

				<HStack as="nav" spacing="10">
					{(userData?.userType === 2
						? FACULTY_NAV
						: userData?.userType === 3
						? STUDENT_NAV
						: DATA
					).map((item, i) => (
						<HStack key={i}>
							{item.hasNotification === true ? (
								<Menu>
									<MenuButton
										style={{ marginInlineStart: "-2rem" }}
										m={0}
										as={Button}
										variant="nav"
										rightIcon={<BellIcon />}
									>
										{item.label}
									</MenuButton>
									<MenuList>
										{item.subMenu.map((menu, index) => {
											return (
												<MenuItem key={index}>
													<Link
														to={menu.link}
														style={{
															width: "100%",
														}}
													>
														{menu.label}
													</Link>
												</MenuItem>
											);
										})}
									</MenuList>
								</Menu>
							) : (
								<Link key={i} to={item.link}>
									<Button variant="nav">{item.label}</Button>
								</Link>
							)}
						</HStack>
					))}
				</HStack>
				<HStack>
					<Menu>
						<MenuButton
							style={{ marginInlineStart: "-2rem" }}
							m={0}
							as={Button}
							variant="nav"
						>
							<Avatar
								size="sm"
								name={`${userData?.firstName} ${userData?.lastName}`}
								src="https://bit.ly/broken-link"
							/>
						</MenuButton>
						<MenuList>
							<MenuItem>
								<Link to="/settings" style={{ width: "100%" }}>
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
							<MenuItem onClick={onLogoutClick}>Logout</MenuItem>
						</MenuList>
					</Menu>
				</HStack>
			</Flex>

			{/* An <Outlet> renders whatever child route is currently active,
			so you can think about this <Outlet> as a placeholder for
			the child routes we defined above. */}
			<Outlet />
		</div>
	);
}
