import { Flex, Text, VStack, HStack, Button, useDisclosure } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import sectionService from "../../services/section.service";
import DataRow from "../HelperComponents/DataRow";
import moment from "moment";
import GenericModal from "../HelperComponents/GenericModal";
import StudentProfile from "../Profile/StudentProfile";
import { getCurrentUserId } from "../../Helpers/userHelper";
import activityService from "../../services/activity.service";
import UserViewListItem from "./UserViewListItem";
import useStateRef from 'react-usestateref';


const FacultyExamView = () => {
    const [students, setStudents] = useState([]);
	const [onlineUserList, setOnlineUserList, onlineUserListRef] = useStateRef([]);
    const [currentExam, setCurrentExam] = useState({});
    const [selectedStudentId, setSelectedStudentId] = useState();
    const [selectedStudent, setSelectedStudent] = useState();
    const location = useLocation();
    const {isOpen, onOpen, onClose} = useDisclosure();
	const socketConnectedRef  = useRef(false);
    const fetchStudents = async (sectionId) => {
        let data = await sectionService.getAllStudents(sectionId);
        setStudents(data);
    }

	const fetchActivityStatus = async (userId) => {
        let res = await activityService.getActivityStatusById(userId, currentExam.id);
        if(res === 0) {
            let list = [...onlineUserListRef.current, userId];
				setOnlineUserList(list);
        }
       
    }

    const fetchStudentDetails = async () => {
        let data = await sectionService.getStudentDetails(selectedStudentId);
        setSelectedStudent(data);
    }

    useEffect(()=>{
		if (socketConnectedRef.current === false) {
			const webSocket = new WebSocket(`ws://localhost:443/exam`);
			webSocket.onmessage = handleConnection;
			webSocket.onopen = () => {
				webSocket.send(
					JSON.stringify({
						userId: getCurrentUserId(),
						activityFor: 3,
						activityForId: exam.id,
					})
				);
			}
		}
		socketConnectedRef.current = true;
        let { exam } = location.state;
		if (exam !== undefined) {
            setCurrentExam(exam);
			fetchStudents(exam.sectionId);
		}
    },[])

	const handleConnection = async (event) => {
		console.log("live working");
		let data = JSON.parse(event.data);
		console.log(data);
		if(data.createdById == getCurrentUserId()){
			return;
		}
		else {
			if(data.type === '0'){
				let list = [...onlineUserListRef.current, data.createdById];
				setOnlineUserList(list);
			}
			else {
				let list = onlineUserListRef.current.filter(x=>x !== data.createdById);
				setOnlineUserList(list);
			}
			
		}
	}

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
						<UserViewListItem setSelectedStudentId={setSelectedStudentId} 
						student = {student} 
						fetchActivityStatus = {fetchActivityStatus}
						isOnline={onlineUserList.some(x => x === student.userId)}
						key = {i}/>
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