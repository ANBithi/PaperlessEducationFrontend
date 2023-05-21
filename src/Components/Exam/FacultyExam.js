import { Flex, Text, VStack, Box } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import courseService from "../../services/course.service";
import sectionService from "../../services/section.service"


const FacultyExam = () => {
    const [allCourses, setAllCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState();
    const [students, setStudents] = useState([]);
    const fetchCourses = async () => {
		let data = await courseService.getAllCourse();
		setAllCourses(data.data);
	};

    const fetchStudents = async () => {
        let data = await sectionService.getAllStudents(selectedCourse.sectionId);
        setStudents(data);
    }

    useEffect(()=>{
        fetchCourses();
    }, [])
    useEffect(()=>{
        if(selectedCourse === undefined)
        {
            return;
        }
        fetchStudents();
    }, [selectedCourse])

    return (
        <Flex layerStyle = "pageStyle" p = "0">
            <VStack style = {{borderRight : "1px solid"}} w = "250px" align = "start" p = "16px" layerStyle = "onSecondarySurfaceStyle">
                <Text layerStyle = "sectionHeaderStyle">All courses</Text>
                {
                    allCourses.map((course, i)=>{
                        return(
                            <Box layerStyle={"onSurfaceStyle"}
                            w = "full" p = "8px 16px"
                             rounded = "8px" boxShadow = "md"
                             key = {i}
                             onClick={()=>{setSelectedCourse(course)}}>
                                <Text>
                                    {course.courseName}
                                </Text>
                            </Box>
                        )
                    })
                }

            </VStack>
            <VStack w = "250px" align = "start" p = "16px" layerStyle = "onSecondarySurfaceStyle">
            <Text layerStyle = "sectionHeaderStyle">All Students</Text>
            {
                    students.map((student, i)=>{
                        return(
                            <Box layerStyle={"onSurfaceStyle"}
                            w = "full" p = "8px 16px"
                             rounded = "8px" boxShadow = "md"
                             key = {i}
                             >
                                <Text>
                                    {student.name}
                                </Text>
                            </Box>
                        )
                    })
                }
            </VStack>
            <VStack flex = "1">

            </VStack>
        </Flex>
    )
}

export default FacultyExam;