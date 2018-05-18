$(function () {
    var autoHeightTab = $("div.auto-height-tab").height();
    var rowHeight = $('#search-block').height();
    var tableHeight =  autoHeightTab - rowHeight - 40;

    var $table = $('#siteTable');
    $table.bootstrapTable({
        height: tableHeight,
        toolbar: '#toolbar',
        sidePagination: 'server',
        url: './assets/data/user.json',
        pagination: true,
        paginationLoop: false,
        dataField: "data",
        // 条纹
        striped: true,
        formatShowingRows: function (a, b, c) {
            return "第 " + a + " / " + b + " 条，共 " + c + " 条 ";
        },
        formatRecordsPerPage: function (a) {
            return "每页 " + a;
        },
        columns: [
            {
                title: '序号',
                formatter: function (value, row, index) {
                    return index + 1;
                }
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
                    return '<a href="javascript:void(0);" class="resetPwd" onclick="alert(123);"><span class="sf-lock" style="display: inline-block;width: 16px;height: 16px;background-size: 16px 16px;"></span></a>' +
                        '<a href="javascript:void(0);" class="resetPwd" onclick="alert(123);"><span class="sf-lock" style="display: inline-block;width: 16px;height: 16px;background-size: 16px 16px;"></span></a>' +
                        '<a href="javascript:void(0);" class="resetPwd" onclick="alert(123);"><span class="sf-lock" style="display: inline-block;width: 16px;height: 16px;background-size: 16px 16px;"></span></a>';
                }
            }
        ]
    });

    $('#searchType').chosen();
    $('#addSite').on('click', function () {
        $('#siteModal').modal('show');
        $('#selType').chosen();
    });

    $("#editType").on('click', function () {
        $('#typeTag').tagsInput({width: 'auto', height: 260});
        $('#typeModal').modal('show');
    });


    $('#delSite').on('click', function () {
    });

    $('#saveSite').on('click', function () {
        $('#selType').chosen('destroy');
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

    $('.resetPwd').on('click', function () {
        alert(1);
        return false;
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


