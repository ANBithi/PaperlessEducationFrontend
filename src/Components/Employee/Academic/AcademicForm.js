import { HStack, VStack, Input, Select, Text } from "@chakra-ui/react";
import { ACADEMIC_DATA } from "./academicData";
const AcademicForm = ({ academicObj, setAcademicObj }) => {
	const onAcademicChange = (e) => {
		let { value, name } = e.target;
		var newObj = { ...academicObj, [name]: value };
		setAcademicObj(newObj);
	};
	return (
			<HStack h = "full" w = "full" >
				<VStack layerStyle="sectionStyle">
                    {/* degree input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">Degree</Text>
						<Select
							name="degree"
                            w= "70%"
							placeholder="Select a degree"
							onChange={onAcademicChange}
						>
							{ACADEMIC_DATA.map((option, index) => {
						return (
							<option key={index} value={option.label} >
								{option.label}
							</option>
						);
					})}
						</Select>
					</HStack>
					{/* exam title input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">Exam Title</Text>
						<Input
							name="examTitle"
							layerStyle="inputStyle"
							onChange={onAcademicChange}
						/>
					</HStack>
					{/* institute input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">Institute</Text>
						<Input
							name="institute"
							layerStyle="inputStyle"
							onChange={onAcademicChange}
						/>
					</HStack>
					{/* board/country input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">Board/Country</Text>
						<Input
							name="boardOrCountry"
							layerStyle="inputStyle"
							onChange={onAcademicChange}
						/>
					</HStack>
					{/* major/group input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">Major/Group</Text>
						<Input
							name="majorOrGroup"
							layerStyle="inputStyle"
							onChange={onAcademicChange}
						/>
					</HStack>
					{/* result input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">Result</Text>
						<Input
							name="result"
                            layerStyle="inputStyle"
							onChange={onAcademicChange}
						/>
					</HStack>
				</VStack>
				<VStack layerStyle="sectionStyle">
                    {/* cgpa/marks input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">CGPA/Marks</Text>
						<Input
							name="cgpaOrMarks"
							layerStyle="inputStyle"
                            type = "number"
							onChange={onAcademicChange}
						/>
					</HStack>
					{/* scale/out off input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">Scale/Out off</Text>
						<Input
							name="scale"
							layerStyle="inputStyle"
                            type = "number"
							onChange={onAcademicChange}
						/>
					</HStack>
					{/* year of passing input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">Year of Passing</Text>
						<Input
							name="passedYear"
							layerStyle="inputStyle"
							type="number"
							onChange={onAcademicChange}
						/>
					</HStack>
					{/* duration input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">Duration</Text>
						<Input
							name="duration"
							layerStyle="inputStyle"
							onChange={onAcademicChange}
						/>
					</HStack>
					{/* remarks input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">Remarks</Text>
						<Input
							name="remarks"
							layerStyle="inputStyle"
							onChange={onAcademicChange}
						/>
					</HStack>
                    {/* achievement input */}
					<HStack layerStyle="inputStackStyle">
						<Text w="20%">Achievement</Text>
						<Input
							name="achievement"
							layerStyle="inputStyle"
							onChange={onAcademicChange}
						/>
					</HStack>
				</VStack>
			</HStack>
	);
};

export default AcademicForm;
