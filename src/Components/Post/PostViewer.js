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
} from "@chakra-ui/react";
import { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { postService } from "../../services/post.service";
import DataFetcher from "../DataFetcher";
import { getCurrentUser } from "../../Helpers/userHelper";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import ImageViewer from "./ImageViewer";

const PostViewer = ({ courseId, allPost, setAllPost, fetchData }) => {
	const [currentUser, setCurrentUser] = useState(getCurrentUser());
	return (
		<DataFetcher
			onDataFetched={fetchData}
			isEmpty={allPost === undefined || allPost?.length === 0}
		>
			<VStack w="full" style={{ marginBottom: "5%", marginTop: "5%" }}>
				{allPost.map((post, index) => {
					return (
						<VStack
							w="full"
							boxShadow="md"
							alignSelf="flex-end"
							p={2}
							key={index}
							m="5%,5%, 5%, 5%"
							rounded="5px"
							border="1px solid"
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
								<VStack>
									<Text
										fontSize="12px"
										fontWeight="bold"
										textAlign="start"
									>
										{post.creatorName}
									</Text>
									<Text
										fontSize="10px"
										fontWeight="bold"
										textAlign="center"
									>
										{new Date(
											post.createdAt
										).toLocaleString()}
									</Text>
								</VStack>
							</HStack>
							<HStack w="full" align="center" p={2}>
								<Text flex="1" textAlign="start">
									{post.postDescription}
								</Text>
							</HStack>
							{post.attachments?.length > 0 &&
								post.attachments.map((attach, i) => {
									return (
										<Box
											fontSize="12px"
											fontWeight="bold"
											key={i}
											alignSelf="flex-start"
											px={2}
										>
                                            {attach.type === 1 && (
												<ImageViewer
													url={attach.metadata.url}
												/>
											)}
											{attach.type === 2 && (
												<VideoPlayer
													fileFormat={
														attach.fileFormat
													}
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
						</VStack>
					);
				})}
			</VStack>
		</DataFetcher>
	);
};
export default PostViewer;
