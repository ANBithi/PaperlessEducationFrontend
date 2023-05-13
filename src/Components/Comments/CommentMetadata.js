import { Box, Stack, Text, HStack,useColorMode } from "@chakra-ui/react";
import { faComment, faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CommentMetadata = ({ comments, showIcon, label }) => {
	const getText = () => {
        if(label ==="Comment") {
            return comments.length>1? " comments" : " comment"
        }
        else {
            return comments.length>1? " replies" : " reply"
        }
    }
    const getNumber =() => {
        if (label === "Comments") {  return comments.length }
        else{
            if(comments.length > 0) {
                return comments.length;
            }
            else{
                return "";
            }
        }
    }
    return (
		<HStack alignSelf='center' px='12px' py ='6px'  borderRadius='4px'  layerStyle = "hoverStyle">
			{
                showIcon && 
                <FontAwesomeIcon icon={faComments} />
            
            }
            <Text>
				{comments.length}
				{getText()}
			</Text>
		</HStack>
	);
};

export default CommentMetadata;
