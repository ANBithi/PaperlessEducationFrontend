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
	Text, Select
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import examService from "../../services/exam.service";

const initialQuestion = { content: undefined, mark: "" };

const initialOptions = [{prefix : "1", value: ""}];

const AddQuestionModal = ({
	isOpen,
	onClose,
	examId,
	question,
	setQuestion,
}) => {
	const [disableInput, setDisableInput] = useState(false);
	const [options, setOptions] = useState(initialOptions);
	const [individualQuestion, setIndividualQuestion] =
		useState({...question});
	

	
	const onInputChange = (e) => {
		let { name, value } = e.target;
		let question = { ...individualQuestion, [name]: value };
		setIndividualQuestion(question);
	};

	

	const onMcqOptionChange = (e, prefix) => {
		let { name, value } = e.target;
		if(value === ""){
			return;
		}
		let optionObj = [...options];
		let index = optionObj.findIndex(x=>x.prefix === prefix)
		let obj = optionObj[index];
		obj = {...obj, [name] : value};
		optionObj[index] = obj;
		setOptions(optionObj);
	}

	const onAddClick = () => {
		let temp = [...options, {prefix : options.length + 1 , value : ""}];
		setOptions(temp);
	}
	
	const onDoneClick = async () => {
		
		if(question === undefined) {
			let obj = {...individualQuestion, examId};

			if(individualQuestion.questionType === "0" )
			{
				obj = {...obj, options}
			}
			await examService.addQuestion(obj);
		}
		else {
			let ques = { ...question };
			ques.content =
				individualQuestion.content === undefined
					? ques.content
					: individualQuestion.content;
			ques.mark =
				individualQuestion.mark === ""
					? ques.mark
					: individualQuestion.mark;
			ques.questionType =
				individualQuestion.questionType === undefined
					? ques.questionType
					: individualQuestion.questionType;
			if(ques.questionType === 0){
				ques.options = options;
			}
			await examService.updateQuestion({ ...ques, id: question.id });
		}
		//TODO : clear data before on close,
		setIndividualQuestion(initialQuestion);
		setOptions([]);
		onClose();
	}

	
	
	useEffect(() => {

		if(question === undefined) { return };

		if(question.options === undefined) { return };
		setOptions(question.options); 

	}, [question]);

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
			<ModalContent maxH = "80vh">
				<ModalHeader>
					{question ? "Edit Question" : "Add Question"}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody overflowY = "auto" >
					<VStack
						minH="30%"
						spacing="16px"
						rounded="16px"
						className="helloStack"
						
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
								<VStack w="full">
									
										<Input
											name="content"
											layerStyle={"inputStackStyle"}
											onChange={onInputChange}
											placeholder="Enter question"
											w="full"
											defaultValue={
												question
													? question.content
													: individualQuestion.content
											}
											variant="unstyled"
										></Input>
									
									
										<Input
											name="mark"
											placeholder="Mark"
											type="number"
											layerStyle={"inputStackStyle"}
											defaultValue={
												question
													? question.mark
													: individualQuestion.mark
											}
											variant="unstyled"
											onChange={onInputChange}
										></Input>
									
										<Select
										w="full"
										layerStyle={"inputStackStyle"}
											name="questionType"
											placeholder="Select Question type"
											type="number"
											defaultValue={
												question
													? question.questionType
													: individualQuestion.questionType
											}
											variant="unstyled"
											onChange={onInputChange}
										>
											<option value = {0}>MCQ</option>
											<option value = {1}>Broad</option>

										</Select>
									{
											(individualQuestion.questionType === "0" || question?.questionType === 0 ) && 
											<VStack w = "full" align = "start" overflowY="auto">
											<Text>Please provide options</Text>
											{ options &&
											options.map((value)=>{
												return (
														<HStack
														layerStyle={
															"inputStackStyle"
														}
														w="full"
														key={value.prefix}
													>
														<Text>{value.prefix}.</Text>
														<Input
														name = "value"
															onChange={
																(e)=>{
																	onMcqOptionChange(e, value.prefix);
																}
															}
															placeholder="Enter option"
															defaultValue = {value.value}
															variant="unstyled"
														></Input>
													</HStack>
											
												);
											})}
											<Button alignSelf = "start" onClick = {onAddClick}>
														Add
													</Button>
											</VStack>
										}
								</VStack>
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
