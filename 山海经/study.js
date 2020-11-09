"ui";
storage = storages.create('WanGuo');
src = 'file:///storage/emulated/0/Pictures/Screenshots/'
bg = setcolor(2);
title = '万国觉醒刷野v1.0';
header = src + 'appHeader.png'
deploy = init()
log(storage.get('deploy'))
function init() {
    obj = { device: 'phone', leval: 10 }
    if (storage.get('deploy')) {
        for (key in obj) {
            obj[key] = storage.get('deploy')[key] || null
        }
    }
    return obj
}
creatUI()
function creatUI() {
    ui.layout(
        <drawer id="drawer">
            <vertical bg="{{bg}}">
                <appbar>
                    <toolbar id="toolbar" bg="{{bg}}" h="auto" title="{{title}}"></toolbar>
                    <tabs id="tabs" />
                </appbar>
                <viewpager id="viewpager" borderWidth="1">
                    {/* 功能 */}
                    <frame>
                        <scroll>
                            <vertical gravity="center_horizontal">
                                <horizontal gravity="left">
                                    <checkbox marginRight="20" id="daye" checked="true" text="打野" />
                                    <input id="leval" inputType="number" hint="请输入野怪等级" text="{{deploy.leval}}" />
                                </horizontal>
                            </vertical>
                        </scroll>
                    </frame>
                    {/* 配置 */}
                    <frame>
                        <scroll>
                            <vertical gravity="center_horizontal">
                                <Switch id="autoService" text="开启无障碍服务" checked="{{auto.service != null}}" textColor="red" padding="8 8 8 8" textSize="15sp" />
                                <text w="auto" h="50" gravity="center" color="#228B22" size="16" text="选择你的设备" />
                                <radiogroup id="device">
                                    <radio margin="10 0 0 0" checked="{{deploy.device == 'phone'}}" id="phone" text="手机" />
                                    <radio margin="10 0 0 0" checked="{{deploy.device == 'pc'}}" id="moni" text="模拟器" />
                                </radiogroup>
                                <button id="start" style="Widget.AppCompat.Button.Colored" text="运行" />
                            </vertical>
                        </scroll>
                    </frame>
                    {/* 帮助 */}
                    <frame>
                        <scroll>

                        </scroll>
                    </frame>
                </viewpager>
            </vertical>
            <vertical layout_gravity="left" width="200" bg="{{bg}}" >
                <img src="{{header}}" w='100' h='100' radius="50" layout_gravity="center" />
                <scroll>
                    <list id="menu">
                        <button bg="{{setcolor(1)}}" margin="2" borderColor="#409eff" w="*" text="{{title}}"></button>
                    </list>
                </scroll>
            </vertical>
        </drawer>
    )
}

//设置滑动页面的标题
ui.viewpager.setTitles(['功能', '配置', '帮助'])
//让滑动页和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager)

ui.autoService.on('check', function (e) {
    if (e && !auto.service) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service) {
        auto.service.disableSelf();
    }
})
// 开始运行
ui.start.on('click', () => {
    // launchApp('万国觉醒')
    // waitForActivity("com.lilithgames.rok.offical.cn");
    deploy.leval = ui.leval.text()
    deploy.device = getDevice()
    storage.put('deploy', deploy)
    threads.start(function () {
        engines.execScriptFile('wanguo.js')
    })

})

function getDevice() {
    if (ui.phone.isChecked()) {
        return 'phone'
    } else {
        return 'pc'
    }
}
leftMenu()
function leftMenu() {
    ui.menu.setDataSource([{ title: '关于' }, { title: '退出' }, { title: 'clear' }]);
    ui.menu.on("item_click", item => {
        switch (item.title) {
            case "更新日志":
                // app.openUrl('www.baidu.com');
                break;
            case "检查更新":
                threads.start(function () {
                    let titileAndVersion = ui.toolbar.getTitle();
                    let appNameAndVersionArray = titileAndVersion.split("v");
                    let appName = appNameAndVersionArray[0];
                    let appVersion = appNameAndVersionArray[1];
                    var url = rootUrl + "/app/WebService.asmx/CheckAppVersion";
                    var version = appVersion;
                    var res = http.post(url, { "appName": appName, "version": version });
                    var returnString = res.body.string();
                    let json = JSON.parse(returnString);
                    if (json.success == "true") {
                        if (json.data.upgrade == "true") {
                            app.openUrl(rootUrl + "/app/WebService.asmx/DownLoadWoolUIApk");
                        } else {
                            toast("已经是最新版");
                        }
                    } else {
                        toast("请求远端服务器出现异常！请稍后重试！");
                    }
                });
                break;
            case "教程":
                app.openUrl("https://blog.csdn.net/zy0412326/article/details/104767602");
                break;
            case "关于":
                dialogs.build({
                    title: "关于",
                    positive: "确定",
                    items: ["这个东东是第一个版本，做的不咋地。我是用模拟器测试的，可能出现某些手机不能用的问题，谅解谅解。阿弥陀佛，善哉善哉(○｀ 3′○)"]
                }).on("show", (dialog) => { }).show();
                break;
            case 'clear':
                storage.clear()
                break;
            case "退出":
                ui.finish();
                break;
        }
    });
    //让工具栏左上角可以打开侧拉菜单
    ui.toolbar.setupWithDrawer(ui.drawer);
}
function setcolor(v) {
    arr = ['#409eff', '#FFEBCD', '#bbd8bf']
    return arr[v]
}




