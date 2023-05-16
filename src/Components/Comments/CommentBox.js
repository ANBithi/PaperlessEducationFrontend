import {
	HStack,
	Text,
	Circle,
	Icon,
	Avatar,
	Textarea,
	Button,
	VStack,
} from "@chakra-ui/react";
import {
	LinkIcon,
	AttachmentIcon,
	ArrowUpIcon,
	ChatIcon,
	CheckIcon,
} from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { getCurrentUser } from "../../Helpers/userHelper";
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
		<VStack w="full" paddingX = "20px" paddingBottom = "12px">
			<HStack w="full">
				<Avatar
					alignSelf="start"
					size="md"
					name={`${currentUser.firstName} ${currentUser.lastName}`}
										
					mb="5px"
				/>
				<HStack w="100%" rounded="24px"  layerStyle = "surfaceStyle">
					<Textarea
						placeholder  = "Add a comment..."
						value={commentContent}
						rows='1'
						variant = "unstyled"
						layerStyle = "responseTextareaStyle"
						//value={textAreaVal}
						name="postDescription"
						onChange={onTextAreaChange}
					/>
					<Circle
						p="8px"
						//onClick={onAttachmentClick}
						alignSelf="flex-end"
						_hover={{ bg: "blackAlpha.50" }}
						style={{ margin: "8px" }}
						color="primary.500"
					>
						<input
							type="file"
							name="input"
							//ref={inputFile}
							//	onChange={onAttachmentChange}
							style={{ display: "none" }}
						/>
						<Icon as={AttachmentIcon}></Icon>
					</Circle>
				</HStack>

				{/* {((uploadFile !== null &&
									uploadFile !== undefined) ||
									uploadFile?.length > 0) && (
									<HStack w="full" justify="space-between">
										<Text
											fontSize="12px"
											textAlign="center"
											mt="2"
											fontWeight="bold"
										>
											{uploadFile.name}
										</Text>
										<Icon
											as={ArrowUpIcon}
											color={
												postDisable
													? "red.500"
													: "green.500"
											}
											size="md"
											alignSelf="flex-end"
											_hover={{ cursor: "pointer" }}
											onClick={onUploadClick}
										/>
									</HStack>
								)}
								{((attachments !== null &&
									attachments !== undefined) ||
									attachments?.length > 0) &&
									attachments.map((attachment, i) => {
										console.log(attachment);
										return (
											<HStack
												w="full"
												key={i}
												justify="space-between"
											>
												<Link
													fontSize="12px"
													textAlign="center"
													mt="2"
													fontWeight="bold"
													href={attachment.url}
													isExternal
												>
													{attachment.name}
												</Link>
											</HStack>
										);
									})} */}

				<Button
					onClick={onCommentPost}
					//isDisabled={postDisable}
					rounded="50px"
					height='48px'
					width='48px'

				>
					<Icon as={CheckIcon}></Icon>
				</Button>
			</HStack>
		</VStack>
	);
};

export default CommentBox;
