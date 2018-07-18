$(function () {
    AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
    });

    var position = new AMap.LngLat(117.268983, 34.25912);
    var map = new AMap.Map('amap', {
        resizeEnable: true,
        zoom: 16,
        center: position
    });

    var marker = new AMap.Marker({
        map: map,
        position: position
    });

    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker.getPosition());
    });

   //实例化信息窗体
    var content = [];
    content.push("小宠");
    content.push("<i class='fa fa-crosshairs'></i> WIFI定位");
    content.push("2018-07-17 22:02:23");

    var infoWindow = new AMap.InfoWindow({
        content: content.join("<br/>"),
        offset: new AMap.Pixel(0, -20)
    });

    infoWindow.open(map, marker.getPosition());
});