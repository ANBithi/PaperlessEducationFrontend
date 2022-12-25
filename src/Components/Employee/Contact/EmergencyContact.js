import { HStack, VStack, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import employeeService from "../../../services/employee.service";
const EmergencyContact = ({ emergencyContactObj, setEmergencyContactObj, defaultValues }) => {
	
	const [isPageLoaded, setIsPageLoaded] = useState(false);


	const onEmergencyContactChange = (e) => {
		let { value, name } = e.target;
		var newObj = { ...emergencyContactObj, [name]: value };
		setEmergencyContactObj(newObj);
	};

	return (
		<VStack layerStyle="sectionStyle" align = "start">
            <Text layerStyle= "sectionHeaderStyle">Emergency Contact</Text>
            {/* name input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Name</Text>
				<Input
					name="name"
					layerStyle="inputStyle"
					defaultValue={defaultValues?.name}
					placeholder="Name"
					onChange={onEmergencyContactChange}
				/>
			</HStack>
            {/* relation input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Relation</Text>
				<Input
					name="relation"
					defaultValue={defaultValues?.relation}
					layerStyle="inputStyle"
					placeholder="Relation"
					onChange={onEmergencyContactChange}
				/>
			</HStack>
			{/* address input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Address</Text>
				<Input
					name="address"
					defaultValue={defaultValues?.address}
					layerStyle="inputStyle"
					placeholder="Address"
					onChange={onEmergencyContactChange}
				/>
			</HStack>
			{/* mobile input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Mobile</Text>
				<Input
					name="mobile"
					layerStyle="inputStyle"
					placeholder="Mobile"
					defaultValue={defaultValues?.mobile}
					type="number"
					onChange={onEmergencyContactChange}
				/>
			</HStack>
            {/* email input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Email</Text>
				<Input
					name="email"
					defaultValue={defaultValues?.email}
					layerStyle="inputStyle"
					placeholder="Email"
					type="email"
					onChange={onEmergencyContactChange}
				/>
			</HStack>
		</VStack>
	);
};

export default EmergencyContact;
