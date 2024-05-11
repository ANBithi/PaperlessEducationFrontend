import React, { useState } from "react";
import {
	Text,
	VStack,
	Select,
	HStack, Input,
	Button
} from "@chakra-ui/react";
import userService from "../../services/user.service";

const AddUserView = ({ departments }) => {
	const [addUserObj, setAddUserObj] = useState({});
	const onAddUserChange = (e) => {
		let { value, name } = e.target;
		var newObj = { ...addUserObj, [name]: value };
		setAddUserObj(newObj);
	};
	const onAddUserClick = async () => {
		console.log(addUserObj);
		let user = {
			...addUserObj,
		};
		await userService.createUser(user);
		setAddUserObj({});
	};
	return (
		<VStack spacing={2}>
			{/* firstName input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">First Name</Text>
				<Input
					value={addUserObj.firstName ?? ""}
					name="firstName"
					layerStyle="inputStyle"
					onChange={onAddUserChange}
				/>
			</HStack>
			{/* lastName input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Last Name</Text>
				<Input
					value={addUserObj.lastName ?? ""}
					name="lastName"
					layerStyle="inputStyle"
					onChange={onAddUserChange}
				/>
			</HStack>

			{/* role input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Role</Text>
				<Select
					value={addUserObj.userType ?? ""}
					name="userType"
					w="70%"
					placeholder="Select a type"
					onChange={onAddUserChange}
				>
					<option value="Admin">Admin</option>
					<option value="Faculty">Faculty</option>
				</Select>
			</HStack>

			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Department</Text>
				<Select
					value={addUserObj.department ?? ""}
					name="department"
					w="70%"
					placeholder="Select a department"
					onChange={onAddUserChange}
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

			{/* designation input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Designation</Text>
				<Input
					value={addUserObj.designation ?? ""}
					name="designation"
					layerStyle="inputStyle"
					onChange={onAddUserChange}
				/>
			</HStack>
			<Button onClick={onAddUserClick}>Add</Button>
		</VStack>
	);
};

export default AddUserView;
