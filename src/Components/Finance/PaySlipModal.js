import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	VStack,
	HStack,
	Text,
	Grid,
	GridItem,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { getCurrentUser, getCurrentUserId } from "../../Helpers/userHelper";
import financeService from "../../services/section.service";
import workBookService from "../../services/course.service";
import { PAYSLIP_ROW_VAL } from "./financeData";
const PaySlipModal = ({ isOpen, onClose, payslipData }) => {
	const contentRef = useRef();
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="full">
			<ModalOverlay />
			<ModalContent bg="primary.50" color="primary.900">
				<ModalHeader>Month/Year</ModalHeader>
				<ModalCloseButton />
				<ModalBody ref={contentRef}>
					{payslipData !== undefined && (
						<VStack w="full" gap={0}>
							<VStack mb="3%" mt="2%">
								<Text fontWeight="bold" fontSize="22px">
									Employee Management
								</Text>
								<Text fontWeight="bold">
									Pay Slip - Month/Year
								</Text>
							</VStack>
							<Grid w="full">
								<GridItem>
									<HStack justify="center">
										<Text align="start" w="30%">
											PIN :
										</Text>
										<Text w="30%" align="end">
											{payslipData?.pin}
										</Text>
									</HStack>
								</GridItem>
								<GridItem>
									<HStack justify="center">
										<Text align="start" w="30%">
											Card No :
										</Text>
										<Text w="30%" align="end">
											{payslipData?.cardNo}
										</Text>
									</HStack>
								</GridItem>
								<GridItem>
									<HStack justify="center">
										<Text align="start" w="30%">
											Employee Name :
										</Text>
										<Text w="30%" align="end">
											{payslipData?.employeeName}
										</Text>
									</HStack>
								</GridItem>
								<GridItem>
									<HStack justify="center">
										<Text align="start" w="30%">
											Designation :
										</Text>
										<Text w="30%" align="end">
											{payslipData?.designation}
										</Text>
									</HStack>
								</GridItem>
								<GridItem>
									<HStack justify="center">
										<Text align="start" w="30%">
											TIN :
										</Text>
										<Text w="30%" align="end">
											{payslipData?.tin}
										</Text>
									</HStack>
								</GridItem>
								<GridItem>
									<HStack justify="center">
										<Text align="start" w="30%">
											Total Workdays :
										</Text>
										<Text w="30%" align="end">
											{payslipData?.workDays}
										</Text>
									</HStack>
								</GridItem>
								<GridItem>
									<HStack justify="center">
										<Text align="start" w="30%">
											Salary Issue-Date :
										</Text>
										<Text w="30%" align="end">
											{payslipData?.salaryIssueDate}
										</Text>
									</HStack>
								</GridItem>
							</Grid>

							<Grid
								p="3%"
								templateColumns="repeat(2, 1fr)"
								w="full"
							>
								<GridItem
									align="center"
									bg="transparent"
									border="1px solid"
									borderColor="primary.900"
								>
									Particulars
								</GridItem>
								<GridItem
									align="center"
									bg="transparent"
									border="1px solid"
									borderColor="primary.900"
								>
									Amounts
								</GridItem>
								{PAYSLIP_ROW_VAL.map((val, index) => {
									let value;
									if (index === 0) {
										value = payslipData?.basicSalary;
									}
									if (index === 1) {
										value = payslipData?.housingSalary;
									}
									if (index === 2) {
										value = payslipData?.medicalAllowance;
									}
									if (index === 3) {
										value = payslipData?.taxDeduction;
									}
									if (index === 4) {
										value = payslipData?.total;
									}
									return (
										<>
											<GridItem
												align="center"
												bg="transparent"
												border="1px solid"
												borderColor="primary.900"
												key={index}
											>
												{val.name}
											</GridItem>
											<GridItem
												align="center"
												bg="transparent"
												border="1px solid"
												borderColor="primary.900"
											>
												{value}
											</GridItem>
										</>
									);
								})}
							</Grid>
						</VStack>
					)}
				</ModalBody>
				<ModalFooter pr="3%">
					<ReactToPrint
						trigger={() => <Button>Print</Button>}
						content={() => contentRef.current}
					/>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
export default PaySlipModal;
