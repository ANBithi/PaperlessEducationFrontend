import {
	Popover,
	PopoverTrigger,
	PopoverContent,
    HStack,
} from "@chakra-ui/react";

const CustomPopover = ({popoverTrigger, popoverContent, trigger, placement}) => {
	return (
		<Popover
		placement={placement}
        trigger={trigger}
        >
           <PopoverTrigger>
            <HStack>
            {popoverTrigger}
            </HStack>
           </PopoverTrigger>
           <PopoverContent width='auto'>
            {popoverContent}
           </PopoverContent>
		</Popover>
	);
};

export default CustomPopover;