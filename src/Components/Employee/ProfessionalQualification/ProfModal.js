import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useToast,
	VStack,
	HStack,
	Text,
} from "@chakra-ui/react";
import employeeService from "../../../services/employee.service";

const ProfModal = ({ isOpen, onClose, prof, onSuccess}) => {


	const onDeleteClick = () => {
		employeeService.remove(prof.id, "prof").then(d=>{
			if(d){
				if(onSuccess!== undefined){
					onSuccess();
				}
				onClose();
			}
		})
	}
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="md">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Professional Qualification</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
                {prof && (
						<>
							<HStack>
								<Text w = "35%" fontWeight="bold">Course Type:</Text>
								<Text>{prof.courseType}</Text>
							</HStack>
							<HStack >
								<Text w = "35%" fontWeight="bold">Course Title:</Text>
								<Text >{prof.courseTitle}</Text>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Institute:</Text>
								<Text>{prof.institute}</Text>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Address:</Text>
								<Text>{prof.address}</Text>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Duration:</Text>
								<Text>{prof.duration}</Text>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Result:</Text>
								<Text>{prof.result}</Text>
							</HStack>

							<HStack>
								<Text w = "35%" fontWeight="bold">Year:</Text>
								<Text>{prof.year}</Text>
							</HStack>
                            <HStack>
								<Text w = "35%" fontWeight="bold">Achievement:</Text>
								<Text>{prof.achievement}</Text>
							</HStack>
						</>
					)}
                </ModalBody>
				<ModalFooter pr="5%">
					<Button colorScheme="red" onClick={onDeleteClick}>Delete</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
export default ProfModal;
