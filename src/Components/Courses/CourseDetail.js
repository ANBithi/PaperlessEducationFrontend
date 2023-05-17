import {
	Flex,
	HStack,
	Icon,
	Text,
	VStack,
	Button,
	Box,
	Center,
	Circle,
	Textarea,
	Image,
	useDisclosure,
	Link,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import {
	LinkIcon,
	AttachmentIcon,
	ArrowUpIcon,
	ChatIcon,
} from "@chakra-ui/icons";
import DataFetcher from "../DataFetcher";
import { useNavigate, useParams } from "react-router";
import sectionService from "../../services/section.service";
import PopoverInput from "./PopoverInput";
import { ChatDrawer } from "./Chat/ChatDrawer";
import dropboxService from "../../services/dropbox.service";
import { postService } from "../../services/post.service";
import { getCurrentUserId, getFileType } from "../../Helpers/userHelper";
import { chatService } from "../../services/chat.service";
import ShowCounter from "../ShowCounter";
import PostViewerList from "../Post/PostViewerList";
import CourseActivities from "./Activities/CourseActivities";

const CourseDetails = () => {
	const { id } = useParams();
	const toast = useToast();
	const [textAreaVal, setTextAreaVal] = useState("");
	const [sectionDetail, setSectionDetail] = useState();
	const [newMessageCounter, setNewMessageCounter] = useState(
		JSON.parse(localStorage.getItem("msgCounter"))
	);
	const inputFile = useRef(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [postObj, setPostObj] = useState({});
	const [uploadFile, setUploadFile] = useState();
	const [attachments, setAttachments] = useState([]);
	const [postDisable, setPostDisable] = useState(false);
	const [allPost, setAllPost] = useState([]);
	const [messages, setMessages] = useState([]);
	const socketConnectedRef = useRef(false);
	const fetchData = async () => {
		let res = await sectionService.getSectionDetail(id);
		setSectionDetail(res.data);
	};
	useEffect(() => {
		if (socketConnectedRef.current === false) {
			const webSocket = new WebSocket(`ws://localhost:443/post-${id}`);
			webSocket.onmessage = handleNewPost;
		}
		socketConnectedRef.current = true;
	}, []);

	const handleNewPost = (event) => {
		let data = JSON.parse(event.data);
		postService.getSingle(data.dataId).then((p) => {
			console.log(p);
			if (p.createdBy !== getCurrentUserId()) {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: `${p.userName} posted!`,
					position: "bottom-right",
					variant: "subtle",
					status: "info",
					duration: 5000,
					isClosable: true,
				});
				fetchPostData();
			}
		});
	};

	const fetchMessageData = async () => {
		let res = await chatService.retrieveMessage(id);
		setMessages(res.data);
	};
	const fetchPostData = async () => {
		let d = await postService.getAllPost(id);
		setAllPost(d.data);
	};
	const onAttachmentClick = () => {
		inputFile.current.click();
	};
	const onPostClick = async () => {
		let obj = { ...postObj };
		obj = { ...obj, belongsTo: id };
		await postService.addPost(obj);
		setPostObj({});
		setAttachments([]);
		setUploadFile(undefined);
		setTextAreaVal("");
		fetchPostData();
	};
	const onChatClick = () => {
		localStorage.setItem("msgCounter", 0);
	};
	const onAttachmentChange = async (e) => {
		var file = e.target.files[0];
		setPostDisable(file ? true : false);
		setUploadFile(file);
		e.target.value = null;
	};
	const onTextAreaChange = (e) => {
		let { name, value } = e.target;
		let obj = { ...postObj, [name]: value };
		setTextAreaVal(value);
		setPostObj(obj);
	};
	const onUploadClick = async () => {
		let obj = { ...postObj };
		if (
			(uploadFile !== undefined && uploadFile !== null) ||
			uploadFile.length > 0
		) {
			let fileMetaData = {
				fileFormat: uploadFile.type,
				fileSize: uploadFile.size,
				name: uploadFile.name,
			};
			let path = `/${uploadFile.name}`;
			let buffer = await uploadFile.arrayBuffer();
			let bytes = new Uint8Array(buffer);
			await dropboxService.uploadFile(path, bytes);
			let { url, preview_type } = await dropboxService.CreateSharedLink(
				path
			);
			url = url.replace("dl=0", "raw=1");
			let type = getFileType(preview_type);
			console.log(preview_type);
			let attachment = { ...fileMetaData, url, path, type };
			let updatedAttachments = [...attachments, attachment];
			obj = { ...obj, attachments: updatedAttachments };
			setPostObj(obj);
			setAttachments(updatedAttachments);
			setPostDisable(false);
		} else {
			console.log("uploadFile is null");
		}
	};

	return (
		<DataFetcher
			onDataFetched={fetchData}
			isEmpty={sectionDetail === undefined || sectionDetail?.length === 0}
		>
			<Flex layerStyle="pageStyleSidePanel">
				
				<CourseActivities/>
				
				
				<VStack padding="20px" align="start"  w="full"  overflow={"auto"}>
					<VStack width="70%">
					<Center w="full" bg="blue.500" color = "background.50" rounded="16px">
						<Image
							roundedLeft="16px"
							w="100%"
							h="250px"
							objectFit="cover"
							src={sectionDetail?.courseCover}
						/>
						<VStack>
							<Text
								fontSize="24px"
								textAlign="center"
								fontWeight="bold"
							>
								{sectionDetail?.courseName}
							</Text>
							<Text
								fontSize="16px"
								textAlign="center"
								fontWeight="bold"
							>
								{sectionDetail?.courseCode} (
								{sectionDetail?.sectionNumber})
							</Text>
						</VStack>
					</Center>
					<HStack w="full" >
						<VStack w="full">
							<Box
								layerStyle="createPostStyle"
							>
								<Textarea
									rounded= "16px"
									resize= "none"
									pt={3}
									layerStyle={"onSecondarySurfaceStyle"}
									placeholder="type something.."
									size="sm"
									value={textAreaVal}
									name="postDescription"
									onChange={onTextAreaChange}
								/>
								{((uploadFile !== null &&
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
									})}

								<HStack marginTop="16px" w="full" justify="space-between">
									<HStack>
										<Circle
											onClick={onAttachmentClick}
											layerStyle="InputAddOns"
										>
											<input
												type="file"
												name="input"
												ref={inputFile}
												onChange={onAttachmentChange}
												style={{ display: "none" }}
											/>
											<Icon as={AttachmentIcon}></Icon>
										</Circle>
										<PopoverInput
											icon={LinkIcon}
											setPostObj={setPostObj}
											postObj={postObj}
											attachments={attachments}
											setAttachments={setAttachments}
										/>
									</HStack>
									<Button
										onClick={onPostClick}
										isDisabled={postDisable}
									>
										Post
									</Button>
								</HStack>
							</Box>
							<PostViewerList
								courseId={id}
								allPost={allPost}
								setAllPost={setAllPost}
								fetchData={fetchPostData}
							></PostViewerList>
						</VStack>
						<VStack
							w="90px"
							alignSelf="flex-start"
							mt="3.2%"
							p={3}
							rounded="5px"
							border="1px solid"
							borderColor="primary.200"
							layerStyle={"onSurfaceStyle"}
							onClick={() => {
								fetchMessageData();
								onOpen();
							}}
							pos="absolute"
							bottom="30px"
							right="30px"
							_hover={{ cursor: "pointer" }}
						>
							<Flex
								w="full"
								flexDirection="horizontal"
								align="flex-start"
								justify="space-between"
								onClick={onChatClick}
							>
								<ChatIcon alignSelf="center" />
								<Text
									fontSize="14px"
									fontWeight="bold"
									textAlign="center"
								>
									Chat
								</Text>
							</Flex>
						</VStack>
						{newMessageCounter > 0 && (
							<ShowCounter counter={newMessageCounter} />
						)}
					</HStack>
					</VStack>
				</VStack>
				<ChatDrawer
					onClose={onClose}
					isOpen={isOpen}
					students={sectionDetail?.students}
					courseId={id}
					messages={messages}
					setMessages={setMessages}
					fetchData={fetchMessageData}
					setNewMessageCounter={setNewMessageCounter}
					newMessageCounter={newMessageCounter}
				/>
				
			</Flex>
		</DataFetcher>
	);
};
export default CourseDetails;
