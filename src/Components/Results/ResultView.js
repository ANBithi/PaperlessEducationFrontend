import {
	Flex,
	Grid,
	GridItem,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCurrentUserId } from "../../Helpers/userHelper";
import leaveService from "../../services/leave.service";
import { resultService } from "../../services/result.service";
import DataFetcher from "../DataFetcher";
import { VIEW_COL } from "./resultViewData";

const CourseResults = () => {
	const [courseResults, setCourseResults] = useState([]);
	const [currentLeave, setCurrentLeave] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const fetchData = async () => {
		let d= await resultService.getResults(getCurrentUserId());
		setCourseResults(d.data);
	};
	
	return (
	<DataFetcher onDataFetched={fetchData} isEmpty={courseResults === undefined || courseResults?.length === 0}>
			<Flex layerStyle="pageStyle">
				<VStack w="full" align="flex-start">
					<Text layerStyle="sectionHeaderStyle">Results</Text>
					<Grid templateColumns="repeat(9, 1fr)" gap={1} w="full">
						{VIEW_COL.map((col, index) => {
							return (
								<GridItem
									fontWeight="bold"
									layerStyle="gridItemStyle"
									colSpan={col.colSpan}
									align="center"
								>
									{col.label}
								</GridItem>
							);
						})}
					</Grid>
					{courseResults?.map((data) => {
						return (
							<Grid
								templateColumns="repeat(9, 1fr)"
								gap={1}
								w="full"
							>
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={1}
									align="center"
								>
									{data.courseCode}
								</GridItem>
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={2}
									align="center"
								>
									{data.courseName}
								</GridItem>
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={1}
									align="center"
								>
									{data.grade}
								</GridItem>
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={1}
									align="center"
								>
									{data.gpa}
								</GridItem>
							</Grid>
						);
					})}
				</VStack>
			</Flex>
		</DataFetcher>
	);
};
export default CourseResults;
