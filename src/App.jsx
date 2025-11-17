// App.jsx
import { useEffect, useRef, useState } from "react";
import LoadingScreen from "./components/LoadingScreen.jsx";
import UserGuide from "./components/UserGuide.jsx";
import MenuBar from "./components/MenuBar.jsx";
import Viewer360 from "./components/Viewer360.jsx";

const FRAME_COUNT = 120;
const FRAME_PATH = (index) => `/rotation/${index}.jpg`;

function App() {
	const [frames, setFrames] = useState([]);
	const [framesReady, setFramesReady] = useState(false);
	const [loadingFinished, setLoadingFinished] = useState(false);
	const hasPreloadedFrames = useRef(false);

	useEffect(() => {
		if (hasPreloadedFrames.current) return;
		hasPreloadedFrames.current = true;

		const imgs = [];
		let loaded = 0;

		for (let i = 1; i <= FRAME_COUNT; i++) {
			const img = new Image();
			img.src = FRAME_PATH(i);
			img.onload = img.onerror = () => {
				loaded += 1;
				if (loaded === FRAME_COUNT) {
					setFrames(imgs);
					setFramesReady(true);
				}
			};
			imgs.push(img);
		}
	}, []);

	const isReady = framesReady && loadingFinished;

	const handleLoadingFinish = () => {
		setLoadingFinished(true);
	};

	return (
		<div className="app">
			{!isReady && <LoadingScreen onFinish={handleLoadingFinish} assetsReady={framesReady} />}

			{isReady && (
				<>
					<MenuBar />
					<UserGuide />
					<main className="app__main">
						<Viewer360 frames={frames} />
					</main>
				</>
			)}
		</div>
	);
}

export default App;
