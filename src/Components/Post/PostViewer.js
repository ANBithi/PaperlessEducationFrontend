import {
	Avatar,
	Box,
	HStack,
	Link,
	Text,
	VStack,
	useToast
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { postService } from "../../services/post.service";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import ImageViewer from "./ImageViewer";
import moment from "moment";
import TotalReactionView from "../Reactions/TotalReactionView";
import CommentMetadata from "../Comments/CommentMetadata";
import CommentContents from "../Comments/CommentContents";
import PostActions from "./PostActions";
import { getCurrentUser } from "../../Helpers/userHelper";
const PostViewer = ({ currentUser, post }) => {
	const socketConnectedRef = useRef(false);
	const [showComments, setShowComments] = useState(false);
	const [userReaction, setUserReaction] = useState();
	const [comments, setComments] = useState([]);
	const [reactions, setReactions] = useState([]);
	const toast = useToast();
	const onCommentsClick = () => {
		let trigger = showComments;
		setShowComments(!trigger);
	};

	useEffect(() => {
		if (socketConnectedRef.current === false) {
			const webSocket = new WebSocket(`ws://localhost:443/comment-${post.id}`);
			webSocket.onmessage = handleNewComment;
		}
		socketConnectedRef.current = true;
		fetchReactions();
		fetchComments();
	}, []);

	const handleNewComment = (event) => {
		let data = JSON.parse(event.data);
		console.log(data);
		postService.getSingleComment(data.dataId).then((p) => {
			console.log(p);
			if (p.createdBy !== getCurrentUser()) {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: `${p.createdBy} commented on a post!`,
					position: "bottom-right",
					variant: "subtle",
					status: "info",
					duration: 5000,
					isClosable: true,
				});
				fetchComments();
			}
		});
	};
	const fetchReactions = () => {
		postService.getAllReactions(post.id).then((response) => {
			if (response) {
				var userReaction = response.find(
					(x) => x.createdById === currentUser.id
				);
				setUserReaction(userReaction);
				setReactions(response);
			}
		});
	};

	const fetchComments = () => {
		postService.getAllComments(post.id).then((response) => {
			if (response) {
				setComments(response);
			}
		});
	};

	const onReactionClicked = (id, parentId) => {
		postService.addReaction({ parentId, iconId: id }).then((d) => {
			if (d === true) {
				setUserReaction({ iconId: id });
				fetchReactions();
			} else {
				console.log("failed");
			}
		});
	};
	return (
		<VStack
			key={post.id}
			layerStyle="postViewerStyle"
			borderColor={
				`${currentUser?.firstName} ${currentUser.lastName}` ===
				post.createdBy
					? "blue.200"
					: "primary.200"
			}
		>
			<Box width="full" padding="20px" paddingBottom="0px">
				<HStack w="50%" alignSelf="flex-start">
					<Avatar
						alignSelf="center"
						size="md"
						name={post.creatorName}						
						mb="5px"
					/>
					<VStack align="start">
						<Text layerStyle="responseAuthorStyle">
							{post.creatorName}
						</Text>
						<Text
							fontSize="10px"
							fontWeight="bold"
							textAlign="start"
						>
							{moment(post.createdAt).fromNow()}
						</Text>
					</VStack>
				</HStack>
				<HStack w="full" align="center" p={2}>
					<Text
						flex="1"
						ml="48px"
						textAlign="start"
						layerStyle="responseContentStyle"
					>
						{post.postDescription}
					</Text>
				</HStack>
				<Box style={{ marginLeft: "56px" }}>
					{post.attachments?.length > 0 &&
						post.attachments.map((attach, i) => {
							return (
								<Box
									fontSize="12px"
									fontWeight="bold"
									key={i}
									alignSelf="flex-start"
								>
									{attach.type === 1 && (
										<ImageViewer
											url={attach.metadata.url}
										/>
									)}
									{attach.type === 2 && (
										<VideoPlayer
											fileFormat={attach.fileFormat}
											url={attach.metadata.url}
										/>
									)}

									{attach.type === 3 && (
										<Link
											href={attach.metadata.url}
											isExternal
										>
											{attach.metadata.name}
										</Link>
									)}

									{(attach.type === 0 || attach.type > 3) && (
										<Link
											href={attach.metadata.url}
											isExternal
										>
											{attach.metadata.name}
										</Link>
									)}
								</Box>
							);
						})}
				</Box>
				<HStack paddingLeft={"48px"} w="full" justify="space-between">
					<TotalReactionView
						reactions={reactions}
						currentUser={currentUser}
						userReaction={userReaction}
						setUserReaction={setUserReaction}
					></TotalReactionView>
					{comments.length > 0 && (
						<CommentMetadata handleEvent = {onCommentsClick} label="Comment" comments={comments} />
					)}
				</HStack>
			</Box>
			<VStack w="full">
				<PostActions
					onReactionClicked={onReactionClicked}
					setUserReaction={setUserReaction}
					userReaction={userReaction}
					postId={post.id}
					onCommentsClick={onCommentsClick}
				/>

				<CommentContents
					isVisible={showComments}
					parentId={post.id}
					currentUser={currentUser}
					comments={comments}
				></CommentContents>
			</VStack>
		</VStack>
	);
};

export default PostViewer;
