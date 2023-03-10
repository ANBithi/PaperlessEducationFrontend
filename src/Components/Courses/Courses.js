import { Flex, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import courseService from "../../services/course.service";
import DataFetcher from "../DataFetcher";
import { CourseCard } from "./CourseCard";

const Courses = () => {
	const [allCourse, setAllCourse] = useState([]);

	const fetchData = async () => {
		let data = await courseService.getAllCourse();
		setAllCourse(data.data);
	};
	return (
		<DataFetcher
			onDataFetched={fetchData}
			isEmpty={allCourse === undefined || allCourse?.length === 0}
		>
			<Flex layerStyle="pageStyle">
				<VStack w="full" align="flex-start">
					<Text layerStyle="sectionHeaderStyle">Courses</Text>
					<Grid templateColumns="repeat(3, 1fr)" gap="32px">
					{allCourse?.map((course, index) => {
							return (
								<GridItem>
								<CourseCard
									key={index}
									courseTitle={course.name}
									section={course.sectionNumber}
									courseDes={course.courseDescription}
									courseCode={course.courseCode}
									startTime={course.startTime}
									endTime={course.endTime}
									sectionId={course.sectionId}
									courseCover={course.courseCover}
								/>
								</GridItem>
							);
						})}
					</Grid>
					<VStack>
						
					</VStack>
				</VStack>
			</Flex>
		</DataFetcher>
	);
};
export default Courses;
