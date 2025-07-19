import React, { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

interface DailyQuote {
  text: string;
  author: string;
  category: string;
}

const ContentSection: React.FC = () => {
  const [dailyQuote, setDailyQuote] = useState<DailyQuote>({
    text: "知识就是力量，但智慧才是真正的财富。",
    author: "弗朗西斯·培根",
    category: "哲学"
  });

  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([
    {
      id: 1,
      title: "人工智能的未来发展趋势",
      excerpt: "探讨AI技术在2024年的最新发展方向，包括大语言模型、多模态AI等前沿技术...",
      date: "2024-01-15",
      readTime: "5分钟",
      category: "技术"
    },
    {
      id: 2,
      title: "如何提高工作效率的10个技巧",
      excerpt: "在快节奏的现代生活中，掌握高效的工作方法变得尤为重要。本文将分享实用的技巧...",
      date: "2024-01-12",
      readTime: "8分钟",
      category: "职场"
    },
    {
      id: 3,
      title: "数字时代的个人品牌建设",
      excerpt: "在社交媒体和数字平台盛行的今天，如何打造独特的个人品牌形象...",
      date: "2024-01-10",
      readTime: "6分钟",
      category: "营销"
    }
  ]);

  // 模拟获取每日金句
  useEffect(() => {
    const quotes = [
      { text: "知识就是力量，但智慧才是真正的财富。", author: "弗朗西斯·培根", category: "哲学" },
      { text: "成功不是偶然的，而是通过持续的努力和正确的方向实现的。", author: "罗伯特·舒勒", category: "成功学" },
      { text: "创新是区分领导者和追随者的关键。", author: "史蒂夫·乔布斯", category: "创新" },
      { text: "学习是一个终身的过程，每一天都是新的开始。", author: "孔子", category: "教育" },
      { text: "技术应该服务于人类，而不是相反。", author: "艾伦·凯", category: "技术" }
    ];
    
    const today = new Date().getDate();
    const selectedQuote = quotes[today % quotes.length];
    setDailyQuote(selectedQuote);
  }, []);

  return (
    <div className="max-w-[375px] mx-auto mt-4 md:max-w-[684px] md:mx-auto">
      {/* 每日金句部分 - 参考首页maxim组件的样式 */}
      <div className="flex flex-row gap-4 items-center mb-6">
        <div className="flex-1 flex flex-col gap-4 bg-gray-100 rounded-lg h-36 pt-8 pr-8 dark:bg-gray-900 dark:text-gray-100">
          <h2 className="text-lg font-bold pl-4 md:pl-8 dark:text-gray-100">{dailyQuote.text}</h2>
          <p className="text-gray-600 text-sm text-right dark:text-gray-400">——{dailyQuote.author}</p>
        </div>
        <div className="w-32 flex-shrink-0 h-36 relative">
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 最近博客部分 */}
      <div className="bg-gray-100 rounded-lg p-6 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold dark:text-gray-100">最近博客</h3>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
            {recentBlogs.length} 篇文章
          </span>
        </div>

        <div className="space-y-4">
          {recentBlogs.map((blog, index) => (
            <article 
              key={blog.id} 
              className="group bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="flex items-start space-x-3">
                {/* 序号标识 */}
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 cursor-pointer transition-colors line-clamp-1">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                        {blog.excerpt}
                      </p>
                    </div>
                    
                    {/* 阅读按钮 */}
                    <button className="ml-3 flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                      <svg className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* 元信息 */}
                  <div className="flex items-center mt-3 space-x-3">
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{blog.date}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{blog.readTime}</span>
                    </div>
                    
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 text-green-800 dark:text-green-200">
                      {blog.category}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            查看所有博客
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
