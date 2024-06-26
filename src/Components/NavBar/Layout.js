import {
	Avatar,
	Flex,
	Button,
	HStack,
	Menu,
	MenuItem,
	MenuList,
	MenuButton
} from "@chakra-ui/react";
import { AuthorizationComponent } from "../HelperComponents/AuthorizationComponent";
import React, { useEffect } from "react";
import loginService from "../../services/login.service";
import { NAV_ITEMS } from "./navigationData";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../Helpers/userHelper";
import Notification from "../Notifications/Notification";
export default function Layout() {
	const navigate = useNavigate();
	const userData = getCurrentUser();

	useEffect(() => {}, []);

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

				<HStack spacing="10">
					{NAV_ITEMS.map((item, i) => {
						const com = ()=>(
							<Link key={i} to={item.link}>
								<Button variant="nav">{item.label}</Button>
							</Link>
						);
						if (item.isAuthorized === true) {
							return (
								<AuthorizationComponent
									component={
										com
									}
									userTypes={item.userTypes}
									user={userData}
								/>
							);
						} else {
							return (
								<Link key={i} to={item.link}>
									<Button variant="nav">{item.label}</Button>
								</Link>
							);
						}
					})}
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
										to="/manage-profile"
										style={{ width: "100%" }}
									>
										Profile
									</Link>
								</MenuItem>
								<MenuItem>
									<Link
										to="/settings"
										style={{ width: "100%" }}
									>
										Settings
									</Link>
								</MenuItem>

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
