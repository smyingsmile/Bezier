// 思路梳理

// 准备阶段
// 1. 先建立自己的 Point 类 (需要绘制的基本功能可以慢慢补充)
// 2. 把 game 游戏引擎的框架搭起来


// 第一阶段 - 贝塞尔实现的步骤
// 1. 插值函数的实现
const interpolate = (a, b, factor) => {

}

// p 代表点, 有自己的 x y
const vectorInterpolate = (p1, p2, factor) => {

}
// 2. 二阶贝塞尔
const bezierInterpolate = (p1, p2, p3, factor) => {

}

// 3. 三阶贝塞尔
const bezierInterpolate = (p1, p2, p3, p4, factor) => {

}

// 4. 观察 二阶三阶 规律
    // 高阶贝塞尔
    // 递归起来
    // pointList 是一个装满了 point 的数组
const bezier = (pointList, factor) => {

}

// 第二阶段 帧与动画
// 1. 实现 canvas 画布可以绘制出点
// 2. 实现 canvas 画布可以绘制直线
    // 固定 p1, p2
    let pointsList1 = [
        { x: 20, y: 200 },
        { x: 50, y: 250 },
    ]
// 3. 实现 canvas 画布可以绘制二阶曲线/三阶
    //
    let pointsList2 = [
        { x: 20, y: 200 },
        { x: 50, y: 250 },
        { x: 300, y: 250 },
        // { x: 300, y: 50 },
    ]
// 4. 实现 canvas 画布可以绘制 N 阶曲线
    // 4.1 试试 5 个点/ 6 个点 绘制的效果
    // 4.2 实现工具函数 可以往 pointsList 里面加点


// 第三阶段 交互
// 1. 点可以拖动
// 实现点可以拖动, 可以先测试三个点的
// 2. 可以新增点
// 3. 实现新增和拖拽绘制曲线的动效

// 第四阶段 小球运动
// 1. 新增一个 Ball 类 作为小球
// 2. 设置它的移动速度 step 使它在绘制好的贝塞尔曲线上运动