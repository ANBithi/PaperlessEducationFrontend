import { HStack, VStack, Input, Text} from "@chakra-ui/react";
const ExperienceForm = ({ experienceObj, setExperienceObj }) => {
	const onExperienceChange = (e) => {
		let { value, name } = e.target;
		var newObj = { ...experienceObj, [name]: value };
		setExperienceObj(newObj);
	};
	return (
		<VStack layerStyle="sectionStyle" align="start">
			<Text layerStyle="sectionHeaderStyle">
			Work Experience
			</Text>
			{/* company input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Company</Text>
				<Input
					name="company"
					layerStyle="inputStyle"
					onChange={onExperienceChange}
				/>
			</HStack>
			{/* business input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Business</Text>
				<Input
					name="business"
					layerStyle="inputStyle"
					onChange={onExperienceChange}
				/>
			</HStack>
			{/* location input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Location</Text>
				<Input
					name="location"
					layerStyle="inputStyle"
					onChange={onExperienceChange}
				/>
			</HStack>
			{/* position held input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Position Held</Text>
				<Input
					name="positionHeld"
					layerStyle="inputStyle"
					onChange={onExperienceChange}
				/>
			</HStack>
			{/* job nature input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Job Nature</Text>
				<Input
					name="jobNature"
					layerStyle="inputStyle"
					onChange={onExperienceChange}
				/>
			</HStack>
			{/* responsibilities input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Responsibilities</Text>
				<Input
					name="responsibilities"
					size="lg"
                    fontSize="14px"
					layerStyle="inputStyle"
					onChange={onExperienceChange}
				/>
			</HStack>
			{/* from date input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">From Date</Text>
				<Input
					name="fromDate"
					layerStyle="inputStyle"
					type="date"
					onChange={onExperienceChange}
				/>
			</HStack>
            {/* to date input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">To Date</Text>
				<Input
					name="toDate"
					layerStyle="inputStyle"
					type="date"
					onChange={onExperienceChange}
				/>
			</HStack>
			{/* department input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Department</Text>
				<Input
					name="department"
					layerStyle="inputStyle"
					onChange={onExperienceChange}
				/>
			</HStack>
            {/* last salary input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Last Salary</Text>
				<Input
					name="lastSalary"
					layerStyle="inputStyle"
					onChange={onExperienceChange}
				/>
			</HStack>
             {/* remarks input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Remarks</Text>
				<Input
					name="remarks"
					layerStyle="inputStyle"
					onChange={onExperienceChange}
				/>
			</HStack>
		</VStack>
	);
};

export default ExperienceForm;
