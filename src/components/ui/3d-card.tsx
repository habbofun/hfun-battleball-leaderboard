'use client';

import React, { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
  perspective?: number;
  scale?: number;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className,
  maxRotation = 20,
  perspective = 1000,
  scale = 1.05,
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / height) * maxRotation;
    const rotateY = (mouseX / width) * maxRotation;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'transition-transform duration-200 ease-out transform-gpu',
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(${perspective}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${
          isHovered ? `scale(${scale})` : ''
        }`,
      }}
    >
      {children}
    </div>
  );
};
