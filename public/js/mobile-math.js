// 移动端数学公式滚动优化
document.addEventListener('DOMContentLoaded', function() {
  // 检测是否为移动设备
  const isMobile = window.innerWidth <= 768;
  
  // 强制约束所有KaTeX元素
  function enforceConstraints() {
    const katexElements = document.querySelectorAll('.katex, .katex-display, .katex *');
    
    katexElements.forEach((element) => {
      const el = element;
      // 强制设置最大宽度和溢出处理
      el.style.maxWidth = '100%';
      el.style.boxSizing = 'border-box';
      
      if (el.classList.contains('katex-display')) {
        el.style.overflowX = 'auto';
        el.style.overflowY = 'hidden';
        el.style.width = '100%';
      }
    });
  }
  
  // 立即执行约束
  enforceConstraints();
  
  // 如果不在移动端，只执行约束
  if (!isMobile) return;

  // 为所有KaTeX公式添加滚动指示器
  const katexElements = document.querySelectorAll('.katex-display');
  
  katexElements.forEach((element) => {
    const el = element;
    
    const checkScroll = () => {
      const isScrollable = el.scrollWidth > el.clientWidth;
      const isAtStart = el.scrollLeft === 0;
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth;

      // 移除现有指示器
      el.classList.remove('scroll-left', 'scroll-right', 'scroll-both');

      if (isScrollable) {
        if (isAtStart) {
          el.classList.add('scroll-right');
        } else if (isAtEnd) {
          el.classList.add('scroll-left');
        } else {
          el.classList.add('scroll-both');
        }
      }
    };

    el.addEventListener('scroll', checkScroll);
    checkScroll(); // 初始检查
  });

  // 监听窗口大小变化
  window.addEventListener('resize', function() {
    // 重新执行约束
    enforceConstraints();
    
    if (window.innerWidth > 768) {
      // 桌面端移除所有滚动指示器
      katexElements.forEach((element) => {
        element.classList.remove('scroll-left', 'scroll-right', 'scroll-both');
      });
    } else {
      // 移动端重新检查
      katexElements.forEach((element) => {
        const el = element;
        const isScrollable = el.scrollWidth > el.clientWidth;
        const isAtStart = el.scrollLeft === 0;
        const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth;

        el.classList.remove('scroll-left', 'scroll-right', 'scroll-both');

        if (isScrollable) {
          if (isAtStart) {
            el.classList.add('scroll-right');
          } else if (isAtEnd) {
            el.classList.add('scroll-left');
          } else {
            el.classList.add('scroll-both');
          }
        }
      });
    }
  });
  
  // 监听DOM变化，确保新添加的公式也被约束
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        enforceConstraints();
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}); 