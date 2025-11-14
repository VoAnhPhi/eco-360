import { useEffect } from "react";

function LoadingScreen({ onFinish, assetsReady }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onFinish();
		}, 5000);

		return () => clearTimeout(timer);
	}, [onFinish]);

	const handleStartClick = () => {
		onFinish();
	};

	return (
		<div className="loading">
			<div className="loading__content">
				<div className="loading__circle">
					<div className="loading__circle-inner">
						<img
							src="/logos/logo1.png"
							alt="Eco Retreat"
							className="loading__logo"
						/>
					</div>
				</div>

				{/* Chỉ hiện nút khi assetsReady = true */}
				{assetsReady && (
					<button
						className="btn btn--primary loading__btn"
						onClick={handleStartClick}
					>
						Bắt đầu
					</button>
				)}
			</div>
		</div>
	);
}

export default LoadingScreen;
