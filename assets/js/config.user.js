$(function () {
    var autoHeight = $("div.auto-height").height();
    var rowHeight = $('#search-block').height();
    var tableHeight = autoHeight - rowHeight;

    var $table = $('#menu-table')
    $table.bootstrapTable({
        height: tableHeight,
        sidePagination: 'server',
        url: './assets/data/user.json',
        toolbar: '#toolbar',
        toolbarAlign: 'right',
        // 条纹
        striped: true,
        columns: [
            {
                field: 'ck',
                checkbox: true
            },
            {
                field: 'username',
                title: '登录名'
            },
            {
                field: 'name',
                title: '姓名'
            },
            {
                field: 'role',
                title: '角色'
            },
            {
                field: '',
                title: '机构'
            },
            {
                field: 'tel',
                title: '手机'
            },
            {
                field: 'lastLoginTime',
                title: '登录时间'
            },
            {
                field: 'createTime',
                title: '创建时间',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value){
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
                    if (1 == value){
                        return '<span class="sf-switch-on" style="display: inline-block;width: 16px;height: 16px;background-size: 16px 16px;"></span>';
                    }

                    return '<span class="sf-switch-off" style="display: inline-block;width: 16px;height: 16px;background-size: 16px 16px;"></span>';
                }
            },
            {
                field: '',
                title: '重置密码',
                align: 'center',
                formatter: function (value, row, index) {
                    return '<a href="#"><span class="sf-lock" style="display: inline-block;width: 16px;height: 16px;background-size: 16px 16px;"></span></a>';
                }
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

    $('#addUser').on('click', function () {
        $('#userModal').modal('show');
        $('#selRole').chosen();
    });

    $('#delUser').on('click', function () {
    });

    $('#saveUser').on('click', function () {
        $('#selRole').chosen('destroy');
        /*$('#userModal').modal('hide');
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
        });*/
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


