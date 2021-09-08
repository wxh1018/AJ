var src = '/storage/emulated/0/Pictures/Screenshots/'
var imgsrc = src + '/img/'

let center = [device.width / 2, device.height / 2]
let y = device.height
let x = device.width
let get_num = 0
let centerxy = { x: device.height / 2, y: device.width / 2 }
//礼物村庄
let gifts = () => images.findMultiColors(rootGetScreen(), '#ecda82', [[-7, 5, '#dfd27d'], [-9, 7, '#e0d27d'], [-7, 11, '#e1d77b'], [-3, 9, '#e6da83'], [3, 11, '#ded57e']], { region: [236, 133, 1494, 717], threshold: 25 })
//山洞
let hole = () => images.findMultiColors(rootGetScreen(), '#e6db84', [[0, 5, '#dfd480'], [-5, 9, '#ebdb84'], [5, 9, '#ebdb84'], [4, 6, '#ebdb84'], [-4, 6, '#e6db83']], { region: [234, 142, 1507, 811], threshold: 25 })
//调查中
let survey = () => images.findMultiColors(rootGetScreen(), '#ff494a', [[1, 5, '#b50000'], [1, 20, '#ffffff'], [1, 32, '#b50000']], { region: [0, 0, 1919, 1079] })
//返回中
let back = () => images.findMultiColors(rootGetScreen(), '#b55d00', [[0, 8, '#ffffff'], [7, 15, '#ffffff'], [1, 26, '#b55d00']], { region: [0, 0, 1919, 1079] })
//睡觉中
let sleeping = () => images.findMultiColors(rootGetScreen(), '#7b7d7b', [[0, 10, '#ffffff'], [0, 19, '#ffffff'], [10, 19, '#7b7d7b']], { region: [0, 0, 1919, 1079] })

let 调查 = () => images.findImage(rootGetScreen(), images.read(imgsrc + '调查.png'), { threshold: .9 })
let 派遣 = () => images.findImage(rootGetScreen(), images.read(imgsrc + '派遣.png'), { threshold: .9 })

function 缩放地图(n) {
    n = n || 7
    for (i = 0; i < n; i++) {
        gestures([0, 500, [y * 0.8, 200], [center[1], center[0]]],
            [0, 500, [200, x * 0.8], [center[1], center[0]]]);
        sleep(1000)
    }
}

function cl(x, y) {
    sleep(1000)
    if (x) {
        if (typeof x == 'object') {
            click(x.x, x.y)
        } else {
            click(x, y)
        }
    }
    sleep(2000)
}
function 点击村庄并领取() {
    sleep(2000)
    let obj = gifts()
    // let obj = hole()
    log('村庄坐标为', obj)
    if (!obj) {
        滑动()
        log('getgifts_num', getgifts_num)
        getgifts_num++
        if (getgifts_num > 10) {
            getgifts_num = 0
        } else {
            点击村庄并领取()
        }
    } else {
        cl(obj)
        sleep(1000)
        cl(centerxy)
        log('领取村庄礼物' + get_num++ + '次')
    }

}
function 调查山洞() {
    let obj = hole()
    log('山洞坐标为', obj)
    if (!obj) {
        滑动()
        调查山洞()
    } else {
        cl(obj)
        sleep(1000)
        //点击山洞
        cl(centerxy)
        let find = 调查()
        if (find) {
            cl(find)
            if (back() || sleeping()) {
                cl(派遣())
                log('执行第' + get_num++ + '次调查山洞')
            } else {
                log('所有斥候都在调查中，开始领取村庄礼物')
                cl(centerxy)
                play_type = 1
            }
        }

    }
}
function 回家() {
    cl(87, 980)
}
function 滑动() {
    let start = {
        x: centerxy.x, y: centerxy.y
    }
    let end = {
        x: centerxy.x,
        y: centerxy.y
    }
    let direction = random(1, 4)
    //4象限
    let distance = 400
    switch (direction) {
        case 1:
            end.x += distance
            end.y -= distance
            log('向1象限移动')
            break;
        case 2:
            end.x -= distance
            end.y -= distance
            log('向2象限移动')
            break;
        case 3:
            end.x -= distance
            end.y += distance
            log('向3象限移动')
            break;
        case 4:
            end.x += distance
            end.y += distance
            log('向4象限移动')
            break;
    }
    swipe(start.x, start.y, end.x, end.y, 500)
    // swipe(centerxy.x, centerxy.y, centerxy.x - 300, centerxy.y, 500)
    sleep(2000)
}
//1村庄  2山洞   play_num要领取村庄的次数
var play_type = 1, play_num = 10
var getgifts_num = 0
// 领取奖励
let threads = threads.start(function () {
    while (true) {
        start()
    }
})
function start() {
    if (getgifts_num % 5 == 0) {
        回家()
        sleep(1000)
    }
    缩放地图(6)
    // 滑动()
    if (play_type == 1) {
        getgifts_num++
        if (getgifts_num > play_num) {
            getgifts_num = 0
            play_type = 2
        }
        点击村庄并领取()
    } else {
        调查山洞()
    }
    sleep(1000)
}


function findMultiColors(obj, type) {
    let dev_device = [900, 1600]
    type = type || 1
    let arr = obj.arr
    let region = obj.region
    x比例 = 1 || (obj.img.width / dev_device[1]).toFixed(3)
    y比例 = 1 || (obj.img.height / dev_device[0]).toFixed(3)
    newArr = getArr(arr)
    newRegion = getRigon(region)
    function getArr(arr) {
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            let x = arr[i][0] * x比例
            let y = arr[i][1] * y比例
            newArr.push([x, y, arr[i][2]])
        }
        return newArr
    }
    function getRigon(region) {
        if (region) {
            x = region[0] * x比例
            y = region[1] * y比例
            if (region.length > 2) {
                width = region[2] * x比例
                height = region[3] * y比例
                return [x, y, width, height]
            }
            return [x, y]
        } else {
            return [0, 0]
        }

    }
    let res = images.findMultiColors(obj.img, obj.firstColor, newArr, { region: newRegion, threshold: 20 })
    log(res)
    // let xy = getxy(res)
    let xy = res
    if (type == 2) {
        if (xy) {
            sleep(1000)
            click(xy.x, xy.y)
            sleep(1000)
        }
    }
    return xy
}
//模拟器专用截屏
function rootGetScreen() {
    this.pcpath = '/sdcard/aa脚本/screen/'
    let type = type || 'pc'
    if (type == 'pc') {
        files.ensureDir(this.pcpath)
        shell("screencap -p " + this.pcpath + "sc.png", true)
        return images.read(this.pcpath + 'sc.png')
    } else {
        return captureScreen()
    }
}




