import { HStack, VStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
const CurrentAddress = ({ currentAddressObj, setCurrentAddressObj, defaultValues}) => {	
	
	
	
	const onCurrentAddressChange = (e) => {
		let { value, name } = e.target;
		var newObj = { ...currentAddressObj, [name]: value };
		setCurrentAddressObj(newObj);
	};
	return (
		<VStack layerStyle="sectionStyle" align = "start">
            <Text layerStyle="sectionHeaderStyle" >Present Address</Text>
			{/* address input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Address</Text>
				<Input
					name="address"
					layerStyle="inputStyle"
					defaultValue={defaultValues?.address}
					placeholder="Address"
					onChange={onCurrentAddressChange}
				/>
			</HStack>
			{/* city input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">City</Text>
				<Input
					name="city"
					layerStyle="inputStyle"
					defaultValue={defaultValues?.city}
					placeholder="City"
					onChange={onCurrentAddressChange}
				/>
			</HStack>
			{/* zip input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">ZIP</Text>
				<Input
					name="zip"
					layerStyle="inputStyle"
					defaultValue={defaultValues?.zip}
					placeholder="ZIP"
                    type = "number"
					onChange={onCurrentAddressChange}
				/>
			</HStack>
            {/* mobile input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Mobile</Text>
				<Input
					name="mobile"
					layerStyle="inputStyle"
					defaultValue={defaultValues?.mobile}
					placeholder="Mobile"
					type="number"
					onChange={onCurrentAddressChange}
				/>
			</HStack>
			{/* phone input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Phone</Text>
				<Input
					name="phone"
					layerStyle="inputStyle"
					defaultValue={defaultValues?.phone}
					placeholder="Phone"
					type="number"
					onChange={onCurrentAddressChange}
				/>
			</HStack>
            {/* email input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Email</Text>
				<Input
					name="email"
					layerStyle="inputStyle"
					defaultValue={defaultValues?.email}
					placeholder="Email"
					type="email"
					onChange={onCurrentAddressChange}
				/>
			</HStack>
            {/* alt email input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Alternate Email</Text>
				<Input
					name="alternateEmail"
					layerStyle="inputStyle"
					defaultValue={defaultValues?.alternateEmail}
					placeholder="Alternate email"
					type="email"
					onChange={onCurrentAddressChange}
				/>
			</HStack>
		</VStack>
	);
};

export default CurrentAddress;
