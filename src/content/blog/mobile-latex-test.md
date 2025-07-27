---
title: 移动端LaTeX公式显示测试
date: 2025-01-27
author: Neonity
category: 前端技术
tags:
  - LaTeX
  - 移动端
  - 响应式设计
cover: /images/the-transformer.jpg
excerpt: 测试移动端LaTeX数学公式的显示效果和响应式优化
featured: true
---

# 移动端LaTeX公式显示测试

本文用于测试移动端LaTeX数学公式的显示效果，包含各种长公式和复杂公式的响应式优化。

## 超长行内公式测试

这是一个超长的行内公式：$f(x) = \int_{-\infty}^{\infty} \frac{1}{\sqrt{2\pi\sigma^2}} e^{-\frac{(x-\mu)^2}{2\sigma^2}} dx + \sum_{i=1}^{n} \alpha_i \cos(\omega_i t + \phi_i) + \beta \cdot \text{ReLU}(Wx + b)$

## 复杂矩阵公式

$$
\begin{bmatrix}
a_{11} & a_{12} & a_{13} & a_{14} & a_{15} & a_{16} & a_{17} & a_{18} \\
a_{21} & a_{22} & a_{23} & a_{24} & a_{25} & a_{26} & a_{27} & a_{28} \\
a_{31} & a_{32} & a_{33} & a_{34} & a_{35} & a_{36} & a_{37} & a_{38} \\
a_{41} & a_{42} & a_{43} & a_{44} & a_{45} & a_{46} & a_{47} & a_{48} \\
a_{51} & a_{52} & a_{53} & a_{54} & a_{55} & a_{56} & a_{57} & a_{58} \\
a_{61} & a_{62} & a_{63} & a_{64} & a_{65} & a_{66} & a_{67} & a_{68} \\
a_{71} & a_{72} & a_{73} & a_{74} & a_{75} & a_{76} & a_{77} & a_{78} \\
a_{81} & a_{82} & a_{83} & a_{84} & a_{85} & a_{86} & a_{87} & a_{88}
\end{bmatrix}
\begin{bmatrix}
x_1 \\ x_2 \\ x_3 \\ x_4 \\ x_5 \\ x_6 \\ x_7 \\ x_8
\end{bmatrix} = 
\begin{bmatrix}
b_1 \\ b_2 \\ b_3 \\ b_4 \\ b_5 \\ b_6 \\ b_7 \\ b_8
\end{bmatrix}
$$

## 超长积分公式

$$
\int_{-\infty}^{\infty} \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} \frac{1}{(2\pi)^{3/2} |\Sigma|^{1/2}} \exp\left(-\frac{1}{2} (x-\mu)^T \Sigma^{-1} (x-\mu)\right) dx_1 dx_2 dx_3 = 1
$$

## 复杂求和公式

$$
\sum_{i=1}^{n} \sum_{j=1}^{m} \sum_{k=1}^{p} \alpha_{ijk} \cdot \beta_{ijk} \cdot \gamma_{ijk} \cdot \cos(\theta_{ijk}) \cdot \sin(\phi_{ijk}) \cdot \exp(-\lambda_{ijk} t)
$$

## 多层嵌套公式

$$
\frac{\partial}{\partial t} \left[ \frac{1}{2} \rho \left( \frac{\partial \psi}{\partial x} \right)^2 + \frac{1}{2} \rho \left( \frac{\partial \psi}{\partial y} \right)^2 + \frac{1}{2} \rho \left( \frac{\partial \psi}{\partial z} \right)^2 + \frac{1}{2} \kappa \left( \frac{\partial^2 \psi}{\partial x^2} + \frac{\partial^2 \psi}{\partial y^2} + \frac{\partial^2 \psi}{\partial z^2} \right)^2 \right] = 0
$$

## 长分数公式

$$
\frac{\partial^2 u}{\partial t^2} = c^2 \left( \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2} \right) + f(x,y,z,t) \cdot \exp\left(-\frac{(x-x_0)^2 + (y-y_0)^2 + (z-z_0)^2}{2\sigma^2}\right) \cdot \cos(\omega t + \phi)
$$

## 复杂根号公式

$$
\sqrt{\frac{1}{n} \sum_{i=1}^{n} \left( x_i - \bar{x} \right)^2} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} x_i^2 - \left( \frac{1}{n} \sum_{i=1}^{n} x_i \right)^2} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} x_i^2 - \bar{x}^2}
$$

## 长括号公式

$$
\left( \frac{\partial}{\partial x} + \frac{\partial}{\partial y} + \frac{\partial}{\partial z} \right) \left( \frac{\partial}{\partial x} - \frac{\partial}{\partial y} + \frac{\partial}{\partial z} \right) \left( \frac{\partial}{\partial x} + \frac{\partial}{\partial y} - \frac{\partial}{\partial z} \right) \psi(x,y,z) = 0
$$

## 测试结果

在移动端查看这些公式时，您应该看到：

1. **水平滚动** - 长公式可以水平滚动查看
2. **字体缩放** - 公式字体在移动端自动缩小
3. **触摸优化** - 支持触摸滚动
4. **滚动提示** - 在超小屏幕上显示滚动提示

## 总结

通过这些测试公式，我们可以验证移动端LaTeX公式的显示效果。长公式应该能够通过水平滚动完整查看，而不会被截断或溢出屏幕。 