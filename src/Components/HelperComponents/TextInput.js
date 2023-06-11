import { Input } from "@chakra-ui/react";
import React from "react";

const TextInput = ({ ...rest }) => {
	return (
		<Input
			layerStyle={"inputStackStyle"}
			w="full"
			variant="unstyled"
			{...rest}
		></Input>
	);
};

export default TextInput;
