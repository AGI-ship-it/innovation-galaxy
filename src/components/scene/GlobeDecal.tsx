"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const LOGO_URL = "/brand/al-ghurair-logo.png";
const W = 2048;
const H = 1024;
/** Equirect x of the point on the sphere that faces local +z (u = 0.25). */
const FRONT_X = W * 0.25;
const PX_PER_DEG = H / 180;
const INK = "#3a1d5c";

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** The mark is artwork on white; turn the white into transparency (un-premultiplying the ink). */
function knockOutWhite(img: HTMLImageElement) {
  const c = document.createElement("canvas");
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, c.width, c.height);
  const d = data.data;
  for (let i = 0; i < d.length; i += 4) {
    const a = (255 - Math.min(d[i], d[i + 1], d[i + 2])) / 255;
    if (a < 0.04) {
      d[i + 3] = 0;
      continue;
    }
    for (let k = 0; k < 3; k++) d[i + k] = Math.max(0, Math.min(255, (d[i + k] - 255 * (1 - a)) / a));
    d[i + 3] = a * 255;
  }
  ctx.putImageData(data, 0, 0);
  return c;
}

/**
 * Builds colour + bump textures in equirect space. Content is centred on the
 * front meridian; widths are divided by cos(latitude) so nothing looks
 * stretched once wrapped onto the sphere.
 */
async function buildDecal(title: string) {
  const [img] = await Promise.all([loadImage(LOGO_URL), document.fonts?.ready]);
  const mark = knockOutWhite(img);
  const font = getComputedStyle(document.body).fontFamily;

  const color = document.createElement("canvas");
  color.width = W;
  color.height = H;
  const ctx = color.getContext("2d")!;

  // Logo (wordmark + mark) above the equator.
  const markLat = 14;
  const markH = 26 * PX_PER_DEG;
  const markW = ((markH * mark.width) / mark.height) / Math.cos(THREE.MathUtils.degToRad(markLat));
  const markY = H / 2 - markLat * PX_PER_DEG;
  ctx.drawImage(mark, FRONT_X - markW / 2, markY - markH / 2, markW, markH);

  // Title just below the equator.
  const titleLat = -12;
  const size = 11 * PX_PER_DEG;
  ctx.save();
  ctx.translate(FRONT_X, H / 2 - titleLat * PX_PER_DEG);
  ctx.scale(1 / Math.cos(THREE.MathUtils.degToRad(titleLat)), 1);
  ctx.font = `500 ${size}px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = INK;
  ctx.fillText(title, 0, 0);
  ctx.restore();

  // Bump from coverage: ink sits proud of the surface, like an emboss.
  const bump = document.createElement("canvas");
  bump.width = W;
  bump.height = H;
  const b = bump.getContext("2d")!;
  b.fillStyle = "#000";
  b.fillRect(0, 0, W, H);
  b.filter = "blur(3px)";
  b.drawImage(color, 0, 0);
  const bd = b.getImageData(0, 0, W, H);
  for (let i = 0; i < bd.data.length; i += 4) {
    // Coloured pixels drawn over black: use alpha-weighted presence as height.
    const v = bd.data[i] || bd.data[i + 1] || bd.data[i + 2] ? 255 : 0;
    bd.data[i] = bd.data[i + 1] = bd.data[i + 2] = v;
  }
  b.putImageData(bd, 0, 0);
  b.filter = "blur(2px)";
  b.drawImage(bump, 0, 0);

  const map = new THREE.CanvasTexture(color);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  const bumpMap = new THREE.CanvasTexture(bump);
  return { map, bumpMap };
}

/**
 * Brand mark and title printed onto a shell hugging the globe. The shell turns
 * with the camera so the print always faces the viewer while still curving
 * and catching light like part of the planet.
 */
export function GlobeDecal({ radius, title }: { radius: number; title: string }) {
  const shell = useRef<THREE.Mesh>(null);
  const [textures, setTextures] = useState<{ map: THREE.Texture; bumpMap: THREE.Texture } | null>(null);

  useEffect(() => {
    let alive = true;
    let built: { map: THREE.Texture; bumpMap: THREE.Texture } | null = null;
    buildDecal(title).then((t) => {
      built = t;
      if (alive) setTextures(t);
      else {
        t.map.dispose();
        t.bumpMap.dispose();
      }
    });
    return () => {
      alive = false;
      built?.map.dispose();
      built?.bumpMap.dispose();
    };
  }, [title]);

  useFrame(({ camera }) => {
    shell.current?.quaternion.copy(camera.quaternion);
  });

  if (!textures) return null;

  return (
    <mesh ref={shell} raycast={() => null} renderOrder={1}>
      <sphereGeometry args={[radius * 1.004, 128, 64]} />
      <meshStandardMaterial
        map={textures.map}
        bumpMap={textures.bumpMap}
        bumpScale={4}
        // Darker diffuse response keeps the ink deep purple under the strong key light.
        color="#4d3d60"
        transparent
        depthWrite={false}
        roughness={0.55}
        metalness={0.1}
        emissive="#ffffff"
        emissiveMap={textures.map}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}
