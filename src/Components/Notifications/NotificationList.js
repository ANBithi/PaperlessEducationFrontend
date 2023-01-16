import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getCurrentUserId } from "../../Helpers/userHelper";
import { notificationService } from "../../services/notification.service";

const NotificationList = ({allNotifications}) => {
	const navigate = useNavigate();

	const onNotificationClick = (notification) => {
		navigate(`courses/${notification.sectionId}`);
	};
	return (
		<Box layerStyle="notificationListStyle">
			<Box w="95%" rounded="5px" mt="12px">
				<Text fontWeight="bold">
					{allNotifications?.unreadCount > 0
						? `${allNotifications.unreadCount} Notifications`
						: "No Notification"}{" "}
				</Text>
			</Box>

			{allNotifications?.newNotifications.map((notification) => {
				return (
					<Box
						key={notification.id}
						rounded="8px"
            backgroundColor='primary.100'
						_hover={{ cursor: "pointer" }}
            fontSize="14px"
            padding='8px'
            marginTop='12px'
						onClick={() => {
							onNotificationClick(notification);
						}}
					>
						<Text key={notification.id}>
							{" "}
							<strong>{notification.creatorName}</strong> posted
							on <strong>{notification.courseName}</strong>(
							{notification.section}){" "}
						</Text>
					</Box>
				);
			})}
      {allNotifications?.oldNotifications.map((notification) => {
				return (
					<Box
						key={notification.id}
						rounded="8px"
            backgroundColor='background.50'
						_hover={{ cursor: "pointer" }}
            fontSize="14px"
            padding='8px'
            marginTop='12px'
						onClick={() => {
							onNotificationClick(notification);
						}}
					>
						<Text key={notification.id}>
							{" "}
							<strong>{notification.creatorName}</strong> posted
							on <strong>{notification.courseName}</strong>(
							{notification.section}){" "}
						</Text>
					</Box>
				);
			})}
		</Box>
	);
};

export default NotificationList;
