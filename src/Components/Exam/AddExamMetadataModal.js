import React from "react";
import {
	Select,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Input,
	VStack,
	HStack,
	Text
} from "@chakra-ui/react";
import {
	QUIZ_ANSWER_TYPE_OPTIONS,
	QUIZ_COUNT_PERCENTILE_OPTIONS,
	QUIZ_DURATION_OPTIONS,
	TYPE_OF_EXAMS,
} from "./examData";
function AddExamMetadataModal({
	isOpen,
	onClose,
	onExamTypeChange,
	examMetadata,
	onStartTimeChange,
	onSelectChange,
	onCreateClick,
}) {

	return (
		<Modal isOpen={isOpen} onClose={onClose} size="xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add Metadata</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack
						w="full"
						paddingLeft="16px"
						spacing="16px"
						style={{ marginTop: "16px" }}
					>
						<HStack layerStyle={"inputStackStyle"}>
							<Text layerStyle={"inputLabelStyle"}>
								Type of Exam
							</Text>
							<Select
								onChange={onExamTypeChange}
								placeholder="Select exam type"
								variant="unstyled"
								defaultValue={examMetadata?.examType}
							>
								{TYPE_OF_EXAMS.map((option) => {
									return (
										<option
											key={option.examType}
											value={option.examType}
										>
											{option.examTitle}
										</option>
									);
								})}
							</Select>
						</HStack>
						<HStack w="full" layerStyle={"inputStackStyle"}>
							<Text layerStyle={"inputLabelStyle"}>
								Total Marks
							</Text>
							<Input
								readOnly={true}
								value={examMetadata?.totalMarks}
								variant="unstyled"
							></Input>
						</HStack>
						<HStack w="full" layerStyle={"inputStackStyle"}>
							<Text layerStyle={"inputLabelStyle"}>
								Start Time
							</Text>
							<Input
								onChange={onStartTimeChange}
								name="startTime"
								type="datetime-local"
								variant="unstyled"
								defaultValue={examMetadata?.startTime}
							></Input>
						</HStack>
						<HStack w="full" layerStyle={"inputStackStyle"}>
							<Text layerStyle={"inputLabelStyle"}>
								Type of Answer
							</Text>
							{examMetadata?.examType === 2 ? (
								<Select
									placeholder="Select answer type"
									name="answerType"
									onChange={onSelectChange}
									variant="unstyled"
								>
									{QUIZ_ANSWER_TYPE_OPTIONS.map((option) => {
										return (
											<option
												key={option.value}
												value={option.value}
											>
												{option.value}
											</option>
										);
									})}
								</Select>
							) : (
								<Input
									variant="unstyled"
									readOnly={true}
									value={examMetadata?.answerType}
								></Input>
							)}
						</HStack>
						<HStack w="full" layerStyle={"inputStackStyle"}>
							<Text layerStyle={"inputLabelStyle"}>Duration</Text>
							{examMetadata?.examType === 2 ? (
								<Select
									placeholder="Select duration"
									variant="unstyled"
									onChange={onSelectChange}
									name="duration"
								>
									{QUIZ_DURATION_OPTIONS.map((option) => {
										return (
											<option
												key={option.value}
												value={option.value}
											>
												{option.title}
											</option>
										);
									})}
								</Select>
							) : (
								<Input
									readOnly={true}
									variant="unstyled"
									value={examMetadata?.duration}
								></Input>
							)}
						</HStack>
						<HStack w="full" layerStyle={"inputStackStyle"}>
							<Text layerStyle={"inputLabelStyle"}>
								Count Percentile
							</Text>
							{examMetadata?.examType === 2 ? (
								<Select
									placeholder="Select count percentile"
									onChange={onSelectChange}
									variant="unstyled"
									name="countPercentile"
								>
									{QUIZ_COUNT_PERCENTILE_OPTIONS.map(
										(option) => {
											return (
												<option
													key={option.value}
													value={option.value}
												>
													{option.title}
												</option>
											);
										}
									)}
								</Select>
							) : (
								<Input
									variant="unstyled"
									readOnly={true}
									value={
										QUIZ_COUNT_PERCENTILE_OPTIONS[
											examMetadata?.countPercentile
										]?.title
									}
								></Input>
							)}
						</HStack>
						
					</VStack>
				</ModalBody>

				<ModalFooter>
                <HStack alignSelf="flex-end">
							<Button onClick={onCreateClick}>Create</Button>
						</HStack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default AddExamMetadataModal;
