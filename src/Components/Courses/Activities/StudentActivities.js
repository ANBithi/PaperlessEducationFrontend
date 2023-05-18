import { VStack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import UpcomingExams from "./UpcomingExams";

const StudentActivities = () => {
    const navigate = useNavigate();

    const onExamClick = (exam) => {
        navigate(`exam`, { state: {exam : exam} });
    }


    return (
        <VStack  w="full" align={"start"}>
            <UpcomingExams handleClick = {onExamClick}/>
        </VStack>
    )
}

export default StudentActivities