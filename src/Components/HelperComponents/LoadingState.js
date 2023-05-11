import { Center, CircularProgress, Text, VStack } from "@chakra-ui/react";

const LoadingState = () => {
	return (
		<Center height={"100%"} width={"100%"}>
			<VStack>
                <CircularProgress isIndeterminate/>
				<Text>Loading...</Text>
			</VStack>
		</Center>
	);
};

export default LoadingState