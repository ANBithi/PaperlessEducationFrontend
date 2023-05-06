import { Text, Flex, VStack, Select, HStack, Input, Button, useToast, Stack, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { QUIZ_ANSWER_TYPE_OPTIONS, QUIZ_COUNT_PERCENTILE_OPTIONS, QUIZ_DURATION_OPTIONS, TYPE_OF_EXAMS } from "./examData";
import courseService from "../../services/course.service";
import sectionService from "../../services/section.service";
import CourseDetails from "../Courses/CourseDetail";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import examService from "../../services/exam.service";
import QuestionPanel from "./QuestionPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SetUpExam = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const [examMetaId, setExamMetaId] = useState(null);
    const [examMetadata, setExamMetadata] = useState([]);
    const [sectionDetail, setSectionDetail] = useState({});
    const [questions, setQuestions] = useState([]);
    const fetchData = async () => {
		let res = await sectionService.getSectionDetail(id);
		setSectionDetail(res.data);
        let examMeta = await examService.getExamMetaData(id);
        setExamMetadata(examMeta);
        setExamMetaId(examMeta.id);
        console.log(examMeta)
	};
    useEffect (()=>{
       fetchData();
       console.log(examMetadata)
    }, [])
    const onExamTypeChange = (e) => {
		let value = e.target.value;

		setExamMetadata(TYPE_OF_EXAMS[value]);
	};
    const calcMark = () => {
        var sum = 0;
        debugger;
        questions.forEach(question => {
            sum +=parseInt(question.marks);
        });
        return sum == examMetadata.totalMarks ? true : false;
    }
    const onSubmitClick = () => {
            examService.addQuestions(examMetadata.id, questions).then((d)=>{
                if (d) {
                    toast({
                        containerStyle: {
                            fontSize: "14px",
                            fontWeight: "normal",
                        },
                        title: "Questions Added.",
                        position: "bottom-right",
                        variant: "subtle",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    })
                }
            })
               
            
    }
    const onCreateClick = () => {
        let request = {...examMetadata, courseName : sectionDetail.courseName,
        sectionNumber : sectionDetail.sectionNumber, sectionId : id};
        examService.addExamMetadata(request).then((d)=>{
          if (d.response){
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
            })
           setExamMetaId(d.metadataId);
          }
          else {
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
            })
          }
        })
    }
    const onStartTimeChange = (e) => {
        let {name, value} = e.target;
        let obj = {...examMetadata, [name]: value};
        setExamMetadata(obj);
    }
    const onSelectChange = (e) => {
        let {name , value} = e.target;
            let obj = {...examMetadata, [name] : value};
           setExamMetadata(obj);
    }
    const onCancelClick = () => {
        console.log(id);
        navigate(-1);
    }
	return (
		<Flex layerStyle="pageStyle" align="start">
			{sectionDetail !== undefined && (
				<VStack
					bg="background.100"
					rounded="16px"
					boxShadow="md"
					padding="16px"
					w="50%"
					fontSize={"14px"}
				>
                    <Stack w = "full" align="center">
					<Text fontWeight={"bold"}>Question Setup</Text>
					<HStack
						fontWeight={"bold"}
						w="full"
						justify="center"
						spacing="8px"
					>
						<Text>Course Name:</Text>
						<Text>{sectionDetail.courseName}</Text>
					</HStack>
					<HStack
						fontWeight={"bold"}
						fontSize="12px"
						w="full"
						justify="center"
						spacing="8px"
					>
						<Text>Course Code:</Text>
						<Text>{sectionDetail.courseCode}</Text>
					</HStack>
					<HStack
						fontWeight={"bold"}
						fontSize="12px"
						w="full"
						justify="center"
						spacing="8px"
					>
						<Text>Section:</Text>
						<Text>{sectionDetail.sectionNumber}</Text>
					</HStack>
					{examMetadata !== undefined && (
						<>
							<HStack
								fontWeight={"bold"}
								fontSize="12px"
								w="full"
								justify="center"
								spacing="8px"
							>
								<Text>Date:</Text>
								<Text>
									{moment(examMetadata.startTime).format(
										"DD-MM-YYYY"
									)}
								</Text>
							</HStack>
							<HStack
								fontWeight={"bold"}
								fontSize="12px"
								w="full"
								spacing="36px"
							>
								<HStack justify="center" flex="1">
									<Text>Exam:</Text>
									<Text>{examMetadata.examTitle}</Text>
								</HStack>
								<HStack justify="center" flex="1">
									<Text>Answer Type:</Text>
									<Text>{examMetadata.answerType}</Text>
								</HStack>
							</HStack>
							<HStack
								fontWeight={"bold"}
								fontSize="12px"
								w="full"
								spacing="36px"
							>
								<HStack justify="center" flex="1">
									<Text>Start Time:</Text>
									<Text>
										{moment(examMetadata.startTime).format(
											"HH:mm"
										)}
									</Text>
								</HStack>
								<HStack justify="center" flex="1">
									<Text>Duration:</Text>
									<Text>{examMetadata.duration}</Text>
								</HStack>
							</HStack>
							<HStack
								fontWeight={"bold"}
								fontSize="12px"
								w="full"
								spacing="36px"
							>
								<HStack justify="center" flex="1">
									<Text>Total Marks:</Text>
									<Text>{examMetadata.totalMarks}</Text>
								</HStack>
								<HStack justify="center" flex="1">
									<Text>Count Percentile:</Text>
									<Text>
										{
											QUIZ_COUNT_PERCENTILE_OPTIONS[
												parseInt(
													examMetadata.countPercentile
												)
											]?.title
										}
									</Text>
								</HStack>
							</HStack>
						</>
                        
					)}
                    </Stack>
                    <Stack alignSelf = "start"  style={{paddingTop : "32px"}} w = "full">
					{questions.length > 0 &&
						questions.map((question, i) => {
							return (
								<HStack
									key={i}
									fontSize={"12px"}
									fontWeight="bold"
									padding={"12px 8px 12px 8px"}
									rounded="8px"
									bg={"background.50"}
								>
									<HStack w="85%">
										<Text flex="1">
											{i + 1}. {question.question}
										</Text>
										<Text>{question.marks}</Text>
									</HStack>
									<HStack
										align={"end"}
										padding="4px"
										justify={"end"}
										w="15%"
									>
										<Center
											borderRadius={"4px"}
											//bg = {isSelected=== true? "primary.100" : 'transparent' }
											_hover={{
												backgroundColor: "primary.100",
											}}
											h="24px"
											w="24px"
										>
											<FontAwesomeIcon
												icon={faPenToSquare}
											/>
										</Center>
										<Center
											borderRadius={"4px"}
											//bg = {isSelected=== true? "primary.100" : 'transparent' }
											_hover={{
												backgroundColor: "primary.100",
											}}
											h="24px"
											w="24px"
										>
											<FontAwesomeIcon
												icon={faTrashCan}
											/>
										</Center>
									</HStack>
								</HStack>
							);
						})}
                    </Stack>
				</VStack>
			)}

			{examMetaId === null && (
				<VStack w="70%" paddingLeft="16px" spacing="16px">
					<HStack layerStyle={"inputStackStyle"}>
						<Text layerStyle={"inputLabelStyle"}>Type of Exam</Text>
						<Select
							onChange={onExamTypeChange}
							placeholder="Select exam type"
							variant="unstyled"
						>
							{TYPE_OF_EXAMS.map((option) => {
								return (
									<option
										key={option.examType}
										value={option.examType}
									>
										{option.examTitle}
									</option>
								);
							})}
						</Select>
					</HStack>
					<HStack w="full" layerStyle={"inputStackStyle"}>
						<Text layerStyle={"inputLabelStyle"}>Total Marks</Text>
						<Input
							readOnly={true}
							value={examMetadata?.totalMarks}
							variant="unstyled"
						></Input>
					</HStack>
					<HStack w="full" layerStyle={"inputStackStyle"}>
						<Text layerStyle={"inputLabelStyle"}>Start Time</Text>
						<Input
							onChange={onStartTimeChange}
							name="startTime"
							type="datetime-local"
							variant="unstyled"
						></Input>
					</HStack>
					<HStack w="full" layerStyle={"inputStackStyle"}>
						<Text layerStyle={"inputLabelStyle"}>
							Type of Answer
						</Text>
						{examMetadata?.examType === 2 ? (
							<Select
								placeholder="Select answer type"
								name="answerType"
								onChange={onSelectChange}
								variant="unstyled"
							>
								{QUIZ_ANSWER_TYPE_OPTIONS.map((option) => {
									return (
										<option
											key={option.value}
											value={option.value}
										>
											{option.value}
										</option>
									);
								})}
							</Select>
						) : (
							<Input
								variant="unstyled"
								readOnly={true}
								value={examMetadata?.answerType}
							></Input>
						)}
					</HStack>
					<HStack w="full" layerStyle={"inputStackStyle"}>
						<Text layerStyle={"inputLabelStyle"}>Duration</Text>
						{examMetadata?.examType === 2 ? (
							<Select
								placeholder="Select duration"
								variant="unstyled"
								onChange={onSelectChange}
								name="duration"
							>
								{QUIZ_DURATION_OPTIONS.map((option) => {
									return (
										<option
											key={option.value}
											value={option.value}
										>
											{option.title}
										</option>
									);
								})}
							</Select>
						) : (
							<Input
								readOnly={true}
								variant="unstyled"
								value={examMetadata?.duration}
							></Input>
						)}
					</HStack>
					<HStack w="full" layerStyle={"inputStackStyle"}>
						<Text layerStyle={"inputLabelStyle"}>
							Count Percentile
						</Text>
						{examMetadata?.examType === 2 ? (
							<Select
								placeholder="Select count percentile"
								onChange={onSelectChange}
								variant="unstyled"
								name="countPercentile"
							>
								{QUIZ_COUNT_PERCENTILE_OPTIONS.map((option) => {
									return (
										<option
											key={option.value}
											value={option.value}
										>
											{option.title}
										</option>
									);
								})}
							</Select>
						) : (
							<Input
								variant="unstyled"
								readOnly={true}
								value={
									QUIZ_COUNT_PERCENTILE_OPTIONS[
										examMetadata?.countPercentile
									]?.title
								}
							></Input>
						)}
					</HStack>
					<HStack alignSelf="flex-end">
						<Button onClick={onCreateClick}>Create</Button>
						<Button colorScheme={"red"} onClick={onCancelClick}>
							Cancel
						</Button>
					</HStack>
				</VStack>
			)}
			{examMetaId !== null && (
				<QuestionPanel
					setQuestions={setQuestions}
					questions={questions}
                    calcMark = {calcMark}
				></QuestionPanel>
			)}
		</Flex>
	);
};

export default SetUpExam;
