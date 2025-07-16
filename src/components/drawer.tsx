import {
    Drawer,
    Button,
    Typography,
    IconButton,
  } from "@material-tailwind/react";
  import { Xmark } from "iconoir-react";
  import NoteComponent from "./note";
  import React, { useRef, useState } from "react";
  type DrawerDemoProps = {
    open: boolean;
    onClose: () => void;
  };
  
  export default function DrawerDemo({ open, onClose }: DrawerDemoProps) {
    const [width, setWidth] = useState(400); // 默认宽度
    const dragging = useRef(false);

    // 拖动相关事件
    const handleMouseDown = (e: React.MouseEvent) => {
      dragging.current = true;
      document.body.style.userSelect = "none";
    };
    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (dragging.current) {
          // 右侧固定，左侧拖动
          const newWidth = Math.min(Math.max(480, window.innerWidth - e.clientX), 700); // 最大宽度700
          setWidth(newWidth);
        }
      };
      const handleMouseUp = () => {
        dragging.current = false;
        document.body.style.userSelect = "";
      };
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, []);
    return (
      <Drawer>
        <Drawer.Trigger as={Button} className="dark:bg-blue-900 dark:text-gray-100 dark:hover:bg-blue-800">💡有启发</Drawer.Trigger>
        <Drawer.Overlay>
          <div
            className="fixed top-0 right-0 h-screen z-50 dark:bg-gray-950"
            style={{ width }}
          >
            <Drawer.Panel className="overflow-y-auto max-h-[100vh] relative h-full dark:bg-gray-900 dark:text-gray-100" style={{ width }}>
              {/* 拖拽条 */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 8,
                  height: "100%",
                  cursor: "ew-resize",
                  zIndex: 10,
                }}
                className="dark:bg-gray-800"
                onMouseDown={handleMouseDown}
              />
              <div className="flex items-center justify-between gap-4 mb-4">
                <Typography type="h6" className="dark:text-primary-200">💡有启发</Typography>
                <Drawer.DismissTrigger
                  as={IconButton}
                  size="sm"
                  variant="ghost"
                  color="secondary"
                  className="absolute right-2 top-2 dark:text-gray-300"
                  isCircular
                >
                  <Xmark className="h-5 w-5" />
                </Drawer.DismissTrigger>
              </div>
              <Typography className="mb-6 mt-2 text-foreground dark:text-gray-200">
                <ul className="list-disc list-inside">
                  <li className="text-sm mb-2">点击下方的“More”，查看更多金句</li>
                  <li className="text-sm mb-2">点击下方的“Spark Notes”，记录此刻的心得</li>
                  <li className="text-sm mb-2">您也可以在当前页面的下方快速记录笔记</li>
                </ul>
              </Typography>
              <div className="mb-1 flex items-center gap-6">
                <Button onClick={() => window.location.href = '/noteapp'} className="dark:bg-blue-900 dark:text-gray-100 dark:hover:bg-blue-800">Spark Notes</Button>
                <Button color="secondary" className="dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700">More</Button>
              </div>
              <NoteComponent />
            </Drawer.Panel>
          </div>
        </Drawer.Overlay>
      </Drawer>
    );
  }
  