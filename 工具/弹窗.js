
Q群 = '90991754'
view = ui.inflate(
    <vertical padding="30">
        <text text="内容区域"></text>
    </vertical>, null, false
)
dialogs.build({
    customView: view,
    title: '温馨提示',
    neutral: '取消',
    negative: '加入qq群',
    positive: '确定',
    // view高度超过对话框时是否可滑动
    wrapInScrollView: false,
    // 按下按钮时是否自动结束对话框
    autoDismiss: false,
    contentColor: '#409eff'
}).on('negative', function (dialog) {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://card/show_pslcard?card_type=group&uin=" + Q群,
        packageName: "com.tencent.mobileqq",
    });
    toast("加入Q群")
    dialog.dismiss();
}).on('neutral', (dialog) => {
    dialog.dismiss();
}).on('positive', (dialog) => {
    dialog.dismiss();
}).show()