import { HStack, VStack, Input, Text } from "@chakra-ui/react";
const PermanentAddress = ({ permanentAddressObj, setPermanentAddressObj, defaultValues}) => {
	const onPermanentAddressChange = (e) => {
		let { value, name } = e.target;
		var newObj = { ...permanentAddressObj, [name]: value };
		setPermanentAddressObj(newObj);
	};
	return (
		<VStack layerStyle="sectionStyle" align = "start">
            <Text layerStyle="sectionHeaderStyle">Permanent Address</Text>
			{/* address input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Address</Text>
				<Input
					name="address"
					defaultValue={defaultValues?.address}
					layerStyle="inputStyle"
					placeholder="Address"
					onChange={onPermanentAddressChange}
				/>
			</HStack>
			{/* upazilla input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Upazilla</Text>
				<Input
					name="upazilla"
					defaultValue={defaultValues?.upazilla}
					layerStyle="inputStyle"
					placeholder="Upazilla"
					onChange={onPermanentAddressChange}
				/>
			</HStack>
			{/* district input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">District</Text>
				<Input
					name="district"
					defaultValue={defaultValues?.district}
					layerStyle="inputStyle"
					placeholder="District"
					onChange={onPermanentAddressChange}
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
					onChange={onPermanentAddressChange}
				/>
			</HStack>
		</VStack>
	);
};

export default PermanentAddress;
