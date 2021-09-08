src1 = '/storage/emulated/0/Pictures/Screenshots/'
let { findMultiColors, findImage, getdevice } = require(src1 + 'utils/base.js')
auto.waitFor()
storage = storages.create('WanGuo', {})
function WanGuo(deploy) {
    this.src = '/storage/emulated/0/Pictures/Screenshots/img/'
    // this.src = './img/'
    this.pcpath = '/sdcard/aa脚本/screen/'
    this.device = {
        x: device.height,
        y: device.width
    }
    this.timer = null
    this.less = null;
    this.plus = null
    this.leval = deploy.leval || 12
    this.isleval = false
    this.success = 0
    /**
     * @param {点击野怪次数} cl_creeps
     */
    this.cl_creeps = 0
    this.init = function () {
        setScreenMetrics(900, 1600)
        if (!requestScreenCapture()) {
            toast("请求截图失败");
            exit();
        }
        sleep(1000)
    }
    this.isimg = function (name, type) {
        let cap = this.rootGetScreen()
        let src = this.src + name
        let target = images.read(src)
        let test = { x: 1600, y: 900 }
        let device = { x: 1 }
        if (!target) {
            this.tlog(name, '未在本地找到图片')
            exit()
        } else {
            let img = findImage(cap, target, type)
            log(name, img)
            if (img) {
                return img
            } else {
                toastLog(name, '没有识别到坐标')
                return false
            }
        }

        // target.recycle();
    }
    //点击左下角搜索
    this.run_search1 = function () {
        // let se = this.isimg('search1.png')
        this.tlog('点击搜索图标')
        this.cl1(73, 666)
        sleep(2000)
        this.cl1(320, 780)
        sleep(1000)
    }
    this.run_search2 = function () {
        this.tlog('搜索野怪')
        this.cl1(340, 605)
        s(1.5)
    }
    //点击减号
    this.run_less = function (n) {
        n = n || 1
        if (!this.less) {
            减号 = { "img": w.rootGetScreen(), "firstColor": "#00c4ff", "arr": [["16", "-7", "#00cbff"], ["32", "0", "#00c2ff"], ["16", "7", "#13bff7"]], "region": ["0", "0", 1599, 899], "threshold": 20 }
            this.less = findMultiColors(减号)
        }
        log('less', this.less)
        if (this.less) {
            for (i = 0; i < n; i++) {
                this.cl(this.less)
            }
        }

    }
    //点击加号
    this.run_plus = function (n) {
        n = n || 1
        if (!this.plus) {
            加号 = { "img": this.rootGetScreen(), "firstColor": "#1075bd", "arr": [["19", "0", "#1075bd"], ["10", "-9", "#1075bd"], ["10", "10", "#1075bd"]], "region": ["350", "300", 400, 300], "threshold": 20 }
            plus = findMultiColors(加号, 1)
            this.plus = { x: plus.x, y: plus.y }
        }
        if (!this.plus) {
            this.tlog('找不到+号')
        }
        for (let i = 0; i < n; i++) {
            this.cl(this.plus)
        }
    }
    //设置等级
    this.set_leval = function () {
        if (!this.isleval) {
            this.isleval = true
            this.tlog('设置等级')
            this.run_less(20)
            this.run_plus(this.leval - 1)
        } else {
            toastLog('已设置过等级')
        }
    }
    this.cl_center = function () {
        this.tlog('点击野怪')
        // 960   527
        // 1920  1080
        let x = 1600 / 2
        let y = 900 / 2
        let arr = [[x, y], [x - 50, y - 50], [x + 50, y - 50], [x - 50, y + 50], [x + 50, y + 50]]
        let point = arr[this.cl_creeps]
        this.cl1(point[0], point[1])
        this.cl_creeps++
        if (this.cl_creeps < 4) {
            this.attack()
        } else {
            this.cl_creeps = 0
        }
    }
    //攻击
    this.attack = function () {
        let a = this.isimg('attack.png')
        log('attack', a)
        if (a) {
            this.cl_creeps = 0
            this.cl(a)
        } else {
            this.cl_center()
        }
    }
    //设置驻扎
    this.set_zhu = function () {
        s(1)
        let fg = this.isimg('iszhu.png')
        let fg1 = this.isimg('already_zhu.png')
        if (fg && !fg1) {
            this.cl(fg)
            this.tlog('设置驻扎')
        }
        s(.3)
        if (!this.isimg('already_zhu.png')) {
            this.set_zhu()
        }
        s(.5)
    }

    //创建军队
    this.creat = function () {
        this.cl1(1260, 170)
    }
    // 使用存档
    this.use_archive = function (n) {
        log('使用存档')
        let that = this
        let n = n || 1
        s(1)
        let cundang = this.isimg('存档1.png')
        let first = cundang
        if (n == 1) {
            log('使用存档1')
            log(first)
            this.cl(first)
            // this.cl(first)
            s(1)
            panduan('存档1.png')
        }
        function panduan(img) {
            //继续判断有没有
            let img2 = that.isimg(img)
            if (!img2) {
                log('不在城内关闭')
                // that.close()
            } else {
                log('在城内')
                // let fn = () => cl(845, 780)
                // run_n(3, fn)
            }
            let water = w.isimg('water.png')
            if (water) {
                w.tlog('喝水水')
                w.cl1(1235, 322)
                w.close()
                sleep(1000)
            }
            that.run_play()
        }
    }
    this.close = () => this.cl1(1365, 105)
    // 行军
    this.run_play = function () {
        s(1)
        cl(1170, 790)
    }
    //攻击结束
    this.play_end = () => this.isimg('play_end.png') || this.isimg('play_end1.png')
    this.warn = (point) => {
        let a = this.iscolor(point, '#eb6e00')
        return a
    }
    this.run_warn = (left_point) => {
        let iswarn = w.warn(left_point)
        log(iswarn)
        if (iswarn) {
            log('打不过回家')
            w.clc()
            s(1)
            // w.clc()
            //点击头像回家
            let right = this.find_home()
            //英雄回家
            this.run_hospital()
            swipe(right.x, right.y, w.device.x / 2, w.device.y / 2, 500)
            // log('点击头像', right)
            // w.cl(right)
            // s(2)
            // back = w.isimg('go_home.png')
            // log('back', back)
            // w.cl(back)
            return true
        } else {
            return false
        }
    }
    this.run_hospital = () => {
        let 放大 = w.isimg('fangda.png')
        if (!放大) {
            this.cl1(73, 817)
        }
        let hos = this.isimg('hospital.png')
        if (hos) {
            log('点击医院')
            this.cl(hos)
            s(1)
            this.cl1(1200, 720)
        } else {

        }
    }

    this.find_home = () => {
        return images.findColorInRegion(this.rootGetScreen(), '#008EC5', 1530, 245, 50, 300, 10)
    }
    this.isred = () => {
        return images.findColorInRegion(this.rootGetScreen(), '#B50000', 1530, 245, 50, 300, 10)
    }
    this.iscolor = function (point, color) {
        return images.findColorInRegion(this.rootGetScreen(), color, point.x, point.y, 15, 15, 10)
    }
    this.tlog = function (v) {
        toast(v)
        log(v)
    }
    this.view = function (v) {
        app.viewFile(this.src + v);
    }
    this.rootGetScreen = function () {
        if (deploy.device == 'pc') {
            files.ensureDir(this.pcpath)
            shell("screencap -p " + this.pcpath + "sc.png", true)
            return images.read(this.pcpath + 'sc.png')
        } else {
            return captureScreen()
        }

    }
    this.cl = function ({ x, y }) {
        if (x) {
            click(x, y)
        } else {
            log('坐标获取失败')
        }
        sleep(50)
    }
    this.cl1 = function (x, y) {
        if (x) {
            click(x, y)
        } else {
            log('坐标获取失败')
        }
        sleep(500)
    }
    //点击屏幕中间
    this.clc = function () {
        click(this.device.x / 2, this.device.y / 2)
        s(1)
    }
    function s(n) {
        return sleep(n * 1000)
    }
    function cl(x, y) {
        sleep(1000)
        return click(x, y)
    }
    this.run_n = function (n, fn) {
        for (var i = 0; i < n; i++) {
            fn()
        }
    }
    this.find_font = function find_font(imgFile) {
        access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=YIKKfQbdpYRRYtqqTPnZ5bCE&client_secret=hBxFiPhOCn6G9GH0sHoL0kTwfrCtndDj").body.json().access_token;
        url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic" + "?access_token=" + access_token;
        imag64 = images.toBase64(images.read(imgFile));
        res = http.post(url, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, image: imag64, image_type: "BASE64", language_type: "JAP" });
        str = JSON.parse(res.body.string()).words_result.map(val => val.words).join('\n');
        return str;
    }
    this.get_color = (x, y) => images.pixel(this.rootGetScreen(), x, y);
    this.isenterApp = () => images.findMultiColors(this.rootGetScreen(), '#f7ffff', [[0, 7, '#105d84'], [0, 14, '#73e7ff']], { threshold: 10 });
}


