import { Box, Text, Avatar, VStack, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../Helpers/userHelper";
import { postService } from "../../services/post.service";
import Reactions from "../Reactions/Reactions";
import CommentAction from "./CommentAction";
import CommentContents from "./CommentContents";
import TotalReactionView from "../Reactions/TotalReactionView";
import CommentMetadata from "./CommentMetadata";
import ReactionsTrigger from "../Reactions/ReactionsTrigger";
const CommentItem = ({ comment, currentUser }) => {
	const [showReply, setShowReply] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [userReaction, setUserReaction] = useState();
	const [reactions, setReactions] = useState([]);
	const [comments, setComments] = useState([]);

	const onCommentsClick = () => {
		console.log();
		let trigger = showReply;
		setShowReply(!trigger);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		await fetchReactions();
		await fetchComments();
        setDataLoaded(true);
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

	const fetchReactions = async () => {
		let response = await postService.getAllReactions(comment.id);
		if (response) {
			var userReaction = response.find(
				(x) => x.createdById === currentUser.id
			);
			setUserReaction(userReaction);
			setReactions(response);
		}
	};
	const fetchComments = async () => {
		let response = await postService.getAllComments(comment.id);
		if (response) {
			setComments(response);
		}
	};

	return (
		<HStack w="full" paddingBottom="16px"
		paddingX="16px"
		rounded="10px">
			<Avatar
				alignSelf="start"
				size="xs"
				name={comment.createdBy}
				src="https://bit.ly/broken-link"
				mb="5px"
			/>
			<VStack  m={0} w={"100%"}
			 align="start">
				<VStack layerStyle="responseBubbleStyle" align= "start">
				<Text layerStyle= "responseAuthorStyle"> {comment.createdBy} </Text>
				<Text layerStyle= "responseContentStyle"> {comment.content} </Text>
				</VStack>

				{
                 (
					<>
						<HStack className="comment-item-footer" style={{
                            opacity : dataLoaded === true? 1: 0, 
							marginTop : "0"
                        }} layerStyle = "responseItemFooterStyle">
							<HStack justify="start">
								<Reactions
									onReactionClicked={onReactionClicked}
									setUserReaction={setUserReaction}
									userReaction={userReaction}
									parentId={comment.id}
									reactionsTrigger={
										reactions.length > 0 ? (
											<TotalReactionView
												reactions={reactions}
												currentUser={currentUser}
												userReaction={userReaction}
												setUserReaction={
													setUserReaction
												}
											></TotalReactionView>
										) : (
											<ReactionsTrigger
												userReaction={userReaction}
											/>
										)
									}
								></Reactions>

								<CommentAction
									handleEvent={onCommentsClick}
									post={comment.id}
									label={"Reply"}
									component={
										<CommentMetadata
											comments={comments}
											showIcon={true}
											label={"Reply"}
										/>
									}
								></CommentAction>
							</HStack>

							<Text>{moment(comment.createdAt).fromNow()}</Text>
						</HStack>
						<CommentContents
							isVisible={showReply}
							comments={comments}
							currentUser={currentUser}
							parentId={comment.id}
						/>
					</>
				)}
			</VStack>
		</HStack>
	);
};
export default CommentItem;
