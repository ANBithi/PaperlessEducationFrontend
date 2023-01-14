import React from "react";
import { Box } from "@chakra-ui/react";
import CommentBox from "./CommentBox";
import CommentsList from "./CommentsList";

const CommentContents = ({ isVisible, comments, currentUser, parentId }) => {
	return (
		<>
			{isVisible === true && (
				<>
					{comments.length > 0 && (
						<Box style={{ width: "100%", paddingLeft: "20px" }}>
							<CommentsList comments={comments} currentUser={currentUser} />
						</Box>
					)}
					<CommentBox currentUser={currentUser} postId={parentId} />
				</>
			)}
		</>
	);
};

export default CommentContents;
