"use client";

import { useEffect, useRef } from "react";

interface Node {
  id: number;
  x: number; // base normalized 0..1
  y: number; // base normalized 0..1
  type: "normal" | "active" | "router" | "endpoint";
  label?: string;
  pulsePhase: number;
  pulseSpeed: number;
  baseOpacity: number;
}

interface Edge {
  from: number;
  to: number;
  isRightAngle?: boolean;
  isSecondary?: boolean;
  lifecycle?: {
    state: "idle" | "drawing" | "active" | "fading";
    progress: number;
    timer: number;
    duration: number;
  };
}

interface Particle {
  edgeIndex: number;
  progress: number; // 0..1
  speed: number;
  type: "dot" | "square" | "dash";
  forward: boolean;
}

export function HeroNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // State
    let animationFrameId: number;
    let isVisible = true;
    let scrollOpacity = 1;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Smooth Parallax physics
    let mouseX = 0;
    let mouseY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    // Fixed Architectural Topology Definition (Normalized 0..1)
    // Low density on left (text protection zone), High density on center-right & top-right
    const nodes: Node[] = [
      // Top horizontal backbone
      { id: 0, x: 0.15, y: 0.12, type: "normal", baseOpacity: 0.08, pulsePhase: 0, pulseSpeed: 0.001 },
      { id: 1, x: 0.38, y: 0.12, type: "endpoint", baseOpacity: 0.12, pulsePhase: 1.2, pulseSpeed: 0.0012 },
      { id: 2, x: 0.58, y: 0.12, type: "router", label: "NET/01", baseOpacity: 0.18, pulsePhase: 2.1, pulseSpeed: 0.0015 },
      { id: 3, x: 0.76, y: 0.12, type: "active", baseOpacity: 0.22, pulsePhase: 0.5, pulseSpeed: 0.0018 },
      { id: 4, x: 0.92, y: 0.12, type: "endpoint", baseOpacity: 0.12, pulsePhase: 3.0, pulseSpeed: 0.001 },

      // Upper right cluster
      { id: 5, x: 0.68, y: 0.22, type: "normal", baseOpacity: 0.10, pulsePhase: 1.8, pulseSpeed: 0.0014 },
      { id: 6, x: 0.85, y: 0.24, type: "router", label: "NODE.24", baseOpacity: 0.20, pulsePhase: 0.9, pulseSpeed: 0.0016 },
      { id: 7, x: 0.95, y: 0.28, type: "normal", baseOpacity: 0.09, pulsePhase: 2.4, pulseSpeed: 0.0011 },

      // Middle right cluster (Dense technical hub)
      { id: 8, x: 0.52, y: 0.36, type: "endpoint", baseOpacity: 0.11, pulsePhase: 3.2, pulseSpeed: 0.0013 },
      { id: 9, x: 0.64, y: 0.38, type: "active", label: "SYS.ACTIVE", baseOpacity: 0.24, pulsePhase: 0.2, pulseSpeed: 0.002 },
      { id: 10, x: 0.78, y: 0.42, type: "router", baseOpacity: 0.18, pulsePhase: 1.5, pulseSpeed: 0.0015 },
      { id: 11, x: 0.90, y: 0.44, type: "normal", baseOpacity: 0.12, pulsePhase: 2.7, pulseSpeed: 0.0012 },

      // Center-lower right
      { id: 12, x: 0.60, y: 0.56, type: "normal", baseOpacity: 0.10, pulsePhase: 0.7, pulseSpeed: 0.0014 },
      { id: 13, x: 0.72, y: 0.60, type: "router", label: "TX/04", baseOpacity: 0.20, pulsePhase: 2.9, pulseSpeed: 0.0017 },
      { id: 14, x: 0.86, y: 0.62, type: "active", baseOpacity: 0.22, pulsePhase: 1.1, pulseSpeed: 0.0019 },
      { id: 15, x: 0.96, y: 0.58, type: "endpoint", baseOpacity: 0.11, pulsePhase: 3.5, pulseSpeed: 0.001 },

      // Bottom right infrastructure
      { id: 16, x: 0.55, y: 0.78, type: "normal", baseOpacity: 0.08, pulsePhase: 1.6, pulseSpeed: 0.0012 },
      { id: 17, x: 0.70, y: 0.82, type: "endpoint", baseOpacity: 0.12, pulsePhase: 0.4, pulseSpeed: 0.0015 },
      { id: 18, x: 0.82, y: 0.86, type: "router", label: "ROUTE/02", baseOpacity: 0.18, pulsePhase: 2.2, pulseSpeed: 0.0016 },
      { id: 19, x: 0.94, y: 0.84, type: "normal", baseOpacity: 0.09, pulsePhase: 3.1, pulseSpeed: 0.0011 },

      // Minimal ambient nodes in upper left / far background (strictly outside primary text block)
      { id: 20, x: 0.08, y: 0.28, type: "normal", baseOpacity: 0.05, pulsePhase: 0.8, pulseSpeed: 0.0009 },
      { id: 21, x: 0.28, y: 0.32, type: "normal", baseOpacity: 0.06, pulsePhase: 2.0, pulseSpeed: 0.001 },
    ];

    // Connectivity
    const edges: Edge[] = [
      // Top line
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 3, to: 4 },

      // Top to upper right
      { from: 2, to: 5, isRightAngle: true },
      { from: 3, to: 6 },
      { from: 4, to: 7, isRightAngle: true },
      { from: 5, to: 6 },
      { from: 6, to: 7 },

      // Upper to middle right
      { from: 5, to: 8, isRightAngle: true },
      { from: 5, to: 9 },
      { from: 6, to: 10 },
      { from: 7, to: 11, isRightAngle: true },
      { from: 8, to: 9 },
      { from: 9, to: 10 },
      { from: 10, to: 11 },

      // Middle to lower
      { from: 8, to: 12, isRightAngle: true },
      { from: 9, to: 12 },
      { from: 10, to: 13, isRightAngle: true },
      { from: 11, to: 14 },
      { from: 11, to: 15, isRightAngle: true },
      { from: 12, to: 13 },
      { from: 13, to: 14 },
      { from: 14, to: 15 },

      // Lower to bottom
      { from: 12, to: 16, isRightAngle: true },
      { from: 13, to: 17, isRightAngle: true },
      { from: 14, to: 18 },
      { from: 15, to: 19, isRightAngle: true },
      { from: 16, to: 17 },
      { from: 17, to: 18 },
      { from: 18, to: 19 },

      // Ambient subtle ties
      { from: 0, to: 20, isSecondary: true, isRightAngle: true },
      { from: 20, to: 21, isSecondary: true },
      { from: 1, to: 21, isSecondary: true, isRightAngle: true },
      { from: 21, to: 8, isSecondary: true },
    ];

    // Data flow particles
    const particles: Particle[] = [
      { edgeIndex: 1, progress: 0.1, speed: 0.0018, type: "dot", forward: true },
      { edgeIndex: 5, progress: 0.6, speed: 0.0014, type: "square", forward: true },
      { edgeIndex: 9, progress: 0.3, speed: 0.0020, type: "dash", forward: true },
      { edgeIndex: 12, progress: 0.7, speed: 0.0015, type: "dot", forward: false },
      { edgeIndex: 17, progress: 0.4, speed: 0.0017, type: "square", forward: true },
      { edgeIndex: 21, progress: 0.8, speed: 0.0013, type: "dash", forward: false },
      { edgeIndex: 26, progress: 0.2, speed: 0.0016, type: "dot", forward: true },
    ];

    // Resize handler
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      if (prefersReducedMotion) {
        renderFrame(0);
      }
    };

    // Parallax pointer handler
    const handlePointerMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
      const relY = (e.clientY - rect.top) / (rect.height || 1) - 0.5;

      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Heavy parallax: max 10px offset opposite to cursor direction
      targetParallaxX = -relX * 12;
      targetParallaxY = -relY * 10;
    };

    // Scroll fade-out handler
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.bottom <= 0) {
        scrollOpacity = 0;
      } else {
        // Linear fade as hero leaves screen
        scrollOpacity = Math.max(0, Math.min(1, rect.bottom / (windowHeight * 0.75)));
      }
    };

    // Restart the rAF loop whenever the component becomes visible again
    const restartLoop = () => {
      if (!prefersReducedMotion && isVisible) {
        cancelAnimationFrame(animationFrameId);
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    };

    // Visibility observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          // Restart loop when scrolling back into view
          if (!wasVisible && isVisible) restartLoop();
        });
      },
      { threshold: 0 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      const wasVisible = isVisible;
      isVisible = document.visibilityState === "visible";
      if (!wasVisible && isVisible) restartLoop();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    handleResize();
    handleScroll();

    // Helper: calculate edge point coordinates considering right-angle routing
    const getEdgePoints = (edge: Edge, px: number, py: number) => {
      const n1 = nodes[edge.from];
      const n2 = nodes[edge.to];
      const x1 = n1.x * width + px;
      const y1 = n1.y * height + py;
      const x2 = n2.x * width + px;
      const y2 = n2.y * height + py;

      if (!edge.isRightAngle) {
        return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
      }

      // Orthogonal right angle waypoint: horizontal then vertical
      const midX = x2;
      const midY = y1;
      return [{ x: x1, y: y1 }, { x: midX, y: midY }, { x: x2, y: y2 }];
    };

    // Helper: interpolate point along multi-segment polyline
    const getPointAlongPolyline = (pts: { x: number; y: number }[], t: number) => {
      if (pts.length === 2) {
        return {
          x: pts[0].x + (pts[1].x - pts[0].x) * t,
          y: pts[0].y + (pts[1].y - pts[0].y) * t,
        };
      }

      // 3 points (right angle)
      const d1 = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      const d2 = Math.hypot(pts[2].x - pts[1].x, pts[2].y - pts[1].y);
      const total = d1 + d2;
      const targetDist = t * total;

      if (targetDist <= d1) {
        const segT = d1 > 0 ? targetDist / d1 : 0;
        return {
          x: pts[0].x + (pts[1].x - pts[0].x) * segT,
          y: pts[0].y + (pts[1].y - pts[0].y) * segT,
        };
      } else {
        const segT = d2 > 0 ? (targetDist - d1) / d2 : 0;
        return {
          x: pts[1].x + (pts[2].x - pts[1].x) * segT,
          y: pts[1].y + (pts[2].y - pts[1].y) * segT,
        };
      }
    };

    // Render loop
    let lastTime = performance.now();

    const renderFrame = (timestamp: number) => {
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      if (scrollOpacity <= 0.01) return;

      // Parallax smooth interpolation (heavy feel lerp)
      if (!prefersReducedMotion) {
        currentParallaxX += (targetParallaxX - currentParallaxX) * 0.035;
        currentParallaxY += (targetParallaxY - currentParallaxY) * 0.035;
      }

      ctx.save();
      ctx.globalAlpha = scrollOpacity;

      // 1. Subtle Technical Grid (rgba(0, 0, 0, 0.025))
      const gridSize = 80;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.022)";
      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Subtle coordinate intersection marks on the right side
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      for (let x = Math.floor(width * 0.5); x < width; x += gridSize * 2) {
        for (let y = gridSize; y < height - gridSize; y += gridSize * 2) {
          ctx.fillRect(x - 2, y, 4, 0.5);
          ctx.fillRect(x, y - 2, 0.5, 4);
        }
      }

      // 2. Network Lines (Edges)
      edges.forEach((edge) => {
        const pts = getEdgePoints(edge, currentParallaxX, currentParallaxY);
        const isSecondary = edge.isSecondary;

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].x, pts[i].y);
        }

        ctx.lineWidth = isSecondary ? 0.5 : 0.75;
        ctx.strokeStyle = isSecondary ? "rgba(0, 0, 0, 0.035)" : "rgba(0, 0, 0, 0.075)";
        ctx.stroke();
      });

      // 3. Moving Data Flow Particles (Adapted responsively for Mobile & Desktop)
      if (!prefersReducedMotion) {
        const isMobile = width < 640;
        const activeParticles = isMobile ? particles.slice(0, 3) : particles;

        activeParticles.forEach((p) => {
          const edge = edges[p.edgeIndex];
          if (!edge) return;

          // Advance progress
          p.progress += p.speed * (delta || 16);
          if (p.progress > 1) {
            p.progress = 0;
            // Switch edge dynamically among adjacent connections for natural continuous flow
            const nextEdges = edges
              .map((e, idx) => ({ e, idx }))
              .filter(
                (item) =>
                  item.idx !== p.edgeIndex &&
                  (item.e.from === edge.to || item.e.to === edge.to || item.e.from === edge.from)
              );
            if (nextEdges.length > 0) {
              const picked = nextEdges[Math.floor(Math.random() * nextEdges.length)];
              p.edgeIndex = picked.idx;
            }
          }

          const pts = getEdgePoints(edge, currentParallaxX, currentParallaxY);
          const t = p.forward ? p.progress : 1 - p.progress;
          const pos = getPointAlongPolyline(pts, t);

          ctx.fillStyle = isMobile ? "rgba(0, 0, 0, 0.22)" : "rgba(0, 0, 0, 0.32)";
          if (p.type === "dot") {
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, isMobile ? 1.4 : 1.75, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.type === "square") {
            const sz = isMobile ? 2.5 : 3;
            ctx.fillRect(pos.x - sz / 2, pos.y - sz / 2, sz, sz);
          } else if (p.type === "dash") {
            ctx.fillRect(pos.x - 2.5, pos.y - 0.75, isMobile ? 4 : 6, 1.2);
          }
        });
      }

      // 4. Network Nodes & Technical Micro Labels
      nodes.forEach((node) => {
        const nx = node.x * width + currentParallaxX;
        const ny = node.y * height + currentParallaxY;

        // Proximity calculation
        let proximityBoost = 0;
        if (!prefersReducedMotion && mouseX > 0 && mouseY > 0) {
          const dist = Math.hypot(mouseX - nx, mouseY - ny);
          if (dist < 140) {
            proximityBoost = (1 - dist / 140) * 0.12;
          }
        }

        // Pulse calculation
        let pulseScale = 1;
        let pulseOpacity = node.baseOpacity + proximityBoost;

        if (!prefersReducedMotion) {
          node.pulsePhase += node.pulseSpeed * (delta || 16);
          const sinVal = (Math.sin(node.pulsePhase) + 1) / 2; // 0..1
          pulseOpacity += sinVal * 0.08;
          pulseScale = 1 + sinVal * 0.14;
        }

        ctx.save();
        ctx.translate(nx, ny);
        ctx.scale(pulseScale, pulseScale);

        if (node.type === "normal") {
          // Small outlined circle
          ctx.beginPath();
          ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 0, 0, ${pulseOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (node.type === "active") {
          // Solid subtle black circle
          ctx.beginPath();
          ctx.arc(0, 0, 2.75, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 0, 0, ${pulseOpacity * 1.2})`;
          ctx.fill();
        } else if (node.type === "router") {
          // Small solid square
          ctx.fillStyle = `rgba(0, 0, 0, ${pulseOpacity * 1.1})`;
          ctx.fillRect(-2, -2, 4, 4);
        } else if (node.type === "endpoint") {
          // Small outlined square
          ctx.strokeStyle = `rgba(0, 0, 0, ${pulseOpacity})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(-2.5, -2.5, 5, 5);
        }

        ctx.restore();

        // Technical Micro Label (Monospace, 8.5px, crisp editorial opacity)
        if (node.label && width > 480) {
          ctx.font = "8.5px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
          ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.28, node.baseOpacity * 1.5 + proximityBoost)})`;
          ctx.fillText(node.label, nx + 7, ny + 3);
        }
      });

      ctx.restore();

      if (!prefersReducedMotion && isVisible) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }
      // Safety: if the loop was stopped externally but we are still visible, restart
      // (covers Next.js hash-navigation edge cases)
    };

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(renderFrame);
    } else {
      renderFrame(0);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
