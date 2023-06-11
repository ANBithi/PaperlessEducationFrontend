import { HStack, VStack, Input, Text,Flex, Heading, Button, Box, Grid, GridItem } from "@chakra-ui/react";
import { CourseCard } from "../Courses/CourseCard";
import courseService from "../../services/course.service";
import { useState } from "react";
import { useEffect } from "react";
import sectionService from "../../services/section.service";

const Enroll = () => {
    const [courses, setCourses] = useState([]);
     const fetchCourses = async () =>{
      let courses =  await courseService.getDepartmentCoursesByStudent();

      setCourses(courses);
    }
    const fetchSectionData = async (courseId) => {
        let sections = await sectionService.getAllSectionByCourse(courseId);
    }

    useEffect(()=>{
        fetchCourses();
    },[])

    const onEnrollClick = () => {
        fetchSectionData();
    };
    return(
        <Flex layerStyle="pageStyle">
        <VStack layerStyle="sectionStyle" align = "start" w = "full">
        <Text layerStyle= "sectionHeaderStyle">Courses to enroll</Text>
        <VStack w = "full">
       {
        courses.map((course)=>{
            return (
                    <HStack layerStyle="courseCardStyle" w = "full" p = "8px">
					<Heading w = "33%" size="sm">
						{course.name}
					</Heading>
                    <Text w = "33%" fontWeight={"bold"}>{course.courseCode}</Text>
					<Text w = "33%">{course.courseDetails}</Text>

					<Button w = "33%" colorScheme="blue" onClick={()=>{
                        onEnrollClick(course.id);
                    }}>
						Enroll Course
					</Button>
				</HStack>
			);
        })
       }
       </VStack>
    </VStack>
    </Flex>
    )
}

export default Enroll;