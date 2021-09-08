src1 = '/storage/emulated/0/Pictures/Screenshots/'
let { findMultiColors, findImage, getdevice, getxy, screen } = require(src1 + 'utils/base.js')
var src = '/storage/emulated/0/Pictures/Screenshots/'
var imgsrc = src + '/img/'

const dev = getdevice()
const c_x = dev.width / 2
const c_y = dev.height / 2

let img = screen()
// let img = images.read(src + 'gem3.png')
//找宝石
let findgem = () => images.findMultiColors(img, '#eeefde', [[9, 1, '#e8ebd6'], [7, -8, '#e5ecd8'], [-2, 6, '#e4ebd5'], [2, 10, '#e9ead5'], [-6, 8, '#e1e7cf']])
let findgem2 = () => images.findMultiColors(img, '#d6dfde', [[7, 1, '#d6dfde'], [5, -7, '#d5dede'], [0, 9, '#cfdad8'], [0, -5, '#d5dedd']])
let findgem3 = () => images.findMultiColors(img, '#e6e7d6', [[6, -7, '#e5e6d5'], [7, 1, '#e6e7d6'], [1, 8, '#e5e5d3'], [1, -5, '#e5e6d5']])

缩放地图(8)
sl()
let xy = findgem() || findgem2() || findgem3()
log(xy)
cl(xy)





function 缩放地图(n) {
    n = n || 7
    let distance = 200
    let len = 2.5
    for (i = 0; i < n; i++) {
        gestures([0, 500, [c_x + distance, c_y - distance], [c_x + distance / len, c_y - distance / len]],
            [0, 500, [c_x - distance, c_y + distance], [c_x - distance / len, c_y + distance / len]]);
        sl(.3)
    }
}
function cl() {
    if (arguments[0]) {
        if (arguments.length == 1) {
            let xy = getxy(arguments[0])
            sl()
            click(xy.x, xy.y)
        } else {
            let xy = getxy({ x: arguments[0], y: arguments[1] })
            sl()
            click(xy.x, xy.y)
        }
    } else {
        log('无坐标点')
    }
}
function sl(s) {
    if (s) {
        sleep(s * 1000)
    } else {
        sleep(1000)
    }
}
