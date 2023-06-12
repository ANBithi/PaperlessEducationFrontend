import React, { useEffect } from "react";
import {
	Text,
	VStack,
	Select,
	HStack,
	Input,
	Button,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import userService from "../../services/user.service";
import instituteService from "../../services/institute.service";
import departmentService from "../../services/department.service";
const AddStudentView = ({ departments }) => {
	const [addStudentsObj, setAddStudentsObj] = useState({});
	const [faculties, setFaculties] = useState([]);

	const fetchFaculties = async (departmentId) => {
		let response = await departmentService.getFacultiesByDepartment(
			departmentId
		);
		setFaculties(response);
	};

	const onAddStudentsChange = (e) => {
		let { value, name } = e.target;
		if (name === "department") {
			fetchFaculties(value);
		}
		var newObj = { ...addStudentsObj, [name]: value };
		setAddStudentsObj(newObj);
	};

	const onAddStudent = async () => {
		await userService.addStudents(addStudentsObj);
		setAddStudentsObj({});
		setFaculties([]);
	};

	return (
		<VStack spacing={2}>
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Student Names</Text>
				<Textarea
					value={addStudentsObj.students ?? ""}
					name="students"
					layerStyle="inputStyle"
					onChange={onAddStudentsChange}
				/>
			</HStack>
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Batch</Text>
				<Input
					value={addStudentsObj.batch ?? ""}
					name="batch"
					layerStyle="inputStyle"
					onChange={onAddStudentsChange}
				/>
			</HStack>
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Department</Text>
				<Select
					value={addStudentsObj.department ?? ""}
					name="department"
					w="70%"
					placeholder="Select a department"
					onChange={onAddStudentsChange}
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
			{faculties.length > 0 && (
				<HStack layerStyle="inputStackStyle">
					<Text w="20%">Advisor</Text>
					<Select
						value={addStudentsObj.advisorId}
						name="advisorId"
						w="70%"
						placeholder="Select a advisor"
						onChange={onAddStudentsChange}
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
			<Button onClick={onAddStudent}>Add</Button>
		</VStack>
	);
};

export default AddStudentView;
