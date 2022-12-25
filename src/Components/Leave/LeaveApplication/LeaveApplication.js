import { HStack, Flex, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import leaveService from "../../../services/leave.service";
import LeaveApplicationForm from "./LeaveApplicationForm";

const LeaveApplication = () => {
	const [leaveApplicationObj, setLeaveApplicationObj] = useState({});
	const toast = useToast();

	const onSaveClick = () => {
		leaveService.applyLeave(leaveApplicationObj).then(d => {
			if(d.response === true) {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: d.message,
					position: "bottom-right",
					variant: "subtle",
					status: "success",
					duration: 1000,
					isClosable: true,
				});
			}
			else {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: d.message,
					position: "bottom-right",
					variant: "subtle",
					status: "error",
					duration: 1000,
					isClosable: true,
				});
			}
		})		
	};
	return (
		<Flex layerStyle="pageStyle">
			<Flex flexDirection="column" w="100%">
				<LeaveApplicationForm
					leaveApplicationObj={leaveApplicationObj}
					setLeaveApplicationObj={setLeaveApplicationObj}
				/>
				<HStack layerStyle="pageButtonStyle">
					<Button fontWeight="normal" onClick={onSaveClick}>
						Save
					</Button>
				</HStack>
			</Flex>
		</Flex>
	);
};
export default LeaveApplication;
