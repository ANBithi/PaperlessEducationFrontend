import { VStack } from "@chakra-ui/react";

import DataFetcher from "../DataFetcher";
import { getCurrentUser } from "../../Helpers/userHelper";

import PostViewer from "./PostViewer";

const PostViewerList = ({ courseId, allPost, fetchData }) => {
	const currentUser = getCurrentUser();

	return (
		<DataFetcher
			onDataFetched={fetchData}
			isEmpty={allPost === undefined || allPost?.length === 0}
		>
			<VStack paddingY = "32px" w="full" spacing= "32px">
				{allPost.map((post) => {
					return (
						<PostViewer
							key={post.id}
							currentUser={currentUser}
							post={post}
						/>
					);
				})}
			</VStack>
		</DataFetcher>
	);
};
export default PostViewerList;
