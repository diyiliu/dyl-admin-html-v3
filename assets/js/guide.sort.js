$(function () {
    var str = '';
    var updateOutput = function(e)
    {
        var list   = e.length ? e : $(e.target);
        str = JSON.stringify(list.nestable('serialize'));

        console.log(str);
    };

    $('#nestable').nestable({
        group: 1
    }).on('change', updateOutput);
    updateOutput($('#nestable'));

    $('#saveSort').on('click', function () {
        alert(str);
    });
});


