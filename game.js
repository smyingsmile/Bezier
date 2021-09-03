class Game {
    constructor(fps, points, runCallback) {
        window.fps = fps
        this.points = points
        this.runCallback = runCallback
        //
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        // step 是步进, 也是贝塞尔曲线的 factor 参数
        this.step = 0.01

        // events
        var self = this
        window.addEventListener('keydown', event => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = false
        })
        this.init()
        log('after init')
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawDot(p) {
        // log('p', p)
        let d = Dot.new(this, p.x, p.y, 15, 'black')
        d.draw()
    }
    drawLine(p1, p2) {
        for (let i = 0; i < 1; i += 0.01) {
            let p = vectorInterpolate(p1, p2, i)
            // 取到 point 的数据
            // 先类化
            p = Point.new(this, p.x, p.y, 3, 'lightblue')
            p.draw()
        }
    }
    drawBezier(ps, step) {
        // 返回贝塞尔去线上的 一个 point 数据 { x: x, y: y}
        let p = bezier(ps, step)[0]
        return p
    }
    update() {
        let g = this
        // log('g.ps', g.ps)

        // step 累加不可以大于 1
        // 可以控制运动速度的小球
        if (this.step < 1) {
            let point = g.drawBezier(g.ps, this.step += 0.001)
            let d = Dot.new(g, point.x, point.y, 8,'lightgreen')
            d.update()
            g.ball = d
        }
        
        let enableDrag = false
        // 提前设定被点中的点的下标
        let currentIndex
        this.canvas.addEventListener('mousedown', function(event) {
            let x = event.offsetX
            let y = event.offsetY
            // log(x, y, event)
            for (let i = 0; i < g.ps.length; i++) {
                // 循环判断点中了哪个
                let p = g.ps[i]
                let d = Dot.new(g, p.x, p.y, 15, 'black')
                if (d.hasPoint(x, y)) {
                    // 检查是否点中了
                    enableDrag = true
                    currentIndex = i
                }
            }
        })

        this.canvas.addEventListener('mousemove', function(event) {
            let x = event.offsetX
            let y = event.offsetY
            // log(x, y, 'move')
            if (enableDrag) {
                // log(x, y, 'drag')
                // 拖动当前的 dot
                g.ds[currentIndex].x = x
                g.ds[currentIndex].y = y

                // 确定当前 dot 的数据, 更新 ps 数据
                g.ps[currentIndex].x = x
                g.ps[currentIndex].y = y

                g.drawList = []
                g.step = 0.01
                // log('g.ps in click', g.ps)
                let point = g.drawBezier(g.ps, g.step += 0.005)
                g.drawList.push(point)
            }
        })
        // 松开鼠标
        this.canvas.addEventListener('mouseup', function(event) {
            let x = event.offsetX
            let y = event.offsetY
            // log(x, y, 'up')
            enableDrag = false
        })

        // 点击生成新的点
        this.canvas.addEventListener('click', function(event) {
            let x = event.offsetX
            let y = event.offsetY
            let p = {
                x: x,
                y: y,
            }
            // 新增一个点
            // 如果这个点已经存在
            // 那就不新增
            if (conditionObj(g.ps, p)) {
                g.ps.push(p)
                g.drawList = []

                g.step = 0.01
                for (let i = g.step; i < 1; i += 0.01) {
                    let point = g.drawBezier(g.ps, i)
                    g.drawList.push(point)
                    // p.draw()
                }
                // log('g.ps in click', g.ps)
            }
        })
    }
    draw() {
        for (let i = 0; i < this.ps.length - 1; i++) {
            let current = this.ps[i]
            let next = this.ps[i + 1]
            this.drawLine(current, next)
        }

        // log('this.drawList.length', this.drawList.length)
        for (let i = 0; i < this.drawList.length; i++) {
            let p = this.drawList[i]
            // log('p in draw', p)
            p = Point.new(this, p.x, p.y, 5,'pink')
            p.draw()
        }

        for (let i = 0; i < this.ps.length; i++) {
            let p = this.ps[i]
            // this.drawPoint(p)
            this.drawDot(p)
            let d = Dot.new(this, p.x, p.y, 15, 'black')
            this.ds.push(d)
        }

        this.ball.draw()
    }
    runloop() {
        // log(window.fps)
        // events
        let g = this
        let actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]
            if(g.keydowns[key]) {
                // 如果按键被按下, 调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        // debugger
        // next run loop
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    run() {
        this.runCallback(this)
        let g = this
        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    init() {
        // drawList 是贝塞尔曲线上的点合集
        this.drawList = []
        // ps 是点的原始数据 { x, y}
        this.ps = []
        // ds 是 dots 合集 装的数据是 Dot
        this.ds = []
        //
        this.ball = {}
        // 预先载入
        for (let i = 0; i < this.points.length; i++) {
            let p = this.points[i]
            this.ps.push(p)
        }
        // 曲线
        this.run()
    }
}
