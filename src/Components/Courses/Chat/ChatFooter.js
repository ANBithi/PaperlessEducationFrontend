import React from "react";
import { Flex, Input, Button } from "@chakra-ui/react";

const ChatFooter = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
	<Flex w="100%">
  	<Input
		size = "md"
		mx = "2%"
    	placeholder="Type Something..."
    	onKeyPress={(e) => {
      	if (e.key === "Enter") {
        	handleSendMessage();
      	}
    	}}
    	value={inputMessage}
    	onChange={(e) => setInputMessage(e.target.value)}
  	/>
  	<Button
    	disabled={inputMessage.trim().length <= 0}
    	onClick={handleSendMessage}
  	>
    	Send
  	</Button>
	</Flex>
  );
};

export default ChatFooter;