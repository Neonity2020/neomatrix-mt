import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import DrawerDemo from "../components/drawer";
import maxim from "./maxim-data";

type DrawerDemoProps = {
	open: boolean;
	onClose: () => void;
};

export default function Maxim({ index, onNext }: { index: number; onNext: () => void }) {
	const [imgLoadedMap, setImgLoadedMap] = useState<{ [key: string]: boolean }>({});

	// 页面加载时预加载所有头像图片
	useEffect(() => {
		const loadedMap: { [key: string]: boolean } = {};
		let loadedCount = 0;
		maxim.forEach((item) => {
			const img = new window.Image();
			img.src = item.image;
			if (img.complete) {
				loadedMap[item.id] = true;
				loadedCount++;
			} else {
				img.onload = () => {
					loadedMap[item.id] = true;
					loadedCount++;
					if (loadedCount === maxim.length) {
						setImgLoadedMap({ ...loadedMap });
					}
				};
			}
		});
		// 如果所有图片都已缓存，直接设置
		if (loadedCount === maxim.length) {
			setImgLoadedMap({ ...loadedMap });
		}
		// eslint-disable-next-line
	}, []);

	const todayMaxim = maxim[index];

	return (
        <>
        <div className="flex flex-row gap-4 items-center max-w-[375px] md:max-w-[684px] mx-auto">
            <div className="flex-1 flex flex-col gap-4 bg-gray-100 rounded-lg h-36 pt-8 pr-8 dark:bg-gray-900 dark:text-gray-100">
                <h2 className="text-lg font-bold pl-4 md:pl-8 dark:text-gray-100">{todayMaxim.quote}</h2>
                <p className="text-gray-600 text-sm text-right dark:text-gray-400">——{todayMaxim.author}</p>
            </div>
            <div className="w-32 flex-shrink-0 h-36 relative">
                {/* skeleton 占位 */}
                {!imgLoadedMap[todayMaxim.id] && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-200 animate-pulse rounded-lg dark:bg-gray-800" />
                )}
                <img
                    src={todayMaxim.image}
                    alt={todayMaxim.author}
                    className={`rounded-lg w-full h-36 object-cover transition-opacity duration-300 ${imgLoadedMap[todayMaxim.id] ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => {
                        if (!imgLoadedMap[todayMaxim.id]) {
                            setImgLoadedMap((prev) => ({ ...prev, [todayMaxim.id]: true }));
                        }
                    }}
                    style={{ position: "relative" }}
                    loading="lazy"
                />
            </div>
        </div>
		<div className="flex flex-row gap-4 items-center max-w-[684px] mx-auto">
			<div className="flex flex-row gap-4 items-center max-w-[684px] mx-auto mt-4">
				<Button onClick={onNext} className="self-end dark:bg-blue-900 dark:text-gray-100 dark:hover:bg-blue-800">下一条</Button>
			</div>
			<div className="flex flex-row gap-4 items-center max-w-[684px] mx-auto mt-4">
				<DrawerDemo open={false} onClose={() => {}} />
			</div>
		</div>
		
		</>
    );
}