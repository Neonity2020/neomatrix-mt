import { useState } from "react";
import { Button } from "@material-tailwind/react";

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

	const handleNext = () => {
		setIndex((prev) => (prev + 1) % maxim.length);
	};

	const todayMaxim = maxim[index];

	return (
        <>
        <div className="flex flex-row gap-4 items-center max-w-[375px] md:max-w-[684px] mx-auto">
            <div className="flex-1 flex flex-col gap-4 bg-gray-100 rounded-lg h-36 pt-8 pr-8">
                <h2 className="text-lg font-bold pl-4 md:pl-8">{todayMaxim.quote}</h2>
                <p className="text-gray-600 text-sm text-right">——{todayMaxim.author}</p>
            </div>
            <div className="w-32 flex-shrink-0">
                <img src={todayMaxim.image} alt={todayMaxim.author} className="rounded-lg w-full h-36 object-cover" />
            </div>
        </div>
		<div className="flex flex-row gap-4 items-center max-w-[684px] mx-auto mt-4">
			<Button onClick={handleNext} className="self-end">下一条</Button>	
		</div>
		</>
    );
}