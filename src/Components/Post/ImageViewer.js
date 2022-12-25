import { Image, Box} from "@chakra-ui/react"

const ImageViewer = ({url}) => {
    return (
        <Image src={url} boxSize= "md"/>
    )
}
export default ImageViewer;