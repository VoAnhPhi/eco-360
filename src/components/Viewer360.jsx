// Viewer360.jsx
import { useEffect, useRef, useState } from "react";

const STEP_PX = 20;

function Viewer360({ frames }) {
	const FRAME_MIN = 0;
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

	const frameIndexRef = useRef(0);
	useEffect(() => {
		frameIndexRef.current = frameIndex;
	}, [frameIndex]);

	const drawCurrentFrame = () => {
		if (!frames || frames.length === 0) return;

		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;

		const img = frames[frameIndexRef.current];
		if (!img) return;

		const rect = container.getBoundingClientRect();
		const cssWidth = rect.width;
		const cssHeight = rect.height;
		if (!cssWidth || !cssHeight) return;

		const dpr = window.devicePixelRatio || 1;

		canvas.width = cssWidth * dpr;
		canvas.height = cssHeight * dpr;

		canvas.style.width = `${cssWidth}px`;
		canvas.style.height = `${cssHeight}px`;

		const ctx = canvas.getContext("2d");
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, cssWidth, cssHeight);

		const imgRatio = img.width / img.height;
		const canvasRatio = cssWidth / cssHeight;

		let drawWidth, drawHeight;
		if (canvasRatio > imgRatio) {
			drawWidth = cssWidth;
			drawHeight = cssWidth / imgRatio;
		} else {
			drawHeight = cssHeight;
			drawWidth = cssHeight * imgRatio;
		}

		const dx = (cssWidth - drawWidth) / 2;
		const dy = (cssHeight - drawHeight) / 2;

		ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
	};

	useEffect(() => {
		if (!frames || frames.length === 0) return;
		drawCurrentFrame();
	}, [frames, frameIndex]);

	// Redraw khi resize window (đổi orientation / viewport)
	useEffect(() => {
		const handleResize = () => {
			drawCurrentFrame();
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [frames.length]);

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
				if (!frames || frames.length === 0) return prev;
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
			{/* log frame index
			<div className="viewer__hint">
				frame {frameIndex + 1}/{frames.length || 0}
			</div> */}
		</section>
	);
}

export default Viewer360;
