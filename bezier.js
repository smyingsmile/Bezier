// const log = console.log.bind(console)
const arrayEquals = (array1, array2) => {
    if (array1.length !== array2.length) {
        return false
    }
    for (let i = 0; i < array1.length ; i++) {
        let a = array1[i]
        let b = array2[i]
        if (a !== b) {
            return false
        }
    }
    return true
}

const isObject = (o) => {
    return Object.prototype.toString.call(o) === '[object Object]'
}

const isArray = (o) => {
    return Array.isArray(o)
}

const objectEquals = (objA, objB) => {
    // key, v
    let keysA = Object.keys(objA)
    let keysB = Object.keys(objB)
    if (keysA.length !== keysB.length) {
        return false
    } else {
        for (let i = 0; i < keysA.length; i++) {
            let key = keysA[i]
            let valueA = objA[key]
            let valueB = objB[key]
            if (isObject(valueA)) {
                let r = objectEquals(valueA, valueB)
                if (!r) {
                    return false
                }
            } else if (isArray(valueA)) {
                let r = arrayEquals(valueA, valueB)
                if (!r) {
                    return false
                }
            } else if (valueA !== valueB) {
                return false
            }
        }
    }
    return true
}

const condition = (array1, array2) => {
    for (const e of array1) {
        if (arrayEquals(e, array2)) {
            // log('in array equal')
            return false
        }
    }
    return true
}

const conditionObj = (arr, obj2) => {
    for (const e of arr) {
        if (objectEquals(e, obj2)) {
            // log('in array equal')
            return false
        }
    }
    return true
}

const hasObj = (arr, obj2) => {
    for (let i = 0; i < arr.length ; i++) {
        let e = arr[i]
        if (objectEquals(e, obj2)) {
            // log('in array equal')
            return i
        }
    }
    return false
}


const handleSlope = (p1, p2) => {
    let x = p2.x - p1.x
    let y = p2.y - p1.y
    let factor
    if (x === 0) {
        // 竖线
        log('垂直竖线')
    } else if (y === 0) {
        // 横线
        factor = 0
    } else {
        factor = y / x
    }
    return factor
}

const handleStep = (p1, p2) => {
    let k = handleSlope(p1, p2)
    let step
    if (k <= 1 && k > -1) {
        // 以 x 为步进
        step = Math.abs(1 / p2.x - p1.x)
    }
    if (k > 1 || k < -1) {
        step = Math.abs(1 / p2.y - p1.y)
    }
    return step
}


const interpolate = (a, b, factor) => {
    return a + (b - a) * factor
}

const vectorInterpolate = (a, b, factor) => {
    let x = interpolate(a.x, b.x, factor)
    let y = interpolate(a.y, b.y, factor)
    let p = Point.new()
    p.x = x
    p.y = y
    return p
}

const bezierInterpolate = (start, p1, end, factor) => {
    let c1 = vectorInterpolate(start, p1, factor)
    let c2 = vectorInterpolate(p1, end, factor)
    let p = vectorInterpolate(c1, c2, factor)
    return p
}

// const bezier = (p0, p1, p2, p3, factor) => {
//     // 两点确认 其上的点 c1
//     let c1 = vectorInterpolate(p0, p1, factor)
//     // 起点与该点
//     let c2 = vectorInterpolate(p1, p2, factor)
//     // 终点与该点
//     let c3 = vectorInterpolate(p2, p3, factor)
//     // 得到贝塞尔曲线上的所有点
//     let x = vectorInterpolate(c1, c2, factor)
//     let y = vectorInterpolate(c2, c3, factor)
//     let p = vectorInterpolate(x, y, factor)
//     return p
// }

// 递归 多阶 贝塞尔
const bezier = (ps, step) => {
    // 两点确认 其上的点 c1
    while (ps.length > 1) {
        let tmp = []
        let len = ps.length
        // log('len', len)
        for (let i = 0; i < len - 1; i += 1) {
            let current = ps[i]
            let next = ps[i + 1]
            let c = vectorInterpolate(current, next, step)
            tmp.push(c)
        }
        // debugger
        ps = bezier(tmp, step)
    }
    return ps
}



// const drawPoint = (p) => {
//     p.color = 'red'
//     p.size = 8
//     p.draw()
// }
//
// const drawLine = (p1, p2) => {
//     for (let i = 0; i < 1; i += 0.01) {
//         let p = vectorInterpolate(p1, p2, i)
//         p.color = 'black'
//         p.size = 3
//         p.draw()
//     }
// }
//
// const drawBezier = (p0, p1, p2) => {
//     for (let i = 0; i < 1; i += 0.01) {
//         let p = bezierInterpolate(p0, p1, p2, i)
//         p.color = 'green'
//         p.size = 5
//         p.draw()
//     }
// }

// const main = () => {
//     let points = [
//         { x: 0, y: 200 },
//         { x: 300, y: 200 },
//         { x: 50, y: 100 },
//         { x: 50, y: 50 },
//     ]
//     // var p1 = vectorInterpolate(points[0], points[1], 0.01)
//     var p2 = bezier(points, 0.01)[0]
//     // log('p1', p1)
//     log('p2', p2)
// }
//
// main()