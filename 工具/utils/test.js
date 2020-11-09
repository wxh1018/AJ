src1 = '/storage/emulated/0/Pictures/Screenshots/'
let { findMultiColors, findImage } = require(src1 + 'utils/base.js')

加号 = { "img": images.read(src1 + 'sc.png'), "firstColor": "#1075bd", "arr": [["19", "0", "#1075bd"], ["10", "-9", "#1075bd"], ["10", "10", "#1075bd"]], "region": ["350", "300", 400, 300], "threshold": 20 }
findMultiColors(加号, 2)

