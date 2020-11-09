let dev_device = { x: 900, y: 1600 }
setScreenMetrics(dev_device.x, dev_device.y)//1080   1920

// let xy = getxy({ x: 540, y: 960 })
// press(xy.x, xy.y, 3000)

let url = '/storage/emulated/0/Pictures/Screenshots/'
let url2 = '/storage/emulated/0/Pictures/Screenshots/test/'
target = images.read(url + 'search2.png')
img2 = rootGetScreen() || images.read(url + '1920.png')
isimg = findImage(img2, target, 2)


/**
 * 
 * @param {截图} img 
 * @param {识别到的图片*} target 
 * @param {执行类型*  1返回 图片坐标  2返回并点击} type 
 */
function findImage(img, target, type) {
    let tar = ResizeImg(target)
    log(tar)
    let res = images.findImage(img, tar, { threshold: .9 })
    log('识别到的图片坐标', res)
    if (res) {
        let changexy = getxy(res)
        //由于识别到的图片  返回的坐标 aj已经做了兼容处理  所以  这里需要再次转换
        // let changexy2 = getxy({ x: parseInt(changexy.x), y: parseInt(changexy.y) })
        //getcenter里面也做了一次处理  所以上面的可以不要
        res2 = getCenter(changexy, tar)
        log('识别到的中心点坐标', res2)
        if (type == 2) {
            sleep(1000)
            click(parseInt(res2.x), parseInt(res2.y))
            sleep(1000)
        } else {
            toastLog('未识别到图片')
        }
    }
    return res
}
/**
 * @param {识别到的图片对象 返回{x:111,y:111}} res 
 */
function getxy(res) {
    let imgx2 = res.x
    let imgy2 = res.y
    let x1 = imgx2 * (dev_device.y / getdevice().width)
    let y1 = imgy2 * (dev_device.x / getdevice().height)
    return { x: x1, y: y1 }
}
//返回图片的中心点
function getCenter(res, tar) {
    // 横屏 屏幕比例
    let deviceNow = getdevice()
    x_proportion = deviceNow.width / dev_device.y
    y_proportion = deviceNow.height / dev_device.x
    log('x比例', x_proportion)
    log('y比例', y_proportion)
    console.log(res.x + tar.width / 2);
    console.log(res.y + tar.height / 2);
    x = (res.x + tar.width / 2) / x_proportion
    y = (res.y + tar.height / 2) / y_proportion
    return { x: x, y: y }
}

/**
 * 
 * @param {要识别得图片} img 
 * @param {设备得方向 横竖屏* v竖屏  h横屏 默认横屏} direction 
 * @param {类型*} type 
 */
function ResizeImg(img, direction) {
    direction = 'h' || direction
    //开发设备
    let dev_device = { x: 900, y: 1600 }
    let nowdevice;
    nowdevice = {
        x: device.width,
        y: device.height
    }
    if (nowdevice.x == 900 && nowdevice.y == 1600) {
        return img
    } else {
        //横屏
        if (direction == 'h') {
            let Rewidth = nowdevice.y * img.width / dev_device.y
            let Reheight = nowdevice.x * img.height / dev_device.x
            let Reimg = images.resize(img, [Rewidth, Reheight])
            return Reimg
        } else {
            let Rewidth = nowdevice.x * img.width / dev_device.x
            let Reheight = nowdevice.y * img.height / dev_device.y
            let Reimg = images.resize(img, [Rewidth, Reheight])
            return Reimg
        }
    }
}

function getdevice(type) {
    type = type || 'h'
    if (type == 'h') {
        return { width: device.height, height: device.width }
    } else {
        return { width: device.width, height: device.height }
    }
}

//模拟器专用截屏
function rootGetScreen() {
    shell("screencap -p " + url + "sc.png", true)
    return images.read(url + 'sc.png')
}
