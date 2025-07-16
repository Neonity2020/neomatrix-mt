import React, { useState } from "react";
import Maxim from "./maxim";
import CarouselDemo from "./carousel";
import maximData from "./maxim-data";

export default function MaximCarouselContainer() {
  const [maximIndex, setMaximIndex] = useState(() => {
    const today = new Date();
    return today.getDate() % maximData.length;
  });

  // maxim组件点击“下一条”时
  const handleNext = () => {
    setMaximIndex((prev) => (prev + 1) % maximData.length);
  };

  // carousel 切换时
  const handleCarouselChange = (index: number) => {
    setMaximIndex(index % maximData.length);
  };

  return (
    <div>
      <Maxim index={maximIndex} onNext={handleNext} />
      <div className="mt-6">
        <CarouselDemo index={maximIndex} onIndexChange={handleCarouselChange} />
      </div>
    </div>
  );
} 