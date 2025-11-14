// Viewer360.jsx
import { useEffect, useRef, useState } from "react";

const STEP_PX = 20;

function Viewer360({ frames }) {
	const FRAME_MIN = 0; // index mảng: 0..119
	const FRAME_MAX = frames.length - 1;

	const [frameIndex, setFrameIndex] = useState(0);
	const [isDragging, setIsDragging] = useState(false);

	const containerRef = useRef(null);
	const canvasRef = useRef(null);

	const dragState = useRef({
		dragging: false,
		lastX: 0,
		lastY: 0,
		accumulated: 0,
	});

	// Vẽ frame hiện tại lên canvas
	useEffect(() => {
		if (!frames.length) return;
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const ctx = canvas.getContext("2d");
		const img = frames[frameIndex];
		if (!img) return;

		// Lấy kích thước container để fill 100%
		const rect = container.getBoundingClientRect();
		const w = rect.width || img.width;
		const h = rect.height || img.height;

		// set kích thước canvas "thật"
		canvas.width = w;
		canvas.height = h;

		// Vẽ cover: scale giữ tỉ lệ và fill hết vùng viewer
		const imgRatio = img.width / img.height;
		const canvasRatio = w / h;

		let drawWidth, drawHeight;
		if (canvasRatio > imgRatio) {
			// canvas rộng hơn: fill theo width
			drawWidth = w;
			drawHeight = w / imgRatio;
		} else {
			// canvas cao hơn: fill theo height
			drawHeight = h;
			drawWidth = h * imgRatio;
		}

		const dx = (w - drawWidth) / 2;
		const dy = (h - drawHeight) / 2;

		ctx.clearRect(0, 0, w, h);
		ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
	}, [frames, frameIndex]);

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

		let direction = 0;
		let deltaForAccum = 0;

		if (Math.abs(dx) >= Math.abs(dy)) {
			// kéo ngang
			direction = dx > 0 ? 1 : -1;
			deltaForAccum = Math.abs(dx);
		} else {
			// kéo dọc
			const rect = containerRef.current.getBoundingClientRect();
			const localX = x - rect.left;
			const centerX = rect.width / 2;
			const onRight = localX >= centerX;

			if (onRight) {
				// bên phải: kéo lên = tiến, kéo xuống = lùi
				direction = dy < 0 ? 1 : -1;
			} else {
				// bên trái: kéo lên = lùi, kéo xuống = tiến
				direction = dy < 0 ? -1 : 1;
			}

			deltaForAccum = Math.abs(dy);
		}

		dragState.current.accumulated += deltaForAccum;

		while (dragState.current.accumulated >= STEP_PX) {
			setFrameIndex((prev) => {
				if (!frames.length) return prev;
				let next = prev + direction;

				if (next > FRAME_MAX) next = FRAME_MIN;
				if (next < FRAME_MIN) next = FRAME_MAX;

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
			<canvas ref={canvasRef} className="viewer__canvas" />
            {/* log frame */}
			{/* <div className="viewer__hint">
				Kéo trái/phải hoặc lên/xuống để xoay (frame {frameIndex + 1}/{frames.length || 0})
			</div> */}
		</section>
	);
}

export default Viewer360;
