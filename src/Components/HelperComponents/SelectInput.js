import { Select } from '@chakra-ui/react'
import React from 'react'

const SelectInput = ({ options, ...rest}) => {
  return (
    <Select
    w="full"
    layerStyle={"inputStackStyle"}
        placeholder="Select Question type"
        variant="unstyled"
    >
        {
            options.map((option)=>{
                return(
                    <option value = {option.value} key = {option.name}>{option.name}</option>
                )
            })
        }
    </Select>
  )
}

export default SelectInput