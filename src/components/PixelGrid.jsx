import { useEffect, useRef } from 'react';
import homeBg from '../assets/home_bg.png';

const TILE = 48;          // pixel block size in px
const SPEED = 0.018;      // fraction of tiles revealed per frame tick
const STAGGER_MAX = 120;  // max random delay in ticks before a tile starts

export default function PixelGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let imgLoaded = false;

    const img = new Image();
    img.src = homeBg;

    img.onload = () => {
      imgLoaded = true;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const cols = () => Math.ceil(canvas.width / TILE);
    const rows = () => Math.ceil(canvas.height / TILE);

    // Build tile list with staggered start delays
    let tiles = [];
    const buildTiles = () => {
      tiles = [];
      const c = cols();
      const r = rows();
      for (let row = 0; row < r; row++) {
        for (let col = 0; col < c; col++) {
          tiles.push({
            col,
            row,
            delay: Math.floor(Math.random() * STAGGER_MAX),
            progress: 0,   // 0 → 1
            done: false,
          });
        }
      }
    };
    buildTiles();
    window.addEventListener('resize', buildTiles);

    let tick = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allDone = true;

      const getSourceRect = (x, y, w, h) => {
        const imgAspect = img.width / img.height;
        const canvasAspect = canvas.width / canvas.height;
        let renderW, renderH, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
          renderW = canvas.width;
          renderH = canvas.width / imgAspect;
          offsetX = 0;
          offsetY = (renderH - canvas.height) / 2;
        } else {
          renderH = canvas.height;
          renderW = canvas.height * imgAspect;
          offsetX = (renderW - canvas.width) / 2;
          offsetY = 0;
        }

        const scale = img.width / renderW;
        return {
          sx: (x + offsetX) * scale,
          sy: (y + offsetY) * scale,
          sw: w * scale,
          sh: h * scale
        };
      };

      const drawCoverImage = () => {
        const imgAspect = img.width / img.height;
        const canvasAspect = canvas.width / canvas.height;
        let renderW, renderH, renderX, renderY;

        if (canvasAspect > imgAspect) {
          renderW = canvas.width;
          renderH = canvas.width / imgAspect;
          renderX = 0;
          renderY = (canvas.height - renderH) / 2;
        } else {
          renderH = canvas.height;
          renderW = canvas.height * imgAspect;
          renderX = (canvas.width - renderW) / 2;
          renderY = 0;
        }

        ctx.drawImage(img, renderX, renderY, renderW, renderH);
      };

      tiles.forEach((tile) => {
        const x = tile.col * TILE;
        const y = tile.row * TILE;
        const w = Math.min(TILE, canvas.width - x);
        const h = Math.min(TILE, canvas.height - y);

        // Always draw the background grid placeholders
        ctx.fillStyle = '#011E3D';
        ctx.fillRect(x, y, w, h);

        // Draw glowing grid lines instantly on boot
        ctx.strokeStyle = 'rgba(37,99,235,0.12)';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);

        if (!imgLoaded) {
          allDone = false;
          return;
        }

        const { sx, sy, sw, sh } = getSourceRect(x, y, w, h);

        if (tile.done) {
          ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
          return;
        }

        allDone = false;

        if (tick < tile.delay) {
          return;
        }

        tile.progress = Math.min(1, tile.progress + SPEED * 3.5);

        const scale = tile.progress;
        const cx = x + w / 2;
        const cy = y + h / 2;
        const dw = w * scale;
        const dh = h * scale;

        // Growing image slice (clipped to tile)
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();
        ctx.globalAlpha = scale;
        ctx.drawImage(
          img,
          sx, sy, sw, sh,         // source
          cx - dw / 2, cy - dh / 2, dw, dh  // dest
        );
        ctx.globalAlpha = 1;
        ctx.restore();

        // Blue glowing border
        const glow = 1 - scale;
        if (glow > 0.05) {
          ctx.strokeStyle = `rgba(37,99,235,${glow * 0.7})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
        }

        if (tile.progress >= 1) tile.done = true;
      });

      if (imgLoaded) {
        tick++;
      }

      if (!allDone || !imgLoaded) {
        animFrame = requestAnimationFrame(draw);
      } else {
        drawCoverImage();
      }
    };

    animFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', buildTiles);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
      }}
    />
  );
}
