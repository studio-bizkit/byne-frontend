'use client';

import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  MotionValue,
  useSpring
} from 'framer-motion';

// Shape generator type for extensibility
type ShapeGenerator = (
  size: number,
  position: { x: number; y: number }
) => string;

// Configuration interface
interface ScrollMaskConfig {
  initialScale?: number;
  finalScale?: number;
  position?: { x: string | number; y: string | number };
  shape?: 'circle' | 'rect' | 'ellipse' | 'hexagon' | 'bean';
  customShape?: ShapeGenerator;
  scrollOffset?: [string, string];
  smoothness?: number;
  triggerElement?: React.RefObject<HTMLElement>;
  debug?: boolean;
}

interface ScrollMaskTransitionProps {
  current: ReactNode;
  next: ReactNode;
  config?: ScrollMaskConfig;
  className?: string;
  containerHeight?: string | number;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  sectionId?: string;
}

// Default configuration
const defaultConfig: Required<Omit<ScrollMaskConfig, 'customShape' | 'triggerElement'>> = {
  initialScale: 0,
  finalScale: 200, // Percentage of viewport diagonal
  position: { x: '50%', y: '50%' },
  shape: 'circle',
  scrollOffset: ['start end', 'end start'],
  smoothness: 0.25,
  debug: false,
};

