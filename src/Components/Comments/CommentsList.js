import { Box } from "@chakra-ui/react";
import React from "react";
import CommentItem from "./CommentItem";

const CommentsList = ({ comments, currentUser }) => {
	return (
		<Box style={{ width: "100%", paddingLeft: "48px" }}>
			{comments.map((comment) => {
				return (
					<CommentItem
						key={comment.id}
						comment={comment}
						currentUser={currentUser}
					></CommentItem>
				);
			})}
		</Box>
	);
};

export default CommentsList;
