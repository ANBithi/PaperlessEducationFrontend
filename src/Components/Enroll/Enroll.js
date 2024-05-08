import { VStack, Text, Flex } from "@chakra-ui/react";
import courseService from "../../services/course.service";
import { useState } from "react";
import { useEffect } from "react";
import CourseView from "./CourseView";

const Enroll = () => {
    const [courses, setCourses] = useState([]);

     const fetchCourses = async () =>{
      let courses =  await courseService.getDepartmentCoursesByStudent();

      setCourses(courses);
    }

    useEffect(()=>{
        fetchCourses();
    },[])

    return(
        <Flex layerStyle="pageStyle" >
        <VStack layerStyle="sectionStyle" align = "start" w = "full">
        <Text layerStyle= "sectionHeaderStyle">Courses to enroll</Text>
        <VStack w = "full">
       {
        courses.map((course)=>{
            return (
              <CourseView course = {course}/>
			);
        })
       }
       </VStack>
    </VStack>
    </Flex>
    )
}

export default Enroll;