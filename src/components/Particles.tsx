import React, { useEffect, useRef } from "react";
import { Renderer } from "ogl";

import './Particles.css';

const defaultColors = ["#ffffff", "#ffffff", "#ffffff"];

const hexToRgb = (hex: string) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    
    // Calculate point size based on the point's distance from camera
    // Multiplied by 2.0 instead of 3.0 to make them smaller
    float pointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz) * 2.0;
    gl_PointSize = max(pointSize, 0.8); // Ensure minimum size, but smaller than before
    
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

interface ParticlesProps {
  particleCount?: number,
  particleSpread?: number,
  speed?: number,
  particleColors?: string[],
  moveParticlesOnHover?: boolean,
  particleHoverFactor?: number,
  alphaParticles?: boolean,
  particleBaseSize?: number,
  sizeRandomness?: number,
  cameraDistance?: number,
  disableRotation?: boolean,
  className?: string,
}

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup renderer
    const renderer = new Renderer({ dpr: 2, alpha: true, antialias: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    
    // Make sure canvas is full width/height and properly appended
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    
    container.appendChild(gl.canvas);

    // Create WebGL program directly
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, vertex);
    gl.compileShader(vs);
    
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, fragment);
    gl.compileShader(fs);
    
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not link program', gl.getProgramInfoLog(program));
      return;
    }
    
    // Particles setup
    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = particleColors && particleColors.length > 0 ? particleColors : defaultColors;

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);
      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
      const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
      colors.set(col, i * 3);
    }

    // Create buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const randomBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, randomBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, randoms, gl.STATIC_DRAW);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    // Create projection matrix
    const fov = 15 * (Math.PI / 180);
    let aspect = 1;
    
    const perspective = (fov: number, aspect: number, near = 0.1, far = 100) => {
      const f = 1.0 / Math.tan(fov / 2);
      const nf = 1 / (near - far);
      
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, 2 * far * near * nf, 0
      ]);
    };

    // Get attribute and uniform locations
    gl.useProgram(program);
    
    const positionLocation = gl.getAttribLocation(program, 'position');
    const randomLocation = gl.getAttribLocation(program, 'random');
    const colorLocation = gl.getAttribLocation(program, 'color');
    
    // Get uniform locations
    const uTimeLocation = gl.getUniformLocation(program, 'uTime');
    const uSpreadLocation = gl.getUniformLocation(program, 'uSpread');
    const uBaseSizeLocation = gl.getUniformLocation(program, 'uBaseSize');
    const uSizeRandomnessLocation = gl.getUniformLocation(program, 'uSizeRandomness');
    const uAlphaParticlesLocation = gl.getUniformLocation(program, 'uAlphaParticles');
    const projectionMatrixLocation = gl.getUniformLocation(program, 'projectionMatrix');
    const modelMatrixLocation = gl.getUniformLocation(program, 'modelMatrix');
    const viewMatrixLocation = gl.getUniformLocation(program, 'viewMatrix');
    
    // Set constant uniforms
    gl.uniform1f(uSpreadLocation, particleSpread);
    gl.uniform1f(uBaseSizeLocation, particleBaseSize);
    gl.uniform1f(uSizeRandomnessLocation, sizeRandomness);
    gl.uniform1f(uAlphaParticlesLocation, alphaParticles ? 1 : 0);

    // Create position, rotation, and matrix for particles
    const particlePosition = { x: 0, y: 0, z: 0 };
    const particleRotation = { x: 0, y: 0, z: 0 };
    const modelMatrix = new Float32Array(16);
    
    // Identity matrix
    modelMatrix.set([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
    
    // Resize function to handle window changes
    const resize = () => {
      if (!container) return;
      
      // Get the actual size of the container
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Set canvas dimensions to match container
      gl.canvas.width = width * window.devicePixelRatio;
      gl.canvas.height = height * window.devicePixelRatio;
      gl.canvas.style.width = width + 'px';
      gl.canvas.style.height = height + 'px';
      
      // Update viewport
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      
      // Update aspect ratio for projection
      aspect = width / height;
      const projectionMatrix = perspective(fov, aspect);
      gl.useProgram(program);
      gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
    };
    
    window.addEventListener("resize", resize);

    // Mouse movement handling
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x, y };
    };

    if (moveParticlesOnHover) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    
    // Initial resize to set correct viewport
    resize();

    // Animation setup
    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (t: number) => {
      animationFrameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime = t;
      elapsed += delta * speed;

      // Update mouse position if needed
      if (moveParticlesOnHover) {
        particlePosition.x = -mouseRef.current.x * particleHoverFactor;
        particlePosition.y = -mouseRef.current.y * particleHoverFactor;
      } else {
        particlePosition.x = 0;
        particlePosition.y = 0;
      }

      // Update rotation
      if (!disableRotation) {
        particleRotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particleRotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particleRotation.z += 0.01 * speed;
      }
      
      // Update model matrix with rotation and position
      const cx = Math.cos(particleRotation.x), sx = Math.sin(particleRotation.x);
      const cy = Math.cos(particleRotation.y), sy = Math.sin(particleRotation.y);
      const cz = Math.cos(particleRotation.z), sz = Math.sin(particleRotation.z);
      
      // Rotation matrix
      modelMatrix[0] = cy * cz;
      modelMatrix[1] = cy * sz;
      modelMatrix[2] = -sy;
      
      modelMatrix[4] = sx * sy * cz - cx * sz;
      modelMatrix[5] = sx * sy * sz + cx * cz;
      modelMatrix[6] = sx * cy;
      
      modelMatrix[8] = cx * sy * cz + sx * sz;
      modelMatrix[9] = cx * sy * sz - sx * cz;
      modelMatrix[10] = cx * cy;
      
      // Translation
      modelMatrix[12] = particlePosition.x;
      modelMatrix[13] = particlePosition.y;
      modelMatrix[14] = particlePosition.z;
      
      // Create view matrix (simple camera)
      const viewMatrix = new Float32Array(16);
      viewMatrix.set([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, -cameraDistance, 1
      ]);
      
      // Render frame
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      
      // Update time-varying uniforms
      gl.uniform1f(uTimeLocation, elapsed * 0.001);
      gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix);
      gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
      
      // Set attribute pointers
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, randomBuffer);
      gl.enableVertexAttribArray(randomLocation);
      gl.vertexAttribPointer(randomLocation, 4, gl.FLOAT, false, 0, 0);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.enableVertexAttribArray(colorLocation);
      gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
      
      // Enable point rendering with blending
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      // Ensure points are properly sized (WebGL 1.0 fix for some browsers)
      try {
        // @ts-ignore - Some implementations may have this as a string property
        gl.enable(0x8642); // VERTEX_PROGRAM_POINT_SIZE constant value
      } catch (e) {
        console.warn('Could not enable VERTEX_PROGRAM_POINT_SIZE');
      }
      
      // Draw the points
      gl.drawArrays(gl.POINTS, 0, particleCount);
    };

    animationFrameId = requestAnimationFrame(update);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
      
      // Clean up WebGL resources
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(randomBuffer);
      gl.deleteBuffer(colorBuffer);
      
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    particleColors,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
  ]);

  return (
    <div
      ref={containerRef}
      className={`particles-container ${className || ''}`}
    />
  );
};

export default Particles; 