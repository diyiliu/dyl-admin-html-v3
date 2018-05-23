$(function () {
    var autoHeight = $("div.auto-height").height();
    var rowHeight = $('#search-block').height();
    var tableHeight = autoHeight - rowHeight;

    var $table = $('#stockTable');
    $table.bootstrapTable({
        // 条纹
        striped: true,
        height: tableHeight,
        toolbar: '#toolbar',
        pagination: true,
        paginationLoop: false,
        sidePagination: 'server',
        url: './assets/data/stock.json',
        method: 'post',
        contentType: "application/x-www-form-urlencoded",
        dataField: "data",
        queryParamsType: '',
        queryParams: function queryParams(params) {
            var param = {
                pageNo: params.pageNumber,
                pageSize: params.pageSize,
                status: $('#searchStatus').val(),
                createTime: $('#createTime').val(),
                search: $('#search').val()
            };
            return param;
        },
        formatLoadingMessage: function () {
            return "正在加载数据中，请稍候……"
        },
        formatShowingRows: function (a, b, c) {
            return "第 " + a + " / " + b + " 条，共 " + c + " 条 ";
        },
        formatRecordsPerPage: function (a) {
            return "每页 " + a;
        },
        columns: [
            {
                field: '',
                checkbox: true
            },
            {
                field: 'bookNo',
                title: '账本号'
            },
            {
                field: 'serialNo',
                title: '序列号'
            },
            {
                field: 'member',
                title: '姓名',
                formatter: function (value, row, index) {
                    if (value) {
                        return value['name'];
                    }

                    return '';
                }
            },
            {
                field: 'gross',
                title: '毛重',
                align: 'right'
            },
            {
                field: 'tare',
                title: '去皮',
                align: 'right'
            },
            {
                field: 'suttle',
                title: '净重 (kg)',
                align: 'center'
            },
            {
                field: 'price',
                title: '单价 (元/kg)',
                align: 'center'
            },
            {
                field: 'money',
                title: '金额 (元)',
                align: 'right',
                formatter: function (value, row, index) {
                    value = value + '';
                    if (value.indexOf('.') > 0){
                        return value.split('.')[0];
                    }

                    return value;
                }
            },
            {
                field: 'createTime',
                title: '创建时间',
                align: 'center',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value) {
                        str = value.substr(0, 10);
                    }

                    return '<span style="cursor: default" title="' + value + '">' + str + '</span>';
                }
            },
            {
                field: 'status',
                title: '状态',
                align: 'center',
                formatter: function (value, row, index) {
                    if (1 == value) {
                        return '<span class="sf-sign-check" style="display: inline-block;width: 16px;height: 16px;background-size: 16px 16px;"></span>';
                    }

                    return '<a href="javascript:void(0);" onclick="payMoney(this);" data-id="' + row.id + '" title="重置密码"><span class="sf-light-bulb" style="display: inline-block;width: 16px;height: 16px;background-size: 16px 16px;"></span></a>';
                }
            }
        ]
    });


    $('#searchStatus').chosen({allow_single_deselect: true});

    laydate.render({
        elem: '#createTime'
        ,type: 'date'
        ,range: true
        ,eventElem: '#btnTime'
        ,trigger: 'click'
    });

    $('#doSearch').on('click', function () {
        $table.bootstrapTable("refresh");
    });

    $('#addStock').on('click', function () {
        $('#stockForm')[0].reset();

        $('#stockModalTitle').html('添加库存');
        $('#id').val('');
        document.getElementById('bookNo').readOnly = false;
        document.getElementById('serialNo').readOnly = false;
        $('#stockModal').modal('show');
    });

    $('#saveStock').on('click', function () {
        var param = $('#stockForm').serialize();
        $.ajax({
            type: $('#id').val() == '' ? 'post' : 'put',
            url: '',
            data: param,
            dataType: "json",
            success: function (result) {
                if (result == 1) {
                    $('#stockModal').modal('hide');
                    $('#stockTable').bootstrapTable('refresh');

                    alertTip('success', '保存成功');
                } else {
                    alertTip('error', '保存失败');
                }
            }
        });
    });

    $('#editStock').on('click', function () {
        var stocks = $table.bootstrapTable('getSelections');
        if (stocks.length != 1) {
            swal("请选择一条信息进行修改!");

            return;
        }
        $('#stockForm')[0].reset();
        document.getElementById('bookNo').readOnly = true;
        document.getElementById('serialNo').readOnly = true;

        var stock = stocks[0];
        $('#id').val(stock['id']);
        $('#bookNo').val(stock['bookNo']);
        $('#serialNo').val(stock['serialNo']);
        if (stock['member']){
            $('#name').val(stock['member']['name']);
            $('#tel').val(stock['member']['tel']);
        }

        $('#tare').val(stock['tare']);
        $('#gross').val(stock['gross']);
        $('#price').val(stock['price']);

        $('#stockModalTitle').html('修改库存');
        $('#stockModal').modal('show');
    });

    $('#delStock').on('click', function () {
        var stocks = $table.bootstrapTable('getSelections');
        if (stocks.length < 1) {
            swal("请至少选择一条信息进行删除!");

            return;
        }
        // 提示
        swal({
                title: "确定删除选中库存?",
                text: "删除后将无法恢复",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#e67e22",
                confirmButtonText: "删除",
                closeOnConfirm: true
            },
            function () {
                var idArr = [];
                for (var i = 0; i < stocks.length; i++) {
                    idArr[i] = stocks[i]['id'];
                }
                $.ajax({
                    type: 'delete',
                    url: '',
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(idArr),
                    dataType: "json",
                    success: function (result) {
                        if (result == 1) {
                            $('#stockModal').modal('hide');
                            $('#stockTable').bootstrapTable('refresh');

                            alertTip('success', '删除成功');
                        } else {
                            alertTip('error', '删除失败');
                        }
                    }
                });
            });
    });
});

function payMoney(a) {
    var id = $(a).data('id');
    // 提示
    swal({
            title: "确认付款状态?",
            text: "付款后将无法恢复",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e67e22",
            confirmButtonText: "付款",
            closeOnConfirm: true
        },
        function () {
            var path = '';
            $.ajax({
                type: 'put',
                url: path + id,
                dataType: "json",
                success: function (result) {
                    if (result == 1) {
                        $('#stockTable').bootstrapTable('refresh');
                        alertTip('success', '付款成功');
                    } else {
                        alertTip('error', '付款失败');
                    }
                }
            });
        });
};


