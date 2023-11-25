import React, { useState } from "react";

type CardWithGlowProps = {
    children: React.ReactNode,
    className?: string,
    colorGlow?: "red" | "green" | "blue"
}

const Glow = {
    red: "from-red-500",
    green: "from-green-500",
    blue: "from-blue-500"
}

export const CardWithGlow: React.FC<CardWithGlowProps> = ({ children, className="", colorGlow="red" }) => {

    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
    const [glowVisible, setGlowVisible] = useState(false)
    const handleMouseEnter = ()  => setGlowVisible(true);
    const handleMouseLeave = () => setGlowVisible(false);
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => setGlowPosition({ x: event.clientX, y: event.clientY });

  return (
    <>
        <div className="h-[420px] w-[300px]">
            <div className={`bg-[#1a1f29] w-full p-6 h-full text-gray-200 rounded-lg ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
                {children}
                {glowVisible && (
                    <div className={`absolute w-24 h-24 rounded-full pointer-events-none mix-blend-screen filter brightness-150 shadow-lg bg-gradient-to-b ${Glow[colorGlow]} to-transparent blur-3xl`} style={{ left: `${glowPosition.x - 40}px`, top: `${glowPosition.y - 40}px` }}></div>
                )
                }
            </div>
        </div>
    </>
  )
};
