import { useEffect, useRef, useCallback } from "react";

const CustomCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const currentAngle = useRef(-Math.PI / 2);
  const targetAngle = useRef(-Math.PI / 2);
  const prevPos = useRef({ x: -100, y: -100 });
  const isVisible = useRef(false);
  const isHovering = useRef(false);
  const speed = useRef(0);
  const trail = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const rafRef = useRef<number>();

  const lerpAngle = (a: number, b: number, t: number) => {
    let diff = b - a;
    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;
    return a + diff * t;
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) { rafRef.current = requestAnimationFrame(draw); return; }
    const ctx = canvas.getContext("2d");
    if (!ctx) { rafRef.current = requestAnimationFrame(draw); return; }

    // Resize canvas if needed
    if (canvas.width !== window.innerWidth * window.devicePixelRatio || canvas.height !== window.innerHeight * window.devicePixelRatio) {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    // Smooth interpolation
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.25;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.25;
    currentAngle.current = lerpAngle(currentAngle.current, targetAngle.current, 0.15);

    const dx = targetPos.current.x - currentPos.current.x;
    const dy = targetPos.current.y - currentPos.current.y;
    speed.current = Math.sqrt(dx * dx + dy * dy);

    // Update trail
    trail.current.push({ x: currentPos.current.x, y: currentPos.current.y, alpha: 0.5 });
    if (trail.current.length > 12) trail.current.shift();
    trail.current.forEach(t => t.alpha *= 0.88);

    // Clear
    ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

    if (!isVisible.current) { rafRef.current = requestAnimationFrame(draw); return; }

    const cx = currentPos.current.x;
    const cy = currentPos.current.y;
    const ang = currentAngle.current;
    const hovering = isHovering.current;
    const scale = hovering ? 1.4 : 1;
    const flameLen = Math.min(10 + speed.current * 1.5, 24);

    // Draw trail
    trail.current.forEach((t, i) => {
      const s = 1.5 + i * 0.3;
      ctx.beginPath();
      ctx.arc(t.x, t.y, s, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(72, 100%, 50%, ${t.alpha * 0.15})`;
      ctx.fill();
    });

    // Glow
    const glowR = hovering ? 35 : 20;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
    grad.addColorStop(0, `hsla(72, 100%, 50%, ${hovering ? 0.2 : 0.1})`);
    grad.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw shuttle
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(ang);
    ctx.scale(scale, scale);

    // Flame
    ctx.beginPath();
    ctx.moveTo(-3, 8);
    ctx.lineTo(0, 8 + flameLen);
    ctx.lineTo(3, 8);
    ctx.closePath();
    const flameGrad = ctx.createLinearGradient(0, 8, 0, 8 + flameLen);
    flameGrad.addColorStop(0, "hsla(72, 100%, 50%, 0.9)");
    flameGrad.addColorStop(0.4, "hsla(40, 100%, 50%, 0.6)");
    flameGrad.addColorStop(1, "hsla(15, 100%, 50%, 0)");
    ctx.fillStyle = flameGrad;
    ctx.fill();

    // Inner flame
    ctx.beginPath();
    ctx.moveTo(-1.5, 8);
    ctx.lineTo(0, 8 + flameLen * 0.5);
    ctx.lineTo(1.5, 8);
    ctx.closePath();
    ctx.fillStyle = "hsla(60, 100%, 90%, 0.7)";
    ctx.fill();

    // Body
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.bezierCurveTo(-2, -10, -4, -2, -4, 6);
    ctx.lineTo(-3, 8);
    ctx.lineTo(3, 8);
    ctx.lineTo(4, 6);
    ctx.bezierCurveTo(4, -2, 2, -10, 0, -14);
    ctx.closePath();
    ctx.fillStyle = "hsl(72, 100%, 50%)";
    ctx.strokeStyle = "hsla(72, 100%, 70%, 0.8)";
    ctx.lineWidth = 0.6;
    ctx.fill();
    ctx.stroke();

    // Wings
    ctx.beginPath();
    ctx.moveTo(-4, 3);
    ctx.lineTo(-9, 9);
    ctx.lineTo(-7, 8);
    ctx.lineTo(-4, 5);
    ctx.closePath();
    ctx.fillStyle = "hsl(72, 100%, 42%)";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(4, 3);
    ctx.lineTo(9, 9);
    ctx.lineTo(7, 8);
    ctx.lineTo(4, 5);
    ctx.closePath();
    ctx.fillStyle = "hsl(72, 100%, 42%)";
    ctx.fill();

    // Cockpit
    ctx.beginPath();
    ctx.ellipse(0, -6, 1.8, 2.8, 0, 0, Math.PI * 2);
    ctx.fillStyle = "hsla(240, 10%, 4%, 0.8)";
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -6.5, 1.2, 1.8, 0, 0, Math.PI * 2);
    ctx.fillStyle = "hsla(72, 100%, 80%, 0.3)";
    ctx.fill();

    ctx.restore();

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [draw]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1.5) {
        targetAngle.current = Math.atan2(dy, dx) + Math.PI / 2;
      }
      targetPos.current = { x: e.clientX, y: e.clientY };
      prevPos.current = { x: e.clientX, y: e.clientY };
      isVisible.current = true;
    };
    const leave = () => { isVisible.current = false; };

    const addHoverListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select, .pill-tag, .glass-card").forEach((el) => {
        el.addEventListener("mouseenter", () => { isHovering.current = true; });
        el.addEventListener("mouseleave", () => { isHovering.current = false; });
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default CustomCursor;
