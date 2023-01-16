import { Center, Flex, Text, VStack, Icon, createIcon, CircularProgress } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import EmptyIcon from "./EmptyIcon";

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

const EmptyState = ({ icon, message }) => {
	return (
		<Center paddingY="40px" height={"100%"} width={"100%"}>
			<VStack>
				<div style={{ opacity: "0.5" }}>
					<EmptyIcon></EmptyIcon>
				</div>
				<Text style={{ fontSize: "24px" }}>Its empty here </Text>
				<Text>{message}</Text>
			</VStack>
		</Center>
	);
};

const DataFetcher = ({
	children,
	isEmpty,
	onDataFetched,
	emptyStateText = "Nothing to show",
}) => {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (onDataFetched !== undefined) {
			startFetching();
		}
	}, []);

	const startFetching = async () => {
		await onDataFetched();
		setIsLoading(false);
	};

	return (
		<>
			{isLoading === true ? (
				<LoadingState />
			) : isEmpty === true ? (
				<EmptyState message={emptyStateText}></EmptyState>
			) : (
				<Flex height={"100%"} width={"100%"}>
					{children}
				</Flex>
			)}
		</>
	);
};
export default DataFetcher;
