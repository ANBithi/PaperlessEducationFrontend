import { HStack, VStack, Input, Text, Select} from "@chakra-ui/react";
import { CourseType } from "./ProfQualificationData";
const ProfessionalForm = ({ professionalObj, setProfessionalObj }) => {
	const onProfessionalChange = (e) => {
		let { value, name } = e.target;
		var newObj = { ...professionalObj, [name]: value };
		setProfessionalObj(newObj);
	};
	return (
		<VStack layerStyle="sectionStyle" align="start">
			<Text layerStyle="sectionHeaderStyle">
				Professional Qualification
			</Text>
			{/* course type input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Course Type</Text>
				<Select
					name="courseType"
					placeholder="Select a course type"
					w="70%"
					onChange={onProfessionalChange}
				>
					{CourseType.map((option, index) => {
								
						return (
							<option key={index} value={option.value}>
								{option.value}
							</option>
						);
					})}
				</Select>
			</HStack>
			{/* course title input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Course Title</Text>
				<Input
					name="courseTitle"
					layerStyle="inputStyle"
					onChange={onProfessionalChange}
				/>
			</HStack>
			{/* institute input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Institute</Text>
				<Input
					name="institute"
					layerStyle="inputStyle"
					onChange={onProfessionalChange}
				/>
			</HStack>
			{/* address input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Address</Text>
				<Input
					name="address"
					layerStyle="inputStyle"
					onChange={onProfessionalChange}
				/>
			</HStack>
			{/* duration input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Duration</Text>
				<Input
					name="duration"
					layerStyle="inputStyle"
					onChange={onProfessionalChange}
				/>
			</HStack>
			{/* result input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Result</Text>
				<Input
					name="result"
					layerStyle="inputStyle"
					onChange={onProfessionalChange}
				/>
			</HStack>
			{/* year input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Year</Text>
				<Input
					name="year"
					layerStyle="inputStyle"
					type="number"
					onChange={onProfessionalChange}
				/>
			</HStack>
			{/* achievement input */}
			<HStack layerStyle="inputStackStyle">
				<Text w="20%">Achievement</Text>
				<Input
					name="achievement"
					layerStyle="inputStyle"
					onChange={onProfessionalChange}
				/>
			</HStack>
		</VStack>
	);
};

export default ProfessionalForm;
