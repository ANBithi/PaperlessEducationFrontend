import {
	HStack,
	Flex,
	Button,
	useToast,
	Text,
	VStack,
	Grid,
	GridItem,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import employeeService from "../../../services/employee.service";
import AcademicForm from "./AcademicForm";
import AcademicModal from "./AcademicModal";

const Academic = () => {
	const [academicObj, setAcademicObj] = useState({});
	const [userAcademics, setUserAcademics] = useState();
	const [currentAcademic, setCurrentAcademic] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const fetchData = () => {
		employeeService.getAcademic().then((d) => {
			if (d.response) {
				setUserAcademics(d.academics);
			}
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	const onSaveClick = () => {
		employeeService.saveAcademicInfo(academicObj).then((d) => {
			if (d) {
				toast({
					containerStyle: {
						fontSize: "14px",
						fontWeight: "normal",
					},
					title: "Academic Information Saved.",
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
				<Text layerStyle="sectionHeaderStyle">
					Academic Qualification
				</Text>
				<AcademicForm
					academicObj={academicObj}
					setAcademicObj={setAcademicObj}
				/>
				<HStack layerStyle="pageButtonStyle">
					<Button fontWeight="normal" onClick={onSaveClick}>
						Save
					</Button>
				</HStack>
				{userAcademics?.length > 0 && (
					<VStack w="full" align="start">
						<Text layerStyle="sectionHeaderStyle">Academics</Text>
						<Grid
							templateColumns="repeat(3, 1fr)"
							w="full"
							gap="1%"
						>
							{userAcademics?.map((academic, index) => {
								return (
									<GridItem
										layerStyle="gridItemStyle"
										colSpan={1}
										mt="2%"
										mb="2%"
										align="start"
										onClick={() => {
											onOpen();
											setCurrentAcademic(academic);
										}}
									>
										{index + 1}. {academic.degree}
									</GridItem>
								);
							})}
						</Grid>
					</VStack>
				)}
				<AcademicModal
					isOpen={isOpen}
					onClose={onClose}
					academic={currentAcademic}
					onSuccess = {fetchData}
				/>
			</Flex>
		</Flex>
	);
};
export default Academic;
