import React, { useEffect, useState } from "react";
import { Text, VStack, HStack, Select, Input, Button } from "@chakra-ui/react";
import TextInput from "../HelperComponents/TextInput";
import { COURSE_TYPE, LESSON_TYPE } from "./CourseData";
import courseService from "../../services/course.service";

const AddCourseView = ({ departments, fetchCourses, allCourses, setAllCourses }) => {
	const [disableAdd, setDisableAdd] = useState(true);
	const [addCourseObj, setAddCourseObj] = useState({});

	useEffect(() => {
		if (addCourseObj === {}) {
			return;
		} else {
			if (addCourseObj.name === "" || addCourseObj.name === undefined) {
				setDisableAdd(true);
			} else if (
				addCourseObj.departmentId === "" ||
				addCourseObj.departmentId === undefined
			) {
				setDisableAdd(true);
			} else if (
				addCourseObj.code === "" ||
				addCourseObj.code === undefined
			) {
				setDisableAdd(true);
			} else if (
				addCourseObj.type === "" ||
				addCourseObj.type === undefined
			) {
				setDisableAdd(true);
			} else if (
				addCourseObj.lessonType === "" ||
				addCourseObj.lessonType === undefined
			) {
				setDisableAdd(true);
			} else {
				setDisableAdd(false);
			}
		}
	}, [addCourseObj]);

	const onAddClick = async () => {
		console.log(addCourseObj);

		await courseService.addCourse(addCourseObj);
		setAllCourses([]);
		setAddCourseObj({});
	};

	const onChangeCourse = (e) => {
		var { name, value } = e.target;
		if (name === "departmentId") {
			fetchCourses(value);
		}
		if (name === "prerequisites") {
			value = [value];
		}
		var obj = { ...addCourseObj, [name]: value };
		setAddCourseObj(obj);
	};

	return (
		<VStack spacing={2}>
			<TextInput
				maxLength={60}
				value={addCourseObj.name ?? ""}
				name="name"
				placeholder="Course Name"
				onChange={onChangeCourse}
			/>
			<HStack layerStyle="inputStackStyle">
				<Select
					value={addCourseObj.departmentId ?? ""}
					name="departmentId"
					variant={"unstyled"}
					placeholder="Select a department"
					onChange={onChangeCourse}
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
			<TextInput
				title="Type digits from 1 to 9"
				maxLength={4}
				placeholder="Course Code"
				onInput={(e) =>
					(e.target.value = e.target.value.replace(/[^0-9]/g, 1))
				}
				value={addCourseObj.code ?? ""}
				name="code"
				onChange={onChangeCourse}
			/>

			<HStack layerStyle="inputStackStyle">
				<Select
					value={addCourseObj.type ?? ""}
					name="type"
					variant={"unstyled"}
					placeholder="Select a type"
					onChange={onChangeCourse}
				>
					{COURSE_TYPE.map((type) => {
						return (
							<option value={type.value} key={type.name}>
								{type.name}
							</option>
						);
					})}
				</Select>
			</HStack>
			<HStack layerStyle="inputStackStyle">
				<Select
					value={addCourseObj.lessonType ?? ""}
					name="lessonType"
					variant={"unstyled"}
					placeholder="Select a lesson Type"
					onChange={onChangeCourse}
				>
					{LESSON_TYPE.map((lesson) => {
						return (
							<option value={lesson.id} key={lesson.name}>
								{lesson.name}
							</option>
						);
					})}
				</Select>
			</HStack>

			{
				allCourses !== undefined && allCourses.length > 0 &&
				<HStack layerStyle="inputStackStyle">
				<Select
					value={addCourseObj.prerequisites ?? ""}
					name="prerequisites"
					variant={"unstyled"}
					placeholder="Select prerequisites"
					onChange={onChangeCourse}
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
			}
			<TextInput
				maxLength={80}
				value={addCourseObj.courseDetails ?? ""}
				name="courseDetails"
				placeholder="Course Details"
				onChange={onChangeCourse}
			/>
			<Button isDisabled={disableAdd} onClick={onAddClick}>
				Add
			</Button>
		</VStack>
	);
};

export default AddCourseView;
