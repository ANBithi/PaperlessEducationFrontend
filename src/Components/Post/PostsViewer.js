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
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { postService } from "../../services/post.service";
import DataFetcher from "../DataFetcher";
import { getCurrentUser } from "../../Helpers/userHelper";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import ImageViewer from "./ImageViewer";
import Reactions from "../Reactions/Reactions";
import Comment from "../Comments/Comment";
import CommentsViewer from "../Comments/CommentBox";
import Comments from "../Comments/CommentAction";
import TotalReactionView from "../Reactions/TotalReactionView";
import PostViewer from "./PostViewer";

const PostsViewer = ({ courseId, allPost, fetchData }) => {
	const currentUser = getCurrentUser() ;
	
	return (
		<DataFetcher
			onDataFetched={fetchData}
			isEmpty={allPost === undefined || allPost?.length === 0}
		>
			<VStack w="full" style={{ marginBottom: "5%", marginTop: "5%" }}>
				{allPost.map((post) => {
					return (
						<PostViewer key={post.id} currentUser={currentUser} post={post}/>
					);
				})}
			</VStack>
		</DataFetcher>
	);
};
export default PostsViewer;
