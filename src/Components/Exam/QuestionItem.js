import { HStack, Stack, Text, VStack } from "@chakra-ui/react";

const QuestionItem = ({ question, index, additionalComponent, ...rest}) => {

	return (
		<Stack w="full" spacing="16px" {...rest} padding={"12px 16px"}
        rounded="8px"
        layerStyle={"onSecondarySurfaceStyle"}>
			<HStack
				w="full"
				fontSize={"12px"}
				fontWeight="bold"
				
			>
				<HStack w="85%">
					<Text flex="1">
						{index + 1}. {question.content}
					</Text>
					<Text>{question.mark}</Text>
				</HStack>
				<HStack
					align={"end"}
					padding="4px"
					justify={"end"}
					w="15%"
				></HStack>
			</HStack>
			{additionalComponent}
		</Stack>
	);
};
export default QuestionItem;