w = new WanGuo(storage.get('deploy'))
w.init()
log('storage', storage.get('deploy'))
let pn = 'com.lilithgames.rok.offical.cn'
app.launch(pn)
sleep(5000)
waitForPackage(pn)
w.tlog('已经启动')

threads.start(function () {
    setInterval(() => {
        if (currentActivity() != 'com.harry.engine.MainActivity') {
            toast('检测到退出应用  自动关闭脚本')
            exit()
        }
    }, 3000)
})

th = threads.start(function () {
    setInterval(() => {
        isenter = w.isimg('enterApp.png')
        if (isenter) {
            s()
            th.interrupt()
        } else {
            toast('进入app中')
        }
    }, 3000)
})

function s() {
    thread = threads.start(function () {
        while (true) {
            start()
        }
    })
    function stopThread() {
        exit()
        // thread.interrupt()
    }
    return { stopThread: stopThread }
}


function start() {
    let 放大 = w.isimg('fangda.png')
    if (放大) {
        w.cl(放大)
        sleep(1000)
    }
    w.run_search1()
    w.set_leval(10)
    w.run_search2()
    w.cl_center()
    // w.set_zhu()
    // w.attack()
    //判断 是否需要创建军队
    sleep(1000)
    let ishome = findMultiColors({ "img": w.rootGetScreen(), "firstColor": "#008ec5", "arr": [["10", "0", "#008ec5"], ["6", "10", "#008ec5"], ["10", "10", "#ffffff"]], "region": ["0", "0", 1599, 899], "threshold": 20 })
    log('判断是在外面')
    if (ishome) {//不创建 直接行军
        log('在外面')
        sleep(1000)
        w.cl(ishome)
        sleep(1000)
        left_point = { x: ishome.x - 320, y: ishome.y + 80 }
        //判断状态
        iswarn = w.run_warn(left_point)
        if (iswarn) {
            // 治疗
            w.run_hospital()
            sleep(10000)
        } else {
            // 行军
            log('行军军')
            click(ishome.x - 245, ishome.y + 65)
            sleep(2000)
            //有问题
            let water = findMultiColors({ "img": w.rootGetScreen(), "firstColor": "#00f729", "arr": [["0", "17", "#088229"], ["46", "29", "#ffa63a"], ["82", "29", "#107db5"]], "region": ["0", "0", 1599, 899], "threshold": 20 })
            if (water) {
                w.tlog('体力不足')
                w.cl1(1235, 322)
                w.close()
                sleep(1000)
                click(ishome.x - 245, ishome.y + 65)
            }else{
                w.tlog('继续战斗')
            }
        }
    } else {
        //
        log('不在外面')
        w.creat()
        w.use_archive()
    }
    sleep(5000)
    var thread = threads.start(function () {
        //在子线程执行的定时器
        setInterval(function () {
            if (w.play_end()) {
                w.tlog('攻击结束')
                w.success++
                log('已经攻击' + w.success + '次')
                //判断是否回城
                thread.interrupt()
            } else {
                //判断失败
                log('判断什么条件……')
                // if (!w.isred()) {
                //     log('回家了')
                //     thread.interrupt()
                // }
            }
        }, 3000);
    });
    thread.join()
}
// module.exports = WanGuo

