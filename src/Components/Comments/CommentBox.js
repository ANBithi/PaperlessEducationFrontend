import {
	HStack,
	Circle,
	Icon,
	Avatar,
	Textarea,
	Button,
	VStack,
	Center,
} from "@chakra-ui/react";
import {
	AttachmentIcon,
	CheckIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import { postService } from "../../services/post.service";
const CommentBox = ({ currentUser, postId }) => {
	const [commentContent, setCommentContent] = useState("");
	const onCommentPost = () => {
		let postPayload = {
			content: commentContent,
			parentId: postId,
		};
		postService.postComment(postPayload).then((response) => {
			if (response === true) {
				console.log("posted");
				setCommentContent("");
			} else {
				console.log("failed");
			}
		});
	};
	const onTextAreaChange = (e) => {
		setCommentContent(e.target.value);
	};
	return (
		<VStack w="full" paddingX = "20px" paddingY = "12px">
			<HStack w="full">
				<Center>
				<Avatar
					alignSelf="start"
					size="sm"
					name={`${currentUser.firstName} ${currentUser.lastName}`}			
					mb="5px"
				/>
				</Center>
				<HStack w="100%" rounded="24px"  layerStyle = "surfaceStyle">
					<Textarea
						placeholder  = "Add a comment..."
						value={commentContent}
						rows='1'
						variant = "unstyled"
						layerStyle = "responseTextareaStyle"
						name="postDescription"
						onChange={onTextAreaChange}
					/>
					<Circle
						p="8px"
						alignSelf="flex-end"
						_hover={{ bg: "blackAlpha.50" }}
						style={{ margin: "8px" }}
						color="primary.500"
					>
						<input
							type="file"
							name="input"
							style={{ display: "none" }}
						/>
						<Icon as={AttachmentIcon}></Icon>
					</Circle>
				</HStack>

				<Button
					onClick={onCommentPost}
					rounded="20px"
					height='40px'
					width='40px'

				>
					<Icon as={CheckIcon}></Icon>
				</Button>
			</HStack>
		</VStack>
	);
};

export default CommentBox;
