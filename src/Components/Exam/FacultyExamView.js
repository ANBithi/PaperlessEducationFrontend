import { Flex, Text, Box,VStack, HStack, Center, Avatar, AvatarBadge, Button, useDisclosure } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import sectionService from "../../services/section.service";
import DataRow from "../HelperComponents/DataRow";
import moment from "moment";
import { QUIZ_COUNT_PERCENTILE_OPTIONS } from "./examData";
import GenericModal from "../HelperComponents/GenericModal";
import StudentProfile from "../Profile/StudentProfile";


const FacultyExamView = () => {
    const [students, setStudents] = useState([]);
    const [currentExam, setCurrentExam] = useState({});
    const [selectedStudentId, setSelectedStudentId] = useState();
    const [selectedStudent, setSelectedStudent] = useState();
    const location = useLocation();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const fetchStudents = async (sectionId) => {
        let data = await sectionService.getAllStudents(sectionId);
        setStudents(data);
    }

    const fetchStudentDetails = async () => {
        let data = await sectionService.getStudentDetails(selectedStudentId);
        setSelectedStudent(data);
    }

    useEffect(()=>{
        let { exam } = location.state;
		if (exam !== undefined) {
            setCurrentExam(exam);
			fetchStudents(exam.sectionId);
		}
    },[])

    useEffect(()=>{
        if (selectedStudentId !== undefined) {
        fetchStudentDetails();
        }
    },[selectedStudentId])


    return (
		<Flex layerStyle="pageStyle" p="0">
			<VStack
				w="250px"
				align="start"
				p="16px"
				layerStyle="onSecondarySurfaceStyle"
			>
				<Text layerStyle="sectionHeaderStyle">All Students</Text>
				{students.map((student, i) => {
					return (
						<HStack
							layerStyle={"onSurfaceStyle"}
							w="full"
							p="8px 16px"
							rounded="8px"
							boxShadow="md"
							key={i}
							spacing="16px"
							_hover={{ cursor: "pointer" }}
							onClick={() => {
								setSelectedStudentId(student.id);
							}}
						>
							<Avatar
								alignSelf="start"
								size="sm"
								name={student.name}
							>
								<AvatarBadge boxSize="1em" bg="green.500" />
							</Avatar>
							<VStack align="start">
								<Text>{student.name}</Text>
								<Text>{student.studentId}</Text>
								<Text textStyle={"smallAndBoldStyle"}>
									online
								</Text>
							</VStack>
						</HStack>
					);
				})}
			</VStack>
			<VStack flex="1">
				{currentExam && (
					<HStack
						layerStyle={"onSecondarySurfaceStyle"}
						align="start"
						fontSize={"12px"}
						spacing={8}
						padding="16px"
						roundedBottom={"8px"}
					>
						<VStack align="start">
							<DataRow
								title="Course Name:"
								value={currentExam.courseName}
							/>
							<DataRow
								title="Course Code:"
								value={currentExam.courseCode}
							/>
							<DataRow
								title="Section:"
								value={currentExam.sectionNumber}
							/>
						</VStack>
						<VStack>
							<DataRow
								title="Starts On:"
								value={`${moment(currentExam.startTime).format(
									"DD-MM-YYYY"
								)} At ${moment(currentExam.startTime).format(
									"HH:mm"
								)}`}
							/>
							<DataRow
								title="Duration:"
								value={currentExam.duration}
							/>

							<DataRow
								title="Total Marks:"
								value={currentExam.totalMarks}
							/>
						</VStack>
					</HStack>
				)}

                {
                    selectedStudent && 
                    <HStack w = "97%" layerStyle={"onSurfaceStyle"}
                    p = "16px" rounded = "8px" justify = "space-between">
                        <Text>{selectedStudent.name}</Text>
                        <Button onClick={onOpen}>ViewDetails</Button>
                    </HStack>
                }
				{/* {currentExam.id !== null && (
                   <Fragment>
                       {questions.length > 0 && (
                           <Stack
                               alignSelf="start"
                               w="full"
                               layerStyle="onSurfaceStyle"
                               padding="16px"
                               rounded="8px"
                           >
                               {questions.map((question, index) => {
                                   return (
                                       <QuestionItem
                                           ques
                                           tion={question}
                                           index={index}
                                           key={index}
                                           direction = {"row"}
                                           additionalComponent={<QuestionEditTools {...{setEditQuestion, question, onAddQuestionModalOpen, index, onDeleteQuestion}}/>}
                                       />
                                   );
                               })}
                           </Stack>
                       )}
                   </Fragment>
               )} */}
			</VStack>
            <GenericModal
            title={"Student Details"}
            bodyComponent={<StudentProfile userData={selectedStudent}/>}
            footerComponent={<></>}
            isOpen={isOpen}
            onClose={onClose}
            />
		</Flex>
	);
}


export default FacultyExamView;