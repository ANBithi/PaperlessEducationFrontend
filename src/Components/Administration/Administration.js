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
import AddStudentView from "./AddStudentView";
import AddUserView from "./AddUserView";
import AddDepartmentView from "./AddDepartmentView";
import AddCourseView from "./AddCourseView";
import departmentService from "../../services/department.service";
const Administration = () => {
	const [allUsers, setAllUsers] = useState();
	const [addInstituteObj, setAddInstituteObj] = useState();
	const [departments, setDepartments] = useState([]);
	const [addHoliday, setAddHoliday] = useState([]);

	const toast = useToast();
    useEffect(()=>{
        fetchDepartments();
    }, [])

	const fetchDepartments = async () => {
		let response = await departmentService.getDepartments();
		 setDepartments(response);
	 }
 

	// const onInstituteAdd = (e) => {
	// 	let { value, name } = e.target;
	// 	var newObj = { ...addInstituteObj, [name]: value };
	// 	setAddInstituteObj(newObj);
	// };



	// const onHolidayAddChange = (e) => {
	// 	let { value } = e.target;
	// 	let list = [...addHoliday, new Date(value)];
	// 	setAddHoliday(list);
	// };

	// const onAddInstitute = () => {
	// 	let {establishedYear, semesterDuration} = addInstituteObj;
	// 	establishedYear = parseInt(establishedYear);
	// 	semesterDuration =parseInt(semesterDuration);
	// 	let request = {...addInstituteObj, establishedYear, semesterDuration, departments: addDepartments};
	// 	console.log(request);
	// 	instituteService.addInstitute(request).then((d)=>{
	// 		console.log("Institute Added")
	// 	});
	//  };
	// const onDepartmentsChange = (e) => {
	// 	let { value } = e.target;
	// 	let list = [...addDepartments, value];
	// 	setAddDepartments(list);
	// };
	// const onDepartmentRemove = (index) => {
	// 	let arr = [...addDepartments];
	// 	arr = arr.filter((x, i) => i !== index);
	// 	setAddDepartments(arr);
	// }
	// const onDayRemove = (index) => {
	// 	let arr = [...addHoliday];
	// 	arr = arr.filter((x, i) => i !== index);
	// 	setAddHoliday(arr);
	// };
	// const onAddHolidayClick = () => {
	// 	instituteService.addHolidays(addHoliday).then((d) => {
	// 		if (d) {
	// 			setAddHoliday([]);
	// 			toast({
	// 				containerStyle: {
	// 					fontSize: "14px",
	// 					fontWeight: "normal",
	// 				},
	// 				title: "Holidays have been added.",
	// 				position: "bottom-right",
	// 				variant: "subtle",
	// 				status: "success",
	// 				duration: 1000,
	// 				isClosable: true,
	// 			});
	// 		} else {
	// 			toast({
	// 				containerStyle: {
	// 					fontSize: "14px",
	// 					fontWeight: "normal",
	// 				},
	// 				title: "Something went wrong.",
	// 				position: "bottom-right",
	// 				variant: "subtle",
	// 				status: "error",
	// 				duration: 1000,
	// 				isClosable: true,
	// 			});
	// 		}
	// 	});
	// };
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
							<AddStudentView departments={departments}/>
						</AccordionPanel>
					</AccordionItem>
					<AccordionItem>
						<AccordionButton _expanded={{ fontWeight: "bold" }}>
							<Box flex="1" textAlign="left">
								Add User
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<AddUserView departments={departments}/>
						</AccordionPanel>
					</AccordionItem>


					<AccordionItem>
						<AccordionButton _expanded={{ fontWeight: "bold" }}>
							<Box flex="1" textAlign="left">
								Add Department
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<AddDepartmentView fetchDepartments={fetchDepartments}/>
						</AccordionPanel>
					</AccordionItem>


					<AccordionItem>
						<AccordionButton _expanded={{ fontWeight: "bold" }}>
							<Box flex="1" textAlign="left">
								Add Course
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<AddCourseView departments={departments}/>
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
					{/* <AccordionItem>
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
					</AccordionItem> */}
				</Accordion>
			</VStack>
		</Flex>
	);
};

export default Administration;
