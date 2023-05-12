import { Box, Button, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
						layerStyle={"notificationCardStyle"}
						border = "1px solid"
						borderColor={"primary.500"}
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
						layerStyle={"notificationCardStyle"}
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
