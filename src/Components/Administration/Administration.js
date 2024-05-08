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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddStudentView from "./AddStudentView";
import AddUserView from "./AddUserView";
import AddDepartmentView from "./AddDepartmentView";
import AddCourseView from "./AddCourseView";
import departmentService from "../../services/department.service";
import courseService from "../../services/course.service";
import SectionAddView from "./SectionAddView";
const Administration = () => {
	const [departments, setDepartments] = useState([]);
	const [allCourses, setAllCourses] = useState([]);
	
    useEffect(()=>{
        fetchDepartments();
    }, [])

	const fetchCourses = async (departmentId) => {
		let res = await courseService.getAllCourseByDepartment(departmentId);
		setAllCourses(res);
	};

	const fetchDepartments = async () => {
		let response = await departmentService.getDepartments();
		 setDepartments(response);
	 }

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
							<AddCourseView departments={departments} 
							allCourses={allCourses}
							setAllCourses={setAllCourses}
							fetchCourses={fetchCourses}/>
						</AccordionPanel>
					</AccordionItem>


					<AccordionItem>
						<AccordionButton _expanded={{ fontWeight: "bold" }}>
							<Box flex="1" textAlign="left">
								Open new section
							</Box>
							<AccordionIcon />
						</AccordionButton>
						<AccordionPanel pb={4}>
							<SectionAddView setAllCourses={setAllCourses} setDepartments={setDepartments} fetchCourses={fetchCourses} allCourses={allCourses} departments={departments}/>
						</AccordionPanel>
					</AccordionItem>
				</Accordion>
			</VStack>
		</Flex>
	);
};

export default Administration;
