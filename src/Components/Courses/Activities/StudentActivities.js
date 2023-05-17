import { Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import examService from "../../../services/exam.service";
import sectionService from "../../../services/section.service";
import { useNavigate, useParams } from "react-router-dom";
import UpcomingExams from "./UpcomingExams";

const StudentActivities = () => {
    const navigate = useNavigate();

    const onExamClick = (exam) => {
        navigate(`exam`, { state: {exam : exam} });
    }


    return (
        <UpcomingExams handleClick={onExamClick}/>
    )
}

export default StudentActivities