import {
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Input,
	Button,
	Divider,
	useToast,
} from "@chakra-ui/react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import React, { useEffect, useState } from "react";
import ChatFooter from "./ChatFooter";
import { chatService } from "../../../services/chat.service";
import { getCurrentUserId } from "../../../Helpers/userHelper";
export const ChatDrawer = ({
	isOpen,
	onClose,
	courseId,
	messages,
	setMessages,
	fetchData,
}) => {
	
  const [inputMessage, setInputMessage] = useState("");
  const toast = useToast()
  useEffect(() => {

    if(isOpen !== true) {  return; }

		const webSocket = new WebSocket("ws://localhost:443/chat");
		webSocket.onmessage = handleNewMessage;
	}, [isOpen]);

	const handleSendMessage = async () => {
		if (!inputMessage.trim().length) {
			return;
		}
		let data = inputMessage;
		let messagePost = {
			messageBody: data,
			belongsTo: courseId,
		};
		await chatService.postMessage(messagePost);
		setInputMessage("");
	};

	const handleNewMessage = (event) => {
		let data = JSON.parse(event.data);
	chatService.getSingle(data.dataId).then((p)=>{
		console.log(p);
		if(p.createdBy !== getCurrentUserId()){
			toast({
				containerStyle: {
					fontSize: "14px",
					fontWeight: "normal",
				},
				title: `${p.creatorName} messaged!`,
				position: "bottom-right",
				variant: "subtle",
				status: "info",
				duration: 5000,
				isClosable: true,
			});
			fetchData();
		}
	})
	};

	

	return (
		<Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
			<DrawerOverlay />
			<DrawerContent
				style={{ width: "340px", height: "100vh", left: "auto" }}
			>
				<DrawerCloseButton />
				<DrawerHeader>
					<ChatHeader />
				</DrawerHeader>
				<DrawerBody px={5}>
					<Messages messages={messages}/>
				</DrawerBody>
				<DrawerFooter p={5}>
					<ChatFooter
						inputMessage={inputMessage}
						setInputMessage={setInputMessage}
						handleSendMessage={handleSendMessage}
					/>
					{/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button> */}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
