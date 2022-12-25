import {
	HStack,
	Flex,
	Button,
	useToast,
	VStack,
	Grid,
	GridItem,
	Text,
	useDisclosure
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import employeeService from "../../../services/employee.service";
import ProfessionalForm from "./ProfessionalForm";
import ProfModal from "./ProfModal";

const Professional = () => {
	const [professionalObj, setProfessionalObj] = useState({});
	const [userProfQualification, setUserProfQualification] = useState();
	const [currentProf, setCurrentProf] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const fetchData = () => {
		employeeService.getProfQualification().then((d) => {
			if (d.response) {
				setUserProfQualification(d.profs);
			}
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const onSaveClick = () => {
		employeeService.saveQualification(professionalObj).then((d) => {
			if (d) {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: "Qualification Saved.",
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
			<VStack align="start" w="100%">
				<ProfessionalForm
					professionalObj={professionalObj}
					setProfessionalObj={setProfessionalObj}
				/>
				<HStack layerStyle="pageButtonStyle">
					<Button fontWeight="normal" onClick={onSaveClick}>
						Save
					</Button>
				</HStack>

				{userProfQualification?.length > 0 && (
					<VStack w="full" align="start">
						<Text layerStyle="sectionHeaderStyle">
							Professional Qualifications
						</Text>
						<Grid
							templateColumns="repeat(3, 1fr)"
							w="full"
							gap="1%"
						>
							{userProfQualification?.map((prof, index) => {
								return (
									<GridItem
										layerStyle="gridItemStyle"
										colSpan={1}
										mt="2%"
										mb="2%"
										align="start"
										onClick={() => {
											setCurrentProf(prof);
											onOpen();
										}}
									>
										{index + 1}. {prof.courseTitle}
									</GridItem>
								);
							})}
						</Grid>
					</VStack>
				)}
			</VStack>
			<ProfModal
					isOpen={isOpen}
					onClose={onClose}
					prof={currentProf}
					onSuccess = {fetchData}
				/>
		</Flex>
	);
};
export default Professional;
