import React, { useEffect, useState } from "react";
import { Text, VStack, HStack, Select, Input, Button, Box } from "@chakra-ui/react";
import instituteService from '../../services/institute.service';
import TextInput from "../HelperComponents/TextInput";
import sectionService from "../../services/section.service";
import departmentService from "../../services/department.service";
import moment from "moment";

const SectionAddView = ({departments, allCourses, fetchCourses, setAllCourses, setDepartments})=> {

    const [disableAdd, setDisableAdd] = useState(true);
	const [addSectionObj, setAddSectionObj] = useState({});
    const [availableSections, setAvailableSections] =  useState([]);
    const [faculties, setFaculties] = useState([]);


	useEffect(() => {
		if (addSectionObj === {}) {
			return;
		} else {
			if (addSectionObj.name === "" || addSectionObj.name === undefined) {
				setDisableAdd(true);
			} else if (
				addSectionObj.departmentId === "" ||
				addSectionObj.departmentId === undefined
			) {
				setDisableAdd(true);
			} else if (
				addSectionObj.code === "" ||
				addSectionObj.code === undefined
			) {
				setDisableAdd(true);
			} else if (
				addSectionObj.type === "" ||
				addSectionObj.type === undefined
			) {
				setDisableAdd(true);
			} else if (
				addSectionObj.lessonType === "" ||
				addSectionObj.lessonType === undefined
			) {
				setDisableAdd(true);
			} else {
				setDisableAdd(false);
			}
		}
	}, [addSectionObj]);


    
	const fetchFaculties = async (departmentId) => {
		let response = await departmentService.getFacultiesByDepartment(
			departmentId
		);
		setFaculties(response);
	};
    const fetchSections = async (courseId) => {
        let response = await sectionService.getAllSectionsByCourse(courseId);
        setAvailableSections(response);
    }
	const onAddClick = async () => {

        await sectionService.addSection(addSectionObj)
		console.log(addSectionObj);
        setAddSectionObj({})
        setFaculties([]);
        setAllCourses([]);
        setDepartments([])
	};

	const setChangeSection = (e) => {
		var { name, value } = e.target;

        if(name === "departmentId"){
            fetchCourses(value);
            fetchFaculties(value)
            return;
        }
        if(name === "courseId"){
            fetchSections(value);
        }

		var obj = { ...addSectionObj, [name]: value };
		setAddSectionObj(obj);
	};

	return (
		<VStack spacing={2}>
			<HStack layerStyle="inputStackStyle">
				<Select
					value={addSectionObj.departmentId ?? ""}
					name="departmentId"
					variant={"unstyled"}
					placeholder="Select a department"
					onChange={setChangeSection}
				>
					{departments.map((dep) => {
						return (
							<option value={dep.id} key={dep.id}>
								{dep.name}
							</option>
						);
					})}
				</Select>
			</HStack>

			{allCourses !== undefined && allCourses.length > 0 && (
                <VStack w = "full" align = "start">
				<HStack layerStyle="inputStackStyle">
					<Select
						value={addSectionObj.courseId ?? ""}
						name="courseId"
						variant={"unstyled"}
						placeholder="Select course"
						onChange={setChangeSection}
					>
					{allCourses.map((cor) => {
							return (
								<option value={cor.id} key={cor.id}>
									{cor.name}
								</option>
							);
						})}
					</Select>
                    
				</HStack>
                
                {
                    availableSections.length > 0 &&
                    availableSections.map((section)=>{
                        return <Box fontSize = "14px" h = "40px" w = "33%" rounded={"8px"} p = "8px" align = "center"
                        layerStyle={"onSecondarySurfaceStyle"}>
                            <Text fontWeight={"bold"}>Section - {section.sectionNumber}</Text>
                            </Box>
                    })
                    }
                </VStack>
			)}
			<TextInput
				title="Type digits from 1 to 9"
				maxLength={1}
				placeholder="Section number"
				onInput={(e) =>
					(e.target.value = e.target.value.replace(/[^1-9]/g, 1))
				}
				value={addSectionObj.sectionNumber ?? ""}
				name="sectionNumber"
				onChange={setChangeSection}
			/>
            <TextInput
				title="Type digits from 1 to 9"
				maxLength={2}
				placeholder="Max allocated number of students"
				onInput={(e) =>
					(e.target.value = e.target.value.replace(/[^0-9]/g, 1))
				}
				value={addSectionObj.maxAllocation ?? ""}
				name="maxAllocation"
				onChange={setChangeSection}
			/>

			{faculties.length > 0 && (
				<HStack layerStyle="inputStackStyle">
					<Select
						value={addSectionObj.faculty}
						name="faculty"
						w="full"
                        variant={"unstyled"}
						placeholder="Select a faculty"
						onChange={setChangeSection}
					>
						{faculties.map((fac) => {
							return (
								<option value={fac.id} key={fac.id}>
									{fac.name}
								</option>
							);
						})}
					</Select>
				</HStack>
			)}

			<TextInput
				maxLength={80}
				value={addSectionObj.classStartTime ?? ""}
                type = "time"
				name="classStartTime"
				placeholder="Class start time"
				onChange={setChangeSection}
			/>
            <TextInput
				maxLength={80}
				value={addSectionObj.classEndTime?? ""}
                type = "time"
				name="classEndTime"
				placeholder="Class end time"
				onChange={setChangeSection}
			/>
			<Button  onClick={onAddClick}>
				Add
			</Button>
		</VStack>
	);
}

export default SectionAddView