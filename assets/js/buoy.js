$(function () {
    var map = new AMap.Map('amap',{
        resizeEnable: true,
        zoom: 6
    });

    AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function() {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
    });
});