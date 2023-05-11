import {
	Text,
	Flex,
	VStack,
	HStack,
	Button,
	useDisclosure,
	useToast,
	Stack,
	Center,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { QUIZ_COUNT_PERCENTILE_OPTIONS, TYPE_OF_EXAMS } from "./examData";
import sectionService from "../../services/section.service";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import examService from "../../services/exam.service";
import AddQuestionModal from "./AddQuestionModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingState from "../HelperComponents/LoadingState";
import AddExamMetadataModal from "./AddExamMetadataModal";

const SetUpExam = () => {
	const { id } = useParams();
	const toast = useToast();
	const [examMetaId, setExamMetaId] = useState(null);
	const [examMetadata, setExamMetadata] = useState();
	const [sectionDetail, setSectionDetail] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [editQuestion, setEditQuestion] = useState(undefined);
	const [questions, setQuestions] = useState([]);
	const {
		isOpen: isAddQuestionModalOpen,
		onOpen: onAddQuestionModalOpen,
		onClose: onAddQuestionModalClose,
	} = useDisclosure();
	const {
		isOpen: isAddExamMetadataModalOpen,
		onOpen: onAddExamMetadataModalOpen,
		onClose: onAddExamMetadataModalClose,
	} = useDisclosure();

	const fetchData = async () => {
		let res = await sectionService.getSectionDetail(id);
		setSectionDetail(res.data);
		examService.getExamMetaData(id).then((res) => {
			if (res.response) {
				setExamMetadata(res.examMetadata);
				setExamMetaId(res.metadataId);
				setQuestions(res.examMetadata.questions ?? []);
			}
			setIsLoading(false);
		});
	};
	useEffect(() => {
		fetchData();
	}, []);
	const onExamTypeChange = (e) => {
		let value = e.target.value;

		setExamMetadata(TYPE_OF_EXAMS[value]);
	};
	const calcMark = (arr) => {
		let sum = 0;
		arr.forEach((arr) => {
			sum += parseInt(arr.marks);
		});
		return {
			isEqual: sum > examMetadata.totalMarks ? true : false,
			remainingNumber: examMetadata.totalMarks - sum,
		};
	};
	const postQuestion = (tempQues, suffix) => {
		examService.updateQuestions(examMetaId, tempQues).then((d) => {
			if (d) {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: `Question has been ${suffix}.`,
					position: "bottom-right",
					variant: "subtle",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			}
		});
	};
	const onCreateClick = () => {
		let request = {
			...examMetadata,
			courseName: sectionDetail.courseName,
			sectionNumber: sectionDetail.sectionNumber,
			sectionId: id,
			questions: [],
		};
		examService.addExamMetadata(request).then((d) => {
			if (d.response) {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: "Exam set up done.",
					position: "bottom-right",
					variant: "subtle",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				setExamMetaId(d.metadataId);
				onAddExamMetadataModalClose();
			} else {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: "Exam set up failed.",
					position: "bottom-right",
					variant: "subtle",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		});
	};
	const onDeleteQuestion = (index) => {
		let temp = questions.filter((x, i) => i !== index);
		postQuestion(temp, "deleted");
		setQuestions(temp);
	};
	const onStartTimeChange = (e) => {
		let { name, value } = e.target;
		let obj = { ...examMetadata, [name]: value };
		setExamMetadata(obj);
	};
	const onSelectChange = (e) => {
		let { name, value } = e.target;
		let obj = { ...examMetadata, [name]: value };
		setExamMetadata(obj);
	};

	return isLoading === false ? (
		<Flex flexDirection="column" layerStyle="pageStyle" align="start">
			<Text layerStyle="sectionHeaderStyle">Setup Question</Text>
			{sectionDetail !== undefined && (
				<VStack
					spacing={"16px"}
					w="full"
					style={{ marginTop: "16px" }}
					fontSize={"14px"}
				>
					<HStack
						w="full"
						spacing={8}
						align="start"
						bg="background.200"
						padding="16px"
						rounded="8px"
					>
						<VStack align="start" layerStyle={"examMetadataStyle"}>
							<DataRow
								title="Course Name:"
								value={sectionDetail.courseName}
							/>
							<DataRow
								title="Course Code:"
								value={sectionDetail.courseCode}
							/>
							<DataRow
								title="Section:"
								value={sectionDetail.sectionNumber}
							/>
						</VStack>
						{examMetadata !== undefined && (
							<>
								<VStack layerStyle={"examMetadataStyle"}>
									<DataRow
										title="Starts On:"
										value={`${moment(
											examMetadata.startTime
										).format("DD-MM-YYYY")} At ${moment(
											examMetadata.startTime
										).format("HH:mm")}`}
									/>
									<DataRow
										title="Duration:"
										value={examMetadata.duration}
									/>

									<DataRow
										title="Question Type:"
										value={examMetadata.answerType}
									/>
								</VStack>
								<VStack layerStyle={"examMetadataStyle"}>
									<DataRow
										title="Exam:"
										value={examMetadata.examTitle}
									/>

									<DataRow
										title="Total Marks:"
										value={examMetadata.totalMarks}
									/>
									<DataRow
										title="Count Percentile:"
										value={
											QUIZ_COUNT_PERCENTILE_OPTIONS[
												parseInt(
													examMetadata.countPercentile
												)
											]?.title
										}
									/>
								</VStack>
							</>
						)}
						{examMetadata === undefined ? (
							<Button
								onClick={() => {
									onAddExamMetadataModalOpen();
								}}
							>
								Configure
							</Button>
						) : (
							<IconButton
								icon={faPenToSquare}
								onClick={() => {
									onAddExamMetadataModalOpen();
								}}
							/>
						)}
					</HStack>
					{examMetaId !== null && (
						<Fragment>
							{questions.length > 0 && (
								<Stack
									alignSelf="start"
									w="full"
									bg="background.200"
									padding="16px"
									rounded="8px"
								>
									{questions.map((question, i) => {
										return (
											<HStack
												key={i}
												fontSize={"12px"}
												fontWeight="bold"
												padding={"12px 16px"}
												rounded="8px"
												bg={"background.50"}
											>
												<HStack w="85%">
													<Text flex="1">
														{i + 1}.{" "}
														{question.question}
													</Text>
													<Text>
														{question.marks}
													</Text>
												</HStack>
												<HStack
													align={"end"}
													padding="4px"
													justify={"end"}
													w="15%"
												>
													<IconButton
														onClick={() => {
															onAddQuestionModalOpen();

															setEditQuestion({
																...question,
																index: i,
															});
														}}
														icon={faPenToSquare}
													/>
													<IconButton
														onClick={() => {
															onDeleteQuestion(i);
														}}
														icon={faTrashCan}
													/>
												</HStack>
											</HStack>
										);
									})}
								</Stack>
							)}
							<Button
								alignSelf={"start"}
								style={{ marginTop: "16px" }}
								onClick={() => onAddQuestionModalOpen()}
							>
								Add Question
							</Button>
						</Fragment>
					)}
				</VStack>
			)}
			<AddExamMetadataModal
				isOpen={isAddExamMetadataModalOpen}
				onClose={onAddExamMetadataModalClose}
				{...{
					onExamTypeChange,
					examMetadata,
					onStartTimeChange,
					onSelectChange,
					onCreateClick,
				}}
			/>
			{examMetaId !== null && (
				<AddQuestionModal
					isOpen={isAddQuestionModalOpen}
					onClose={onAddQuestionModalClose}
					setQuestions={setQuestions}
					questions={questions}
					calcMark={calcMark}
					questionCallback={postQuestion}
					question={editQuestion}
					setQuestion={setEditQuestion}
				></AddQuestionModal>
			)}
		</Flex>
	) : (
		<LoadingState />
	);
};

export default SetUpExam;

const DataRow = ({ title, value }) => {
	return (
		<HStack fontWeight={"bold"} w="full" spacing="8px">
			<Text>{title}</Text>
			<Text>{value}</Text>
		</HStack>
	);
};

const IconButton = ({ icon, ...rest }) => {
	return (
		<Center
			borderRadius={"4px"}
			//bg = {isSelected=== true? "primary.100" : 'transparent' }
			_hover={{
				backgroundColor: "primary.100",
			}}
			h="24px"
			w="24px"
			{...rest}
		>
			<FontAwesomeIcon icon={icon} />
		</Center>
	);
};
