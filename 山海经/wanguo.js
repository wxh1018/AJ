
auto.waitFor();

storage = storages.create('WanGuo')
function WanGuo(deploy) {
    this.src = '/storage/emulated/0/Pictures/Screenshots/'
    this.device = {
        x: device.width,
        y: device.height
    }
    this.timer = null
    this.less = null;
    this.plus = null
    this.leval = deploy.leval
    this.isleval = false
    this.success = 0
    /**
     * @param {点击野怪次数} cl_creeps
     */
    this.cl_creeps = 0
    //点击左下角搜索
    this.run_search1 = function () {
        // let se = this.isimg('search1.png')
        this.tlog('点击搜索图标')
        this.cl1(73, 666)
        sleep(2000)
    }
    this.is_search1 = function () {
        return this.isimg('search1.png')
    }
    this.run_search2 = function () {
        this.tlog('搜索野怪')
        this.cl1(340, 605)
        s(1.5)
    }
    this.is_search2 = function () {
        return this.isimg('search2.png')
    }
    //点击减号
    this.run_less = function (n) {
        n = n || 1
        if (!this.less) {
            this.less = this.isimg('less.png')
        }
        for (i = 0; i < n; i++) {
            this.cl(this.less)
        }
    }
    //点击加号
    this.run_plus = function (n) {
        n = n || 1
        if (!this.plus) {
            x = this.less.x + 340
            y = this.less.y
            this.plus = { x: x, y: y }
        }
        if (!this.plus) {
            this.tlog('找不到+号')
        }
        for (let i = 0; i < n; i++) {
            this.cl(this.plus)
        }
    }
    //设置等级
    this.set_leval = function (n) {
        if (!this.isleval) {
            this.isleval = true
            this.tlog('设置等级')
            n = n || this.leval
            this.run_less(20)
            this.run_plus(n - 1)
        }
    }
    this.cl_center = function () {
        this.tlog('点击野怪')
        let x = this.device.x / 2
        let y = this.device.y / 2
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
        var that = this
        n = n || 1
        s(1)
        let cundang = this.isimg('save_cundang.png')
        let first = { x: cundang.x, y: cundang.y + 130 }
        if (n == 1) {
            log('使用存档1')
            log(first)
            this.cl(first)
            this.cl(first)
            s(1)
            panduan('first1.png')
        }
        function panduan(img) {
            //继续判断有没有
            let img2 = that.isimg(img)
            if (!img2) {
                log('不在城内关闭')
                that.close()
            } else {
                log('在城内')
                // let fn = () => cl(845, 780)
                // run_n(3, fn)
            }
            that.run_play()
        }

    }
    this.close = () => this.cl(this.isimg('close_dialog.png'))
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
    this.init = function () {
        setScreenMetrics(device.width, device.height)
        if (!requestScreenCapture()) {
            toast("请求截图失败");
            exit();
        }
        sleep(1000)
    }
    this.isimg = function (name, position) {
        let cap = this.rootGetScreen()
        let target = images.read(this.src + name)
        if (!target) {
            this.tlog('本地找不到图片')
        }
        let img = images.findImage(cap, target, {
            threshold: 0.7
        })
        if (img) {
            if (position == 'bottom') {
                return { x: img.x + target.width / 2, y: img.y + target.height - 5 }
            } else {
                return { x: img.x + target.width / 2, y: img.y + target.height / 2 }
            }
        } else {
            log(name, '找不到坐标')
            return false
        }
        target.recycle();
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
            shell("screencap -p " + this.src + "sc.png", true)
            return images.read(this.src + 'sc.png')
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
    this.get_color = (x, y) => images.pixel(this.rootGetScreen(), x, y)
}

w = new WanGuo(storage.get('deploy'))
w.init()
let pn = 'com.lilithgames.rok.offical.cn'
app.launch(pn)
sleep(3000)
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
        if (w.isimg('enterApp.png')) {
            s()
            main = th.interrupt()
        } else {
            toast('进入app中')
        }
    }, 2000)
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
    let ishome = w.isimg('home.png')
    if (ishome) {//不创建 直接行军
        sleep(1000)
        w.cl(ishome)
        sleep(1000)
        let left_point = { x: ishome.x - 385, y: ishome.y + 14 }
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
            let water = w.isimg('use_water.png') || { x: 1230, y: 330 }
            if (water) {
                w.tlog('喝水水')
                w.cl(water)
                w.close()
                sleep(1000)
                // click(ishome.x - 245, ishome.y + 65)
                click(1364, 100)
            }
        }
    } else {
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
                if (!w.isred()) {
                    log('回家了')
                    thread.interrupt()
                }
            }
        }, 3000);
    });
    thread.join()
}









// while (true) {

// }