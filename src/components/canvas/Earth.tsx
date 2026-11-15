import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../layout/Loader";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import WhenVisible from "./WhenVisible";

const Earth = () => {
  const earth = useGLTF("./earth_hologram/scene.gltf");
  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    // At the bottom of the page: only created when the visitor scrolls near it.
    <WhenVisible className="h-full w-full">
      <CanvasErrorBoundary>
        <Canvas
          shadows
          frameloop="demand"
          // Capped at 1.5: sharper than 1 on high-DPI screens, without 2×2 the graphics memory.
          dpr={[1, 1.5]}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              autoRotate
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Earth />

            <Preload all />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </WhenVisible>
  );
};

export default EarthCanvas;
