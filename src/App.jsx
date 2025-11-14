// App.jsx
import { useEffect, useRef, useState } from "react";
import LoadingScreen from "./components/LoadingScreen.jsx";
import UserGuide from "./components/UserGuide.jsx";
import MenuBar from "./components/MenuBar.jsx";
import Viewer360 from "./components/Viewer360.jsx";

const FRAME_COUNT = 120;
const FRAME_PATH = (index) => `/rotation/${index}.jpg`;
// nếu sau này dùng base khác: `${import.meta.env.BASE_URL}rotation/${index}.jpg`

function App() {
	const [frames, setFrames] = useState([]); // mảng Image()
	const [loadingFinished, setLoadingFinished] = useState(false);

	// Preload toàn bộ frame 1 lần tránh network lòa
	useEffect(() => {
		const imgs = [];
		let loaded = 0;

		for (let i = 1; i <= FRAME_COUNT; i++) {
			const img = new Image();
			img.src = FRAME_PATH(i);
			img.onload = () => {
				loaded += 1;
				if (loaded === FRAME_COUNT) {
					setFrames(imgs);
				}
			};
			img.onerror = () => {
				loaded += 1;
				if (loaded === FRAME_COUNT) {
					setFrames(imgs);
				}
			};
			imgs.push(img);
		}
	}, []);

	const assetsReady = frames.length === FRAME_COUNT;
	const isReady = assetsReady && loadingFinished;

	const handleLoadingFinish = () => {
		setLoadingFinished(true);
	};

	return (
		<div className="app">
			{!isReady && <LoadingScreen onFinish={handleLoadingFinish} assetsReady={assetsReady} />}

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
