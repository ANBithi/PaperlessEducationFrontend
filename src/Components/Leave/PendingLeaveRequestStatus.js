import {
	Flex,
	Grid,
	GridItem,
	Text,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import leaveService from "../../services/leave.service";
import DataFetcher from "../DataFetcher";
import { PENDING_COLS } from "./leaveData";
import PendingModal from "./PendingModal";

const PendingLeaveRequestStatus = () => {
	const [leavePending, setLeavePending] = useState();
	const [currentLeave, setCurrentLeave] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();


	const fetchData = async () =>{
		let data = await leaveService.getPendingLeaveRequest(true);
		setLeavePending(data);
	}
	return (
		<DataFetcher onDataFetched={fetchData} isEmpty={leavePending === undefined || leavePending?.length === 0}>
			<Flex layerStyle="pageStyle">
			<VStack w="full" align="flex-start">
				<Text layerStyle="sectionHeaderStyle">
					Pending Leave Request Status
				</Text>
				<Grid templateColumns="repeat(8, 1fr)" gap={1} w="full">
					{PENDING_COLS.map((col, index) => {
						return (
							<GridItem
								fontWeight="bold"
								layerStyle="gridItemStyle"
								colSpan={col.colSpan}
								align="center"
							>
								{col.label}
							</GridItem>
						);
					})}
				</Grid>
				{leavePending?.map((data) => {
					return (
						<Grid
							templateColumns="repeat(8, 1fr)"
							gap={1}
							w="full"
							onClick={() => {
								setCurrentLeave(data);
								onOpen();
							}}
						>
							<GridItem
								layerStyle="gridItemStyle"
								colSpan={1}
								align="center"
							>
								{data.employee}
							</GridItem>
							<GridItem
								layerStyle="gridItemStyle"
								colSpan={2}
								align="center"
							>
								{data.reason}
							</GridItem>
							<GridItem
								layerStyle="gridItemStyle"
								colSpan={1}
								align="center"
							>
								{new Date(data.startDate).toLocaleDateString(
									"en-US"
								)}
							</GridItem>
							<GridItem
								layerStyle="gridItemStyle"
								colSpan={1}
								align="center"
							>
								{new Date(data.endDate).toLocaleDateString(
									"en-US"
								)}
							</GridItem>
							<GridItem
								layerStyle="gridItemStyle"
								colSpan={1}
								align="center"
							>
								{data.totalDays}
							</GridItem>
							{data.firstHalf === true ? (
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={1}
									align="center"
								>
									First Half
								</GridItem>
							) : data.secondHalf === true ? (
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={1}
									align="center"
								>
									First Half
								</GridItem>
							) : (
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={1}
									align="center"
								>
									Full Day
								</GridItem>
							)}
							{data.leaveStatus === 0 ? (
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={1}
									align="center"
								>
									Pending
								</GridItem>
							) : data.leaveStatus === 1 ? (
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={1}
									align="center"
								>
									Accepted
								</GridItem>
							) : (
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={1}
									align="center"
								>
									Rejected
								</GridItem>
							)}
						</Grid>
					);
				})}
				<PendingModal
					currentLeave={currentLeave}
					isOpen={isOpen}
					onClose={onClose}
					onSuccess = {fetchData}
				/>
			</VStack>
		</Flex>
		</DataFetcher>
	);
};
export default PendingLeaveRequestStatus;
