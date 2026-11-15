import React, {  Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { CanvasLoader } from "..";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";

//Three.js has built-in support for loading and displaying GLTF models through the 'GLTFLoader' module
const Computers: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -4.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {

  const [isMobile, setIsMobile] = useState(false); // if isMobilefalse
  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <p></p>
      ) : (
        <CanvasErrorBoundary>
          <Canvas
            frameloop="demand"
            shadows
            // Capped at 1.5: sharper than 1 on high-DPI screens, without 2×2 the graphics memory.
            dpr={[1, 1.5]}
            camera={{ position: [20, 3, 5], fov: 25 }}
          >
            <Suspense fallback={<CanvasLoader/>}>
              <OrbitControls
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
              <Computers isMobile={isMobile} />
            </Suspense>
            <Preload all />
          </Canvas>
        </CanvasErrorBoundary>
      )}
    </>
  );
};

export default ComputersCanvas;
