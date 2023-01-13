import { Circle, Icon, Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger, useDisclosure } from "@chakra-ui/react";
import {useRef} from "react"
import { PopoverForm } from "./PopoverForm";
import  FocusLock from "react-focus-lock"
import {
	EditIcon,
	LinkIcon,
	ExternalLinkIcon,
} from "@chakra-ui/icons";
const PopoverInput = ({ icon, setPostObj, postObj, attachments, setAttachments }) => {
	const { onOpen, onClose, isOpen, onToggle } = useDisclosure();
	const firstFieldRef = useRef(null);
	const onButtonClick = () => {
		let url = firstFieldRef.current.value
		 attachments = [...attachments, {fileFormat:firstFieldRef.current.name, url: url, name : url}];
		let post = {...postObj, attachments};
		setAttachments(attachments);
		setPostObj(post);
		firstFieldRef.current.value = "";
		onClose();
	}
	return (
		<>
			<Popover
				isOpen={isOpen}
				initialFocusRef={firstFieldRef}
				onOpen={onOpen}
				onClose={onClose}
				placement="right"
				closeOnBlur={true}
			>
				<PopoverTrigger>
					<Circle layerStyle="InputAddOns" onClick={onToggle}>
						<Icon as={icon}></Icon>
					</Circle>
				</PopoverTrigger>
				<PopoverContent p={5}>
					<FocusLock returnFocus persistentFocus={false}>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverForm
							firstFieldRef={firstFieldRef}
							onCancel={onClose}
							onButtonClick = {onButtonClick}
						/>
					</FocusLock>
				</PopoverContent>
			</Popover>
		</>
	);
};
export default PopoverInput;
