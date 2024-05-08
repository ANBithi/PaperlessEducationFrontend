import React, { useState } from "react";
import { HStack, VStack, Text, Heading, Button } from "@chakra-ui/react";
import sectionService from "../../services/section.service";

const CourseView = ({ course }) => {
	const [sections, setSections] = useState([]);
    const [showSections, setShowSections] = useState(false);
	const fetchSectionData = async (courseId) => {
		let sections = await sectionService.getAllSectionsByCourse(courseId);
		setSections(sections);
	};

    const onEnrollClick = async (sectionId) => {
        var request = {sectionId, "courseId": course.id};
            await sectionService.enrollSectionByStudent(request);
    }

	return (
		<VStack w="full" align="start" p="4px" key={course.id}>
			<HStack layerStyle="courseCardStyle" w="full" p="8px">
				<Heading w="33%" size="sm">
					{course.name}
				</Heading>
				<Text w="33%" fontWeight={"bold"}>
					{course.courseCode}
				</Text>
				<Text w="33%">{course.courseDetails}</Text>

				<Button
					w="33%"
					colorScheme="blue"
					onClick={() => {
                        var trigger = showSections;
                        if(trigger === false) {
                            fetchSectionData(course.id);
                        }
                        setShowSections(!trigger);
                        
					}}
				>
					{showSections === true ? "Unselect" : "Select"}
				</Button>
			</HStack>
			{showSections === true && (
				<HStack w = "full" align = "start" p = {4} >
                    <Text layerStyle={"inputLabelStyle"} w = "20%">Available sections</Text>
					<VStack w = "full" overflowY={"scroll"} maxH = "100px">
                    {sections.map((sec) => {
						return (
                            <HStack w = "80%" rounded =  "8px" p = {4} justify={"space-between"}
                            minW = "80px"  minH = "60px" layerStyle={"onSecondarySurfaceStyle"}>
                                <Text size=  "12px"  fontWeight={"bold"}>{sec.startTime} - {sec.endTime}</Text>
                                <Text size=  "12px"  fontWeight={"bold"}>Section - {sec.sectionNumber}</Text>
                                <Button size = "sm" onClick={()=>{
                                    onEnrollClick(sec.sectionId);
                                }}>Enroll</Button>
                            </HStack>
                        )
					})} 
                    </VStack>
				</HStack>
			)}
		</VStack>
	);
};

export default CourseView;
