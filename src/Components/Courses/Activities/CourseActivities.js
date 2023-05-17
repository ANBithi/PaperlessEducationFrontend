import { Box, Button, Text, VStack } from "@chakra-ui/react"
import { getCurrentUser } from "../../../Helpers/userHelper";
import FacultyActivities from "./FacultyActivities";
import StudentActivities from "./StudentActivities";

const CourseActivities = () => {
    const currentUser = getCurrentUser();
    const NavigatePage = () => {
        if(currentUser.userType === 2) return <FacultyActivities/>;
        else if (currentUser.userType === 3) return <StudentActivities/>;
    }
    return (
        <Box  padding="20px" width="30%" maxW="300px">
        <VStack width="full" align = "start" layerStyle={"courseActivityStyle"}>
            <Text>Course Activities</Text>
            <NavigatePage/>
        </VStack>
        
        </Box>
    )
}

export default CourseActivities;