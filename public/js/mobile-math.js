// 移动端数学公式滚动优化
document.addEventListener('DOMContentLoaded', function() {
  // 检测是否为移动设备
  const isMobile = window.innerWidth <= 768;
  
  // 标记是否已经初始化，防止重复执行
  if (window.mathOptimizationInitialized) {
    return;
  }
  window.mathOptimizationInitialized = true;
  
  // 强制约束所有KaTeX元素
  function enforceConstraints() {
    const katexElements = document.querySelectorAll('.katex, .katex-display, .katex *');
    
    katexElements.forEach((element) => {
      const el = element;
      // 强制设置溢出处理
      el.style.boxSizing = 'border-box';
      
      if (el.classList.contains('katex-display')) {
        // 块级公式设置
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
        // 移除边框
        el.style.border = 'none';
        el.style.background = 'none';
        el.style.outline = 'none';
        
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
        // 行内公式设置
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
  
  // 移除KaTeX边框但保留分数线
  function removeKaTeXBorders() {
    // 只移除块级公式的边框，保留数学符号的边框
    const blockMathElements = document.querySelectorAll('.katex-display');
    blockMathElements.forEach((element) => {
      // 移除块级公式本身的边框
      element.style.border = 'none';
      element.style.borderWidth = '0';
      element.style.borderStyle = 'none';
      element.style.borderColor = 'transparent';
      element.style.background = 'none';
      element.style.outline = 'none';
      element.style.boxShadow = 'none';
      
      // 移除子元素的边框，但保留数学符号的边框
      const childElements = element.querySelectorAll('*');
      childElements.forEach(child => {
        // 保留分数线的边框
        if (child.classList.contains('frac-line')) {
          // 不修改分数线的边框样式
          return;
        }
        
        // 保留其他数学符号的边框（如根号、括号等）
        if (child.classList.contains('sqrt') || 
            child.classList.contains('delimsizing') ||
            child.classList.contains('mopen') ||
            child.classList.contains('mclose') ||
            child.classList.contains('mord') ||
            child.classList.contains('mbin') ||
            child.classList.contains('mrel') ||
            child.classList.contains('mpunct')) {
          // 不修改数学符号的边框样式
          return;
        }
        
        // 移除其他元素的边框
        child.style.border = 'none';
        child.style.borderWidth = '0';
        child.style.borderStyle = 'none';
        child.style.borderColor = 'transparent';
        child.style.background = 'none';
        child.style.outline = 'none';
        child.style.boxShadow = 'none';
      });
    });
    
    // 移除行内公式的边框，但保留数学符号
    const inlineMathElements = document.querySelectorAll('.katex:not(.katex-display) *');
    inlineMathElements.forEach((element) => {
      // 保留分数线的边框
      if (element.classList.contains('frac-line')) {
        return;
      }
      
      // 保留其他数学符号的边框
      if (element.classList.contains('sqrt') || 
          element.classList.contains('delimsizing') ||
          element.classList.contains('mopen') ||
          element.classList.contains('mclose') ||
          element.classList.contains('mord') ||
          element.classList.contains('mbin') ||
          element.classList.contains('mrel') ||
          element.classList.contains('mpunct')) {
        return;
      }
      
      // 移除其他元素的边框
      element.style.border = 'none';
      element.style.borderWidth = '0';
      element.style.borderStyle = 'none';
      element.style.borderColor = 'transparent';
      element.style.background = 'none';
      element.style.outline = 'none';
      element.style.boxShadow = 'none';
    });
  }
  
  // 为块级公式添加滚动指示器
  function addScrollIndicators() {
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
  }
  
  // 主初始化函数
  function initializeMathOptimization() {
    // 执行约束
    enforceConstraints();
    
    // 移除边框
    removeKaTeXBorders();
    
    // 添加滚动指示器
    if (isMobile) {
      addScrollIndicators();
    }
  }
  
  // 立即执行初始化
  initializeMathOptimization();
  
  // 延迟执行一次，确保所有元素都已渲染
  setTimeout(initializeMathOptimization, 100);
  
  // 监听DOM变化
  const observer = new MutationObserver(function(mutations) {
    let hasMathChanges = false;
    
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && (node.classList.contains('katex') || node.querySelector('.katex'))) {
            hasMathChanges = true;
          }
        });
      }
    });
    
    if (hasMathChanges) {
      setTimeout(initializeMathOptimization, 50);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // 监听窗口大小变化
  window.addEventListener('resize', function() {
    // 重新执行初始化
    initializeMathOptimization();
    
    if (window.innerWidth > 768) {
      // 桌面端移除所有滚动指示器
      const katexElements = document.querySelectorAll('.katex-display');
      katexElements.forEach((element) => {
        element.classList.remove('scroll-left', 'scroll-right', 'scroll-both');
      });
    }
  });
  
  // 调试函数：检查公式状态
  function debugMathElements() {
    const inlineMathElements = document.querySelectorAll('.katex:not(.katex-display)');
    const blockMathElements = document.querySelectorAll('.katex-display');
    
    console.log(`找到 ${inlineMathElements.length} 个行内公式元素`);
    console.log(`找到 ${blockMathElements.length} 个块级公式元素`);
    
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
}); 