
const base = {
    src: '/sdcard/auto/wanguo/',
    device = {
        x: device.width,
        y: device.height
    },
    init() {
        setScreenMetrics(device.width, device.height)
        requestScreenCapture()
        sleep(1000)
    },
    isimg(name) {
        let img = images.findImage(captureScreen(), images.read(this.src + name), {
            threshold: .85
        })
        return img
    },
    tlog(v) {
        toast(v)
        log(v)
    }
}
model.export = base
// export default base