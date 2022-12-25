import { Button, ButtonGroup, Input, Stack } from "@chakra-ui/react"

export const PopoverForm = ({ firstFieldRef, onCancel, onButtonClick }) => {

    return (
      <Stack spacing={4} p = {2}>
        <Input
          ref={firstFieldRef}
          name = "link"
        />
        <ButtonGroup display='flex' justifyContent='flex-end'>
          <Button variant='outline' onClick={onCancel}>
            Cancel
          </Button>
          <Button colorScheme='blue' onClick = {onButtonClick}>
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    )
  }
  