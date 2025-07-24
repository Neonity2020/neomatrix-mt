import React, { useState } from "react";
import Maxim from "../maxim";
import maximData from "../maxim-data";

export default function MaximWrapper() {
  const [index, setIndex] = useState(() => {
    const today = new Date();
    return today.getDate() % maximData.length;
  });
  // 控制 DrawerDemo 显示
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <Maxim
        index={index}
        onNext={() => setIndex((prev: number) => (prev + 1) % maximData.length)}
      />
      {/* 后续可在这里实现“有启发”按钮和 DrawerDemo 控制 */}
    </>
  );
} 