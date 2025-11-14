import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 120;
const FRAME_MIN = 1;
const FRAME_MAX = FRAME_COUNT;
const FRAME_PATH = (index) => `/rotation/${index}.jpg`;

const STEP_PX = 20;

function Viewer360() {
	const [frame, setFrame] = useState(1);
	const [isDragging, setIsDragging] = useState(false);

	const containerRef = useRef(null);
	const dragState = useRef({
		dragging: false,
		lastX: 0,
		lastY: 0,
		accumulated: 0,
	});

	// Preload ảnh để giảm giật
	useEffect(() => {
		const images = [];
		for (let i = FRAME_MIN; i <= FRAME_MAX; i++) {
			const img = new Image();
			img.src = FRAME_PATH(i);
			images.push(img);
		}
	}, []);

	const startDrag = (x, y) => {
		dragState.current.dragging = true;
		dragState.current.lastX = x;
		dragState.current.lastY = y;
		dragState.current.accumulated = 0;
		setIsDragging(true);
	};

	const moveDrag = (x, y) => {
		if (!dragState.current.dragging || !containerRef.current) return;

		const dx = x - dragState.current.lastX;
		const dy = y - dragState.current.lastY;
		if (dx === 0 && dy === 0) return;

		dragState.current.lastX = x;
		dragState.current.lastY = y;

		let direction = 0; // +1: tiến frame, -1: lùi frame
		let deltaForAccum = 0;

		if (Math.abs(dx) >= Math.abs(dy)) {
			direction = dx > 0 ? 1 : -1;
			deltaForAccum = Math.abs(dx);
		} else {
			const rect = containerRef.current.getBoundingClientRect();
			const localX = x - rect.left;
			const centerX = rect.width / 2;

			const onRight = localX >= centerX;

			if (onRight) {
				// BÊN PHẢI
				direction = dy < 0 ? 1 : -1;
			} else {
				// BÊN TRÁI
				direction = dy < 0 ? -1 : 1;
			}

			deltaForAccum = Math.abs(dy);
		}

		dragState.current.accumulated += deltaForAccum;

		// Mỗi STEP_PX là 1 quãng kéo
		while (dragState.current.accumulated >= STEP_PX) {
			setFrame((prev) => {
				let next = prev + direction;
				if (next > FRAME_MAX) next = FRAME_MIN; // loop về đầu
				if (next < FRAME_MIN) next = FRAME_MAX; // loop về cuối
				return next;
			});
			dragState.current.accumulated -= STEP_PX;
		}
	};

	const stopDrag = () => {
		if (!dragState.current.dragging) return;
		dragState.current.dragging = false;
		dragState.current.accumulated = 0;
		setIsDragging(false);
	};

	// Mouse
	const handleMouseDown = (e) => {
		if (e.button !== 0) return;
		startDrag(e.clientX, e.clientY);
	};

	const handleMouseMove = (e) => {
		moveDrag(e.clientX, e.clientY);
	};

	// Touch
	const handleTouchStart = (e) => {
		const touch = e.touches[0];
		if (!touch) return;
		startDrag(touch.clientX, touch.clientY);
	};

	const handleTouchMove = (e) => {
		const touch = e.touches[0];
		if (!touch) return;

		e.preventDefault();
		moveDrag(touch.clientX, touch.clientY);
	};

	const handleTouchEnd = () => {
		stopDrag();
	};

	return (
		<section
			ref={containerRef}
			className={`viewer ${isDragging ? "viewer--dragging" : ""}`}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={stopDrag}
			onMouseLeave={stopDrag}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<img src={FRAME_PATH(frame)} alt={`Rotation frame ${frame}`} className="viewer__image" draggable={false} />
			<div className="viewer__hint">
				Kéo trái/phải hoặc lên/xuống để xoay (frame {frame}/{FRAME_COUNT})
			</div>
		</section>
	);
}

export default Viewer360;
