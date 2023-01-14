import { VStack } from "@chakra-ui/react";

import DataFetcher from "../DataFetcher";
import { getCurrentUser } from "../../Helpers/userHelper";

import PostViewer from "./PostViewer";

const PostsViewer = ({ courseId, allPost, fetchData }) => {
	const currentUser = getCurrentUser();

	return (
		<DataFetcher
			onDataFetched={fetchData}
			isEmpty={allPost === undefined || allPost?.length === 0}
		>
			<VStack w="full" style={{ marginBottom: "5%", marginTop: "5%" }}>
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
export default PostsViewer;
