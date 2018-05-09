$(function () {
    var autoHeight = $("div.auto-height").height();
    var tableHeight = autoHeight - 0;
    $('#role-table').bootstrapTable({
        height: tableHeight,
        sidePagination: 'server',
        url: './assets/data/role.json',
        toolbar: '#toolbar',
        // 条纹
        striped: true,
        columns: [
            {
                field: 'ck',
                checkbox: true
            },
            {
                field: 'name',
                title: '角色名称'
            },
            {
                field: 'code',
                title: '角色代码',
                align: 'center',
            },
            {
                field: 'comment',
                title: '角色描述'
            },
            {
                field: 'createUser',
                title: '创建人'
            },
            {
                field: 'createTime',
                title: '创建时间',
                align: 'center',
            },
            {
                field: '',
                title: '授权',
                align: 'center',
                formatter: function (value, row, index) {
                    return '<a href="#menuModal" data-toggle="modal" data-id="' + row.id +'"><span class="sf-wrench-screwdriver" style="display: inline-block;' +
                        'width: 16px;height: 16px;background-size: 16px 16px;"></span></a>';
                }
            }
        ]
    });

    var myTreeView;
    $('#menuModal').on('show.bs.modal', function (event) {
        var aObj = $(event.relatedTarget)
        var roleId = aObj.data('id')

         myTreeView = new dhtmlXTreeView({
            parent: "menuTree",
            checkboxes: true,
            json: './assets/data/checkMenu.json',
        });
    });


    $('#saveMenu').on('click', function () {
        var ck = myTreeView.getAllChecked();
        alert(ck);
    })
});

// 格式化状态
function statusFormatter(value, row, index) {
    if (value === 1) {
        return '<span class="label label-success">正常</span>';
    } else {
        return '<span class="label label-default">锁定</span>';
    }
}