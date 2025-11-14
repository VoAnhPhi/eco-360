// App.jsx
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen.jsx";
import UserGuide from "./components/UserGuide.jsx";
import MenuBar from "./components/MenuBar.jsx";
import Viewer360 from "./components/Viewer360.jsx";

const FRAME_COUNT = 120;
const FRAME_PATH = (index) => `/rotation/${index}.jpg`;

function App() {
	const [assetsReady, setAssetsReady] = useState(false);
	const [loadingFinished, setLoadingFinished] = useState(false);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		let loaded = 0;
		for (let i = 1; i <= FRAME_COUNT; i++) {
			const img = new Image();
			img.src = FRAME_PATH(i);
			img.onload = img.onerror = () => {
				loaded += 1;
				if (loaded === FRAME_COUNT) {
					setAssetsReady(true);
				}
			};
		}
	}, []);

	// Khi CẢ HAI đều true thì mới cho vào main
	useEffect(() => {
		if (assetsReady && loadingFinished) {
			setIsReady(true);
		}
	}, [assetsReady, loadingFinished]);

	const handleLoadingFinish = () => {
		// Được gọi từ LoadingScreen (sau 5s hoặc khi user bấm nút)
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
						<Viewer360 />
					</main>
				</>
			)}
		</div>
	);
}

export default App;
