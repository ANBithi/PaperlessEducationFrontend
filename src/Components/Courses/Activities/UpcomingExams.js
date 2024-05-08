import { Text, VStack,HStack } from "@chakra-ui/react";
import { useState } from "react";
import examService from "../../../services/exam.service";

import { useParams } from "react-router-dom";
import moment from "moment";
import DataFetcher from "../../DataFetcher";

const UpcomingExams = ({ handleClick }) => {
	const { id } = useParams();
	const [upcomingExam, setUpcomingExam] = useState();
	const fetchData = async () => {
		let res = await examService.getUpcomingExams(id);
			setUpcomingExam(res);
	};

	return (
		<DataFetcher
			onDataFetched={fetchData}
			isEmpty={upcomingExam === undefined || upcomingExam?.length === 0}
		>
		<VStack align={"start"} w ="full" >
			{upcomingExam?.length > 0 ? (
				<>
					<Text>Upcoming exams!</Text>
					{upcomingExam.map((exam) => {
						return (
							<UpcomingExam
                                key={exam.id}
								exam={exam}
								handleClick={()=>{handleClick(exam)}}
							/>
						);
					})}
				</>
			) : (
				<Text>No upcoming exams!</Text>
			)}
		</VStack>
		</DataFetcher>
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
