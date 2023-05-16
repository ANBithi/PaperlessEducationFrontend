import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Center,
	Text,
	Avatar,
	VStack,
	HStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const AllReactionsModal = ({ reactions, isOpen, onClose }) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size="xl"
			style={{ minHeight: "600px" }}
		>
			<ModalOverlay />
			<ModalContent  >
				<ModalCloseButton />
				<ModalBody pr={0} >
					<Tabs variant="soft-rounded" colorScheme="primary">
						<TabList>
							{reactions.map((r) => {
								return (
									<Tab key={r.view.name}>
										<Center
											color={r.view.color}
											marginRight="8px"
										>
											<FontAwesomeIcon
												icon={r.view.iconFilled}
											/>
										</Center>

										<Text>{r.view.name} </Text>
									</Tab>
								);
							})}
						</TabList>
						<TabPanels>
							{reactions.map((r) => {
								return (
									<TabPanel style={{
										minHeight: "70vh",
										maxHeight: "70vh",
										overflow: "auto"
									}} key={r.view.name}>
										<VStack  align="start"  overflow="auto">
											{r.data.map((item) => {
												return (
													<HStack key={item.id}>
														<Avatar
															alignSelf="center"
															size="xs"
															name={
																item.createdBy
															}															
															mb="5px"
														/>
														<Text>{item.createdBy}</Text>
													</HStack>
												);
											})}
										</VStack>
									</TabPanel>
								);
							})}
						</TabPanels>
					</Tabs>
				</ModalBody>				
			</ModalContent>
		</Modal>
	);
};
export default AllReactionsModal;
