import { Flex, AspectRatio, Icon } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ArrowRightIcon } from "@chakra-ui/icons";
const VideoPlayer = ({ url, fileFormat }) => {
	const videoRef = useRef(null);
	const [playing, setPlaying] = useState(false);
	const [videoTime, setVideoTime] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [progress, setProgress] = useState(0);
	const videoHandler = (control) => {
		if (control === "play") {
			videoRef.current.play();
			setPlaying(true);
			var vid = document.getElementById("video1");
			setVideoTime(vid.duration);
		} else if (control === "pause") {
			videoRef.current.pause();
			setPlaying(false);
		}
	};
	const fastForward = () => {
		videoRef.current.currentTime += 5;
	};

	const revert = () => {
		videoRef.current.currentTime -= 5;
	};
	window.setInterval(function () {
		setCurrentTime(videoRef.current?.currentTime);
		setProgress((videoRef.current?.currentTime / videoTime) * 100);
	}, 1000);
	return (
		<Flex flexDirection="column" w="full" overflow="hidden">
			<video controls width="100%">
				<source
					src={url}
					type={fileFormat}
				/>
			</video>
		</Flex>
	);
};
export default VideoPlayer;
