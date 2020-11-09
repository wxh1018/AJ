var src = '/storage/emulated/0/Pictures/Screenshots/'
var imgsrc = src + '/img/'
let { findMultiColors, findImage } = require(src + 'utils/base.js')

//多点找色坐标   和  识别图片的特征
// 带有icon的是图片识别  带有colors 是多点识别
let dataObj = {
    //攻击中
    Fighting_colors: { "img": '', "firstColor": "#ffffff", "arr": [["8", "0", "#b50000"], ["15", "-3", "#ffffff"]], "region": ["0", "0", 1599, 899], "threshold": 20 },
    //走路中
    Walking_colors: { "img": '', "firstColor": "#109a00", "arr": [["5", "0", "#ffffff"], ["10", "0", "#109a00"]], "region": ["0", "0", 1599, 899], "threshold": 20 },
    // 搜集
    Collection_colors: { "img": "img", "firstColor": "#109a00", "arr": [["0", "6", "#ffffff"], ["4", "3", "#ffffff"], ["-4", "11", "#ffffff"], ["4", "15", "#109a00"], ["8", "15", "#ffffff"]], "region": ["0", "0", 1599, 899], "threshold": 20 },
    //加号
    Plus_colors: { "img": '', "firstColor": "#1075bd", "arr": [["19", "0", "#1075bd"], ["10", "-9", "#1075bd"], ["10", "10", "#1075bd"]], "region": ["350", "300", 400, 300], "threshold": 20 },
    //减号
    Less_colors: { "img": '', "firstColor": "#00c4ff", "arr": [["16", "-7", "#00cbff"], ["32", "0", "#00c2ff"], ["16", "7", "#13bff7"]], "region": ["0", "0", 1599, 899], "threshold": 20 },
    //创建军队前 home图标  判断  是否有军队在外面
    HomeIn_colors: { "img": '', "firstColor": "#008ec5", "arr": [["10", "0", "#008ec5"], ["6", "10", "#008ec5"], ["10", "10", "#ffffff"]], "region": ["0", "0", 1599, 899], "threshold": 20 },
    //左下角地图放大图标
    Fangda_icon: 'fangda.png',
    //左下角搜索物资图标
    SearchAll_icon: 'search_all.png',
}

// let dataXY = {
//     SearchAll_icon: null
// }

let dataXY = function () {
    let me = this
    this.SearchAll_icon = null
    this.Plus_colors = null
    this.Less_colors = null
    return {
        setVal: function (icon, val) {
            if (typeof me[icon] == 'undefined') {
            } else {
                return me[icon] = val
            }
        },
        getVal(icon) {
            if (typeof me[icon] == 'undefined') {
                log('不固定坐标')
                return 'no'
            } else {
                return me[icon]
            }
        }
    }
}
let xyfn = dataXY()
log()

// for (let key in dataObj) {
//     if (typeof dataObj[key] == 'function') {
//         let fn = dataObj[key]
//         log(key, fn())
//     }
// }

let imgxy = find('Collection_colors')
log(imgxy)
function find(find_atttibutes, type) {
    let targetxy = null
    if (find_atttibutes.includes('_icon')) {
        let isval = xyfn.getVal(find_atttibutes)
        if (isval && isval != 'no') {
            log('获取到值')
            targetxy = isval
        } else if (!isval && isval != 'no') {
            log('没获取到值,进行设置' + find_atttibutes + '的坐标')
            //查找图片
            let target = images.read(imgsrc + dataObj[find_atttibutes])
            let isimg = findImage(rootGetScreen(), target, 2)
            xyfn.setVal(find_atttibutes, isimg)
            targetxy = isimg
        }
    } else {
        let isval = xyfn.getVal(find_atttibutes)
        log('isval', isval)
        if (isval && isval != 'no') {
            log('获取到值')
            targetxy = isval
        } else {
            log('没获取到值,进行设置' + find_atttibutes + '的坐标')
            //查找图片
            let obj = dataObj[find_atttibutes]
            obj.img = rootGetScreen()
            let isimg = findMultiColors(obj, 2)
            xyfn.setVal(find_atttibutes, isimg)
            targetxy = isimg
        }
    }
    return targetxy
}



function rootGetScreen(type) {
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