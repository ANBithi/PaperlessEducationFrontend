import { Text, VStack,HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import examService from "../../../services/exam.service";
import sectionService from "../../../services/section.service";
import { useParams } from "react-router-dom";
import moment from "moment";

const UpcomingExams = ({ handleClick }) => {
	const { id } = useParams();
	const [upcomingExam, setUpcomingExam] = useState();
	const fetchData = async () => {
		// let res = await sectionService.getSectionDetail(id);
		// setSectionDetail(res.data);
		examService.getUpcomingExams(id).then((res) => {
			setUpcomingExam(res);
			//setExamMetaId(res.metadataId);
			//setQuestions(res.examMetadata.questions ?? []);

			//setIsLoading(false);
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<VStack align={"start"} w ="full" >
			{upcomingExam?.length > 0 ? (
				<>
					<Text>Upcoming exams!</Text>
					{upcomingExam.map((exam) => {
						return (
							<UpcomingExam
                                key={exam.id}
								exam={exam}
								handleClick={handleClick}
							/>
						);
					})}
				</>
			) : (
				<Text>No upcoming exams!</Text>
			)}
		</VStack>
	);
};
const UpcomingExam = ({ exam, handleClick }) => {
	return (
		<HStack onClick={() => {
            handleClick(exam);
        }} rounded={'8px'} padding={"8px"} w="full" layerStyle={"onSecondarySurfaceStyle"} align={"start"}>
            <VStack align={"start"} w="full">
            <Text
			
			key={exam.id}
		>
			{exam.examTitle}
		</Text>
        <Text		
            fontSize={"12px"}			
		>
			{moment(exam.startTime).fromNow()}
		</Text>
            </VStack>
        
        </HStack>
	);
};
export default UpcomingExams;
