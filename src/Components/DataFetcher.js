import {Flex} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import LoadingState from "./HelperComponents/LoadingState";
import EmptyState from "./HelperComponents/EmptyState";

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
