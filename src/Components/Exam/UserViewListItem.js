import { Avatar, AvatarBadge, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import activityService from '../../services/activity.service';

const UserViewListItem = ({student, setSelectedStudentId, isOnline, fetchActivityStatus}) => {

    useEffect(()=>{
        fetchActivityStatus(student.userId);
    }, [])

  return (
    <HStack
    layerStyle={"onSurfaceStyle"}
    w="full"
    p="8px 16px"
    rounded="8px"
    boxShadow="md"
    spacing="16px"
    _hover={{ cursor: "pointer" }}
    onClick={() => {
        setSelectedStudentId(student.id);
    }}
>
    <Avatar
        alignSelf="start"
        size="sm"
        name={student.name}
    >
        <AvatarBadge boxSize="1em" bg={isOnline === true ? "green.500" : "gray.500"} />
    </Avatar>
    <VStack align="start">
        <Text>{student.name}</Text>
        <Text>{student.studentId}</Text>
        <Text textStyle={"smallAndBoldStyle"}>
            {isOnline === true  ? "online" : "offline"}
        </Text>
    </VStack>
</HStack>
  )
}

export default UserViewListItem