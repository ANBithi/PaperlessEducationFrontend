import {
	Avatar,
	Circle,
	Box,
	HStack,
	Icon,
	Link,
	Text,
	VStack,
	AspectRatio,
	Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { postService } from "../../services/post.service";
import DataFetcher from "../DataFetcher";
import { getCurrentUser } from "../../Helpers/userHelper";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import ImageViewer from "./ImageViewer";
import Reactions from "../Reactions/Reactions";
import Comment from "../Comments/CommentItem";
import CommentsViewer from "../Comments/CommentBox";
import Comments from "../Comments/CommentAction";
import TotalReactionView from "../Reactions/TotalReactionView";
import CommentAction from "../Comments/CommentAction";
import CommentBox from "../Comments/CommentBox";
import CommentMetadata from "../Comments/CommentMetadata";
import CommentsList from "../Comments/CommentsList";
import CommentContents from "../Comments/CommentContents";
import ReactionsTrigger from "../Reactions/ReactionsTrigger";
const PostViewer = ({ currentUser, post }) => {
	const [showComments, setShowComments] = useState(false);
	const [userReaction, setUserReaction] = useState();
	const [comments, setComments] = useState([]);
	const [reactions, setReactions] = useState([]);
	const onCommentsClick = () => {
		let trigger = showComments;
		setShowComments(!trigger);
	};

	useEffect(() => {
		fetchReactions();
		fetchComments();
	}, []);
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
			w="full"
			boxShadow="md"
			alignSelf="flex-end"
			p={2}
			key={post.id}
			m="5%,5%, 5%, 5%"
			rounded="4px"			
			borderColor={
				`${currentUser?.firstName} ${currentUser.lastName}` ===
				post.createdBy
					? "blue.200"
					: "primary.200"
			}
			fontSize="16px"
			style={{ marginBottom: "2%", marginTop: "2%" }}
		>
			{" "}
			<HStack w="50%" alignSelf="flex-start">
				<Avatar
					alignSelf="center"
					size="md"
					name={post.creatorName}
					src="https://bit.ly/broken-link"
					mb="5px"
				/>
				<VStack align="start">
					<Text fontSize="12px" fontWeight="bold" textAlign="start">
						{post.creatorName}
					</Text>
					<Text fontSize="10px" fontWeight="bold" textAlign="start">
						{new Date(post.createdAt).toLocaleString()}
					</Text>
				</VStack>
			</HStack>
			<HStack w="full" align="center" p={2}>
				<Text flex="1" ml="48px" textAlign="start">
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
									<ImageViewer url={attach.metadata.url} />
								)}
								{attach.type === 2 && (
									<VideoPlayer
										fileFormat={attach.fileFormat}
										url={attach.metadata.url}
									/>
								)}

								{attach.type === 3 && (
									<Link href={attach.metadata.url} isExternal>
										{attach.metadata.name}
									</Link>
								)}

								{(attach.type === 0 || attach.type > 3) && (
									<Link href={attach.metadata.url} isExternal>
										{attach.metadata.name}
									</Link>
								)}
							</Box>
						);
					})}
			</Box>
			<VStack w='full'>
				<HStack paddingLeft={'48px'} w="full" justify="space-between">
					<TotalReactionView
						reactions={reactions}
						currentUser={currentUser}
						userReaction={userReaction}
						setUserReaction={setUserReaction}
					></TotalReactionView>
					{comments.length > 0 && (
						<CommentMetadata label='Comment' comments={comments} />
					)}
				</HStack>
				<Divider mx={2} h="1px" bg="primary.200" border="0px"></Divider>
				<HStack justify="space-evenly" w="full">					
					<Reactions
						onReactionClicked={onReactionClicked}
						setUserReaction={setUserReaction}
						userReaction={userReaction}
						parentId={post.id}
						reactionsTrigger={<ReactionsTrigger userReaction={userReaction}/>}
					></Reactions>

					<CommentAction
						handleEvent={onCommentsClick}
						post={post.id}
						label={"Comments"}
					></CommentAction>
				</HStack>
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
