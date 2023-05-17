import { Button, Text, VStack } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router";
import UpcomingExams from "./UpcomingExams";

const FacultyActivities = () => {
    const navigate = useNavigate();
    const onExamClick = (exam) => {
        navigate(`create-exam`, { state: {exam : exam} });
    }


    return (
        <VStack  w="full" align={"start"}>
            <UpcomingExams handleClick = {onExamClick}/>
            <Button onClick = {()=>{onExamClick(undefined)}}>Schedule Exam</Button>
        </VStack>
    )
}

export default FacultyActivities