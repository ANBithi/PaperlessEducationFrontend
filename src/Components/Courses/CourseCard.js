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
}) {
	const navigate = useNavigate();
	const onOpenCourse = () => {
		navigate(`${sectionId}`);
	};

	const onEnrollClick = () => {
		
	}

	return (
		<Center as="section">
			<Box maxW="420px" bg="white" p="3" rounded="5px">
				<Image
					objectFit="cover"
					h="150px"
					w="full"
					src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__340.jpg"
				/>
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
		</Center>
	);
}
