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
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { LinkIcon, AttachmentIcon, ArrowUpIcon } from "@chakra-ui/icons";
import DataFetcher from "../DataFetcher";
import { useParams } from "react-router";
import sectionService from "../../services/section.service";
import { CircleIcon } from "../../Icons/CircleIcon";
import dropboxService from "../../services/dropbox.service";
import { postService } from "../../services/post.service";
import { getFileType } from "../../Helpers/userHelper";
import { chatService } from "../../services/chat.service";
import { ChatDrawer } from "../Courses/Chat/ChatDrawer";
import ResultModal from "./ResultModal";

const CourseResults = () => {
	const { id } = useParams();
	const [sectionDetail, setSectionDetail] = useState();
	const {
		isOpen: isResultModalOpen,
		onOpen: onResultModalOpen,
		onClose: onResultModalClose,
	} = useDisclosure();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [messages, setMessages] = useState([]);
	const [currentStudent, setCurrentStudent] = useState();
	const fetchData = async () => {
		let res = await sectionService.getSectionDetail(id);
		setSectionDetail(res.data);
	};
	const fetchMessageData = async () => {
		let res = await chatService.retrieveMessage(id);
		setMessages(res.data);
	};

	return (
		<DataFetcher
			onDataFetched={fetchData}
			isEmpty={sectionDetail === undefined || sectionDetail?.length === 0}
		>
			<Flex layerStyle="pageStyle" justify="center">
				<VStack w="90%">
					<Center w="full" bg="blue.500" rounded="5px">
						<Image
							w="100%"
							h="250px"
							objectFit="cover"
							src="https://media.istockphoto.com/id/1208738316/photo/abstract-geometric-network-polygon-globe-graphic-background.jpg?b=1&s=170667a&w=0&k=20&c=Ewa2JDeA8E9k9ch3IYWkSYdEkTEhyaMNfNLkClag-j4="
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
					<HStack w="full">
						<VStack w="full" align="start">
							<Text layerStyle="sectionHeaderStyle">
								All Students
							</Text>
							{sectionDetail?.students.map((student, index) => {
								return (
									<HStack
										key={student.id}
										w="full"
										border="1px solid"
										borderColor="primary.200"
										rounded="5px"
										p="1%"
										
									>
										<Text fontWeight="bold" w="30%">
											{student.studentId}
										</Text>
										<Text fontWeight="bold" w = "30%">
											{student.name}
										</Text>
										{student.result ? (
											<Text w = "30%">
												{student.result.grade} - {student.result.gpa}
											</Text>
										) : (
											<Button
												onClick={() => {
													onResultModalOpen();
													setCurrentStudent(
														student.id
													);
												}}
											>
												Submit Mark
											</Button>
										)}
									</HStack>
								);
							})}
						</VStack>
						
					</HStack>
				</VStack>
				
				<ResultModal
					isOpen={isResultModalOpen}
					onClose={onResultModalClose}
					courseCode={sectionDetail?.courseCode}
					courseName={sectionDetail?.courseName}
					belongsTo={currentStudent}
                    onSubmitSuccess = {fetchData}
				></ResultModal>
			</Flex>
		</DataFetcher>
	);
};
export default CourseResults;
