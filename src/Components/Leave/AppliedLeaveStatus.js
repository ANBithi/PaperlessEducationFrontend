import { Flex, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import {useState } from "react";
import leaveService from "../../services/leave.service";
import DataFetcher from "../DataFetcher";
import { APPLIED_LEAVE_COLS } from "./leaveData";

const AppliedLeaveStatus = () => {
	const [leaveStatusData, setLeaveStatusData] = useState();
	const fetchData = async () => {
		let data = await leaveService.getAppliedLeaveStatus();
		setLeaveStatusData(data);
	}
	return (
		<DataFetcher onDataFetched={fetchData} isEmpty={leaveStatusData === undefined || leaveStatusData?.length === 0}>
			<Flex layerStyle="pageStyle">
			<VStack w="full" align="flex-start">
				<Text layerStyle="sectionHeaderStyle">
					Applied Leave Status
				</Text>
				<Grid templateColumns="repeat(11, 1fr)" gap={1} w="full">
					{APPLIED_LEAVE_COLS.map((col, index) => {
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
					{leaveStatusData?.map((data, index) => {
						return (
							<>
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={2}
									align="center"
								>
									{data.leaveType}
								</GridItem>
								<GridItem
									layerStyle="gridItemStyle"
									colSpan={2}
									align="center"
								>
									{data.supervisor}
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
									{new Date(
										data.startDate
									).toLocaleDateString("en-US")}
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
							</>
						);
					})}
				</Grid>
			</VStack>
		</Flex>
		</DataFetcher>
	);
};
export default AppliedLeaveStatus;
