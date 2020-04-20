/*<!--隧道照明控制-->*/
function wrapper_tunnel(back, img, tun) {
    back.bind("click", function () {
        // var name = $(this).find("i").text();
        // var lane_back = $(this).prev().css("background");
        // img.css("background", lane_back);
        // tun.text(name);
        $(this).find("span").addClass("lane_hover").parents("li").siblings().find("span").removeClass("lane_hover");
        controlText = $(this).find('li').context.innerText;
    });
}
function eableDrag(obj) {
    $(obj).each(function (index, item) {
        $(item).dragging({
            move: 'both',
            randomPosition: false
        });

    });
}
function disableDrag(obj) {
    $(obj).each(function (index, item) {
        $(item).unbind('');
    });
    $(obj).each(function (index, item) {
        $(item).bind('click', function () {
            //  console.log('disableDrag');
            if (lockDevice) {
                showDeviceAlert($(this).attr('data-id'), $(this).attr('data-json'));
            } else {
                //  console.log($(this));
                deleteDevice($(this), true);
            }

        });
    });
}
//
function closeDeviceAlert() {
    var $body = $('body');
    $body.on('click', '.lock_colse', function () {
        $(this).parents('.scrn_back').remove();
    });
    $body.on('click', '.lane_no', function () {
        $(this).parents('.scrn_back').remove();
    });
    $body.on('click', '.lane_ok', function () {
        DeviceControl();
        var parent = $(this).parents('.scrn_back');
        var parentId = parent.attr('id');
        //   console.log(parentId);
        parent.remove();

    });
    $body.on('click', '.lane_groupok', function () {
        GroupWrite();
    });
    $body.on('click', '#btn-add-device', function () {
        ComiitPost();
    });
}
//图层控制
var controlLayer = function () {
    //添加选中状态
    function addEl(obj) {
        var id = obj.attr('data-id');
        var findObj = $('#layerControl').find('span[data-id=' + id + ']');
        findObj.find('i').addClass('drop_hover');
    }
    //移除选中状态
    function removeActive(obj) {
        var id = obj.attr('data-id');
        var findObj = $('#layerControl').find('span[data-id=' + id + ']');
        findObj.find('i').removeClass('drop_hover');
    }
    //移除马路上的设备
    function deleteEl(el) {
        el.remove();
    }
    //隐藏设备
    function hideDevice(el) {
        el.addClass('dn');
    }
    //显示设备
    function showDevice(el) {
        el.removeClass('dn');
    }
    return {
        addEl: addEl,
        removeActive: removeActive,
        deleteEl: deleteEl,
        hideDevice: hideDevice,
        showDevice: showDevice
    }
}();
var lockDevice = true;

