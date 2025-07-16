import { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import DrawerDemo from "../components/drawer";

type DrawerDemoProps = {
	open: boolean;
	onClose: () => void;
};

export default function Maxim() {
	const maxim = [
		{
			quote: "不写，就无法思考。",
			id: "0",
			description: "费曼学习法的核心是输出，而输出最好的方式就是写作。",
			author: "理查德·费曼",
			image: "/images/feynman.jpg",
		},
		{
			quote: "不要用别人的尺子，去丈量自己的人生。",
			id: "1",
			description: "不要用别人的尺子，去丈量自己的人生。聪明人都是用自己的尺子去丈量别人的人生。",
			author: "凯文·凯利",
			image: "/images/KK.jpg",
		},
		{
			quote: "自我产品化",
			id: "2",
			description: "自我产品化，是个人品牌建设的重要途径。",
			author: "纳瓦尔·拉维坎特",
			image: "/images/naval.jpg",
		},
		// ...可以继续添加更多 quote
	];

	const today = new Date();
	const initialIndex = today.getDate() % maxim.length;
	const [index, setIndex] = useState(initialIndex);
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

	const handleNext = () => {
		setIndex((prev) => (prev + 1) % maxim.length);
	};
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const closeDrawer = () => setIsDrawerOpen(false);

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
				<Button onClick={handleNext} className="self-end dark:bg-blue-900 dark:text-gray-100 dark:hover:bg-blue-800">下一条</Button>
			</div>
			<div className="flex flex-row gap-4 items-center max-w-[684px] mx-auto mt-4">
				<DrawerDemo open={isDrawerOpen} onClose={closeDrawer} />
			</div>
		</div>
		
		</>
    );
}