import {
	Modal,
	ModalOverlay,
	ModalContent,
    ModalBody,
	ModalHeader,
	ModalCloseButton,
    ModalFooter
} from "@chakra-ui/react";
import React from "react";

const GenericModal = ({
	bodyComponent,
	footerComponent,
	title,
	isOpen,
	onClose,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="xl">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{bodyComponent}</ModalBody>

				<ModalFooter>{footerComponent}</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default GenericModal;
