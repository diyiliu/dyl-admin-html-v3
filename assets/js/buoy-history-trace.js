$(function () {
    laydate.render({
        elem: '#gpsTime'
        ,type: 'datetime'
        ,range: true
        ,eventElem: '#btnTime'
        ,trigger: 'click'
    });


    $("#buoy").completer({
        zIndex: 200,
        suggest: true,
        source: ["PG3711981", "PG3711982", "PG3711983", "PG3711984"]
    });
});