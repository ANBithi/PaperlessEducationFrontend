import {
	Text,
	Flex,
	VStack,
	HStack,
	Stack,
	Checkbox,
	Textarea,
} from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import moment from "moment";
import { useLocation, useParams } from "react-router-dom";
import { QUIZ_COUNT_PERCENTILE_OPTIONS } from "./examData";
import sectionService from "../../services/section.service";
import examService from "../../services/exam.service";
import LoadingState from "../HelperComponents/LoadingState";
import answerService from "../../services/answer.service";
import IconButton from "../HelperComponents/IconButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import QuestionItem from "./QuestionItem";
import { getCurrentUserId } from "../../Helpers/userHelper";
const StudentExam = () => {
	const { id } = useParams();
	const socketConnectedRef = useRef(false);
	const location = useLocation();
	const [examMetaId, setExamMetaId] = useState(null);
	const [examMetadata, setExamMetadata] = useState();
	const [sectionDetail, setSectionDetail] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [questions, setQuestions] = useState([]);

	const fetchCourseData = async () => {
		let res = await sectionService.getSectionDetail(id);
		setSectionDetail(res.data);
		setIsLoading(false);
	};
	const fetchQuestions = async (examId) => {
		let quesRes = await examService.getQuestions(examId, true);
		setQuestions(quesRes ?? []);
	};
	useEffect(() => {
		let { exam } = location.state;
		if (exam !== undefined) {
			setExamMetadata(exam);
			setExamMetaId(exam.id);
			fetchQuestions(exam.id);
			fetchCourseData();
			if (socketConnectedRef.current === false) {
				const webSocket = new WebSocket(`ws://localhost:443/exam`);
				webSocket.onmessage = handleConnection;
				webSocket.onopen = () => {
					webSocket.send(JSON.stringify({
						userId: getCurrentUserId(),
						activityFor : 3,
						activityForId: exam.id,
					}));
				}
			}
			socketConnectedRef.current = true;
		} else {
			fetchCourseData();
			// fetchExam();
		}
	}, []);


	const handleConnection = (event) => {
		console.log("live working");
		let data = JSON.parse(event.data);
		console.log(data);
	}

	return isLoading === false ? (
		<Flex flexDirection="column" layerStyle="pageStyle" align="start">
			<Text layerStyle="sectionHeaderStyle">Exam</Text>
			{sectionDetail !== undefined && (
				<VStack
					spacing={"16px"}
					w="full"
					style={{ marginTop: "16px" }}
					fontSize={"14px"}
				>
					<HStack
						layerStyle={"onSurfaceStyle"}
						align="start"
						w="full"
						spacing={8}
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
					</HStack>
					{examMetaId !== null && (
						<Fragment>
							{questions.length > 0 && (
								<Stack
									alignSelf="start"
									w="full"
									layerStyle="onSurfaceStyle"
									padding="16px"
									rounded="8px"
								>
									{questions.map((question, i) => {
										return (
											<QuestionItem
												question={question}
												index={i}
												key={i}
												additionalComponent= {<AnswerInput examId = {examMetadata.id} question={question}/>}
											/>
										);
									})}
								</Stack>
							)}
						</Fragment>
					)}
				</VStack>
			)}
		</Flex>
	) : (
		<LoadingState />
	);
};

export default StudentExam;

const DataRow = ({ title, value }) => {
	return (
		<HStack fontWeight={"bold"} w="full" spacing="8px">
			<Text>{title}</Text>
			<Text>{value}</Text>
		</HStack>
	);
};



const AnswerInput = ({question, examId}) => {

	const [answerObj, setAnswerObj] = useState({content : question.answer ? question.answer.content : ''});
	const onAnswerInputChange =  (event) => {
		
		let answerObj = {
			content : event.target.value,
		}

		setAnswerObj(answerObj);		
	}

	const onSaveClick = async () => {

		let obj = {...answerObj, answerType: question.questionType,
			questionId : question.id, examId,
			 //TODO: Pass question id -> questionId : 
		};

		await answerService.addAnswer(obj);
	}

	return (
		<>
			{question.questionType === 0 ? (
				<VStack align = "start">
					<Text layerStyle = "sectionHeaderStyle">Select an option</Text>
					<HStack w="full" spacing = "32px">
						{question?.options?.map((value) => {
							return <Checkbox isChecked = {answerObj.content === value.value} 
							onChange  = {(e)=> {console.log(e.target.value); setAnswerObj({content : e.target.value});}} key={value.prefix} value = {value.value}>{value.value}</Checkbox>;
						})}
					</HStack>
				</VStack>
			) : (
				<>
					<Textarea
						onChange={onAnswerInputChange}
						placeholder="Start typing your answer here..."
						defaultValue={question.answer?.content ?? ""}
					></Textarea>
				</>
			)}
			<IconButton
						alignSelf="start"
						icon={faCheck}
						onClick={onSaveClick}
					>
						Save
					</IconButton>
		</>
	);
}
