import {
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
	Text,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const initialQuestion = { question: "", marks: "" };

const AddQuestionModal = ({
	isOpen,
	onClose,
	setQuestions,
	questions,
	calcMark,
	questionCallback,
	question,
	setQuestion,
}) => {
	const toast = useToast();
	const [showInputBox, setShowInputBox] = useState(false);
	const [disableInput, setDisableInput] = useState(false);
	const [individualQuestion, setIndividualQuestion] =
		useState(initialQuestion);
	const onInputChange = (e) => {
		let { name, value } = e.target;
		let question = { ...individualQuestion, [name]: value };
		setIndividualQuestion(question);
	};
	const onDoneClick = () => {
		let temp = [];
		let suffix = "";
		if (question === undefined) {
			temp = [...questions, individualQuestion];
			suffix = "added";
		} else {
			temp = questions.map((q, i) => {
				let ques = { ...q };
				if (i === question.index) {
					ques.question =
						individualQuestion.question === ""
							? ques.question
							: individualQuestion.question;
					ques.marks =
						individualQuestion.marks === ""
							? ques.marks
							: individualQuestion.marks;
				}
				return ques;
			});
			suffix = "updated";
		}
		let { isEqual, remainingNumber } = calcMark(temp);
		if (remainingNumber < 0) {
			toast({
				containerStyle: {
					fontSize: "14px",
					fontWeight: "normal",
				},
				title: "Total marks is crossed, please decrease the marks.",
				position: "bottom-right",
				variant: "subtle",
				status: "info",
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		setQuestions(temp);
		questionCallback(temp, suffix);
		setShowInputBox(false);
		onClose();
	};
	useEffect(() => {
		let { isEqual, remainingNumber } = calcMark(questions);
		setDisableInput(isEqual);
	}, [questions]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				setQuestion(undefined);
				setIndividualQuestion(initialQuestion);
				onClose();
			}}
			size="xl"
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					{question ? "Edit Question" : "Add Question"}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<VStack
						minH="30%"
						spacing="16px"
						rounded="16px"
						fontSize={"14px"}
					>
						{disableInput === false ? (
							<>
								<Text
									layerStyle={"inputLabelStyle"}
									alignSelf="start"
								>
									{question
										? "Update question and mark"
										: "Insert question and mark"}
								</Text>
								<>
									<HStack
										w="full"
										layerStyle={"inputStackStyle"}
									>
										<Input
											name="question"
											onChange={onInputChange}
											placeholder="Enter question"
											defaultValue={
												question
													? question.question
													: individualQuestion.question
											}
											variant="unstyled"
										></Input>
									</HStack>
									<HStack
										w="full"
										layerStyle={"inputStackStyle"}
									>
										<Input
											name="marks"
											placeholder="Marks"
											type="number"
											defaultValue={
												question
													? question.marks
													: individualQuestion.marks
											}
											variant="unstyled"
											onChange={onInputChange}
										></Input>
									</HStack>
								</>
							</>
						) : (
							<Text fontWeight={"bold"} align="center" w="full">
								You have reach max number, To modify click on
								edit.
							</Text>
						)}
					</VStack>
				</ModalBody>

				<ModalFooter>
					<Button alignSelf="start" onClick={onDoneClick}>
						Done
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
export default AddQuestionModal;
