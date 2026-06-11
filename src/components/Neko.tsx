import { useEffect, useRef } from 'react';

const SPRITE_SETS: Record<string, [number, number][]> = {
  idle:        [[-3,-3]],
  alert:       [[-7,-3]],
  scratchSelf: [[-5,0],[-6,0],[-7,0]],
  scratchWall: [[0,0],[0,-1]],
  tired:       [[-3,-2]],
  sleeping:    [[-2,0],[-2,-1]],
  N:  [[0,-3],[0,-4]],
  NE: [[-1,-3],[-1,-4]],
  E:  [[-3,0],[-3,-1]],
  SE: [[-5,-1],[-5,-2]],
  S:  [[-6,-3],[-7,-3]],
  SW: [[-5,-3],[-6,-3]],
  W:  [[-4,-2],[-4,-3]],
  NW: [[-1,-2],[-1,-3]],
};

const SKINS = [
  { filter: 'none',               label: 'orange' },
  { filter: 'hue-rotate(120deg)', label: 'green'  },
  { filter: 'hue-rotate(220deg)', label: 'blue'   },
  { filter: 'hue-rotate(300deg)', label: 'pink'   },
  { filter: 'grayscale(1)',       label: 'ghost'  },
];

export default function Neko() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const con = containerRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    let nekoPosX = 32, nekoPosY = 32;
    let mousePosX = 0, mousePosY = 0;
    let frameCount = 0, idleTime = 0;
    let idleAnimation: string | null = null, idleAnimationFrame = 0;
    const nekoSpeed = 20;

    let isScared = false, scaredFrames = 0;
    let isDragging = false, dragMayStart = false, wasDragged = false;
    let dragStartX = 0, dragStartY = 0;
    let lastMouseX = 0, lastMouseY = 0;
    let lastScrollY = window.scrollY;
    let skinIndex = 0;
    let currentSpriteName = 'idle', currentSpriteFrame = 0;
    let clickTimer: ReturnType<typeof setTimeout> | null = null;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = 'https://cdn.jsdelivr.net/gh/adryd325/oneko.js/oneko.gif';

    function drawSprite(name: string, frame: number) {
      const set = SPRITE_SETS[name];
      const sprite = set[frame % set.length];
      ctx.clearRect(0, 0, 32, 32);
      ctx.filter = SKINS[skinIndex].filter;
      ctx.drawImage(img, -sprite[0] * 32, -sprite[1] * 32, 32, 32, 0, 0, 32, 32);
    }

    function setSprite(name: string, frame: number) {
      currentSpriteName = name;
      currentSpriteFrame = frame;
      if (img.complete) drawSprite(name, frame);
    }

    img.onload = () => drawSprite(currentSpriteName, currentSpriteFrame);

    function spawnBubble(text: string, color = '#4ade80') {
      const b = document.createElement('div');
      Object.assign(b.style, {
        position: 'fixed',
        left: `${nekoPosX + 88}px`,
        top: `${nekoPosY - 20}px`,
        background: '#0f0f0f',
        border: '1px solid #2a2a2a',
        color,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '11px',
        padding: '4px 10px',
        borderRadius: '2px',
        pointerEvents: 'none',
        zIndex: '999999',
        whiteSpace: 'nowrap',
        animation: 'meow-float 1.6s ease forwards',
      });
      b.textContent = text;
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 1600);
    }

    function resetIdleAnimation() { idleAnimation = null; idleAnimationFrame = 0; }

    function idle() {
      idleTime++;
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && !idleAnimation) {
        const anims = ['sleeping', 'scratchSelf'];
        if (nekoPosX < 32) anims.push('scratchWall');
        idleAnimation = anims[Math.floor(Math.random() * anims.length)];
      }
      switch (idleAnimation) {
        case 'sleeping':
          if (idleAnimationFrame < 8) { setSprite('tired', 0); break; }
          setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) resetIdleAnimation();
          break;
        case 'scratchWall':
          setSprite('scratchWall', idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdleAnimation();
          break;
        case 'scratchSelf':
          setSprite('scratchSelf', idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setSprite('idle', 0); return;
      }
      idleAnimationFrame++;
    }

    function moveNeko() {
      con.style.left = `${nekoPosX - 16}px`;
      con.style.top  = `${nekoPosY - 16}px`;
    }

    function frame() {
      if (isDragging) return;
      frameCount++;

      if (isScared) {
        scaredFrames--;
        if (scaredFrames <= 0) isScared = false;
        setSprite('alert', 0);
        const dx = nekoPosX - mousePosX, dy = nekoPosY - mousePosY;
        const d = Math.sqrt(dx ** 2 + dy ** 2) || 1;
        nekoPosX = Math.min(Math.max(16, nekoPosX + (dx / d) * nekoSpeed * 1.4), window.innerWidth - 16);
        nekoPosY = Math.min(Math.max(16, nekoPosY + (dy / d) * nekoSpeed * 1.4), window.innerHeight - 16);
        moveNeko(); return;
      }

      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const dist  = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (dist < nekoSpeed || dist < 48) { idle(); return; }

      idleAnimation = null; idleAnimationFrame = 0; idleTime = 0;

      let dir = '';
      if (diffY / dist >  0.5) dir += 'N';
      if (diffY / dist < -0.5) dir += 'S';
      if (diffX / dist >  0.5) dir += 'W';
      if (diffX / dist < -0.5) dir += 'E';
      setSprite(dir || 'idle', frameCount);

      nekoPosX -= (diffX / dist) * nekoSpeed;
      nekoPosY -= (diffY / dist) * nekoSpeed;
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
      moveNeko();
    }

    const interval = setInterval(frame, 100);

    const onMouseMove = (e: MouseEvent) => {
      const vx = e.clientX - lastMouseX, vy = e.clientY - lastMouseY;
      lastMouseX = e.clientX; lastMouseY = e.clientY;

      if (dragMayStart && !isDragging) {
        if (Math.sqrt((e.clientX - dragStartX) ** 2 + (e.clientY - dragStartY) ** 2) > 6) {
          isDragging = true; wasDragged = true;
          con.style.cursor = 'grabbing';
          setSprite('alert', 0);
        }
      }
      if (isDragging) {
        nekoPosX = e.clientX; nekoPosY = e.clientY;
        moveNeko();
      } else {
        mousePosX = e.clientX; mousePosY = e.clientY;
        if (Math.sqrt(vx ** 2 + vy ** 2) > 40 && !isScared) {
          isScared = true; scaredFrames = 14;
          spawnBubble('!!', '#e05050');
        }
      }
    };

    const onMouseUp = () => {
      dragMayStart = false;
      if (!isDragging) return;
      isDragging = false;
      con.style.cursor = 'pointer';
      mousePosX = nekoPosX; mousePosY = nekoPosY;
    };

    const onConMouseDown = (e: MouseEvent) => {
      dragMayStart = true; wasDragged = false;
      dragStartX = e.clientX; dragStartY = e.clientY;
      e.preventDefault();
    };

    const onConClick = (e: MouseEvent) => {
      if (wasDragged) return;
      e.stopPropagation();
      if (clickTimer) clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        con.style.transform = 'scale(1.3) rotate(360deg)';
        setTimeout(() => { con.style.transform = ''; }, 380);
        clickTimer = null;
      }, 220);
    };

    const onConDblClick = (e: MouseEvent) => {
      e.stopPropagation();
      if (clickTimer) { clearTimeout(clickTimer); clickTimer = null; }
      const msgs = ['nyaa~', 'meow!', '=^.^=', 'purr~', '...zzz'];
      spawnBubble(msgs[Math.floor(Math.random() * msgs.length)]);
    };

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      mousePosY = Math.min(Math.max(16, mousePosY + delta * 0.9), window.innerHeight - 16);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (e.key.toLowerCase() !== 's' || tag === 'INPUT' || tag === 'TEXTAREA') return;
      skinIndex = (skinIndex + 1) % SKINS.length;
      drawSprite(currentSpriteName, currentSpriteFrame);
      spawnBubble(`skin: ${SKINS[skinIndex].label}`, '#aaa');
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll);
    con.addEventListener('mousedown', onConMouseDown);
    con.addEventListener('click', onConClick);
    con.addEventListener('dblclick', onConDblClick);

    return () => {
      clearInterval(interval);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
      con.removeEventListener('mousedown', onConMouseDown);
      con.removeEventListener('click', onConClick);
      con.removeEventListener('dblclick', onConDblClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: 96, height: 96,
        position: 'fixed',
        left: 16, top: 16,
        zIndex: 99999,
        pointerEvents: 'auto',
        cursor: 'pointer',
        overflow: 'visible',
        transition: 'transform 0.35s ease',
      }}
    >
      <canvas
        ref={canvasRef}
        width={32}
        height={32}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          imageRendering: 'pixelated',
          transform: 'scale(3)',
          transformOrigin: 'top left',
        }}
      />
    </div>
  );
}
