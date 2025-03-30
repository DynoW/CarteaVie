"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import styles from './styles.module.css';

interface EnchantingTableProps {
  className?: string;
}

const EnchantingTable: React.FC<EnchantingTableProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Capture the current value to use in cleanup
    const container = containerRef.current;

    // Detect if on mobile
    isMobileRef.current = window.innerWidth <= 768 || ('ontouchstart' in window);

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera with good viewing position
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, 0, 450);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true  // Transparent background
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;

    container.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Disable zoom for better user experience
    controls.enabled = isMobileRef.current; // Only enable dragging controls on mobile

    // Restrict movement to horizontal rotation only
    controls.minPolarAngle = Math.PI / 2; // 90 degrees
    controls.maxPolarAngle = Math.PI / 2; // 90 degrees
    controls.enablePan = false; // Disable panning

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load(
      '/models/3d.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -300, 0); // Move down 300px
        model.rotation.y = Math.PI / 6 - (Math.PI / 6); // Rotate 30 degrees to the left
        scene.add(model);
        setLoaded(true);
      },
      (xhr) => {
        console.log(xhr.loaded + ' bytes loaded');
      },
      (error) => {
        console.error('An error occurred loading the model:', error);
      }
    );

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Update mobile detection on resize
      isMobileRef.current = window.innerWidth <= 768 || ('ontouchstart' in window);
      controls.enabled = isMobileRef.current;
    };

    window.addEventListener('resize', handleResize);

    // Mouse movement handler for desktop rotation
    const handleMouseMove = (event: MouseEvent) => {
      if (isMobileRef.current || !scene) return;

      // Calculate normalized mouse position (-1 to 1)
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      // Ignore vertical mouse movement

      // Apply rotation based on mouse position - horizontal only
      if (scene) {
        scene.rotation.y = mouseX * 0.3;
        // Remove the x rotation to prevent forward/backward movement
      }
    };

    // Add mouse move listener for desktop
    if (!isMobileRef.current) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Gentle oscillation on mobile (left and right movement)
      if (isMobileRef.current && scene.children.length > 2) {
        // Create a gentle oscillation using sine wave with slower speed
        scene.rotation.y = Math.sin(Date.now() * 0.0003) * 0.2; // Slower oscillation with reduced amplitude
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      container.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className} overflow-hidden`}
      style={{ position: 'absolute', bottom: 0, left: 0, pointerEvents: 'none' }}
    >
      {!loaded && (
        <div className={styles.loadingSpinner}>
          <div className={styles.minecraftSpinner}></div>
        </div>
      )}
    </div>
  );
};

export default EnchantingTable;