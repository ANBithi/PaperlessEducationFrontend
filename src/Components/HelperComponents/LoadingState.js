import { Center, CircularProgress, Text, VStack } from "@chakra-ui/react";

const LoadingState = () => {
	return (
		<Center layerStyle = "noNavPageStyle">
			<VStack>
                <CircularProgress isIndeterminate/>
				<Text>Loading...</Text>
			</VStack>
		</Center>
	);
};

export default LoadingState