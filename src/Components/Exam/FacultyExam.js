import { Flex, Text, VStack, Box, HStack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import sectionService from "../../services/section.service"
import examService from "../../services/exam.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";


const FacultyExam = () => {
    const [allExams, setAllExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState();
    const navigate = useNavigate();
    const fetchExams = async () => {
		let data = await examService.getAllExams();
		setAllExams(data);
	};

    useEffect(()=>{
        fetchExams();
    }, [])
    useEffect(()=>{
        if(selectedExam === undefined)
        {
            return;
        }
        navigate(`${selectedExam.id}`, { state: {exam : selectedExam}});
    }, [selectedExam])

    return (
        <Flex layerStyle = "pageStyle" flexDir={"column"}>
             <Text layerStyle = "sectionHeaderStyle">All Exams</Text>
            <HStack spacing  = "16px" w = "full" align = "start" py = "16px">
                {
                    allExams.map((exam, i)=>{
                        return(
                            <Box layerStyle={"courseCardStyle"}
                            p = "8px"
                            key = {i}
                             onClick={()=>{setSelectedExam(exam)}}  _hover={{cursor : "pointer"}}>
                                 <Text fontWeight={"bold"}>
                                    {exam.examTitle}
                                </Text>
                                <Text fontWeight={"bold"}>
                                    {exam.courseName}
                                </Text>
                                <Text mt = "8px" textStyle={"smallAndBoldStyle"}>
                                    Section : {exam.sectionNumber}
                                </Text>
                                <Text mt = "8px" textStyle={"smallAndBoldStyle"}>
                                    Date : {moment(exam.startTime).format("DD-MM-yy @ hh:mm")}
                                </Text>
                            </Box>
                        )
                    })
                }

            </HStack>
        </Flex>
    )
}

export default FacultyExam;