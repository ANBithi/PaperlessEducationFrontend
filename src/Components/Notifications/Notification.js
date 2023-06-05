import {
	Box,
	useDisclosure,
	Center,
	Button,
	PopoverHeader,
	HStack,
	Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";
import { getCurrentUserId } from "../../Helpers/userHelper";
import { notificationService } from "../../services/notification.service";
import userService from "../../services/user.service";
import CustomPopover from "../HelperComponents/CustomPopover";
import NotificationList from "./NotificationList";
import ShowCounter from "../ShowCounter";

const NotificationIcon = ({ handleEvent, notifications }) => (
	<HStack spacing={0}>
		{notifications?.unreadCount > 0 && (
			<Center
				margin="-2px"
				color="background.50"
				fontSize="12px"
				bg="primary.600"
				h="24px"
				px="12px"
				rounded="12px"
			>
				<Text fontWeight="bold">{notifications?.unreadCount}</Text>
			</Center>
		)}
		<Center
			onClick={handleEvent}
			_hover={{ cursor: "pointer" }}
			height="32px"
			width="32px"
		>
			<FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
		</Center>
	</HStack>
);

const Notification = () => {
	const { isOpen, onToggle, onClose } = useDisclosure();
	const [allNotifications, setAllNotifications] = useState();

	
	useEffect(() => {
		const webSocket = new WebSocket(`ws://localhost:443/newNotification`);
		webSocket.onmessage = handleNewNotification;
		notificationService
			.getNotifications(getCurrentUserId(), "post")
			.then((p) => {
        console.log(p);
				setAllNotifications(p);
			});
	}, []);
	
	const handleNewNotification = (event) => {
		// let data = JSON.parse(event.data);
	notificationService.getNotifications(getCurrentUserId(), "post").then((p)=>{
		console.log("live update received");
		setAllNotifications(p);
	})
	};
	const onNotificationIconClick = () => {
		userService.updateUserInteraction(0).then((d)=>{
			if (d) {
				let copy = {...allNotifications};
				copy.unreadCount = 0;
				copy.oldNotifications = [...copy.oldNotifications, ...copy.newNotifications];
				copy.newNotifications = [];
				console.log(copy);
				setAllNotifications(copy);
			}
			else {
				console.log("something is wrong")
			}
		})
	}
	return (
		<Box>
			<CustomPopover
				popoverTrigger={<NotificationIcon handleEvent = {onNotificationIconClick} notifications = {allNotifications} />}
				popoverContent={<NotificationList allNotifications = {allNotifications} />}
				placement="bottom"
				trigger="click"
			></CustomPopover>
		</Box>
	);
};

export default Notification;
