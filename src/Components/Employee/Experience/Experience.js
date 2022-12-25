import {
	HStack,
	Flex,
	Button,
	useToast,
	VStack,
	Grid,
	GridItem,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import employeeService from "../../../services/employee.service";
import ExperienceForm from "./ExperienceForm";
import ExperienceModal from "./ExperienceModal";

const Experience = () => {
	const [experienceObj, setExperienceObj] = useState({});
	const [userExperiences, setUserExperiences] = useState();
	const [currentExperience, setCurrentExperience] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const fetchData = () => {
		employeeService.getExperiences().then((d) => {
			if (d.response) {
				setUserExperiences(d.experiences);
			}
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const onSaveClick = () => {
		employeeService.saveExperience(experienceObj).then((d) => {
			if (d) {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: "Experience Saved.",
					position: "bottom-right",
					variant: "subtle",
					status: "success",
					duration: 1000,
					isClosable: true,
				});
				fetchData();
			}
		});
	};
	return (
		<Flex layerStyle="pageStyle">
			<Flex flexDirection="column" w="100%">
				<ExperienceForm
					experienceObj={experienceObj}
					setExperienceObj={setExperienceObj}
				/>
				<HStack layerStyle="pageButtonStyle">
					<Button fontWeight="normal" onClick={onSaveClick}>
						Save
					</Button>
				</HStack>
				{userExperiences?.length > 0 && (
					<VStack w="full" align="start">
						<Text layerStyle="sectionHeaderStyle">Experiences</Text>
						<Grid
							templateColumns="repeat(3, 1fr)"
							w="full"
							gap="1%"
						>
							{userExperiences?.map((experience, index) => {
								return (
									<GridItem
										layerStyle="gridItemStyle"
										colSpan={1}
										mt="2%"
										mb="2%"
										align="start"
										onClick={() => {
											setCurrentExperience(experience);
											onOpen();
										}}
									>
										{index + 1}. {experience.company}
									</GridItem>
								);
							})}
						</Grid>
						{currentExperience && (
							<ExperienceModal
								isOpen={isOpen}
								onClose={onClose}
								experience={currentExperience}
								onSuccess = {fetchData}
							/>
						)}
					</VStack>
				)}
			</Flex>
		</Flex>
	);
};
export default Experience;
