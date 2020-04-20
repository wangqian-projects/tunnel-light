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
//设备坐标,设备类型
var DEVICE_X, DEVICE_Y, DEVICE_TYPEID, controlText, statecontrol, RoadID; var oldjson = new Array();
$(function () {
    //点击加号显示底部预案
    $('#showBottomBox').bind('click', function () {
        $(this).toggleClass('down');
        $('#device-list').toggleClass('dn');
    })
    // editInformationBoard();
    //锁定设备
    var lockDevice = true;
    $('#lock-device').bind('click', function () {
        lockDevice = !lockDevice;
        $(this).find('em').toggleClass('active');
        var highwayBoxImg = $('#highwayBox img');
        if (lockDevice) {
            $(this).find('em').text('解锁设备').css('color', '#65cea7');
            disableDrag(highwayBoxImg);
            highwayBoxImg.css('cursor', 'default');
            var newjson = new Array();
            for (var i = 0; i < $("#highwayBox img:not(.highway_img)").length; i++) {
                newjson.push({
                    DEVICE_ID: JSON.parse($("#highwayBox img:not(.highway_img)")[i].getAttribute('data-json')).DEVICE_ID,
                    COORDINATES_X: +$("#highwayBox img:not(.highway_img)")[i].style.left.substr(0, $("#highwayBox img:not(.highway_img)")[i].style.left.length - 2),
                    COORDINATES_Y: +$("#highwayBox img:not(.highway_img)")[i].style.top.substr(0, $("#highwayBox img:not(.highway_img)")[i].style.top.length - 2),
                });
            }
            $.post("../../Ashx/index.ashx", { type: "updateXY", oldjson: JSON.stringify(oldjson), newjson: JSON.stringify(newjson) }, function (data) {
                if (data == "坐标无变化") {

                } else {
                    swal(data);
                }


            })
        } else {
            $(this).find('em').text('锁定设备').css('color', '#fff');
            eableDrag('#highwayBox img:not(.highway_img)');
            highwayBoxImg.css('cursor', 'move');

        }

    });
    addDevice();//添加设备
    dragDevice();//选择马路上的设备

    wrapper_list();//顶部导航四个菜单
    wrapper_lock();//锁屏
    wrapper_tab();//侧边栏

    index_wrapper();/*首页悬浮出现拖拽列表*/
    pwd_inputif();/*修改密码员工编号弹窗      input判断*/
    closeDeviceAlert();//关闭设备弹窗
    //添加设备
    function addDevice() {
        var appendNumber = 10;
        /*var prependNumber = 1;*/
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 8,
            /*centeredSlides: true,*/
            paginationClickable: true,
            spaceBetween: 18
        });
    }
    /*<!--车道指示器-->*/
    function wrapper_cenk() {
        $("#lane_cenk li div").bind("click", function () {
            // var name = $(this).find("i").text();
            // var lane_back = $(this).prev().css("background");
            // $("#lane_back").css("background", lane_back);
            // $("#lane_back").prev().text(name);
            $(this).find("span").addClass("lane_hover").parents("li").siblings().find("span").removeClass("lane_hover");
            controlText = $(this).find('li').context.innerText;
        });
    }


    /*<!--交通信号灯控制-->*/
    function trafficLight(obj) {
        $(obj).bind("click", function () {
            // var txt_name = $(this).find("i").text();
            // var control_img = $(this).prev().css("background");
            // $("#con_img").css("background", control_img);
            // $("#stat").text(txt_name);
            $(this).find("span").addClass("lane_hover").parents("li").siblings().find("span").removeClass("lane_hover");
            controlText = $(this).find('li').context.innerText;
        });
    }
    /*<!--单个风机控制-->*/
    function wrapper_ext() {
        $("#windDeviceCtrl li div").bind("click", function () {
            // var name = $(this).find("i").text();
            // var lane_back = $(this).prev().css("background");
            // //$("#ext_back").css("background", lane_back);
            // $("#ext_n").text(name);
            // $("#ext_n").next().css("background",lane_back);
            $(this).find("span").addClass("lane_hover").parents("li").siblings().find("span").removeClass("lane_hover");
            controlText = $(this).find('li').context.innerText;
        });
    }
    //门架 情报板
    function editInformationBoard() {
        $('.infoBroad').bind('mouseover', 'tr', function () {
            $(this).find('input').addClass('activebg');
        });
        $('.infoBroad').bind('mouseout', 'tr', function () {
            $(this).find('input').removeClass('activebg');
        });
        var $info = $('#info-txt');
        var infoBox = $('#alert_device_1');
        var $thisInput = null;
        $('.legend_zdy>em').bind("click", function () {
            $("#zdy_conter").toggleClass('dn');
        });
        infoBox.on('click', '.legend_check', function () {
            $(this).parents('tr').toggleClass('checked');
            $thisInput = $(this).siblings().find('input.txt');
            $info.html($thisInput.attr('data-html'));
            //$(this).parents('tr').siblings().find('.legend_check input').attr('checked', false);


        });
        infoBox.on('click', '.edit-input', function () {
            console.log('ed');
            $thisInput = $(this).find('input.txt');
            $info.html($thisInput.attr('data-html'));
            GetMessageStyle($(this));
        });
        infoBox.on('click', '.legend_updet', function () {
            $(this).parents('tr').siblings().find('input.txt').removeClass('active');
            $thisInput = $(this).siblings().find('input.txt');
            $thisInput.removeAttr('disabled').addClass('active');
            $info.html($thisInput.attr('data-html'));
            var cssInfo = {
                fontSize: $thisInput.attr('data-size'),
                color: $thisInput.attr('data-color'),
                fontFamily: $thisInput.attr('data-type')
                // backgroundColor: $thisInput.attr('data-bgcolor')
            };
            // console.log(cssInfo);
            $("#inte_ban").css("backgroundColor", $thisInput.attr('data-bgcolor'));
            $info.css(cssInfo);
        });
        infoBox.on('click', '.legend_del', function () {
            //  var ok = confirm('确定要删除此信息吗');
            var dataJson = $(this).siblings().find(".txt").attr("data-jsonm");
            if (dataJson == "" || dataJson == undefined) {
                $(this).parent().remove();
            } else {
                DeleteCMSInfo(this, JSON.parse(dataJson).INFO_ID, JSON.parse(dataJson).DEVICE_ID);
            }

            // $(this).parent().remove();
        });
        infoBox.on('click', '.save-item', function () {
            //   console.log('s');
            $(this).siblings().find('input.txt').attr('disabled', 'true')
            $(this).siblings().find('input.txt').removeClass('active activebg');
            SaveOneMessage(this);

        });

        $('#addNewItem').bind('click', function () {
            var $newItem = $('#newItem').val();
            var newItemHtml = $('#newItem').attr('data-html');
            if ($.trim($newItem) != '') {
                var item = '<tr>' +
                    '<td class="legend_check"><input type="checkbox" /></td>' +
                    '<td class="edit-input"><input class="txt" type="text" data-html="' + newItemHtml + '" disabled value="' + $newItem + '"/></td>' +
                           '<td class="legend_updet" title="编辑" style="cursor:pointer"></td>' +
       '<td class="legend_del" title="删除" style="cursor:pointer"></td>' +
       '<td class=" fa fa-save save-item" title="保存" style="color:#ccc;cursor:pointer"></td>' +
       '</tr>';
                '</tr>';
                $('#infoBox').append(item);
                // console.log('sss');
                $('#newItem').val('');
                $('#newItem').attr('data-html', '');
            } else {
                swal("内容不能为空!");

            }

        });
        var $newItem = $('#newItem');
        var str = '';
        $newItem.bind('keyup', function (event) {
            var key = event.keyCode || event.which;
            var $newItemVal = $newItem.val().replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>");;
            $info.html($newItemVal);
            if (key == 13) {
                $newItemVal += '<br>';
            }
            $newItem.attr('data-html', $newItemVal);
            setDefaultColor();
        });
        function setDefaultColor() {
            var color = $('#edit-color').val();
            var fontSize = $('#edit-size').val() + 'px';
            var fontFamily = $('#edit-type').val();
            var colorCss = GetColor(color);
            $info.css({ 'color': colorCss, 'fontSize': fontSize, 'fontFamily': fontFamily });
        }




        //修改字体大小、颜色、显示方式
        $('#edit-size').bind('change', function () {
            var size = (+$(this).val()) * 1.5 + "px";
            $info.css('font-size', size);
            $thisInput.attr('data-size', size);
        });
        $('#edit-bgcolor').bind('change', function () {
            var size = $(this).val();
            size = GetColor(size);
            $("#inte_ban").css('background-color', size);
            $thisInput.attr('data-bgcolor', size);
        });
        $('#edit-color').bind('change', function () {
            var size = $(this).val();
            size = GetColor(size);
            $info.css('color', size);
            $thisInput.attr('data-color', size);
        });
        $('#edit-show').bind('change', function () {
            var size = $(this).val();
            console.log(size);
            if ($thisInput !== null) {
                $thisInput.attr('data-show', size);
            }

            $info.addClass(size);
            setTimeout(function () { $info.removeClass(size); }, 1000)

        })
        $('#edit-type').bind('change', function () {
            var size = $(this).val();
            $info.css('font-family', size);
            $thisInput.attr('data-type', size);
        })

    }
    //顶部导航四个菜单
    function wrapper_list() {
        $("#wrapper_inline li:not(:first-child)").bind("click", function (e) {
            var $index = $(this).index();
            if ($index == 3) {
                $(".wrapper_main").removeClass("wrapper_s");
            } else {
                $(".wrapper_main").addClass("wrapper_s");

            }

            $(this).addClass("li_active").siblings().removeClass('li_active');
            var tar_em = e.target.tagName;
            //tagName获取标签名称
            //ClassName  获取类名
            if ($(this).find("p").hasClass("dn")) {
                $(this).find("p").removeClass("dn");
                $(this).siblings().find("p").addClass("dn");
            } else {
                if (tar_em == 'EM') {
                    $(this).find("p").addClass("dn");
                    $(".wrapper_main").addClass("wrapper_s");
                }

            }
            return false;
        });
        $(document).bind('click', function () {
            $('.wrapper_dropdown').addClass('dn');
            $('.topNav').removeClass('li_active');
        })
        //设备群控点击出现弹窗
        $("#wrapper_pp span").bind("click", function () {
            var $this = $(this);
            $this.addClass("c_6d").siblings().removeClass("c_6d");
            var name = $this.attr('data-name');
            if (RoadID == "") {
                swal("请先添加设备");
                return;
            }
            $.ajax({
                type: 'post',
                url: '../../Ashx/index.ashx',
                async: false,
                data: { type: "GetDirection", RoadID: RoadID },
                success: function (data) {
                    data = JSON.parse(data);
                    $('body').append(Handlebars.compile($('#' + name).html())(data));
                }
            });
            // $('body').append($('#' + name).html());            
            trafficLight("#control_back_all li div");//交通信号灯
            wrapper_cenk();//车道指示器
            wrapper_tunnel($("#tunnel_back li div"), $("#tunnel_img"), $("#tun"));//隧道照明灯
            //风机
            $("#windDeviceCtrlAll li div").bind("click", function () {
                $(this).find("span").addClass("lane_hover").parents("li").siblings().find("span").removeClass("lane_hover");
            });

        });
        $(".second_con>li").bind("click", function (e) {
            e.stopPropagation();
        });
    }
    //侧边栏
    function wrapper_tab() {
        showMenu("#navigation_menu1>.navigation_menu_li", "#navigation_iscon1>li");
        showMenu("#navigation_menu2>.navigation_menu_li", "#navigation_iscon2>li");
        function showMenu(a, b) {
            $(a).bind("click", function () {
                if (!$(this).hasClass("navigation_click")) {
                    $(this).addClass("navigation_click navigation_back");
                    $(this).siblings().removeClass("navigation_click navigation_back");
                    $(this).find(".navigation_second").removeClass("dn");
                    $(this).siblings().find(".navigation_second").addClass("dn");
                } else {
                    $(".navigation_click>.navigation_second").addClass("dn");
                    $(this).removeClass("navigation_click navigation_back");
                }
            });
            $(b).bind("click", function (e) {
                e.stopPropagation();
                $(this).find('.second_con').removeClass('dn');
                $(this).siblings().find('.second_con').addClass('dn');

            });
        }

    }

    /*首页悬浮出现拖拽列表*/
    function index_wrapper() {
        $("#index_wrapper").bind("mouseenter", function () {
            $(".wrapper").removeClass("dn");
        });

        $(".wrapper").bind("mouseenter", function () {
            $(".wrapper").removeClass("dn");
        });

    }
    /*修改密码员工编号弹窗      input判断*/
    function pwd_inputif() {
        $(".lock_colse").bind("click", function () {
            $("#correrr_back").addClass("dn");
            $("#pwd_back").addClass("dn");
        });
        $("#update_pwd").bind("click", function () {
            $("#correrr_back").removeClass("dn");
            $("#pwd_name").val("");
            $(".corerr_em").removeClass("error");
            $(".corerr_em").removeClass("correct");

        });
        var i = 111111;
        $("#pwd_name").bind("keyup", function () {
            var this_val = $(this).val();
            var w = /^\w+$/;
            if (this_val != i) {
                $(".corerr_em").addClass("error");
            } else {
                $(".corerr_em").addClass("correct");
                $(".corerr_em").removeClass("error");
                if ($(".corerr_em").addClass("correct")) {
                    $("#corerr_ok").bind("click", function () {
                        if ($("#pwd_name").val() == '') {
                            return false;
                        }
                        $("#correrr_back").addClass("dn");
                        $("#pwd_back").removeClass("dn");
                        $("#pwd").val("");
                        $("#repwd").val("");
                        $("#affirmpwd").val("");
                        $("#pwd").next("em").removeClass("correct")
                        $("#pwd").next("em").removeClass("error")
                        $("#repwd").next("em").removeClass("correct")
                        $("#repwd").next("em").removeClass("error")
                        $("#affirmpwd").next("em").removeClass("correct")
                        $("#affirmpwd").next("em").removeClass("error")
                    });
                }
            }
        });

        /*旧密码判断*/
        var pwt = 111111;
        $("#pwd").bind("focusout", function () {
            if ($(this).val() != pwt) {
                $(this).next("em").addClass("error");
            } else {
                $(this).next("em").removeClass("error");
                $(this).next("em").addClass("correct");
            }
        });
        $("#pwd").bind("keydown", function () {
            $(this).next("em").removeClass("error");
            $(this).next("em").removeClass("correct");
        });

        /*请输入新密码*/
        $("#repwd").bind("focusout", function () {
            var w = /^\w+$/;
            if (!(w.test($(this).val()))) {
                $(this).next("em").addClass("error");
            } else {
                $(this).next("em").removeClass("error");
                $(this).next("em").addClass("correct");
            }
        });
        $("#repwd").bind("keydown", function () {
            $(this).next("em").removeClass("error");
            $(this).next("em").removeClass("correct");
            if ($("#affirmpwd").val() != "") {
                $("#affirmpwd").next("em").addClass("error");
                $("#affirmpwd").next("em").removeClass("correct");
            }

        });


        $("#affirmpwd").bind("focusout", function () {
            if ($(this).val() != $("#repwd").val()) {
                $(this).next("em").addClass("error");
                $(this).next("em").removeClass("correct");
            } else if ($(this).val() == '') {
                $(this).next("em").addClass("error");
                $(this).next("em").removeClass("correct");
            } else {
                $(this).next("em").removeClass("error");
                $(this).next("em").addClass("correct");
            }
        });
        $("#affirmpwd").bind("keydown", function () {
            $(this).next("em").removeClass("error");
            $(this).next("em").removeClass("correct");
        });

        $("#pwd_ok").bind("click", function () {
            if ($("#pwd").val() == "" || $("#repwd").val() == "" || $("#affirmpwd").val() == "") {
                return false;
            }
            else if ($("#repwd").val() != $("#affirmpwd").val()) {
                $("#affirmpwd").next("em").addClass("error");
                $("#affirmpwd").next("em").removeClass("correct");
            } else if (!$("#pwd").next("em").hasClass("error")) {
                swal("修改成功！！!");

                $("#pwd_back").addClass("dn");
            }
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
                console.log('disableDrag');
                if (lockDevice) {
                    showDeviceAlert($(this).attr('data-id'), $(this).attr('data-json'));
                } else {
                    console.log($(this));
                    deleteDevice($(this), true);
                }

            });
        });
    }
    //选择马路上的设备
    function dragDevice() {
        $("#highwayBox").append("<img src='images/stat/" + GetQueryString("id") + ".jpg' class='highway_img'/>")

        $('#deviceIconBox>li').each(function (index, item) {
            $(this).attr('data-id', 'device_' + index);
            //if (index == 5 || index == 6) {
            //    $(this).attr('data-id', 'device_5');
            //    if (index == 6) {
            //        $(this).attr('data-type', 'three');
            //    }
            //} 

            //if(index>6){
            //    $(this).attr('data-id', 'device_' + parseInt(index - 1));
            //}


        });
        $('#layerControl>span').each(function (index, item) {
            $(this).attr('data-id', 'device_' + index);
        });
        //拖拽马路
        $('#highwayBox .highway_img').bind('load', function () {
            var boxW = parseInt($('#highwayBoxWrap').css('width'));
            var imgW = parseInt($(this).css('width'));
            $('#highwayBoxWrap>div').css('width', imgW + 'px');
            $('#highwayBoxWrap>div').each(function () {
                $(this).dragging({
                    move: 'x',
                    limit: {
                        type: false,
                        boxW: boxW,
                        imgW: imgW
                    },
                    randomPosition: false
                });
            });
        })


        $('#deviceIconBox').on('click', 'li', function () {
            var id = $(this).attr('data-id');
            var src = $(this).find('img').attr('src');
            var bigPicSrc = src.substr(0, src.indexOf('.')) + '_img.png';
            if (!lockDevice) {
                var img = $('<img data-id="' + id + '" data-json="" src="' + bigPicSrc + '"/>');
                $('#highwayBox').append(img);
                eableDrag('#highwayBox img:not(.highway_img)');
                controlLayer.addEl(img);
                deleteDevice(img, true);
            }

        });
        /*图层控制选择框*/
        $("#layerControl").on('click', 'span', function () {
            var $this = $(this);
            var id = $this.attr('data-id');
            if ($this.find("i").hasClass('drop_hover')) {
                $this.find("i").removeClass("drop_hover");
                controlLayer.hideDevice($('#highwayBox').find('img[data-id=' + id + ']'));
            } else {
                $this.find("i").addClass("drop_hover");
                controlLayer.showDevice($('#highwayBox').find('img[data-id=' + id + ']'));
            }
        });


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
        //获取该机构下所有设备信息
        var json = {
            type: "AgenciesID",
            AgenciesID: GetQueryString("id")
        }
        $.get("../../Ashx/index.ashx", json, function (data) {
            if (data == "服务错误！") {
                swal("设备信息有误！");
            } else if (data == "请先登录！") {
                swal({
                    title: data,
                    confirmButtonText: "ok",
                }, function () {
                    location.href = "/JTJK/traffic/html_home/login.html";
                });
            } else {
                data = JSON.parse(data);
                RoadID = data[0].ROADID;
                for (var i = 0; i < data.length; i++) {
                    oldjson.push({
                        DEVICE_ID: data[i].DEVICE_ID,
                        COORDINATES_X: data[i].COORDINATES_X,
                        COORDINATES_Y: data[i].COORDINATES_Y
                    })
                    var src = "";
                    switch (data[i].DEVICE_TYPEID) {
                        case 48: src = "01"; break;
                        case 18: src = "02"; break;
                        case 17: src = "03"; break;
                        case 20: src = "04"; break;
                        case 43: src = "05"; break;
                        case 29: src = "06"; break;
                        case 30: src = "06"; break;
                        case 21: src = "07"; break;
                        case 22: src = "07"; break;
                        case 24: src = "08"; break;
                        case 26: src = "09"; break;
                        case 45: src = "09"; break;
                        case 16: src = "10"; break;
                        case 25: src = "11"; break;
                        case 40: src = "12"; break;
                        case 14: src = "14"; break;
                        case 11: src = "15"; break;
                        case 12: src = "15"; break;
                        case 15: src = "16"; break;
                        case 19: src = "17"; break;
                    }
                    if (src != "") {
                        var id = (+src) - 1;
                        if (id >= 6) {
                            id++;
                        }
                        var srcimg = "images/stat/index_" + src + "_img.png";
                        if (data[i].CONNECT_STATE != "正常") {
                            srcimg = "images/stat/index_" + src + "_img_error.png";
                        }
                        var img = $('<img data-id=device_' + id + ' data-json=' + JSON.stringify(data[i]) + ' src=' + srcimg + ' style="position: absolute; cursor: move; z-index: 0; left: ' + data[i].COORDINATES_X + 'px; top: ' + data[i].COORDINATES_Y + 'px;"/>');

                        $('#highwayBox').append(img);
                        controlLayer.addEl(img);
                        deleteDevice(img, true);

                    }
                }
                ShowReservePlan();
            }
        });

    }
    function deleteDevice(obj, bool) {
        var moveTime = 0;
        var click = false;
        if (bool) {
            click = true;
        }

        document.oncontextmenu = function (e) {
            e.preventDefault();
        };
        obj.bind('mousedown', function (ev) {
            var e = ev || event;
            if (e.button == 2) {
                var pos = getpos(e);
                createDelMenu(pos, obj);
            } else if (e.button == 0) {//点击左键
                click = true;

            }
            //显示弹窗
            obj.bind('mousemove', function () {
                console.log('move');
                moveTime++;
                click = false;
            });
        });

        obj.bind('mouseup', function () {
            obj.unbind('mousemove');
            console.log(moveTime);
            if (moveTime < 2) {
                click = true;

            } else {
                moveTime = 0;
            }
            if (click && lockDevice) {
                showDeviceAlert(obj.attr('data-id'), obj.attr('data-json'));

            }

            if (click && !lockDevice) {

                if (obj.attr('data-json') == "") {
                    $('body').append(Handlebars.compile($('#addDeviceAlert').html()));
                } else {
                    DEVICE_TYPEID = JSON.parse(obj.attr('data-json')).DEVICE_TYPEID;
                    $('body').append(Handlebars.compile($('#addDeviceAlert').html())(JSON.parse(obj.attr('data-json'))));
                    GetDEVICE_TYPE(DEVICE_TYPEID);
                    GetCOMPANY_NAME(JSON.parse(obj.attr('data-json')).COMPANY_ID, DEVICE_TYPEID);

                }
                DEVICE_X = obj[0].style.left.substr(0, obj[0].style.left.indexOf("px"));
                DEVICE_Y = obj[0].style.top.substr(0, obj[0].style.top.indexOf("px"));

            }
        });
        function getpos(ev) {
            var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollleft = document.documentElement.scrollLeft || document.body.scrollLeft;
            return { x: ev.clientX + scrollleft, y: ev.clientY + scrolltop }

        }
        function createDelMenu(pos, obj) {
            var x = pos.x;
            var y = pos.y;
            var menu = $('<div class="menu_del">删除</div>');
            menu.css({ 'position': 'absolute', 'left': x + 'px', 'top': y + 'px' });
            var body = $('body');
            body.append(menu);
            //删除设备
            menu.bind('click', function () {
                if (obj.attr('data-json') == "") {

                } else {
                    var DEVICE_ID = JSON.parse(obj.attr('data-json')).DEVICE_ID;
                    $.post("../../Ashx/index.ashx", { type: "delete", DEVICE_ID: DEVICE_ID }, function (data) {
                        swal(data);
                    })
                }
                obj.remove();
                menu.remove();
                controlLayer.removeActive(obj);
            });
            body.bind('click', function () {
                menu.remove();
            })
        }
    }
    function closeDeviceAlert() {
        var $body = $('body');
        $body.on('click', '.lock_colse', function () {
            $(this).parents('.scrn_back').remove();
        });
        $body.on('click', '.lane_no', function () {
            $(this).parents('.scrn_back').remove();
        });
        $body.on('click', '.lane_ok', function () {
            var parent = $(this).parents('.scrn_back');
            var parentId = parent.attr('id');
            //   console.log(parentId);
            parent.remove();
        });
    }
    //点击设备出现对应弹窗
    function showDeviceAlert(id, data) {
        if ($('#alert_' + id).length > 0) {
            return false;
        }
        id = id.substr(7);
        console.log(id);
        /*使用相同弹窗*/
        if (id == 1 || id == 2 || id == 3 || id == 17) {//情报板
            id = 1;
            $.post("../../Ashx/index.ashx", { DEVICE_ID: JSON.parse(data).DEVICE_ID, type: "GetMessage" }, function (data) {
                if (data != {}) {
                    for (var i = 0; i < data.length; i++) {
                        var item = '<tr>' +
       '<td class="legend_check"><input type="checkbox" id="check' + i + '" /></td>' +
       '<td class="edit-input"><input class="txt" type="text" data-html="' + data[i].INFO_CONTENT.replace(new RegExp(/(\\n)/g), '<br\/>') + '" data-jsonm=' + JSON.stringify(data[i]) + ' disabled value="' + data[i].INFO_CONTENT.replace(new RegExp(/(\\n)/g), '') + '"/></td>' +
       '<td class="legend_updet" title="编辑" style="cursor:pointer"></td>' +
       '<td class="legend_del" title="删除" style="cursor:pointer")"></td>' +
       '<td class=" fa fa-save save-item" style="color:#ccc;cursor:pointer"></td>' +
       '</tr>';
                        $('#infoBox').append(item);
                    }
                }
            }, "json");

        }
        if (id == 7 || id == 8) {//视频监控
            id = 7;
        }
        var flag = true;
        var dataconnect = data;
        if (data == undefined || data == "") {
            $('body').append(Handlebars.compile($('#device_' + id).html()));
        } else {
            DEVICE_ID = JSON.parse(data).DEVICE_ID;//获取设备保存过后的ID
            if (id == 4 || id == 0 || id == 6 || id == 5 || id == 9 || id == 11 || id == 10 || id == 12 || id == 14 || id == 15 || id == 17) {
                $.ajax({
                    type: 'post',
                    url: '../../Ashx/index.ashx',
                    async: false,
                    data: { type: "GetOneMessage", DEVICE_ID: DEVICE_ID },
                    success: function (data) {
                        data = JSON.parse(data);
                        var state = new Array();
                        if (data.DATA != "") {
                            var state = data.DATA.split(',');
                            statecontrol = state[0];
                            if (state.length > 0) {
                                data.DEVICE_DATA_1 = state[0];
                            }
                            if (state.length >= 1) {
                                data.DEVICE_DATA_2 = state[1];
                            }
                            switch (+id) {
                                case 15: var Cararray = data.DATA.split(';');
                                    var topCar = Cararray[0].split(',');
                                    var bottomCar = Cararray[1].split(',');
                                    data.CarSpeed = topCar[1];
                                    data.CarNumber = topCar[2];
                                    data.CarLength = topCar[3];
                                    data.Cardensity = topCar[4];
                                    data.Carshare = topCar[5];
                                    data.Carspcing = topCar[6];
                                    data.CarSpeed2 = bottomCar[1];
                                    data.CarNumber2 = bottomCar[2];
                                    data.CarLength2 = bottomCar[3];
                                    data.Cardensity2 = bottomCar[4];
                                    data.Carshare2 = bottomCar[5];
                                    data.Carspcing2 = bottomCar[6];
                                    break;
                                case 16:
                                    var ClimateArray = data.DATA.split(',');
                                    data.WindSpeed = ClimateArray[0];
                                    data.WindDirection = ClimateArray[1];
                                    data.Temperature = ClimateArray[2];
                                    data.Visibility = ClimateArray[3];
                                    data.Rainfall = ClimateArray[4];
                                    data.Humidity = ClimateArray[5];
                                    data.RoadTemperature = ClimateArray[6];
                                    data.SurfaceState = ClimateArray[7];
                                    break;
                            }
                        }
                        data.CONNECT_STATE = JSON.parse(dataconnect).CONNECT_STATE;
                        if (state[0] == "远程") {
                            data.CONNECT_STATE_KZ = "正常";
                        } else {
                            data.CONNECT_STATE_KZ = "故障";
                        }
                        if (data.CONNECT_STATE != "正常") {
                            data.CONNECT_STATE_KZ = "故障";
                        }
                        Handlebars.registerHelper('colorClass', function () {
                            var color = 'c_6d';
                            if (state[0] == "远程") {
                                data.CONNECT_STATE_KZ = "正常";
                            } else {
                                data.CONNECT_STATE_KZ = "故障";
                                color = 'red';
                            }
                            if (data.CONNECT_STATE != "正常") {
                                data.CONNECT_STATE_KZ = "故障";
                                color = 'red';
                            }
                            return color;
                        });
                        flag = false;

                        $('body').append(Handlebars.compile($('#device_' + id).html())(data));
                        switch (+id) {
                            case 4: $("#ext_n").text(state[1]);
                                switch (state[1]) {
                                    case "正转":
                                        $("#wind_img").addClass("green"); break;
                                    case "反转":
                                        $("#wind_img").addClass("pink"); break;
                                    case "停止":
                                        $("#wind_img").addClass("yellow"); break;
                                }
                                break;
                            case 0: $("#tun").text(state[1]); break;
                            case 5: $("#twoCar").text(state[1]);
                                switch (state[1]) {
                                    case "正向通行":
                                        $("#lane_back").addClass("forward"); break;
                                    case "反向通行":
                                        $("#lane_back").addClass("reverse"); break;
                                    case "双向禁行":
                                        $("#lane_back").addClass("double-no"); break;
                                    case "双向关闭":
                                        $("#lane_back").addClass("double-close"); break;
                                }
                                break;
                            case 6: $("#threeCar").text(state[1]);
                                switch (state[1]) {
                                    case "正向通行":
                                        $("#lane_back").addClass("forward"); break;
                                    case "反向通行":
                                        $("#lane_back").addClass("reverse"); break;
                                    case "正向左转":
                                        $("#lane_back").addClass("forward-left"); break;
                                    case "反向左转":
                                        $("#lane_back").addClass("reverse-left"); break;
                                    case "双向禁行":
                                        $("#lane_back").addClass("double-no"); break;
                                    case "双向关闭":
                                        $("#lane_back").addClass("double-close"); break;
                                }
                                break;
                            case 9: $("#gq").text(state[1]);
                                switch (state[1]) {
                                    case "上行":
                                        $("#gq_img").addClass("up"); break;
                                    case "下行":
                                        $("#gq_img").addClass("down"); break;
                                }
                                break;
                            case 11: $("#stat").text(state[1]);
                                switch (state[1]) {
                                    case "左转":
                                        $("#con_img").addClass("left"); break;
                                    case "直行警告":
                                        $("#con_img").addClass("forward-warning"); break;
                                    case "直行":
                                        $("#con_img").addClass("forward"); break;
                                    case "禁行":
                                        $("#con_img").addClass("no"); break;
                                }
                                break;
                        }
                    }
                });
            }
            if (flag) {
                $('body').append(Handlebars.compile($('#device_' + id).html())(JSON.parse(data)));
            }
            if (id == 1 || id == 2 || id == 3 || id == 16) {
                var width = (+JSON.parse(data).CMS_COLUMN) * (+JSON.parse(data).CMS_RESOLUTION) * 1.5 + "px";
                var height = (+JSON.parse(data).CMS_ROW) * (+JSON.parse(data).CMS_RESOLUTION) * 1.5 + "px";
                $("#inte_ban").css("width", width).css("height", height);
            }


        }

        wrapper_cenk();
        trafficLight("#control_back li div");//单个交通信号灯
        wrapper_ext();
        wrapper_tunnel($("#tunnel_back li div"), $("#tunnel_img"), $("#tun"));
        wrapper_tunnel($("#gq_back li div"), $("#gq_img"), $("#gq"));
        editInformationBoard();

    }
    //新增设备弹窗
    /**
     * 点击添加按钮执行fn
     * @param fn
     */

    function addNewDeviceAlert(fn) {
        $('body').append($('#addDeviceAlert').html());
        $('#btn-add-device').bind('click', function () {
            if (fn && typeof fn == 'function') {
                fn();
            }
        });
    }
});
//新增设备信息
function ComiitPost() {
    var json = {
        type: "add",
        DEVICE_TYPEID: 17,
        DEVICE_MODELID: 9,
        DEVICE_ID: $("#DEVICE_ID_QBB").val(),
        DEVICE_NAME: $("#DEVICE_NAME_QBB").val(),
        AGENCIES_ID: GetQueryString("id"),
        AGENCIES_NAME: $("#AGENCIES_NAME_QBB").val(),
        COMPANY_NAME: $("#COMPANY_NAME_QBB").val(),
        COORDINATES_X: DEVICE_X,
        COORDINATES_Y: DEVICE_Y,
        CMS_COLUMN: $("#CMS_COLUMN_QBB").find("option:selected").text(),
        CMS_ROW: $("#CMS_ROW_QBB").find("option:selected").text(),
        CMS_RESOLUTION: $("#CMS_RESOLUTION_QBB").find("option:selected").text(),
        DEVICE_SERIAL: $("#DEVICE_SERIAL_QBB").val(),
        DATA: "无",
        NOTE: $("#NOTE_QBB").val(),
        DEVICE_STAKE: $("#DEVICE_STAKE_QBB").val(),
        DEVICE_LOCATION: $("#DEVICE_LOCATION_QBB").val(),
        DEVICE_DIRECTION: $("#DEVICE_DIRECTION_QBB").val(),
        DEVICE_SERIALINFO: "9600,N,8,1",
        CONMMUNCATION_TYPE: $("#CONMMUNCATION_TYPE_QBB").val(),
        IP_ADDRESS: $("#IP_ADDRESS_QBB").val(),
        IP_PORT: "8080",
        DEVICE_FLAG: 1
    }
    if (json.DEVICE_ID != "") {
        json.type = "update";
    }
    $.post("../../Ashx/index.ashx", json, function (data) {
        if (+data > 0) {
            swal("添加成功！");
        }
    })
}
//获得地址栏参数
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]); return null;

}
//情报板信息发送
function MessageRouting() {
    var jsonMessage = {
        type: "MessageSend",
        deviceid: $("#DEVICE_ID").val(),
        delay: $("#edit-delay").find("option:selected").text(),
        transition: $("#edit-show").find("option:selected").text(),
        param: "0",
        bmp: "无",
        fontcolor: $("#edit-color").find("option:selected").text(),
        backcolor: $("#edit-bgcolor").find("option:selected").text(),
        font: $("#edit-type").find("option:selected").text(),
        fontsize: $("#edit-size").find("option:selected").text(),
        contentstr: $("#infoBox tr.checked").find('input.txt').attr('data-html').replace(new RegExp(/(<br\/>)/g), '\\n'),
        flag: "0",
    };
    var Liststring = new Array();
    try {
        for (var i = 0; i < $("#infoBox tr.checked input.txt").length; i++) {
            Liststring.push(
                JSON.parse($("#infoBox tr.checked input.txt")[i].getAttribute('data-jsonm')).SHOW_CONTENT);
        }
    } catch (e) {
        swal("请先保存设备信息！");
        return;
    }

    jsonMessage.ListConent = JSON.stringify(Liststring);
    $.post("../../Ashx/index.ashx", jsonMessage, function (data) {
        swal(data);
    })
}
function DeviceControl() {
    var json = {
        type: "devicecontrol",
        DEVICE_ID: DEVICE_ID,
        sendStr: controlText
    }
    if (statecontrol == "本地") {
        swal("当前控制模式为本地，中心不可控!");
    } else {
        $.post("../../Ashx/index.ashx", json, function (data) {
            swal(data);
        })
    }
}
function SaveOneMessage(obj) {
    var jsonMessage = {
        type: "SaveOneMessage",
        deviceid: $("#DEVICE_ID").val(),
        delay: $("#edit-delay").find("option:selected").text(),
        transition: $("#edit-show").find("option:selected").text(),
        param: "0",
        bmp: "无",
        fontcolor: $("#edit-color").find("option:selected").text(),
        backcolor: $("#edit-bgcolor").find("option:selected").text(),
        font: $("#edit-type").find("option:selected").text(),
        fontsize: $("#edit-size").find("option:selected").text(),
        contentstr: $(obj).siblings().find(".txt").attr('data-html').replace(new RegExp(/(<br\/>)/g), '\\n'),
        flag: "0"
    };
    var JsonSave = $(obj).siblings().find(".txt").attr("data-jsonm");
    if (JsonSave == undefined || JsonSave == "") {
        jsonMessage.typeQBB = "add";
    } else {
        jsonMessage.typeQBB = "update";
        jsonMessage.info_id = JSON.parse(JsonSave).INFO_ID;
    }
    $.post("../../Ashx/index.ashx", jsonMessage, function (data) {
        if (data.indexOf('|') != -1) {
            var content = '"' + data.split('|')[1] + '"';
            content = content.replace(new RegExp(/(\\)/g), '\\\\');
            var SHOW_CONTENT = '"' + "SHOW_CONTENT" + '"';
            $(obj).siblings().find(".txt").attr('data-jsonm', "{" + SHOW_CONTENT + ":" + content + "}");
            swal(data.split('|')[0]);
        } else {
            swal(data);
        }
    })
}
function GetDEVICE_TYPE(value) {
    //获取设备类型枚举
    $.get("../../Ashx/index.ashx", { type: "GetDEVICE_TYPE" }, function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#DEVICE_TYPEID_QBB").append("<option value=" + data[i].SYS_CODE + ">" + data[i].SYS_NAME + "</option>")
        }
        $("#DEVICE_TYPEID_QBB").val(value);
    }, "json")
}
function GetCOMPANY_NAME(COMPANYID, TypeID) {
    $.get("../../Ashx/index.ashx", { type: "GetCOMPANY_NAME", TypeID: TypeID }, function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#COMPANY_NAME_QBB").append("<option value=" + data[i].COMPANY_ID + ">" + data[i].COMPANY_NAME + "</option>")
        }
        $("#COMPANY_NAME_QBB").val(COMPANYID);
    }, "json")
}
function DeleteCMSInfo(obj, infoid, deviceid) {
    $(obj).parent().remove();
    $.post("../../Ashx/index.ashx", { type: "DeleteCMSInfo", INFO_ID: infoid, DEVICE_ID: deviceid }, function (data) {
        swal(data);
    });
}
function GetMessageStyle(obj) {
    var fontcolor, bgcolor, fontsize, fontfamiliy, showstyle;
    var JsonStyle = obj.find('input.txt').attr("data-jsonm");
    console.log(JsonStyle);
    var style = JSON.parse(JsonStyle).SHOW_CONTENT;
    var stylearray = style.split("\\");
    var styleshow = stylearray[0].split(',');
    switch (styleshow[1]) {
        case "0": showstyle = "清屏";
            break;
        case "1": showstyle = "立即显示";
            break;
        case "2": showstyle = "fadeInUp";
            break;
        case "3": showstyle = "fadeInDown";
            break;
        case "4": showstyle = "fadeInRight";
            break;
        case "5": showstyle = "fadeInLeft";
            break;

    }
    switch (stylearray[3].substr(1, stylearray[3].length)) {
        case "255000000000": fontcolor = "红色";
            break;
        case "000255000000": fontcolor = "绿色";
            break;
        case "000000255000": fontcolor = "蓝色";
            break;
        case "255255000000": fontcolor = "黄色";
            break;
        case "255000255000": fontcolor = "紫色";
            break;
        case "000255255000": fontcolor = "青色";
            break;
        case "000000000255": fontcolor = "琥珀色";
            break;
        case "000000000000": fontcolor = "黑色";
            break;
        default: fontcolor = "透明色";
            break;
    }
    switch (stylearray[4].substr(1, stylearray[4].length)) {
        case "255000000000": bgcolor = "红色";
            break;
        case "000255000000": bgcolor = "绿色";
            break;
        case "000000255000": bgcolor = "蓝色";
            break;
        case "255255000000": bgcolor = "黄色";
            break;
        case "255000255000": bgcolor = "紫色";
            break;
        case "000255255000": bgcolor = "青色";
            break;
        case "000000000255": bgcolor = "琥珀色";
            break;
        case "000000000000": bgcolor = "黑色";
            break;
        default: bgcolor = "透明色";
            break;
    }
    switch (stylearray[5].substr(1, 1)) {
        case "h": fontfamiliy = "黑体";
            break;
        case "k": fontfamiliy = "楷体";
            break;
        case "s": fontfamiliy = "宋体";
            break;
        case "f": fontfamiliy = "仿宋";
            break;
    }
    fontsize = stylearray[5].substr(2, 2);

    $("#edit-bgcolor").val(bgcolor);
    $("#edit-color").val(fontcolor);
    $("#edit-size").val(fontsize);
    $("#edit-show").val(showstyle);
    $("#edit-type").val(fontfamiliy);
    fontcolor = GetColor(fontcolor);
    bgcolor = GetColor(bgcolor);
    $("#info-txt").css('color', fontcolor);
    $("#info-txt").css('font-size', +fontsize);
    $("#info-txt").css('font-family', fontfamiliy);
    $("#inte_ban").css('backgroud-color', bgcolor);
}
function GetColor(size) {
    switch (size) {
        case "红色": size = "#DC143C"; break;
        case "绿色": size = "#7FFF00"; break;
        case "蓝色": size = "#00BFFF"; break;
        case "黄色": size = "#FFFF00"; break;
        case "紫色": size = "#800080"; break;
        case "青色": size = "#3CB371 "; break;
        case "琥珀色": size = "#FFBF00"; break;
        case "黑色": size = "#000000"; break;
        case "透明色": size = "#000000"; break;
    }
    return size;
}
//群控
function GroupWrite() {
    $.post("../../Ashx/index.ashx", {}, function (data) {
        swal(data);
    })
}
//预案信息
function ShowReservePlan() {
    $("#AGENCIES_TYPE").val(GetQueryString("id"));//所属机构
    GetRoadList();
    GetCode();
    GetDirection();
}
//所属道路
function GetRoadList() {
    $.post("../../Ashx/index.ashx", { type: "GetRoadList" }, function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#RoadList").append("<option value=" + data[i].RoadID + ">" + data[i].RoadName + "</option>")
        }
    }, "json");
}
//获取警告类型和警告级别
function GetCode() {
    $.post("../../Ashx/index.ashx", { type: "GetCode" }, function (data) {
        for (var i = 0; i < data.WarningType.length; i++) {
            $("#WarningType").append("<option value=" + data.WarningType[i].SYS_CODE + ">" + data.WarningType[i].SYS_NAME + "</option>")
        }
        for (var i = 0; i < data.WarningLevel.length; i++) {
            $("#WarningLevel").append("<option value=" + data.WarningLevel[i].SYS_CODE + ">" + data.WarningLevel[i].SYS_NAME + "</option>")
        }
    }, "json");
}
//预案方向
function GetDirection() {
    $.post("../../Ashx/index.ashx", { type: "GetDirection", RoadID: RoadID }, function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#Direction").append("<option value=" + data[i].RoadDirectionID + ">" + data[i].RoadDirectionName + "</option>")
        }
    }, "json");
}
function SaveReservePlan() {
    var JsonReservePlan = {
        type: "AddReservePlan",
        Plan_Name: $("#Plan_Name").val(),
        RecoveryID: $("#RecoveryID").val(),
        AGENCIES_ID: $("#AGENCIES_TYPE").find("option:selected").val(),
        AutoRun: $("#AutoRun").find("option:selected").val(),
        RoadID: $("#RoadList").find("option:selected").val(),
        Device_Direction: $("#Direction").find("option:selected").text(),
        Event_Type: $("#WarningType").find("option:selected").val(),
        Event_Level: $("#WarningLevel").find("option:selected").val(),
        Start_Stake: $("#Start_Stake").val(),
        End_Stake: $("#End_Stake").val(),
        Wind_Direction: $("#Wind_Direction").find("option:selected").text(),
        Plan_Details: $("#Plan_Details").val()
    }
    $.post("../../Ashx/index.ashx", JsonReservePlan, function (data) {
        if (data == "请先登录！") {
            swal({
                title: data,
                confirmButtonText: "ok",
            }, function () {
                location.href = "/JTJK/traffic/html_home/login.html";
            });
        } else {
            swal(data);
        }
    });
}

