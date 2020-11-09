function 山海经() {
    this.src = '/sdcard/auto/山海经/'
    this.device = {
        x: device.width,
        y: device.height
    }
    let that = this
    // 初始化
    this.init = function () {
        setScreenMetrics(device.width, device.height)
        requestScreenCapture()
        sleep(1000)
    }
    this.判断 = function () {
        let 可以异变 = isimg('可以异变.jpg')
        let 首页 = isimg('山海经.jpg')
        let 背景 = isimg('bg.jpg')
        let 分享或看视频异变 = isimg('分享或看视频异变.jpg')
        let 看视频升级 = isimg('看视频升级.jpg')
        let 异变红点 = images.findColor(captureScreen(), '#e21212', {
            region: [800, 1900],
            threshold: 30
        })
        // tlog(可以异变, 首页, 背景, 分享或看视频异变, 看视频升级, 异变红点)
        while (true) {
            this.打开异变()
            sleep(1000)
            let yb = isimg('分享或看视频异变.jpg')
            console.log(yb);
            if (!yb) {
                tlog('可以直接异变无广告')
                click1(550, 1700)
                if (isfull()) {
                    //满了 关闭异变去合成
                    this.关闭异变()
                    this.合并()
                } else {
                    log('立马异变当前不是广告')
                    this.点击异变()
                    log('判断是否有看视频升级出现  然后在合并')
                    this.点击全部()
                    this.合并()
                }
            }
            let shareOrsee = isimg('分享或看视频异变.jpg')
            if (shareOrsee) {
                tlog('分享或看视频异变')
                click1(shareOrsee.x + 100, shareOrsee.y + 30)
                this.判断分享()
            }
            if (isimg('看视频升级.jpg')) {
                tlog('看视频升级')
            }
            this.打开异变()
            this.看广告()
            if (1) {
                log('判断直接领取')
                this.找灵石()
            }
            this.点击全部()
            let cl = isimg('close.jpg')
            if (cl) {
                click1(cl.x, cl.y)
            }
            log('神马都找到')
        }
    }
    this.看视频异变 = function () {
        tlog('看视频异变')
        click(540, 1720)
        log('判断是分享还是看广告')
    }
    this.判断分享 = function () {
        sleep(2000)
        log(text('搜索'))
        if (text('搜索').findOnce()) {
            tlog('分享')
            sleep(3000)
            click(21, 123, 83, 246)
            rancli()
        } else {
            log('广告')
            this.单个广告()
        }
    }
    this.打开异变 = function () {
        log('打开异变')
        click1(880, 2100)
    }
    this.合并 = function (col, row, area) {
        merge(18, 6)

        function merge(col, row, area) {
            //当前上半区域没动物则缩小范围
            if (images.findImage(captureScreen(), images.read(that.src + 'bg.jpg'))) {
                tlog('判断上半部分无动物,缩小范围合并')
                area = [150, 1500, 900, 1900]
                col = 6
                row = 6
            }
            let [xs, ys, xn, yn] = area || [180, 510, 900, 1900];
            col = col || 12;
            row = row || 6;
            tlog(xs, ys, xn, yn)
            let xlength = xn - xs
            let ylength = yn - ys
            let xsize = xlength / row; //每个区间宽度
            let ysize = ylength / col; //每个区间高度
            for (let j = 0; j < col; j++) {
                for (let i = 0; i < row; i++) {
                    //每个区间x轴的距离
                    let pointx = parseInt(xsize * (i + 1) + xs - (xsize / 2))
                    let pointy = parseInt(ysize * (j + 1) + ys - (ysize / 2))
                    let point = [pointx, pointy]
                    swipe(pointx, pointy, 900, 1800, 230)
                    let upimg = images.findImage(captureScreen(), images.read(that.src + '看视频升级.jpg'))
                    if (upimg) {
                        if (images.findColorInRegion(captureScreen(), '#ffffff', 400, 400, 100, 100)) {

                        } else {
                            tlog('合成过程中发现免费升级')
                            sleep(1000)
                            click(upimg.x + 50, upimg.y + 30)
                            that.判断分享()
                            //  that.单个广告()
                            click(500, 500)
                        }

                    }
                }
            }
            tlog('合成完毕')
        }
        tlog('缩小范围再次合并')
        //第二次 缩小范围
        merge(3, 6, [500, 1600, 900, 1900,])
        toast("进行随机分散")
        that.执行次数(15, that.随机拖放(900, 1800))
        merge(18, 6)
        tlog('第三次合并')
        findImgmerge()
        tlog('合并完毕')
    }
    this.关闭广告 = function () {
        click1(970, 84)
    }
    this.找灵石 = function () {
        let point = isimg('直接领取.jpg')
        sleep(300)
        if (point) {
            tlog('找到', point)
            click(point.x + 30, point.y + 30)
            sleep(3000)
            click(point.x + 30, point.y + 30)
        }
        click(400, 500)
    }
    this.看广告 = function () {
        click1(850, 730)
        let n = 0
        //while (n < 10) {
        let img = images.findImage(captureScreen(), images.read(that.src + "幸运.jpg"), {
            region: [640, 1000, 300, 300],
            threshold: .8
        })
        if (img) {
            toast("看视频")
            观看 = click(820, 1130)
            sleep(35000)
            关闭 = click(970, 83)
            sleep(2000)
            点击屏幕 = click(300, 500)
            // sleep(35000)
            n++
        } else {
            toast("完毕")
        }

        // }
        click1(936, 720)
        toast("退出")
    }
    this.分享 = function () {
        click1(470, 900)
        sleep(3000)
        click1(70, 200)
    }
    this.关闭异变 = function () {
        tlog('关闭弹窗')
        tlog('达到最大数量 前往合并')
        click1(967, 578)
        sleep(2000)
    }
    this.点击异变 = function () {
        // click1(550, 1700)
        sleep(20000)
        tlog('点击确定')
        let img = isimg('确定.jpg')
        if (img) {
            click1(img.x, img.y)
        } else {
            tlog('没找到确定按钮')
            sleep(3000)
            this.点击全部()
        }
        tlog('点击确定完之后干啥')
    }
    this.单个广告 = function () {
        sleep(35000)
        关闭 = click(970, 83)
        log('关闭广告')
        sleep(2000)
    }
    this.随机拖放 = function (pointx, pointy) {
        swipe(pointx, pointy, random(0, that.device.x), random(0, that.device.y), 300)
    }
    this.执行次数 = function (num, fn) {
        console.info(fn)
        let n = 0
        for (let i = 0; i < num; i++) {
            fn
        }
    }
    this.点击全部 = function () {
        let cl = isimg('close.jpg')
        log(cl)
        if (cl) {
            click1(cl.x, cl.y)
            click1(974, 550)
            click1(895, 720)
        }
        tlog('点击全部')
        click(560, 1150)
        click(560, 1250)
        click(560, 1350)
        click(560, 1450)
        click(560, 1550)
    }

    function tlog(v) {
        toast(v)
        log(v)
    }

    function click1(x, y) {
        sleep(1000)
        click(x + 20, y + 20)
        sleep(1000)
    }

    function isimg(name) {
        let img = images.findImage(captureScreen(), images.read(that.src + name), {
            threshold: .85
        })
        return img
    }

    function isfull(x, y) {
        if (images.findImage(captureScreen(), images.read(that.src + '可以异变.jpg'))) {
            return true
        } else {
            return false
        }
    }
    function rancli() {
        click1(random(300, 500), random(500, 1000))
    }
    // findImgmerge()
    function findImgmerge(col, row) {
        log('判断图片合并')
        let target = images.read('/sdcard/auto/target.jpg')
        if (!target) {
            toast('未找到目标图片')
            exit()
        }
        toast('开始执行')
        log(device.width, device.height)
        setScreenMetrics(device.width, device.height)
        // 点击范围
        // y: 500-1800  8行
        // x: 150-900   5列
        // 先纵向循环 再横向循环
        let [xs, ys, xn, yn] = [150, 1600, 900, 1900];
        col = col || 5;
        row = row || 12;
        tlog(xs, ys, xn, yn)
        let xlength = xn - xs
        let ylength = yn - ys
        let xsize = xlength / row; //每个区间宽度
        let ysize = ylength / col; //每个区间高度
        for (let j = 0; j < col; j++) {
            for (let i = 0; i < row; i++) {
                //每个区间x轴的距离
                let pointx = parseInt(xsize * (i + 1) + xs - (xsize / 2))
                let pointy = parseInt(ysize * (j + 1) + ys - (ysize / 2))
                let point = [pointx, pointy]
                press(pointx, pointy, 300)
                let img = captureScreen()
                checkImg(img, [pointx, pointy])
                // sleep(1000)
            }
        }
        toast('合成完毕')
    }

    //找到图片滑动合成
    function checkImg(img, point) {
        let target = images.read('/sdcard/auto/target.jpg')
        var points = images.matchTemplate(img, target, {
            region: [200, 500, 650, 1300],
            max: 8,
            threshold: 0.6
        });
        var arr = points.matches.map(v => {
            return {
                x: v.point.x,
                y: v.point.y
            }
        })
        log('符合条件的坐标', arr)
        if (arr.length < 1) {
            log('暂无')
        } else {
            toast('找到坐标', arr)
            swipe(point[0], point[1], arr[0].x, arr[0].y, 300)
            if (arr.length > 2) {
                swipe(arr[1].x, arr[1].y, arr[2].x, arr[2].y, 300)
            }
        }
    }


}
let start = new 山海经()
start.init()
start.判断()