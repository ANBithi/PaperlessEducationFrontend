import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Input,
	VStack,
	HStack,
    Text
} from "@chakra-ui/react";
import { useState } from "react";
import { resultService } from "../../services/result.service";
const ResultModal = ({ isOpen, onClose, courseCode, courseName, belongsTo , onSubmitSuccess}) => {
    const [resultObj, setResultObj] = useState({});

    const onMarkChange = (e) => {
        let {name, value} = e.target;
        value = parseFloat(value);
        let obj = {...resultObj, [name]:value};
        setResultObj(obj);
    }

    const onSubmitClick = async () => {
        let obj = {...resultObj, courseCode, courseName, belongsTo};
        await resultService.addResult(obj);
        onSubmitSuccess();
       onClose();
    }


	return (
		<Modal isOpen={isOpen} onClose={onClose} size = "xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Mark Submission</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack>
						<HStack w = "full">
                            <Text w = "30%">Quiz Mark</Text>
							<Input w = "70%"
                             rounded="5px"
                             name = "quizMark"
                             onChange={onMarkChange}></Input>
						</HStack>
                        <HStack w = "full">
                            <Text w = "30%">Mid Mark</Text>
							<Input w = "70%" rounded="5px"
                            name = "midMark" onChange={onMarkChange}></Input>
						</HStack>
                        <HStack w = "full">
                            <Text w = "30%">Final Mark</Text>
							<Input w = "70%" name = "finalMark" 
                            rounded="5px" onChange={onMarkChange}></Input>
						</HStack>
                        <HStack w = "full">
                            <Text w = "30%">Project Mark</Text>
							<Input w = "70%" name = "projectMark" 
                            rounded="5px" onChange={onMarkChange}></Input>
						</HStack>
                        <HStack w = "full">
                            <Text w = "30%">Assignment Mark</Text>
							<Input w = "70%" name = "AssignmentMark" 
                            rounded="5px" onChange={onMarkChange}></Input>
						</HStack>
                        <HStack w = "full">
                            <Text w = "30%">Attendance Mark</Text>
							<Input w = "70%" name = "attendanceMark" 
                            rounded="5px" onChange={onMarkChange}></Input>
						</HStack>
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="red" mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button colorScheme="blue" mr={3} onClick = {onSubmitClick}>
						Submit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
export default ResultModal;
