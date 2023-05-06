import { HStack, VStack, Text, Button, Input, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const QuestionPanel = ({
	setQuestions,
	questions,
	calcMark,
}) => {
	const [showInputBox, setShowInputBox] = useState(false);
	const [disableInput, setDisableInput] = useState(false);
	const [individualQuestion, setIndividualQuestion] = useState({});
	const onInputChange = (e) => {
		let { name, value } = e.target;
		let question = { ...individualQuestion, [name]: value };
		setIndividualQuestion(question);
	};
	const onDoneClick = () => {
		var temp = [...questions, individualQuestion];
		setQuestions(temp);
		setShowInputBox(false);
	};
	useEffect(() => {
		var val = calcMark();
		setDisableInput(val);
	}, [questions]);

	return (
		<VStack
			w="70%"
			minH="30%"
			paddingLeft="16px"
			spacing="16px"
			rounded="16px"
			fontSize={"14px"}
            paddingTop = "16px"
		>
            {
                disableInput === false ?
                (<>
				<Text layerStyle={"inputLabelStyle"} alignSelf = "start">Add Question</Text>
					<>
						<HStack w="full" layerStyle={"inputStackStyle"}>
							<Input
								name="question"
								onChange={onInputChange}
                                placeholder = "Enter question"
								variant="unstyled"
							></Input>
						</HStack>
						<HStack w="full" layerStyle={"inputStackStyle"}>
							<Input
								name="marks"
                                placeholder = "Marks"
								type="number"
								variant="unstyled"
								onChange={onInputChange}
							></Input>
						</HStack>
						<Button  alignSelf = "start" onClick={onDoneClick} >Done</Button>
					</>
			
			</>)
            :
            <Text fontWeight={"bold"} align = "center" w = "full" >You have reach max number, To modify click on edit.</Text>
                }
		</VStack>
	);
};
export default QuestionPanel;
