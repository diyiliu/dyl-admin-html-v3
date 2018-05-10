$(function () {
    var autoHeight = $("div.auto-height").height();
    var rowHeight = $('#search-block').height();
    var tableHeight = autoHeight - rowHeight;

    var $table = $('#menu-table')
    $table.bootstrapTable({
        height: tableHeight,
        sidePagination: 'server',
        url: './assets/data/menu.json',
        toolbar: '#toolbar',
        toolbarAlign: 'right',
        // 条纹
        striped: true,
        idField: 'id',
        columns: [
            {
                field: 'ck',
                checkbox: true
            },
            {
                field: 'name',
                title: '菜单名称'
            },
            {
                field: 'type',
                title: '类型',
                align: 'center',
                formatter: 'typeFormatter'
            },
            {
                field: 'controller',
                title: '控制器'
            },
            {
                field: 'view',
                title: '视图'
            },
            {
                field: 'isMenu',
                title: '导航菜单',
                align: 'center',
                formatter: function (v) {
                    if (v == 1) {

                        return '是';
                    }

                    return '否';
                }
            },
            {
                field: 'sort',
                title: '排序'
            },
            {
                field: 'iconCss',
                title: '图标',
                align: 'center',
                formatter: 'iconFormatter'
            }
        ]
    });

    var expire = new Date();
    expire.setFullYear(expire.getFullYear() + 1);
    expire.setDate(expire.getDate() - 1);

    laydate.render({
        elem: '#expireTime'
        , type: 'datetime'
        , value: expire
    });

    $('#saveUser').on('click', function () {
        $('#userModal').modal('hide');
        toastr.success('保存成功', '提示', {
            timeOut: 3000,
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "tapToDismiss": false
        });
    });

    $('#editUser').on('click', function () {
        swal("Hey, Here's a message !!")
    });

    $('#delUser').on('click', function () {
        var users = $table.bootstrapTable('getSelections');
        alert(JSON.stringify(users[0]));
    });
});

// 格式化类型
function typeFormatter(value, row, index) {
    if (value === 'menu') {
        return '菜单';
    }
    if (value === 'button') {
        return '按钮';
    }
    if (value === 'node') {
        return '节点';
    }
    return '-';
}

// 格式化图标
function iconFormatter(value, row, index) {
    return '<span class="' + value + '" ' +
        'style="display: inline-block;width: 16px;height: 16px;background-size: 16px 16px;"></span>';
}

// 格式化状态
function statusFormatter(value, row, index) {
    if (value === 1) {
        return '<span class="label label-success">正常</span>';
    } else {
        return '<span class="label label-default">锁定</span>';
    }
}


/* ==================================================== */


