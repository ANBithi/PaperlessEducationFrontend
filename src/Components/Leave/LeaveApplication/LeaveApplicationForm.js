import { useEffect, useState } from "react";
import {
	HStack,
	VStack,
	Input,
	Text,
	Select,
	CheckboxGroup,
	Checkbox, useToast
} from "@chakra-ui/react";
import { LEAVE_TYPE } from "../leaveData";
import { getEndDate, getStartDate,getTotalDays } from "../../util";
import CustomCalender from "../../CustomCalender";
import userService from "../../../services/user.service";
const LeaveApplicationForm = ({
	leaveApplicationObj,
	setLeaveApplicationObj,
}) => {
	const [supervisors, setSupervisors] = useState();
	const [isHalfDay, setIsHalfDay] = useState(false);
	const [isFirstHalf, setIsFirstHalf] = useState(false);
	const [isSecondHalf, setIsSecondHalf] = useState(false);
	const [dateData, setDateData] = useState({
		startDate: "",
		endDate: "",
		totalDays: 0,
		halfDay: false,
		firstHalf: false,
		secondHalf: false,
	});
	const [selectedDates, setSelectedDates] = useState([new Date()]);
	const toast = useToast();



	useEffect(() => {
		userService.getSupervisors().then( data => {
				setSupervisors(data);
		}
		)
	}, []);

	const onHalfDayOptionChange = (e) => {
		let { name, checked } = e.target;
		var date = { ...dateData, [name]: checked };
		setIsFirstHalf((prevVal) => (prevVal = date.firstHalf));
		setIsSecondHalf((prevVal) => (prevVal = date.secondHalf));
		setDateData(date);

		var newObj = { ...leaveApplicationObj, leaveData: date };
		setLeaveApplicationObj(newObj);
	};

	const isHalfDayChecked = (e) => {
		let { name, checked } = e.target;
		var date = { ...dateData, [name]: checked };
		setIsHalfDay((prevVal) => (prevVal = checked));
		setDateData(date);
		var newObj = { ...leaveApplicationObj, leaveData: date };
		setLeaveApplicationObj(newObj);
	};

	const onDateChange = (e) => {
		let { value, name } = e.target;
		let date = { ...dateData, [name]: value };
		let selDate = [];
		if(date.startDate)
		{
			selDate.push(new Date(date.startDate));
		}
		
		if (date.endDate && date.startDate) {
			if(date.endDate<date.startDate){
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: "End date must be greater than start day.",
					position: "bottom-right",
					variant: "subtle",
					status: "error",
					duration: 1000,
					isClosable: true,
				});
				return;
			}
			date.totalDays = getTotalDays(date.startDate, date.endDate);
			console.log(date.totalDays);
			selDate.push(new Date(date.endDate));
		}
		if (date.startDate && date.totalDays) {
			date.endDate = getEndDate(date.startDate, date.totalDays);
		}
		if(date.endDate)
		{
			selDate[1]=(new Date(date.endDate));
		}

		if (date.endDate && date.totalDays) {
			date.startDate = getStartDate(date.endDate, date.totalDays);
			selDate[0] = (new Date(date.startDate));
		}
		setDateData(date);
		setSelectedDates(selDate);
		var newObj = { ...leaveApplicationObj, leaveData: date };
		setLeaveApplicationObj(newObj);
	};
	const onLeaveApplicationChange = (e) => {
		let { value, name } = e.target;
		var newObj = { ...leaveApplicationObj, [name]: value };
		setLeaveApplicationObj(newObj);
	};
	return (
		<HStack>
		<VStack layerStyle="sectionStyle" align="start">
			<Text layerStyle="sectionHeaderStyle">Leave Application</Text>
			{/* leave type input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Leave Type</Text>
				<Select
					name="leaveType"
					w="70%"
					onChange={onLeaveApplicationChange}
					placeholder = "Select a leave type"
				>
					{LEAVE_TYPE.map((option, index) => {
						return (
							<option key={index} value={option.value}>
								{option.label}
							</option>
						);
					})}
				</Select>
			</HStack>
			{/* from date input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Start Date</Text>
				<Input
					name="startDate"
					layerStyle="inputStyle"
					type="date"
					value={dateData.startDate}
					onChange={onDateChange}
				/>
			</HStack>
			{/* days input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Days</Text>
				<Input
					name="totalDays"
					value={dateData?.totalDays}
					readOnly = "true"
					layerStyle="inputStyle"
					onChange={onDateChange}
				/>
			</HStack>
			{/* to date input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">End Date</Text>
				<Input
					name="endDate"
					value={dateData.endDate}
					layerStyle="inputStyle"
					type="date"
					onChange={onDateChange}
				/>
			</HStack>
			<HStack w="55%" alignSelf="center" justify="space-between">
				if()
				<Checkbox
					name="halfDay"
					size="sm"
					alignSelf="center"
					onChange={isHalfDayChecked}
					isChecked={isHalfDay}
				>
					Half Day
				</Checkbox>
				{isHalfDay === true && (
					<CheckboxGroup>
						{isSecondHalf === false && (
							<Checkbox
								name="firstHalf"
								size="sm"
								onChange={onHalfDayOptionChange}
								isChecked={isFirstHalf}
							>
								First Half
							</Checkbox>
						)}
						{isFirstHalf === false && (
							<Checkbox
								name="secondHalf"
								size="sm"
								onChange={onHalfDayOptionChange}
								isChecked={isSecondHalf}
								ml="1rem"
							>
								Second Half
							</Checkbox>
						)}
					</CheckboxGroup>
				)}
			</HStack>
			{/* supervisor input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Supervisor</Text>
				<Select
					name="supervisor"
					w="70%"
					onChange={onLeaveApplicationChange}
					placeholder = "Select a supervisor"
				>
					{supervisors?.map((supervisor, i) => {
						return (
							<option key={i} value={supervisor.id}>
								{supervisor.fullName}
							</option>
						);
					})}
				</Select>
			</HStack>
			{/* reason input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Reason</Text>
				<Input
					size="lg"
					fontSize="14px"
					name="reason"
					layerStyle="inputStyle"
					onChange={onLeaveApplicationChange}
				/>
			</HStack>
		</VStack>
		<VStack layerStyle="sectionStyle" align="center">
		<CustomCalender activeStartDate = {(dateData.startDate) ? new Date(dateData.startDate) : new Date()}
			value = {selectedDates}
			></CustomCalender>
		</VStack>
		</HStack>
	);
};

export default LeaveApplicationForm;
