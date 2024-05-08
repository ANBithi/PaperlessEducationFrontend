import { Text, HStack } from "@chakra-ui/react";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CommentMetadata = ({ comments, showIcon, label, handleEvent }) => {
	const getText = () => {
        if(label ==="Comment") {
            return comments.length>1? " comments" : " comment"
        }
        else {
            return comments.length>1? " replies" : " reply"
        }
    }

    return (
		<HStack onClick={handleEvent} alignSelf='center' px='12px' py ='6px'  borderRadius='4px'  layerStyle = "hoverStyle">
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