// Shape generators
const shapeGenerators: Record<string, ShapeGenerator> = {
  circle: (size: number, pos: { x: number; y: number }) => {
    const radius = size / 2;
    return `M ${pos.x - radius} ${pos.y} 
            a ${radius} ${radius} 0 1 0 ${size} 0 
            a ${radius} ${radius} 0 1 0 -${size} 0 Z`;
  },
  
  ellipse: (size: number, pos: { x: number; y: number }) => {
    const rx = size / 2;
    const ry = size / 3;
    return `M ${pos.x - rx} ${pos.y} 
            a ${rx} ${ry} 0 1 0 ${rx * 2} 0 
            a ${rx} ${ry} 0 1 0 -${rx * 2} 0 Z`;
  },
  
  rect: (size: number, pos: { x: number; y: number }) => {
    const half = size / 2;
    return `M ${pos.x - half} ${pos.y - half} 
            h ${size} v ${size} h -${size} Z`;
  },
  
  hexagon: (size: number, pos: { x: number; y: number }) => {
    const radius = size / 2;
    const angles = Array.from({ length: 6 }, (_, i) => (i * Math.PI * 2) / 6 - Math.PI / 2);
    const points = angles.map(angle => ({
      x: pos.x + Math.cos(angle) * radius,
      y: pos.y + Math.sin(angle) * radius,
    }));
    
    return `M ${points[0].x} ${points[0].y} ${points
      .slice(1)
      .map(p => `L ${p.x} ${p.y}`)
      .join(' ')} Z`;
  },

  bean: (size: number, pos: { x: number; y: number }) => {
    // Bean shape based on the SVG path from bean-white.svg
    const scale = size / 100; // Scale the bean to fit the size
    const scaledPath = `M${25.9525 * scale + pos.x - size/2} ${87.3165 * scale + pos.y - size/2}C${21.4931 * scale + pos.x - size/2} ${90.5555 * scale + pos.y - size/2} ${16.5425 * scale + pos.x - size/2} ${93.033 * scale + pos.y - size/2} ${11.2931 * scale + pos.x - size/2} ${94.6527 * scale + pos.y - size/2}C${10.9466 * scale + pos.x - size/2} ${94.7599 * scale + pos.y - size/2} ${10.5761 * scale + pos.x - size/2} ${94.7619 * scale + pos.y - size/2} ${10.2269 * scale + pos.x - size/2} ${94.6582 * scale + pos.y - size/2}C${9.87774 * scale + pos.x - size/2} ${94.5545 * scale + pos.y - size/2} ${9.56497 * scale + pos.x - size/2} ${94.3497 * scale + pos.y - size/2} ${9.32679 * scale + pos.x - size/2} ${94.0688 * scale + pos.y - size/2}C${3.94761 * scale + pos.x - size/2} ${87.7085 * scale + pos.y - size/2} ${0.891219 * scale + pos.x - size/2} ${79.0793 * scale + pos.y - size/2} ${0.582725 * scale + pos.x - size/2} ${69.0103 * scale + pos.y - size/2}C${0.160519 * scale + pos.x - size/2} ${56.021 * scale + pos.y - size/2} ${4.36722 * scale + pos.x - size/2} ${42.1052 * scale + pos.y - size/2} ${12.4309 * scale + pos.x - size/2} ${29.8186 * scale + pos.y - size/2}C${20.4946 * scale + pos.x - size/2} ${17.5321 * scale + pos.y - size/2} ${31.5057 * scale + pos.x - size/2} ${8.27293 * scale + pos.y - size/2} ${43.4158 * scale + pos.x - size/2} ${3.74614 * scale + pos.y - size/2}C${53.5075 * scale + pos.x - size/2} ${-0.0824772 * scale + pos.y - size/2} ${63.2848 * scale + pos.x - size/2} ${-0.168262 * scale + pos.y - size/2} ${71.5544 * scale + pos.x - size/2} ${3.34997 * scale + pos.y - size/2}C${71.8923 * scale + pos.x - size/2} ${3.49117 * scale + pos.y - size/2} ${72.183 * scale + pos.x - size/2} ${3.72955 * scale + pos.y - size/2} ${72.391 * scale + pos.x - size/2} ${4.03582 * scale + pos.y - size/2}C${72.5989 * scale + pos.x - size/2} ${4.34208 * scale + pos.y - size/2} ${72.715 * scale + pos.x - size/2} ${4.70288 * scale + pos.y - size/2} ${72.7249 * scale + pos.x - size/2} ${5.07388 * scale + pos.y - size/2}C${72.7348 * scale + pos.x - size/2} ${5.44488 * scale + pos.y - size/2} ${72.6381 * scale + pos.x - size/2} ${5.80992 * scale + pos.y - size/2} ${72.4467 * scale + pos.x - size/2} ${6.12413 * scale + pos.y - size/2}C${72.2553 * scale + pos.x - size/2} ${6.43834 * scale + pos.y - size/2} ${71.9776 * scale + pos.x - size/2} ${6.68804 * scale + pos.y - size/2} ${71.6476 * scale + pos.x - size/2} ${6.84254 * scale + pos.y - size/2}C${68.3788 * scale + pos.x - size/2} ${8.35399 * scale + pos.y - size/2} ${65.2615 * scale + pos.x - size/2} ${10.1812 * scale + pos.y - size/2} ${62.3383 * scale + pos.x - size/2} ${12.2992 * scale + pos.y - size/2}C${53.2766 * scale + pos.x - size/2} ${18.8919 * scale + pos.y - size/2} ${42.4756 * scale + pos.x - size/2} ${31.2953 * scale + pos.y - size/2} ${42.5003 * scale + pos.x - size/2} ${52.9679 * scale + pos.y - size/2}C${42.4898 * scale + pos.x - size/2} ${67.6741 * scale + pos.y - size/2} ${36.9281 * scale + pos.x - size/2} ${79.2298 * scale + pos.y - size/2} ${25.9525 * scale + pos.x - size/2} ${87.3165 * scale + pos.y - size/2}ZM${83.0978 * scale + pos.x - size/2} ${11.9145 * scale + pos.y - size/2}C${82.8601 * scale + pos.x - size/2} ${11.6344 * scale + pos.y - size/2} ${82.5482 * scale + pos.x - size/2} ${11.43 * scale + pos.y - size/2} ${82.1999 * scale + pos.x - size/2} ${11.3261 * scale + pos.y - size/2}C${81.8516 * scale + pos.x - size/2} ${11.2223 * scale + pos.y - size/2} ${81.4821 * scale + pos.x - size/2} ${11.2236 * scale + pos.y - size/2} ${81.1361 * scale + pos.x - size/2} ${11.3298 * scale + pos.y - size/2}C${75.8838 * scale + pos.x - size/2} ${12.9461 * scale + pos.y - size/2} ${70.9311 * scale + pos.x - size/2} ${15.4242 * scale + pos.y - size/2} ${66.4721 * scale + pos.x - size/2} ${18.6669 * scale + pos.y - size/2}C${55.4965 * scale + pos.x - size/2} ${26.7536 * scale + pos.y - size/2} ${49.9348 * scale + pos.x - size/2} ${38.3093 * scale + pos.y - size/2} ${49.9454 * scale + pos.x - size/2} ${53.0016 * scale + pos.y - size/2}C${49.9654 * scale + pos.x - size/2} ${74.6751 * scale + pos.y - size/2} ${39.169 * scale + pos.x - size/2} ${87.0776 * scale + pos.y - size/2} ${30.1074 * scale + pos.x - size/2} ${93.6703 * scale + pos.y - size/2}C${27.1841 * scale + pos.x - size/2} ${95.7883 * scale + pos.y - size/2} ${24.0668 * scale + pos.x - size/2} ${97.6155 * scale + pos.y - size/2} ${20.798 * scale + pos.x - size/2} ${99.127 * scale + pos.y - size/2}C${20.4594 * scale + pos.x - size/2} ${99.2785 * scale + pos.y - size/2} ${20.1734 * scale + pos.x - size/2} ${99.5296 * scale + pos.y - size/2} ${19.9765 * scale + pos.x - size/2} ${99.8484 * scale + pos.y - size/2}C${19.7797 * scale + pos.x - size/2} ${100.167 * scale + pos.y - size/2} ${19.6808 * scale + pos.x - size/2} ${100.539 * scale + pos.y - size/2} ${19.6924 * scale + pos.x - size/2} ${100.917 * scale + pos.y - size/2}C${19.7041 * scale + pos.x - size/2} ${101.295 * scale + pos.y - size/2} ${19.8258 * scale + pos.x - size/2} ${101.661 * scale + pos.y - size/2} ${20.0421 * scale + pos.x - size/2} ${101.97 * scale + pos.y - size/2}C${20.2583 * scale + pos.x - size/2} ${102.279 * scale + pos.y - size/2} ${20.5593 * scale + pos.x - size/2} ${102.516 * scale + pos.y - size/2} ${20.9068 * scale + pos.x - size/2} ${102.65 * scale + pos.y - size/2}C${27.0742 * scale + pos.x - size/2} ${105.281 * scale + pos.y - size/2} ${34.0699 * scale + pos.x - size/2} ${105.884 * scale + pos.y - size/2} ${41.4137 * scale + pos.x - size/2} ${104.438 * scale + pos.y - size/2}C${44.0097 * scale + pos.x - size/2} ${103.918 * scale + pos.y - size/2} ${46.5578 * scale + pos.x - size/2} ${103.182 * scale + pos.y - size/2} ${49.0326 * scale + pos.x - size/2} ${102.237 * scale + pos.y - size/2}C${60.9473 * scale + pos.x - size/2} ${97.7097 * scale + pos.y - size/2} ${71.9538 * scale + pos.x - size/2} ${88.4514 * scale + pos.y - size/2} ${80.0175 * scale + pos.x - size/2} ${76.1649 * scale + pos.y - size/2}C${88.0812 * scale + pos.x - size/2} ${63.8784 * scale + pos.y - size/2} ${92.2861 * scale + pos.x - size/2} ${49.9532 * scale + pos.y - size/2} ${91.8657 * scale + pos.x - size/2} ${36.9732 * scale + pos.y - size/2}C${91.5205 * scale + pos.x - size/2} ${26.9114 * scale + pos.y - size/2} ${88.477 * scale + pos.x - size/2} ${18.2748 * scale + pos.y - size/2} ${83.0978 * scale + pos.x - size/2} ${11.9145 * scale + pos.y - size/2}Z`;
    return scaledPath;
  },
};

