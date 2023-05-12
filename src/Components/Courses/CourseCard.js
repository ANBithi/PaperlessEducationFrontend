import {
	Box,
	Button,
	Center,
	Heading,
	HStack,
	Image,
	Tag,
	Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function CourseCard({
	courseTitle,
	section,
	courseCode,
	courseDes,
	startTime,
	endTime,
	sectionId,
	type,
	courseCover
}) {
	const navigate = useNavigate();
	const onOpenCourse = () => {
		navigate(`${sectionId}`);
	};

	const onEnrollClick = () => {};

	return (
		<Center as="section">
			<Box layerStyle={"courseCardStyle"}>
				<Image
					objectFit="cover"
					h="170px"
					roundedTop="12px"
					w="full"
					src={courseCover}
				/>
				<Box padding="12px">
					<HStack>
						<Text fontWeight="bold">Time:</Text>
						<Text>
							{" "}
							{startTime} - {endTime}
						</Text>
					</HStack>
					<HStack mt="5" spacing="3">
						{[courseCode, section].map((item) => (
							<Tag key={item} variant="outline">
								{item}
							</Tag>
						))}
					</HStack>
					<Heading my="4" size="lg">
						{courseTitle}
					</Heading>
					<Text>{courseDes}</Text>
					<Center my="6">
						{type === "enroll" ? (
							<Button colorScheme="blue" onClick={onEnrollClick}>
								Enroll Course
							</Button>
						) : (
							<Button colorScheme="blue" onClick={onOpenCourse}>
								Open Course
							</Button>
						)}
					</Center>
				</Box>
			</Box>
		</Center>
	);
}
