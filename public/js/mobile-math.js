// 移动端数学公式滚动优化
document.addEventListener('DOMContentLoaded', function() {
  // 检测是否为移动设备
  const isMobile = window.innerWidth <= 768;
  
  // 强制约束所有KaTeX元素
  function enforceConstraints() {
    const katexElements = document.querySelectorAll('.katex, .katex-display, .katex *');
    
    katexElements.forEach((element) => {
      const el = element;
      // 强制设置溢出处理
      el.style.boxSizing = 'border-box';
      
      if (el.classList.contains('katex-display')) {
        el.style.overflowX = 'auto';
        el.style.overflowY = 'hidden';
        el.style.maxWidth = 'none';
        el.style.width = 'auto';
        el.style.position = 'relative';
        el.style.whiteSpace = 'nowrap';
        el.style.display = 'block';
        el.style.webkitOverflowScrolling = 'touch';
        el.style.wordWrap = 'normal';
        el.style.wordBreak = 'normal';
        el.style.overflowWrap = 'normal';
        
        // 确保块级公式内的所有元素都不换行
        const childElements = el.querySelectorAll('*');
        childElements.forEach(child => {
          child.style.whiteSpace = 'nowrap';
          child.style.wordWrap = 'normal';
          child.style.wordBreak = 'normal';
          child.style.overflowWrap = 'normal';
          child.style.maxWidth = 'none';
        });
      } else if (el.classList.contains('katex') && !el.classList.contains('katex-display')) {
        // 行内公式换行设置
        el.style.overflowX = 'visible';
        el.style.overflowY = 'visible';
        el.style.maxWidth = '100%';
        el.style.width = 'auto';
        el.style.whiteSpace = 'normal';
        el.style.wordWrap = 'break-word';
        el.style.wordBreak = 'break-all';
        el.style.display = 'inline';
        el.style.verticalAlign = 'baseline';
        el.style.lineHeight = '1.4';
        el.style.margin = '0 0.1em';
        el.style.padding = '0.1em 0.2em';
        el.style.borderRadius = '3px';
        el.style.position = 'relative';
        el.style.background = 'rgba(0, 0, 0, 0.03)';
        el.style.border = '1px solid rgba(0, 0, 0, 0.1)';
      }
    });
  }
  
  // 立即执行约束
  enforceConstraints();
  
  // 处理行内公式换行
  function handleInlineMathWrap() {
    const inlineMathElements = document.querySelectorAll('.katex:not(.katex-display)');
    
    inlineMathElements.forEach((element) => {
      const el = element;
      
      // 移除之前的事件监听器
      if (el._touchStartHandler) {
        el.removeEventListener('touchstart', el._touchStartHandler);
        el.removeEventListener('touchmove', el._touchMoveHandler);
        el.removeEventListener('touchend', el._touchEndHandler);
      }
      
      // 确保换行设置正确
      el.style.overflowX = 'visible';
      el.style.overflowY = 'visible';
      el.style.maxWidth = '100%';
      el.style.width = 'auto';
      el.style.whiteSpace = 'normal';
      el.style.wordWrap = 'break-word';
      el.style.wordBreak = 'break-all';
      el.style.display = 'inline';
      el.style.position = 'relative';
      
      // 添加视觉提示
      el.style.background = 'rgba(0, 0, 0, 0.03)';
      el.style.border = '1px solid rgba(0, 0, 0, 0.1)';
      el.style.borderRadius = '3px';
      el.style.padding = '0.1em 0.2em';
      el.style.margin = '0 0.1em';
      
      // 移除滚动相关的属性
      el.removeAttribute('title');
      el.style.cursor = 'default';
    });
  }
  
  // 处理块级公式强制不换行
  function handleBlockMathNoWrap() {
    const blockMathElements = document.querySelectorAll('.katex-display');
    
    blockMathElements.forEach((element) => {
      const el = element;
      
      // 确保块级公式不换行
      el.style.overflowX = 'auto';
      el.style.overflowY = 'hidden';
      el.style.maxWidth = 'none';
      el.style.width = 'auto';
      el.style.position = 'relative';
      el.style.whiteSpace = 'nowrap';
      el.style.display = 'block';
      el.style.webkitOverflowScrolling = 'touch';
      el.style.wordWrap = 'normal';
      el.style.wordBreak = 'normal';
      el.style.overflowWrap = 'normal';
      
      // 确保块级公式内的所有元素都不换行
      const childElements = el.querySelectorAll('*');
      childElements.forEach(child => {
        child.style.whiteSpace = 'nowrap';
        child.style.wordWrap = 'normal';
        child.style.wordBreak = 'normal';
        child.style.overflowWrap = 'normal';
        child.style.maxWidth = 'none';
      });
    });
  }
  
  // 执行行内公式换行处理
  handleInlineMathWrap();
  
  // 执行块级公式不换行处理
  handleBlockMathNoWrap();
  
  // 调试函数：检查公式状态
  function debugMathElements() {
    const inlineMathElements = document.querySelectorAll('.katex:not(.katex-display)');
    const blockMathElements = document.querySelectorAll('.katex-display');
    
    console.log(`找到 ${inlineMathElements.length} 个行内公式元素`);
    console.log(`找到 ${blockMathElements.length} 个块级公式元素`);
    
    inlineMathElements.forEach((el, index) => {
      console.log(`行内公式 ${index + 1}:`, {
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        overflowX: el.style.overflowX,
        display: el.style.display,
        whiteSpace: el.style.whiteSpace,
        wordWrap: el.style.wordWrap,
        wordBreak: el.style.wordBreak
      });
    });
    
    blockMathElements.forEach((el, index) => {
      const isScrollable = el.scrollWidth > el.clientWidth;
      console.log(`块级公式 ${index + 1}:`, {
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        isScrollable: isScrollable,
        overflowX: el.style.overflowX,
        display: el.style.display,
        whiteSpace: el.style.whiteSpace,
        scrollLeft: el.scrollLeft
      });
    });
  }
  
  // 在移动端启用调试
  if (isMobile) {
    setTimeout(debugMathElements, 1000);
  }
  
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
      
      // 重新处理行内公式
      handleInlineMathWrap();
      
      // 重新处理块级公式
      handleBlockMathNoWrap();
    }
  });
  
  // 监听DOM变化，确保新添加的公式也被约束
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        enforceConstraints();
        if (isMobile) {
          handleInlineMathWrap();
          handleBlockMathNoWrap();
        }
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}); 