const ScrollMaskTransition: React.FC<ScrollMaskTransitionProps> = ({
  current,
  next,
  config = {},
  className = '',
  containerHeight = '200vh',
  onProgress,
  onComplete,
  sectionId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, diagonal: 0 });
  
  // Merge configurations
  const mergedConfig = { ...defaultConfig, ...config };
  
  // Calculate position in pixels
  const getPosition = () => {
    const { x, y } = mergedConfig.position;
    const xPos = typeof x === 'string' && x.includes('%') 
      ? (parseFloat(x) / 100) * dimensions.width 
      : Number(x);
    const yPos = typeof y === 'string' && y.includes('%') 
      ? (parseFloat(y) / 100) * dimensions.height 
      : Number(y);
    
    return { x: xPos, y: yPos };
  };
  
  // Setup scroll tracking
  const { scrollYProgress } = useScroll({
    target: mergedConfig.triggerElement || containerRef,
    offset: mergedConfig.scrollOffset as ["start end", "end start"],
  });
  
  // Apply smoothing to scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30 * mergedConfig.smoothness,
    restDelta: 0.001,
  });
  
  // Transform scroll progress to scale
  const maskScale = useTransform(
    smoothProgress,
    [0, 1],
    [mergedConfig.initialScale, mergedConfig.finalScale / 100]
  );
  
  // Calculate actual size based on viewport diagonal
  const maskSize = useTransform(
    maskScale,
    (scale) => scale * dimensions.diagonal
  );
  
  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window === 'undefined') return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      const diagonal = Math.sqrt(width * width + height * height);
      
      setDimensions({ width, height, diagonal });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Track progress for callback and completion
  useEffect(() => {
    if (onProgress || onComplete) {
      const unsubscribe = smoothProgress.on('change', (value) => {
        if (onProgress) {
          onProgress(value);
        }
        
        // Mark as complete when mask transition reaches 60% (allows horizontal cards to take over)
        if (value >= 0.6 && onComplete && sectionId) {
          // Add a small delay to ensure smooth transition
          setTimeout(() => {
            onComplete();
          }, 300);
        }
      });
      
      return unsubscribe;
    }
  }, [smoothProgress, onProgress, onComplete, sectionId]);
  
  // Get shape generator function
  const getShapeGenerator = (): ShapeGenerator => {
    if (mergedConfig.customShape) {
      return mergedConfig.customShape;
    }
    return shapeGenerators[mergedConfig.shape] || shapeGenerators.circle;
  };
  
  // Create motion path
  const MotionPath: React.FC<{ size: MotionValue<number> }> = ({ size }) => {
    const pathData = useTransform(size, (currentSize) => {
      const position = getPosition();
      const shapeGenerator = getShapeGenerator();
      return shapeGenerator(currentSize, position);
    });
    
    return <motion.path d={pathData} fill="black" />;
  };
  
  // Parse container height
  const getContainerHeight = () => {
    if (typeof containerHeight === 'number') return `${containerHeight}px`;
    return containerHeight;
  };
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-x-hidden ${className}`}
      style={{ height: getContainerHeight() }}
    >
      {/* Sticky container for the mask effect */}
      <div className="sticky top-0 left-0 w-screen h-screen overflow-hidden">
        {/* Next component (bottom layer) */}
        <div className="absolute inset-0 w-full h-full">
          {next}
        </div>
        
        {/* Current component with mask (top layer) */}
        <div className="absolute inset-0 w-full h-full">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <mask id="scroll-reveal-mask">
                {/* White background (shows content) */}
                <rect 
                  width="100%" 
                  height="100%" 
                  fill="white" 
                />
                {/* Black shape (hides content) */}
                <MotionPath size={maskSize} />
              </mask>
            </defs>
            
            {/* Apply mask using foreignObject */}
            <foreignObject
              x="0"
              y="0"
              width="100%"
              height="100%"
              mask="url(#scroll-reveal-mask)"
            >
              <div className="w-full h-full">
                {current}
              </div>
            </foreignObject>
          </svg>
        </div>
        
        {/* Debug overlay */}
        {mergedConfig.debug && (
          <motion.div
            className="absolute top-4 right-4 bg-black/80 text-white p-4 rounded-lg z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-sm space-y-1">
              <div>Scroll Progress: {scrollYProgress.get().toFixed(2)}</div>
              <div>Mask Scale: {maskScale.get().toFixed(2)}</div>
              <div>Mask Size: {maskSize.get().toFixed(0)}px</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Hook for external control and monitoring
export const useScrollMaskProgress = () => {
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollToProgress = (targetProgress: number) => {
    if (!scrollRef.current) return;
    
    const scrollHeight = scrollRef.current.scrollHeight;
    const clientHeight = scrollRef.current.clientHeight;
    const maxScroll = scrollHeight - clientHeight;
    const targetScroll = targetProgress * maxScroll;
    
    scrollRef.current.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };
  
  return {
    progress,
    setProgress,
    scrollToProgress,
    scrollRef,
  };
};

// Example usage component
export const ScrollMaskExample: React.FC = () => {
  const [currentShape, setCurrentShape] = useState<'circle' | 'rect' | 'ellipse' | 'hexagon' | 'bean'>('circle');
  const [progress, setProgress] = useState(0);
  
  const firstComponent = (
    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Current Section</h1>
        <p className="text-xl opacity-90">Scroll down to reveal the next section</p>
      </div>
    </div>
  );
  
  const secondComponent = (
    <div className="w-full h-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Next Section</h1>
        <p className="text-xl opacity-90">Revealed through scroll-driven mask</p>
      </div>
    </div>
  );
  
  
  return (
    <div className="relative">
      {/* Shape selector */}
      <div className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg">
        <label className="block text-sm font-medium mb-2">Mask Shape:</label>
        <select
          value={currentShape}
          onChange={(e) => setCurrentShape(e.target.value as 'circle' | 'rect' | 'ellipse' | 'hexagon' | 'bean')}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="circle">Circle</option>
          <option value="rect">Rectangle</option>
          <option value="ellipse">Ellipse</option>
          <option value="hexagon">Hexagon</option>
          <option value="bean">Bean</option>
        </select>
        <div className="mt-2 text-sm text-gray-600">
          Progress: {Math.round(progress * 100)}%
        </div>
      </div>
      
      {/* Main scroll mask transition */}
      <ScrollMaskTransition
        current={firstComponent}
        next={secondComponent}
        config={{
          shape: currentShape,
          position: { x: '50%', y: '50%' },
          initialScale: 0,
          finalScale: 200,
          smoothness: 0.25,
          debug: true,
        }}
        containerHeight="300vh"
        onProgress={setProgress}
      />
      
      {/* Additional content below */}
      <div className="h-screen bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
        <h2 className="text-white text-4xl font-bold">Continue Scrolling...</h2>
      </div>
    </div>
  );
};

export default ScrollMaskTransition;