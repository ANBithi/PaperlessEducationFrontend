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

const AcademicModal = ({ isOpen, onClose, academic, onSuccess }) => {

	const onDeleteClick = () => {
		employeeService.remove(academic.id, "academic").then(d=>{
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
				<ModalHeader>Academic Details</ModalHeader>
				<ModalCloseButton />
				<ModalBody >
					{academic && (
						<>
							<HStack>
								<Text w = "35%" fontWeight="bold">Degree:</Text>
								<Text>{academic.degree}</Text>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Exam Title:</Text>
								<Text>{academic.examTitle}</Text>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Institute:</Text>
								<Text>{academic.institute}</Text>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Board/Country:</Text>
								<Text>{academic.boardOrCountry}</Text>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Major/Group:</Text>
								<Text>{academic.majorOrGroup}</Text>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Result:</Text>
								<Text>{academic.result}</Text>
							</HStack>
							<HStack spacing={5}>
								<HStack>
									<Text  fontWeight="bold">CGPA/Marks:</Text>
									<Text>{academic.cgpaOrMarks}</Text>
								</HStack>
								<HStack>
									<Text fontWeight="bold" opacity={0.5}>
										Scale/Out Off:
									</Text>
									<Text opacity={0.5}>{academic.scale}</Text>
								</HStack>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Passed Year:</Text>
								<Text>{academic.passedYear}</Text>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Duration:</Text>
								<Text>{academic.duration}</Text>
							</HStack>
							<HStack>
								<Text w = "35%" fontWeight="bold">Achievement:</Text>
								<Text>{academic.achievement}</Text>
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
export default AcademicModal;
