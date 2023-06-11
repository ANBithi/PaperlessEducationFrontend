import React, { useEffect, useState } from "react";
import { Text, VStack, HStack, Input, Button } from "@chakra-ui/react";
import TextInput from "../HelperComponents/TextInput";
import departmentService from "../../services/department.service";
const AddDepartmentView = ({ fetchDepartments }) => {
	const [disableAdd, setDisableAdd] = useState(true);
	const [addDepartmentObj, setAddDepartmentObj] = useState({});

	useEffect(() => {
		if (addDepartmentObj === {}) {
			return;
		} else {
			if (
				addDepartmentObj.name === "" ||
				addDepartmentObj.name === undefined
			) {
				setDisableAdd(true);
			} else if (
				addDepartmentObj.departmentCode === "" ||
				addDepartmentObj.departmentCode === undefined
			) {
				setDisableAdd(true);
			} else if (
				addDepartmentObj.abbreviation === "" ||
				addDepartmentObj.abbreviation === undefined
			) {
				setDisableAdd(true);
			} else if (
				addDepartmentObj.courseDistribution === "" ||
				addDepartmentObj.courseDistribution === undefined
			) {
				setDisableAdd(true);
			} else {
				setDisableAdd(false);
			}
		}
	}, [addDepartmentObj]);

	const onAddDepartment = async () => {
		await departmentService.addDepartment(addDepartmentObj);
		setAddDepartmentObj({});
		fetchDepartments();
		// console.log(addDepartmentObj);
	};

	const onChangeDepartment = (e) => {
		var { name, value } = e.target;
		if(name === "abbreviation") {
			value = value.toUpperCase();
		}
		var newObj = { ...addDepartmentObj, [name]: value };
		setAddDepartmentObj(newObj);
	};

	return (
		<VStack spacing={2}>
			<TextInput
				maxLength={60}
				value={addDepartmentObj.name ?? ""}
				name="name"
				placeholder="Department Name"
				onChange={onChangeDepartment}
			/>

			{/* courseDistribution input */}
			<TextInput
				maxLength={80}
				value={addDepartmentObj.courseDistribution ?? ""}
				name="courseDistribution"
				onChange={onChangeDepartment}
				placeholder="Course Distribution"
			/>

			{/* department Abbreviation input */}
			<TextInput
				value={addDepartmentObj.abbreviation ?? ""}
				maxLength={5}
				name="abbreviation"
				placeholder="Department Abbreviation"
				onChange={onChangeDepartment}
			/>
			<TextInput
				title="Type digits from 1 to 9"
				maxLength={2}
				placeholder="Department Code"
				onInput={(e) =>
					(e.target.value = e.target.value.replace(/[^1-9]/g, 1))
				}
				value={addDepartmentObj.departmentCode ?? ""}
				name="departmentCode"
				onChange={onChangeDepartment}
			/>
			<Button isDisabled={disableAdd} onClick={onAddDepartment}>
				Add
			</Button>
		</VStack>
	);
};

export default AddDepartmentView;
