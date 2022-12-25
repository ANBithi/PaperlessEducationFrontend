import {
	Flex,
	Text,
	VStack,
	Accordion,
	AccordionItem,
	AccordionButton,
	Box,
	AccordionPanel,
	AccordionIcon,
	Select,
	HStack,
	Input,
	Button,
	useToast,
	Tag,
	TagCloseButton,
	TagLabel,
	Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import instituteService from "../../services/institute.service";
import userService from "../../services/user.service";

const Administration = () => {
	const [allUsers, setAllUsers] = useState();
	const [addInstituteObj, setAddInstituteObj] = useState();
	const [addUserObj, setAddUserObj] = useState();
	const [addStudentsObj, setAddStudentsObj] = useState();
	const [addHoliday, setAddHoliday] = useState([]);
	const [addDepartments, setAddDepartments] = useState([]);
	const toast = useToast();
	useEffect(() => {
		// userService.getAllUsers().then((d) => {
		// 	console.log(d);
		// 	setAllUsers(d);
		// });
	}, []);

	const onInstituteAdd = (e) => {
		let { value, name } = e.target;
		var newObj = { ...addInstituteObj, [name]: value };
		setAddInstituteObj(newObj);
	};

	const onAddUserChange = (e) => {
		let { value, name } = e.target;
		var newObj = { ...addUserObj, [name]: value};
		setAddUserObj(newObj);
	};
	const onAddStudentsChange = (e) => {
		let { value, name } = e.target;
		var newObj = { ...addStudentsObj, [name]: value};
		setAddStudentsObj(newObj);
	};
	const onHolidayAddChange = (e) => {
		let { value } = e.target;
		let list = [...addHoliday, new Date(value)];
		setAddHoliday(list);
	};

	const onAddUserClick = () => {
		console.log(addUserObj);
		let user = {...addUserObj,
			 department: "6390085e0816ceea4ce5ebc9",
			advisorId : "638e1d245620743855a70ba3" ,
		batch : "222"}
		userService.createUser(user).then((d) => {
			if (d.isCreated) {
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

	const onAddStudent = () => {
		console.log(addStudentsObj);
		userService.addStudents(addStudentsObj).then((d) => {
			if (d.isCreated) {
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

	const onAddInstitute = () => {
		let {establishedYear, semesterDuration} = addInstituteObj;
		establishedYear = parseInt(establishedYear);
		semesterDuration =parseInt(semesterDuration);
		let request = {...addInstituteObj, establishedYear, semesterDuration, departments: addDepartments};
		console.log(request);
		instituteService.addInstitute(request).then((d)=>{
			console.log("Institute Added")
		});
	 };
	const onDepartmentsChange = (e) => {
		let { value } = e.target;
		let list = [...addDepartments, value];
		setAddDepartments(list);
	};
	const onDepartmentRemove = (index) => {
		let arr = [...addDepartments];
		arr = arr.filter((x, i) => i !== index);
		setAddDepartments(arr);
	}
	const onDayRemove = (index) => {
		let arr = [...addHoliday];
		arr = arr.filter((x, i) => i !== index);
		setAddHoliday(arr);
	};
	const onAddHolidayClick = () => {
		instituteService.addHolidays(addHoliday).then((d) => {
			if (d) {
				setAddHoliday([]);
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: "Holidays have been added.",
					position: "bottom-right",
					variant: "subtle",
					status: "success",
					duration: 1000,
					isClosable: true,
				});
			} else {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: "Something went wrong.",
					position: "bottom-right",
					variant: "subtle",
					status: "error",
					duration: 1000,
					isClosable: true,
				});
			}
		});
	};
	return (
		<Flex layerStyle="pageStyle">
			<VStack align="start" w="full" gap={2}>
				<Text layerStyle="sectionHeaderStyle">Administration</Text>
				<Accordion allowToggle w="full">
				<AccordionItem>
						<AccordionButton _expanded={{ fontWeight: "bold" }}>
							<Box flex="1" textAlign="left">
								Add Students
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<VStack spacing={2}>
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Student Names</Text>
									<Textarea
										name="students"
										layerStyle="inputStyle"
										onChange={onAddStudentsChange}
									/>
								</HStack>
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Batch</Text>
									<Input
										name="batch"
										layerStyle="inputStyle"
										onChange={onAddStudentsChange}
									/>
								</HStack>
								{/* email input */}
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Advisor</Text>
									<Input
										name="advisorId"
										layerStyle="inputStyle"
										onChange={onAddStudentsChange}
									/>
								</HStack>

								
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Department</Text>
									<Select
										name="department"
										w="70%"
										placeholder="Select a type"
										onChange={onAddStudentsChange}
									>
										<option value="6390085e0816ceea4ce5ebc9">CSE</option>
									</Select>
								</HStack>
								<Button onClick={onAddStudent}>Add</Button>
							</VStack>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton _expanded={{ fontWeight: "bold" }}>
							<Box flex="1" textAlign="left">
								Add Faculty
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<VStack spacing={2}>
								{/* firstName input */}
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">First Name</Text>
									<Input
										name="firstName"
										layerStyle="inputStyle"
										onChange={onAddUserChange}
									/>
								</HStack>
								{/* lastName input */}
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Last Name</Text>
									<Input
										name="lastName"
										layerStyle="inputStyle"
										onChange={onAddUserChange}
									/>
								</HStack>
								{/* email input */}
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Email</Text>
									<Input
										name="email"
										layerStyle="inputStyle"
										onChange={onAddUserChange}
									/>
								</HStack>
								{/* password input */}
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Password</Text>
									<Input
										name="password"
										type="password"
										layerStyle="inputStyle"
										onChange={onAddUserChange}
									/>
								</HStack>
								{/* role input */}
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">UserType</Text>
									<Select
										name="userType"
										w="70%"
										placeholder="Select a type"
										onChange={onAddUserChange}
									>
										<option value="0">Admin</option>
										<option value="2">Faculty</option>
									</Select>
								</HStack>
								<Button onClick={onAddUserClick}>Add</Button>
							</VStack>
						</AccordionPanel>
					</AccordionItem>

					{/* <AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left" w="full">
								Add Institute
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<VStack spacing={2}>
								<HStack layerStyle="inputStackStyle">
									<Text w="20%"> Institute Name</Text>
									<Input
										name="name"
										
										layerStyle="inputStyle"
										onChange={onInstituteAdd}
									></Input>
								</HStack>
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Institute Type</Text>
									<Input
										name="type"
										layerStyle="inputStyle"
										onChange={onInstituteAdd}
									></Input>
								</HStack>
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Address</Text>
									<Input
										name="address"
										layerStyle="inputStyle"
										onChange={onInstituteAdd}
									></Input>
								</HStack>
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Domain</Text>
									<Input
										name="domain"
										layerStyle="inputStyle"
										onChange={onInstituteAdd}
									></Input>
								</HStack>
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Established Year</Text>
									<Input
										name="establishedYear"
										type="number"
										layerStyle="inputStyle"
										onChange={onInstituteAdd}
									></Input>
								</HStack>
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">About</Text>
									<Input
										name="about"
										layerStyle="inputStyle"
										onChange={onInstituteAdd}
									></Input>
								</HStack>
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Semester Duration</Text>
									<Input
										name="semesterDuration"
										type="number"
										layerStyle="inputStyle"
										onChange={onInstituteAdd}
									></Input>
								</HStack>
								<HStack layerStyle="inputStackStyle">
									<Text w="20%">Contact</Text>
									<Input
										name="contact"
										layerStyle="inputStyle"
										onChange={onInstituteAdd}
									></Input>
								</HStack>
								<Button onClick={onAddInstitute}>
									Add Institute
								</Button>
							</VStack>
						</AccordionPanel>
					</AccordionItem> */}
					<AccordionItem>
						<AccordionButton>
							<Box flex="1" textAlign="left" w="full">
								Add Holidays
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<VStack spacing={2}>
								<HStack layerStyle="inputStackStyle">
									<Text w="20%"> Pick a day </Text>
									<Input
										name="holidayDate"
										type="date"
										layerStyle="inputStyle"
										onChange={onHolidayAddChange}
									></Input>
								</HStack>
								<HStack spacing={4}>
									{addHoliday?.map((day, index) => {
										return (
											<Tag
												size="md"
												borderRadius="full"
												variant="solid"
												key={index}
												colorScheme="green"
											>
												<TagLabel>
													{day.toLocaleDateString(
														"en-US"
													)}
												</TagLabel>
												<TagCloseButton
													onClick={() => {
														onDayRemove(index);
													}}
												/>
											</Tag>
										);
									})}
								</HStack>
								<Button onClick={onAddHolidayClick}>Add</Button>
							</VStack>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</VStack>
		</Flex>
	);
};

export default Administration;
