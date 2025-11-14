import { useState } from "react";

function UserGuide() {
	const [hidden, setHidden] = useState(false);

	if (hidden) return null;

	const handleUnderstand = () => {
		setHidden(true);
	};

	return (
		<div className="guide">
			<div className="guide__box">
				<h2 className="guide__title">HƯỚNG DẪN THAO TÁC</h2>

				<div className="guide__icons">
					<div className="guide__icon-item">
						<img src="/icons/hand_icon.png" alt="Kéo để xoay" className="guide__icon-img" />
					</div>

					<span className="guide__or">hoặc</span>

					<div className="guide__icon-item">
						<img src="/icons/mouse_icon.png" alt="Giữ chuột trái để xoay" className="guide__icon-img" />
					</div>
				</div>

				<p className="guide__text">Kéo sang trái hoặc phải để trải nghiệm toàn cảnh dự án</p>

				<button className="btn guide__btn" onClick={handleUnderstand}>
					ĐÃ HIỂU
				</button>
			</div>
		</div>
	);
}

export default UserGuide;
