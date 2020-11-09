/**
 * @dev_device 开发环境里的设备大小 [900,1600]
 * 
 */
dev_device = { x: 900, y: 1600 }

// 1600 900
setScreenMetrics(900, 1600)
// click(450, 800)
Big = '/storage/emulated/0/Pictures/Screenshots/攻击中.png'
Big2 = '/storage/emulated/0/Pictures/Screenshots/攻击中sma.png'
Small = '/storage/emulated/0/Pictures/Screenshots/small.png'
P11 = '/storage/emulated/0/Pictures/Screenshots/iphone11.jpg'
less = '/storage/emulated/0/Pictures/Screenshots/lessc.png'
less2 = '/storage/emulated/0/Pictures/Screenshots/sc.png'
Bigimg = images.read(Big)
Big2img = images.read(Big2)
Smallimg = images.read(Small)
P11img = images.read(P11)
initObj = {
    dev_device: [900, 1600]
}

// 采集对象 = { "img": P11img, "firstColor": "#109a00", "arr": [["0", "7", "#ffffff"], ["0", "16", "#109a00"]], "region": ["1352", "164", 247, 483], "threshold": 20 }

// let 采集测试 = findMultiColors(采集对象, 2)
// log('采集测试', 采集测试)

// homeobj = { "img": Smallimg, "firstColor": "#085584", "arr": [["12", "0", "#73e3ff"], ["18", "0", "#105584"]], "region": ["1452", "743", 137, 145], "threshold": 20 }
// let hometest = findMultiColors(homeobj, 1)
// log('hometest', hometest)

减号 = { "img": images.read(less2), "firstColor": "#00ceff", "arr": [["0", "9", "#1075bd"], ["0", "18", "#00baf7"]], "region": ["55", "329", 300, 300], "threshold": 20 }

加号 = { "img": images.read(less2), "firstColor": "#1075bd", "arr": [["19", "0", "#1075bd"], ["10", "-9", "#1075bd"], ["10", "10", "#1075bd"]] }



/**
 * 
 * @param {findMultiColors参数对象} obj 
 * @param {1返回坐标点[x,y] ，点击坐标并返回[x,y],  默认1} type 
 * @param {开发测试的分辨率[900,1600]} dev_device
 */
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
    let res = images.findMultiColors(obj.img, obj.firstColor, newArr, { threshold: 20 })
    let xy = getxy(res)
    if (type == 2) {
        if (res) {
            sleep(1000)
            click(xy.x, xy.y)
            sleep(1000)
        }
    }
    return res
}

function getdevice(type) {
    type = type || 'h'
    if (type == 'h') {
        return { width: device.height, height: device.width }
    } else {
        return { width: device.width, height: device.height }
    }
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





