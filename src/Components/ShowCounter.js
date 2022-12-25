import { Circle, Text } from "@chakra-ui/react";

const ShowCounter = ({counter}) => {
return(
    <Circle bg = "red.600"
     pos="absolute" bottom= "60px"
      right = "20px" 
       w = "40px" h = "40px">
        <Text fontWeight = "bold">{counter}</Text>
    </Circle>
)
}
export default ShowCounter;