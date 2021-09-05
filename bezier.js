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

const conditionObj = (arr, obj2) => {
    for (const e of arr) {
        if (objectEquals(e, obj2)) {
            // log('in array equal')
            return false
        }
    }
    return true
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