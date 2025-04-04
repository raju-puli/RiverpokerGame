import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

import chip1 from "./../../../../assets/images/table/Chips/chip1.png";
import chip5 from "./../../../../assets/images/table/Chips/chip5.png";
import chip10 from "./../../../../assets/images/table/Chips/chip10.png";
import chip50 from "./../../../../assets/images/table/Chips/chip50.png";
import chip100 from "./../../../../assets/images/table/Chips/chip100.png";
import chip500 from "./../../../../assets/images/table/Chips/chip500.png";
import chip1k from "./../../../../assets/images/table/Chips/chip1k.png";
import chip5k from "./../../../../assets/images/table/Chips/chip5k.png";
import chip10k from "./../../../../assets/images/table/Chips/chip10k.png";
import chip50k from "./../../../../assets/images/table/Chips/chip50k.png";
import chip100k from "./../../../../assets/images/table/Chips/chip100k.png";
import chip500k from "./../../../../assets/images/table/Chips/chip500k.png";
import chip1M from "./../../../../assets/images/table/Chips/chip1M.png";
import chip2M from "./../../../../assets/images/table/Chips/chip2M.png";

const chipImages = [
  chip1, chip5, chip10, chip50, chip100, chip500, chip1k, chip5k, chip10k, chip50k, chip100k, chip500k, chip1M, chip2M
];

const FallingChips = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const chips = Array.from({ length: 500 }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      left: window.innerWidth / 2 - 100 + Math.random() * 200, // Fall near the center
      //   rotation: Math.random() * 360,
      size: 30 + Math.random() * 50, // Random size
      image: chipImages[Math.floor(Math.random() * chipImages.length)],
    }));

    if (containerRef.current) {
      containerRef.current.innerHTML = chips.map(chip =>
        `<img src="${chip.image}" alt="chip" style="
          position: absolute;
          top: 0;
          left: ${chip.left}px;
          width: ${window.innerWidth > 1220 ? `${chip.size}px` : "25px"};
          height: ${window.innerWidth > 1220 ? `${chip.size}px` : "25px"};
          transform: rotate(${chip.rotation}deg);
        ">`
      ).join('');

      gsap.to(containerRef.current.children, {
        y: `random(${(window.innerHeight / 2) + 100},${(window.innerHeight / 2) - 40})`, // Stop in the middle
        x: "random(-150, 150)", // Slight horizontal drift
        // rotation: "random(-180, 180)",
        duration: 5, // Animation duration of 5 seconds
        ease: "bounce.out", // Bounce effect
        stagger: 0.01,
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed", // Fullscreen
        top: - `${window.innerWidth > 1220 ? 100 : 40}`,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none"

      }}
    ></div>
  );
};

export default FallingChips;