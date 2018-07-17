$(function () {
    var autoHeight = $("div.auto-height").height();
    var rowHeight = $('#search-block').height();
    var height = autoHeight - rowHeight;
    $('#map-panel').height(height - 30);

    AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
    });

    var map = new AMap.Map('amap', {
        resizeEnable: true,
        zoom: 16
    });

    laydate.render({
        elem: '#gpsTime'
        ,type: 'datetime'
        ,range: true
        ,eventElem: '#btnTime'
        ,trigger: 'click'
    });
});