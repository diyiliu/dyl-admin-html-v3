$(function () {
    var autoHeightHeader = $("div.auto-height-header").height();
    var tableHeight = autoHeightHeader - (40 + 35);


    var $table = $('#menu-table');
    $table.bootstrapTable({
        height: tableHeight,
        sidePagination: 'server',
        url: './assets/data/menu.json',
        toolbar: '#toolbar',
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
                title: '名称',
                width: 300
            },
            {
                field: 'status',
                title: '状态',
                sortable: true,
                align: 'center',
                formatter: 'statusFormatter',
                width: 200
            },
            {
                field: 'permissionValue',
                title: '权限值'
            }
        ],
        treeShowField: 'name',
        parentIdField: 'pid',
        onLoadSuccess: function() {
            $table.treegrid({
                treeColumn: 1,
                autowidth: true,
                onChange: function() {
                    // $table.bootstrapTable('resetWidth');
                }
            });
        }
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
    if (value === 'api') {
        return '接口';
    }
    return '-';
}

// 格式化状态
function statusFormatter(value, row, index) {
    if (value === 1) {
        return '<span class="label label-success">正常</span>';
    } else {
        return '<span class="label label-default">锁定</span>';
    }
}