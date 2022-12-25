import { HStack, VStack, Input, Text,Flex } from "@chakra-ui/react";
import { CourseCard } from "../Courses/CourseCard";

const Enroll = () => {
    return(
        <Flex layerStyle="pageStyle">
        <VStack layerStyle="sectionStyle" align = "start">
        <Text layerStyle= "sectionHeaderStyle">Courses to enroll</Text>
        <HStack layerStyle="inputStackStyle">
        <CourseCard
							courseTitle="Introduction To Python"
							section= "1"
							courseDes= "A python learning course"
							courseCode="PY 101"
                            startTime = "1:10 pm"
                            endTime = "2:40 pm"
                            type = "enroll"
                          
						/>
        </HStack>
    </VStack>
    </Flex>
    )
}

export default Enroll;