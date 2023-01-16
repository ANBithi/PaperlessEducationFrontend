import { Flex, HStack, Text, VStack, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getCurrentUserId } from "../Helpers/userHelper";
import loginService from "../services/login.service";
import { notificationService } from "../services/notification.service";

const Home = () =>{   
    const [currentUser, setCurrentUser] =  useState(getCurrentUser());
    const [allNotifications, setAllNotifications] = useState();
    const navigate = useNavigate(); 
    useEffect(()=>{
        notificationService.getNotifications(getCurrentUserId(), "post").then(p=>{
            setAllNotifications(p);
        })
    }, [])
    const onNotificationClick = (notification) => {
        navigate(`courses/${notification.sectionId}`);

    }
    
    return(
       <Flex layerStyle="pageStyle">
        <VStack w = "full" rounded = "5px">
        <Box w ="95%" rounded = "5px"  mt = "12px" p = "12px">
        <Text fontWeight="bold">Hello! {currentUser?.firstName} {currentUser?.lastName}</Text>
        </Box>
        <Box w ="95%" rounded = "5px"  mt = "12px" p = "12px">
        <Text fontWeight="bold">{allNotifications?.newNotifications.length > 0 ? `${allNotifications?.newNotifications.length} Notifications` : "No Notification"} </Text>
        </Box>
        
        {/* {
            allNotifications.map((notification) => {
                return <Box w ="95%" bg='primary.50' border = "1px solid" rounded = "5px" _hover={{cursor : "pointer"}} style={{
                    margin:'12px 12px 6px 12px',
                    padding: '12px'
                }} onClick = {()=>{onNotificationClick(notification)}}
                >
                    <Text key = {notification.id}> <strong>{notification.creatorName}</strong> posted on <strong>{notification.courseName}</strong>({notification.section}) </Text>
                </Box>
            })
        } */}
        </VStack>
       </Flex>
    )
}
export default Home;