import {
	Flex,
	Text,
	VStack,
	HStack,
	useDisclosure,
	Button,
	useToast,
	Divider,
	Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCurrentUser, getCurrentUserId } from "../../Helpers/userHelper";
import financeService from "../../services/section.service";
import workBookService from "../../services/course.service";
import PaySlipModal from "./PaySlipModal";
const Finance = () => {
	const [totalHours, setTotalHours] = useState();
	const [payslipMonth, setPayslipMonth] = useState();
	const [payslipYear, setPayslipYear] = useState();
	const [monthlyFinance, setMonthlyFinance] = useState();
	const [enablePayslip, setEnablePayslip] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [payslipData, setPayslipData] = useState();
	const toast = useToast();
	const fetchData = () => {
		let belongsTo = getCurrentUserId();
		workBookService.getTotalHours(belongsTo).then((d) => {
			setTotalHours(d);
		});
		financeService.getFinanceMonthly(belongsTo).then((d) => {
			if (d.responseStatus === true) {
				console.log(d.response);
				setMonthlyFinance(d.response);
				setEnablePayslip(false);
			} else {
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
		});
	};

	const onDateChange = (e) => {
		let { value, name } = e.target;
		let date = new Date(value);
	    setPayslipMonth(date.toLocaleString('default', { month: 'long' }));
		setPayslipYear(date.getFullYear());
	};
	const fetchPayslipData = (month , year)=> {
		let user = getCurrentUser();
		console.log(month, year);
		financeService.generatePayslip(user.id,month , year ).then(d=>{
			if(d.responseStatus){
				let payslip = {...d.response, designation: user.designation, employeeName: `${user.firstName} ${user.lastName}`};
				setPayslipData(payslip);
				onOpen();
			}
			else {
				setPayslipData(undefined);
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
	}
	useEffect(() => {
		let date = new Date();
	    setPayslipMonth(date.toLocaleString('default', { month: 'long' }));
		setPayslipYear(date.getFullYear());
		fetchData();
	}, []);


	return (
		<Flex layerStyle="pageStyle">
			<VStack align="start" w="50%" gap={2}>
				<Text layerStyle="sectionHeaderStyle">Finance</Text>
				<Divider w="full"></Divider>
				<HStack>
					<Text fontWeight="bold">Total Work Hours:</Text>
					{totalHours ? <Text>{totalHours}</Text> : <Text>0</Text>}
				</HStack>
				<Divider w="full"></Divider>
				{monthlyFinance !== null && monthlyFinance !== undefined && (
					<>
						<HStack>
							<Text>Salary Issue Date:</Text>
							<Text>{monthlyFinance.salaryIssueDate}</Text>
						</HStack>
						<Divider w="full"></Divider>
						<HStack>
							<Text>Month:</Text>
							<Text>{monthlyFinance.month}</Text>
						</HStack>
						<Divider w="full"></Divider>
						<HStack>
							<Text>Year:</Text>
							<Text>{monthlyFinance.year}</Text>
						</HStack>
						<Divider w="full"></Divider>
						<HStack>
							<Text>Basic Salary:</Text>
							<Text>{monthlyFinance.salary}</Text>
						</HStack>
						<Divider w="full"></Divider>
					</>
				)}
			</VStack>
			<VStack pl = "2%"align="start" w="50%" gap={2} pb = "5%">
				<Text layerStyle="sectionHeaderStyle">View Payslip</Text>
				<HStack layerStyle="inputStackStyle">
				<Text w="20%">Select Date</Text>
				<Input
					name="date"
					layerStyle="inputStyle"
					type="date"
					onChange={onDateChange}
				/>
			   </HStack>
				<Button
					isDisabled={enablePayslip}
					onClick={() => {
						fetchPayslipData(payslipMonth, payslipYear);
					}}
				>
					{payslipMonth}'s Payslip
				</Button>
				</VStack>
			<PaySlipModal
				isOpen={isOpen}
				onClose={onClose}
				payslipData = {payslipData}
			></PaySlipModal>
		</Flex>
	);
};
export default Finance;
