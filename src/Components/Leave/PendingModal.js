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
import { useEffect, useState } from "react";
import leaveService from "../../services/leave.service";
import CustomCalender from "../CustomCalender";

const PendingModal = ({ isOpen, onClose, currentLeave, onSuccess }) => {
	const [selectedDates, setSelectedDates] = useState([]);
	const toast = useToast();

	useEffect(() => {
		var selDates = [];
		if (currentLeave) {
			selDates.push(
				new Date(currentLeave.startDate),
				new Date(currentLeave.endDate)
			);
			console.log(currentLeave.startDate);
			setSelectedDates(selDates);
		} else return;
	}, [isOpen]);

	const onRejectClick = () => {
		leaveService.changeLeaveStatus(2, currentLeave.id).then((d) => {
			if (d === true) {
				onClose();
				if(onSuccess!== undefined){
					onSuccess();
				}
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: "Rejected",
					position: "bottom-right",
					variant: "subtle",
					status: "error",
					duration: 1000,
					isClosable: true,
				});
			}
		});
	};

	const onAcceptClick = () => {
		leaveService.changeLeaveStatus(1, currentLeave.id).then((d) => {
			if (d === true) {
				onClose();
				if(onSuccess!== undefined){
					onSuccess();
				}
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: "Accepted",
					position: "bottom-right",
					variant: "subtle",
					status: "success",
					duration: 1000,
					isClosable: true,
				});
			}
		});
	};
	const onCancelClick = () => {
		
		leaveService.cancelLeave(currentLeave.id).then((d) => {
			if (d === true) {
				onClose();
				if(onSuccess!== undefined){
					onSuccess();
				}
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: "Canceled",
					position: "bottom-right",
					variant: "subtle",
					status: "success",
					duration: 1000,
					isClosable: true,
				});
			}
		});
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="sm">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Leave Details</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack align="start" fontSize="14px">
						{currentLeave?.employee && (
							<HStack>
								<Text fontWeight="bold">Employee Name:</Text>
								<Text>{currentLeave?.employee}</Text>
							</HStack>
						)}
						{currentLeave?.supervisor && (
							<HStack>
								<Text fontWeight="bold">Supervisor Name:</Text>
								<Text>{currentLeave?.supervisor}</Text>
							</HStack>
						)}
						<HStack>
							<Text fontWeight="bold">Leave Type:</Text>
							<Text>{currentLeave?.leaveType}</Text>
						</HStack>
						<HStack>
							<HStack>
								<Text fontWeight="bold">Reason:</Text>
								<Text>{currentLeave?.reason}</Text>
							</HStack>
							<HStack>
								<Text fontWeight="bold">Total Days:</Text>
								<Text color="green.400">
									{currentLeave?.totalDays}
								</Text>
							</HStack>
						</HStack>
						<CustomCalender
							activeStartDate={
								currentLeave?.startDate
									? new Date(currentLeave?.startDate)
									: new Date()
							}
							value={selectedDates}
						></CustomCalender>
					</VStack>
				</ModalBody>
				{currentLeave?.employee && (
					<ModalFooter pr="12px">
						<Button
							colorScheme="red"
							mr={3}
							onClick={onRejectClick}
						>
							Reject
						</Button>
						<Button
							colorScheme="green"
							mr={3}
							onClick={onAcceptClick}
						>
							Accept
						</Button>
					</ModalFooter>
				)}
				{currentLeave?.supervisor && (
					<ModalFooter pr="12px">
						<Button
							colorScheme="red"
							mr={3}
							onClick={onCancelClick}
						>
							Cancel
						</Button>
					</ModalFooter>
				)}
			</ModalContent>
		</Modal>
	);
};
export default PendingModal;
