$(function () {
    var autoHeight = $("div.auto-height").height();
    var rowHeight = $('#search-block').height();
    var tableHeight = autoHeight - rowHeight;
    var $table = $('#menu-table');
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
                    if (v == 1){

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
        ],
        treeShowField: 'name',
        parentIdField: 'pid',
        onLoadSuccess: function () {
            $table.treegrid({
                treeColumn: 1,
                onChange: function() {
                    $table.bootstrapTable('resetWidth');
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