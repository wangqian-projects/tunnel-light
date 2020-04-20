angular.module('starter.controllers', [])
    //执行预案
     .controller('PlanStart', function ($scope, $routeParams) {
         $.ajax({
             type: 'get',
             url: '/JTJK/Ashx/index.ashx',
             async: false,
             data: { type: "GetPlanDevieceByID", PlanID: $routeParams.PlanID },
             success: function (data) {
                 $scope.data = JSON.parse(data);
                 if ($scope.data.AutoRun == "0") {
                     $scope.data.AutoRun = "需要用户确认";
                 } else {
                     $scope.data.AutoRun = "自动执行";
                 }
             }
         })
         $scope.PlanWrites = function () {
             var JsonMessage = {
                 Plan_ID: $routeParams.PlanID,
                 AbEvent_ID: $routeParams.AbEvent_ID,
                 Deal_Flag: $scope.data.Deal_Flag
             }
             $.ajax({
                 type: 'get',
                 url: '/JTJK/Ashx/index.ashx',
                 async: false,
                 data: { type: "PlanWrites", Plan_ID: $routeParams.PlanID },
                 success: function (data) {
                     data = JSON.parse(data);

                     sessionStorage.setItem("totalItems",data.allnumber.length)
                     swal(data.message);
                    // $rootScope.$broadcast('changeModel',data.AllData);
                     $("#statistics")[0].innerHTML = "共有数据" + data.allnumber + "条,执行成功" + data.number + "条,执行失败或未执行" + (+data.allnumber - (+(data.number))) + "条";
                 }
             })
         }
     })
     .controller('IndexWarningPage', function ($scope, $routeParams) {
         $.ajax({
             type: 'get',
             url: '/JTJK/Ashx/index.ashx',
             async: false,
             data: { type: "AbnormalEventInfoGetByID", ID: $routeParams.id },
             success: function (data) {
                 $scope.WarningM = JSON.parse(data);
                 $scope.WarningM.Event_Time = new Date($scope.WarningM.Event_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
             }
         })
         var WarningJson = {
             type: "AbnormalEventsGetPlan",
             Event_Type: $scope.WarningM.Event_Type,
             Event_Level: $scope.WarningM.Event_Level,
             Event_Stake: $scope.WarningM.Event_Stake,
             RoadID: $scope.WarningM.RoadID,
             Event_Direction: $scope.WarningM.Event_Direction,
             AGENCIES_ID: $scope.WarningM.AGENCIES_ID
         };
         $.ajax({
             type: 'get',
             url: '/JTJK/Ashx/index.ashx',
             async: false,
             data: WarningJson,
             success: function (data) {
                 $scope.PlanMessage = JSON.parse(data);
                 if ($scope.PlanMessage.length > 0) {
                     $scope.OnePlanMessage = $scope.PlanMessage[0];

                 }
             }
         })
         var json = {
             type: "GetCCTVInfoByRoadIdAndStake",
             Event_Stake: $scope.WarningM.Event_Stake,
             RoadID: $scope.WarningM.RoadID
         };
         $.ajax({
             type: 'get',
             url: '/JTJK/Ashx/index.ashx',
             async: false,
             data: json,
             success: function (data) {
                 $scope.data = JSON.parse(data);
             }
         })
         $scope.SelectLog = function (id) {
             location.href = '#/PlanLog/' + id;
         }
         $scope.Watch = function (Event_Stake, RoadID) {
             location.href = '#/VideoWatch/' + Event_Stake + '/' + RoadID + '';
         }
     })
    //预案日志
     .controller('PlanLog', function ($scope, $routeParams) {
         var JsonMessage = {
             type: "PlanExecutionInfosGetByConditions",
             ID: $routeParams.ID,
         }
         $.ajax({
             type: 'get',
             url: '/JTJK/Ashx/index.ashx',
             async: false,
             data: JsonMessage,
             success: function (data) {
                 $scope.planlog = JSON.parse(data)[0];
             }
         })
         JsonMessage.type = "PlanDeviceExecutionLogGetByConditions";
         JsonMessage.ExecutionID = $scope.planlog.ExecutionID;
         $.ajax({
             type: 'get',
             url: '/JTJK/Ashx/index.ashx',
             async: false,
             data: JsonMessage,
             success: function (data) {
                 $scope.plandevicelog = JSON.parse(data)[0];
             }
         })
     })
    //预案日志管理
    .controller('IndexPlanLog', function ($scope, ComAjax, SinglePagination, Pagination) {
        ComAjax.query($scope);
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
        var allData = null;
        $scope.GetList = function (Plan_ID, AbEvent_ID, StartTime, EndTime, AGENCIES_ID, RoadID, Direction, Warningtype, Warninglevel) {
            var JsonMessage = {
                type: "PlanExecutionInfosGetByConditions",
                Plan_ID: Plan_ID,
                AbEvent_ID: AbEvent_ID,
                StartTime: StartTime,
                EndTime: EndTime,
                AGENCIES_ID: AGENCIES_ID,
                RoadID: RoadID,
                Direction: Direction,
                Warningtype: Warningtype,
                Warninglevel: Warninglevel
            }
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: JsonMessage,
                success: function (data) {
                    allData = JSON.parse(data);
                    sessionStorage.setItem("totalItems",allData.length)
                    for (var i = 0; i < allData.length; i++) {
                        allData[i].Run_Time = new Date(allData[i].Run_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                    }
                    $scope.data = Pagination.getDataArr(allData, 0, 5);

                    SinglePagination.query($scope, allData);
                }
            })
        }
        $scope.GetList();
        $scope.DeviceExecutionLog = function (ExecutionID, AGENCIES_ID) {
            location.href = "#/IndexDeviceLog/" + ExecutionID + "/" + AGENCIES_ID;
        }
    })
    //预案设备执行日志
    .controller('IndexDeviceLog', function ($scope, $routeParams) {

    })

    .controller('publiclist', function ($scope, $routeParams, SinglePagination, Pagination) {
        var allData = null;
        $scope.GetList = function (ExecutionID) {
            var JsonMessage = {
                type: "PlanDeviceExecutionLogGetByConditions",
                ExecutionID: ExecutionID
            }
            $scope.AllNumber = 0;
            $scope.data = new Array();
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: { type: "PlanDeviceCtrlInfosGetByConditions", Plan_ID: $routeParams.PlanID },
                success: function (data) {
                    allData = JSON.parse(data);
                    sessionStorage.setItem("totalItems",allData.length)
                    $scope.AllNumber = allData.length;
                    for (var i = 0; i < allData.length; i++) {
                        allData[i].ZXState = "未执行";
                    }
                    $scope.data = Pagination.getDataArr(allData, 0, 9);
                    SinglePagination.query($scope, allData);
                }
            })
            //$.ajax({
            //    type: 'get',
            //    url: '/JTJK/Ashx/index.ashx',
            //    async: false,
            //    data: { type: "PlanDeviceExecutionLogGetByConditions", Plan_ID: $routeParams.PlanID },
            //    success: function (data) {
            //        swal(data);
            //    }
            //})
        }
        $scope.showBox = false;
        $scope.showPanel = function () {
            $scope.showBox = !$scope.showBox;
        }
        $scope.BtnID = function (id) {
            // $("#" + id + "").css("width", "40px").css("height", "40px");
            $("#abc").remove();
            $("#highwayBox").append("<img id='abc' src='/JTJK/traffic/html_home/images/icon/time.gif' width='56px' height='35px' style='left:" + $("#" + id + "")[0].style.left + ";top:" + $("#" + id + "")[0].style.top + "';'>")
            $("#abc").bind("mouseover", function () {
                $("#abc").remove();
            })
        }
        $scope.GetList();
    })
    .controller('header', function ($scope) {
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/index.ashx',
            async: false,
            data: { type: "GetUserMessage" },
            success: function (data) {
                $scope.name = data;
            }
        })
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/index.ashx',
            async: false,
            data: { type: "GetAbnormalEventNotPrompt" },
            success: function (data) {
                $scope.AbnormalEventNotPrompt = JSON.parse(data);
            }
        })
        $scope.OutLogin = function () {
            swal({
                title: "确定退出登录吗？",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                  function (isConfirm) {
                      if (isConfirm) {
                          $.ajax({
                              type: 'get',
                              url: '/JTJK/Ashx/Login.ashx',
                              async: false,
                              data: { type: "OutLogin" },
                              success: function (data) {
                                  //  swal(data, "", "success");
                                  location.href = "/JTJK/traffic/html_home/login.html";
                              }
                          })
                      } else {
                          swal("已取消!", "", "error");
                      }
                  });
        }
    })
    //预案管理
    .controller('IndexCasesearchresult', function ($scope, ComAjax, Pagination) {
        $scope.allData = null;
        var Pagesize = 9;
        ComAjax.query($scope);
        $scope.GetList = function (PlanID, Start_Stake, End_Stake, AGENCIESID, RoadID, Direction, WarningType, WarningLevel) {
            //查询
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: { type: "PlanDeviceContro", Plan_ID: PlanID, Start_Stake: Start_Stake, End_Stake: End_Stake, AGENCIES_ID: AGENCIESID, RoadID: RoadID, Device_Direction: Direction, WarningType: WarningType, WarningLevel: WarningLevel },
                success: function (data) {
                    $scope.allData = JSON.parse(data);
                    sessionStorage.setItem("totalItems",$scope.allData.length);
                   // $scope.$apply($scope.allData);
                    $scope.data = Pagination.getDataArr($scope.allData, 0, 9);
                    // SinglePagination.query($scope);
                    //$scope.paginationConf.totalItems = $scope.allData.length;
                    $scope.paginationConf = {
                        currentPage: 1,
                        totalItems: $scope.allData.length,//数据总数
                        itemsPerPage: Pagesize,//每页条数
                        onChange: function (x) {
                            var p = x?$scope.paginationConf.currentPage=x:$scope.paginationConf.currentPage;
                            $scope.data = Pagination.getDataArr($scope.allData, p - 1, Pagesize);
                        }
                    };
                }
            })
        }
        $scope.GetList();
        $scope.PlanWrites = function (planID, AGENCIES_ID) {
            location.href = "#/PlanStart/" + planID + "/null/" + AGENCIES_ID + "/ZX";
        }
        $scope.PlanDeWrites = function (planID, AGENCIES_ID) {
            location.href = "#/PlanStart/" + planID + "/null/" + AGENCIES_ID + "/HF";
        }
        $scope.UpdatePlanDevice = function (PlanID, AGENCIES_ID) {
            location.href = '#/casesearchresultAdd/' + PlanID + '/' + AGENCIES_ID + '';
        }
        $scope.Delete = function (d) {
            swal({
                title: "确定要删除此信息吗？",
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                closeOnConfirm: false,
                closeOnCancel: false
            },
                   function (isConfirm) {
                       if (isConfirm) {
                           var JsonMessage = {
                               type: "PlanInfoDelete",
                               Plan_ID: d.Plan_ID
                           };
                           $.ajax({
                               type: 'get',
                               url: '/JTJK/Ashx/index.ashx',
                               async: false,
                               data: JsonMessage,
                               success: function (data) {
                                   if (data == "true" || data == "True") {
                                       swal("该用户已被删除！", "", "success");
                                       $scope.data.splice($scope.data.indexOf(d), 1);
                                       $scope.$apply($scope.data);
                                   } else {
                                       swal("删除失败！", "", "error");
                                   }
                               }
                           })
                       } else {
                           swal("已取消!", "", "error");
                       }
                   });
        }
        $(".tcdPageCode").createPage({
           pageCount: Math.ceil($scope.allData.length / 3),
           current: 1,
           backFn: function (p) {
               //单击回调方法，p是当前页码
               console.log(p);
               $scope.data = getDataArr($scope.allData, p - 1, 3);

               $scope.$apply($scope.data);
           }
        });
        function getDataArr(arr, page, pageSize) {
           var res = [];
           for (var i = 0; i < arr.length; i++) {
               res[i] = arr[i];
           }
           var startIndex;
           startIndex = page * pageSize;
           res = res.splice(startIndex, pageSize);
           return res;
        }

    })
    .controller('IndexMapCtrl', function () {
        $.get("/JTJK/Ashx/index.ashx", { type: "map" }, function (data) {
            if (data == "请先登录！") {
                swal({
                    title: data,
                    confirmButtonText: "确定",
                }, function () {
                    location.href = "/JTJK/traffic/html_home/login.html";
                });

            } else {
                data = JSON.parse(data);
                for (var i = 0; i < data.length; i++) {
                    var classmap = "";
                    if (data[i]["AGENCIES_TYPE"] == 1) {
                        classmap = "f_map_sd";
                    } else {
                        classmap = "f_map_kz";
                    }
                    var COORDINATE_Y = (+data[i]["COORDINATE_Y"]) + 240;//左边菜单宽度
                    $("#map_test").append("<a class='" + classmap + "' title='" + data[i]["AGENCIES_NAME"] + "' style='top:" + data[i]["COORDINATE_X"] + "px;left:" + COORDINATE_Y + "px;' href='#/index/" + data[i]["AGENCIES_ID"] + "'></a>");
                }
            }
        });
    })

    .controller('IndexController', function ($scope, $routeParams) {
        //点击导航显示下拉菜单
        $scope.flag1 = false;
        $scope.flag2 = false;
        $scope.flag3 = false;
        //添加设备左右切换
        var swiper = new Swiper('#swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 8,
            /*centeredSlides: true,*/
            paginationClickable: true,
            spaceBetween: 18
        });
        //图层控制
        $scope.icons = [{ name: '隧道灯' }, { name: '立柱式情报板' }, { name: '门架式情报板' }, { name: '吊装情报板' }, { name: '风机' },
            { name: '两态车道指示器' }, { name: '三态车道指示器' }, { name: '枪机摄像机' }, { name: '球形摄像机' }, { name: '光强' },
            { name: '风速风向监测器' }, { name: '交通信号灯' }, { name: 'CO/VI' }, { name: '人行横洞标志' }, { name: '车行横洞卷帘门' }];
        //添加设备显示到马路上
        //$scope.devices = [{ src: 'index_15_img.png' }, { src: 'index_14_img.png' }];


        //设备坐标,设备类型
        var DEVICE_X, DEVICE_Y, DEVICE_TYPEID, controlText, statecontrol, RoadID, GroupControl, resulttypeid,CONMMUNCATION_TYPE, IsHide = false; var oldjson = new Array(); var PlanStateArray;

        //$(function () {
        //点击加号显示底部预案
        $('#showBottomBox').bind('click', function () {
            $(this).toggleClass('down');
            $('#device-list').toggleClass('dn');
        })
        // editInformationBoard();
        //锁定设备
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
                $.post("/JTJK/Ashx/index.ashx", { type: "updateXY", oldjson: JSON.stringify(oldjson), newjson: JSON.stringify(newjson) }, function (data) {
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
                // console.log('ed');
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
                var dataJson = $(this).siblings().find(".txt").attr("data-jsonm");
                var $legend = $(this);
                swal({
                    title: "确定要删除此信息吗？",
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "删除",
                    cancelButtonText: "取消",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function (isConfirm) {
                    if (isConfirm) {
                        if (dataJson == "" || dataJson == undefined) {
                            $legend.parent().remove();
                            swal("情报板信息删除成功！", "", "success");
                        } else {
                            var returnMessage = DeleteCMSInfo(JSON.parse(dataJson).INFO_ID, JSON.parse(dataJson).DEVICE_ID);
                            $legend.parent().remove();
                            swal(returnMessage, "", "success");
                        }
                    } else {
                        swal("已取消!", "", "error");
                    }
                });


                // $(this).parent().remove();
            });
            infoBox.on('click', '.save-item', function () {
                //   console.log('s');
                $(this).siblings().find('input.txt').attr('disabled', 'true')
                $(this).siblings().find('input.txt').removeClass('active activebg');
                SaveOneMessage(this);

            });
            infoBox.on('click', '.info_send', function () {
                MessageRouting();
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
                switch (name) {
                    case "all-ctrl-wind": GroupControl = "43"; break;
                    case "all-ctrl-light": GroupControl = "48"; break;
                    case "all-ctrl-traffic": GroupControl = "25"; break;
                    case "all-ctrl-double": GroupControl = "29"; break;
                    case "all-ctrl-three": GroupControl = "30"; break;
                }
                if (RoadID == "") {
                    swal("请先添加设备");
                    return;
                }
                $.ajax({
                    type: 'post',
                    url: '/JTJK/Ashx/index.ashx',
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
                wrapper_tunnel($("#windDeviceCtrlAll li div"));//风机
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

        //选择马路上的设备
        function dragDevice() {
            //  console.log($("#highwayBox").length);
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



            //获取该机构下所有设备信息
            // GetAllAgenciesDevices(controlLayer);
            showAllDevices(GetQueryString("id"));
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
                $.post("/JTJK/Ashx/index.ashx", { DEVICE_ID: JSON.parse(data).DEVICE_ID, type: "GetMessage" }, function (data) {
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
            if (id == 9 || id == 18) {
                id = 9;
            }
            var flag = true;
            var dataconnect = data;
            if (data == undefined || data == "") {
                $('body').append(Handlebars.compile($('#device_' + id).html()));
            } else {
                DEVICE_ID = JSON.parse(data).DEVICE_ID;//获取设备保存过后的ID
                DEVICE_TYPEID = JSON.parse(data).DEVICE_TYPEID;
                CONMMUNCATION_TYPE = JSON.parse(data).CONMMUNCATION_TYPE;
                if (id != 1 || id != 2 || id != 3 || id != 17 || id != 7) {
                    $.ajax({
                        type: 'post',
                        url: '/JTJK/Ashx/index.ashx',
                        async: false,
                        data: { type: "GetOneMessage", DEVICE_ID: DEVICE_ID },
                        success: function (data) {
                            data = JSON.parse(data);
                            if (id == 9) {
                                if (data.DEVICE_TYPEID == 26) {
                                    data.Device_TypeG = "洞外照度";
                                } else if (data.DEVICE_TYPEID == 45) {
                                    data.Device_TypeG = "洞内光强";
                                }
                            }
                            if (id == 5 || id == 6 || id == 19 || id == 20 || id == 21 || id == 22 || id == 23 || id == 31) {
                                if (data.DEVICE_TYPEID == 29) {
                                    id = 5;
                                } else if (data.DEVICE_TYPEID == 30) {
                                    id = 6;
                                }
                                if (data.DEVICE_DIRECTION == "川口到大河家") {
                                    data.DireCtion_Car = true;
                                } else {
                                    data.DireCtion_Car = false;
                                }
                            }
                            if (id == 11 || id == 24 || id == 25 || id == 26 || id == 27 || id == 28 || id == 29 || id == 30) {
                                id = 11;
                            }
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
                                case 0: $("#tun").text(state[1]);
                                    switch (state[1]) {
                                        case "开启":
                                            $("#tunnel_img").addClass("light-open"); break;
                                        case "关闭":
                                            $("#tunnel_img").addClass("light-close"); break;
                                    }
                                    break;
                                case 5: $("#twoCar").text(state[0]);
                                    switch (state[0]) {
                                        case "正向通行":
                                            if (data.DEVICE_DIRECTION == "川口到大河家") {
                                                $("#lane_back").addClass("forward");
                                            } else {
                                                $("#lane_back").addClass("reverse");
                                            } break;
                                        case "反向通行":
                                            if (data.DEVICE_DIRECTION == "大河家到川口") {
                                                $("#lane_back").addClass("reverse");
                                            } else {
                                                $("#lane_back").addClass("forward");
                                            } break;
                                        case "双向禁行":
                                            $("#lane_back").addClass("double-no"); break;
                                        case "关闭":
                                            $("#lane_back").addClass("double-close"); break;
                                    }
                                    break;
                                case 6: $("#threeCar").text(state[0]);
                                    switch (state[0]) {
                                        case "正向通行":
                                            if (data.DEVICE_DIRECTION == "川口到大河家") {
                                                $("#lane_back").addClass("forward");
                                            } else {
                                                $("#lane_back").addClass("reverse");
                                            } break;
                                        case "反向通行":
                                            if (data.DEVICE_DIRECTION == "大河家到川口") {
                                                $("#lane_back").addClass("reverse");
                                            } else {
                                                $("#lane_back").addClass("forward");
                                            } break;
                                        case "正向左转":
                                            if (data.DEVICE_DIRECTION == "川口到大河家") {
                                                $("#lane_back").addClass("forward-left");
                                            } else {
                                                $("#lane_back").addClass("reverse-left-down");
                                            } break;
                                        case "反向左转":
                                            if (data.DEVICE_DIRECTION == "川口到大河家") {
                                                $("#lane_back").addClass("reverse-left");
                                            } else {
                                                $("#lane_back").addClass("forward-left-down");
                                            } break;
                                        case "双向禁行":
                                            $("#lane_back").addClass("double-no"); break;
                                        case "关闭":
                                            $("#lane_back").addClass("double-close"); break;
                                    }
                                    break;
                                case 11: $("#stat").text(state[0]);
                                    switch (state[0]) {
                                        case "左转":
                                            $("#con_img").addClass("left"); break;
                                        case "警告":
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
                if (id == 1 || id == 2 || id == 3 || id == 17) {
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



        //});
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
                    click = false;
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
                //if (moveTime < 2) {
                //    click = true;

                //} else {
                //    moveTime = 0;
                //}
                if (click && lockDevice) {
                    showDeviceAlert(obj.attr('data-id'), obj.attr('data-json'));
                }

                if (click && !lockDevice) {
                    var JsonData = {};
                    if (obj.attr('data-json') == "") {

                        var typeids = "";
                        switch (obj.attr('data-id')) {
                            case "device_0": typeids = '48'; break;
                            case "device_1": typeids = '18'; break;
                            case "device_2": typeids = '17'; break;
                            case "device_3": typeids = '20'; break;
                            case "device_4": typeids = '43'; break;
                            case "device_5": typeids = '29'; break;
                            case "device_6": typeids = '30'; break;
                            case "device_7": typeids = '21,22'; break;
                            case "device_8": typeids = '24'; break;
                            case "device_9": typeids = '26,45'; break;
                            case "device_10": typeids = '16'; break;
                            case "device_11": typeids = '25'; break;
                            case "device_12": typeids = '40'; break;
                                //  case "device_13": DEVICE_TYPEID = 48; break;
                            case "device_14": typeids = '14'; break;
                            case "device_15": typeids = '11,12'; break;
                        }
                        if (typeids == 17 || typeids == 18 || typeids == 19 || typeids == 20) {
                            JsonData.CMS_QBB = true;
                        } else {
                            JsonData.CMS_QBB = false;
                        }
                        $('body').append(Handlebars.compile($('#addDeviceAlert').html())(JsonData));
                        GetDEVICE_TYPE(typeids);
                        $('#DEVICE_TYPEID_QBB_Select').bind('change', function () {
                            var typididss = $(this).val();
                            GetCOMPANY_NAME("", typididss);
                            GetDeviceModel($("#COMPANY_NAME_QBB").val(), typididss, "");
                        });
                        GetDeveiceRoad("");
                        GetDirections("");
                        if (typeids.length <= 2) {
                            GetCOMPANY_NAME("", typeids);
                            GetDeviceModel($("#COMPANY_NAME_QBB").val(), typeids, "");
                        } else {
                            GetDeviceModel($("#COMPANY_NAME_QBB").val(), $("#DEVICE_TYPEID_QBB_Select").val(), "");
                        }
                        $('#COMPANY_NAME_QBB').bind('change', function () {
                            var COMPANYids = $(this).val();
                            if (typeids.length <= 2) {
                                GetDeviceModel($("#COMPANY_NAME_QBB").val(), typeids, "");
                            } else {
                                GetDeviceModel(COMPANYids, $("#DEVICE_TYPEID_QBB_Select").val(), "");
                            }
                        });
                    } else {
                        DEVICE_TYPEID = JSON.parse(obj.attr('data-json')).DEVICE_TYPEID;
                        JsonData = JSON.parse(obj.attr('data-json'));
                        if (JsonData.DEVICE_TYPEID == 17 || JsonData.DEVICE_TYPEID == 18 || JsonData.DEVICE_TYPEID == 19 || JsonData.DEVICE_TYPEID == 20) {
                            JsonData.CMS_QBB = true;
                        } else {
                            JsonData.CMS_QBB = false;
                        }
                        JsonData.DEVICE_RUNTIME = new Date(JsonData.DEVICE_RUNTIME).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                        $('body').append(Handlebars.compile($('#addDeviceAlert').html())(JsonData));
                        GetDEVICE_TYPE(DEVICE_TYPEID);
                        GetDeveiceRoad(JsonData.ROADID);
                        GetDirections(JsonData.DEVICE_DIRECTION);
                        $("#DEVICE_Direction_QBB").val(JsonData.DEVICE_DIRECTION);
                        GetCOMPANY_NAME(JSON.parse(obj.attr('data-json')).COMPANY_ID, DEVICE_TYPEID);
                        GetDeviceModel(JsonData.COMPANY_ID, DEVICE_TYPEID, JsonData.DEVICE_MODELID);
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
                if ($routeParams.id != undefined || $routeParams.AbEvent_ID == "null") {
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
                            $.post("/JTJK/Ashx/index.ashx", { type: "delete", DEVICE_ID: DEVICE_ID }, function (data) {
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
                } else {
                    return;
                }
            }
        }

        function showAllDevices(id) {
            var ControlFlag = true;
            if ($routeParams.ControlID != undefined) {
                ControlFlag = false;
            }
            var IsZX = false;
            if ($("#highwayBoxWrap").attr('data-id') == "ZX") {
                IsZX = true;
                ControlFlag = true;
            }
            var $body = $('body');
            $body.on('click', '.lane_ok', function () {
                DeviceControl();
                var parent = $(this).parents('.scrn_back');
                var parentId = parent.attr('id');
                //   console.log(parentId);
                parent.remove();

            });
            if (($routeParams.PlanID != null && $routeParams.PlanID != undefined) || !ControlFlag) {
                var ID = $routeParams.PlanID;
                if ($routeParams.ControlID == "HF") {
                    ID = $("#RecoveryID").val();
                }
                $.ajax({
                    type: 'get',
                    url: '/JTJK/Ashx/index.ashx',
                    async: false,
                    data: { type: "PlanDeviceCtrlInfosGetByConditions", Plan_ID: ID },
                    success: function (data) {
                        PlanStateArray = JSON.parse(data);
                    }
                })
            }
            if ($routeParams.PlanID == "undefined" && $routeParams.mapID == "undefined") {
                $.ajax({
                    type: 'get',
                    url: '/JTJK/Ashx/index.ashx',
                    async: false,
                    data: { type: "PlanDeviceCtrlInfosGetByConditions", Plan_ID: $("#highwayBoxWrap").attr('data-id') },
                    success: function (data) {
                        PlanStateArray = JSON.parse(data);
                    }
                })
            }
            var json = {
                type: "AgenciesID",
                AgenciesID: id
            }
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: json,
                success: function (data) {
                    if (data == "服务错误！") {
                        swal("设备信息有误！");
                    } else if (data == "请先登录！") {
                        swal({
                            title: data,
                            confirmButtonText: "确定",
                        }, function () {
                            location.href = "/JTJK/traffic/html_home/login.html";
                        });
                    } else {
                        // $("#highwayBox img:not(.highway_img)").remove();
                        data = JSON.parse(data);
                        RoadID = data[0].ROADID;
                        for (var i = 0; i < data.length; i++) {
                            oldjson.push({
                                DEVICE_ID: data[i].DEVICE_ID,
                                COORDINATES_X: data[i].COORDINATES_X,
                                COORDINATES_Y: data[i].COORDINATES_Y
                            })
                            var src = "";
                            src = GetNewState(data[i].DEVICE_TYPEID, data[i].DEVICE_DIRECTION, data[i].DATA);
                            if (src != "") {
                                var id = (+src) - 1;
                                if (id >= 6) {
                                    id++;
                                }
                                var img;
                                if (src == "05") {
                                    var srcimg = "";
                                    if (($routeParams.id != undefined || $routeParams.AbEvent_ID == "null" || IsZX) && ControlFlag) {
                                        if (data[i].DATA != "" || data[i].DATA != null) {
                                            srcimg = "images/stat/index_" + src + "_img.png";
                                        }
                                        if (data[i].DATA.split(',')[1] == "正转") {
                                            srcimg = "images/stat/index_" + src + "_img_Z.gif";
                                        } else if (data[i].DATA.split(',')[1] == "反转") {
                                            srcimg = "images/stat/index_" + src + "_img_F.gif";
                                        } else if (data[i].DATA.split(',')[1] == "停止") {
                                            srcimg = "images/stat/index_" + src + "_img.png";
                                        } else {
                                            srcimg = "images/stat/index_" + src + "_img_error.png";
                                        }
                                    } else if (($routeParams.PlanID != null && $routeParams.PlanID != undefined || ($routeParams.PlanID == "undefined" && $routeParams.mapID == "undefined")) && ControlFlag) {
                                        if (PlanStateArray.length > 0) {
                                            for (var j = 0; j < PlanStateArray.length; j++) {
                                                if (data[i].DEVICE_ID == PlanStateArray[j].Device_ID) {
                                                    if (PlanStateArray[j].Control_Content == "正转") {
                                                        srcimg = "images/stat/index_" + src + "_img_Z.gif";
                                                    } else if (PlanStateArray[j].Control_Content == "反转") {
                                                        srcimg = "images/stat/index_" + src + "_img_F.gif";
                                                    } else if (PlanStateArray[j].Control_Content == "停止") {
                                                        srcimg = "images/stat/index_" + src + "_img.png";
                                                    }
                                                }
                                            }
                                        }
                                        if (srcimg == "") {
                                            srcimg = "images/stat/index_" + src + "_img.png";
                                        }
                                    }
                                    else if (!ControlFlag) {
                                        if (PlanStateArray.length > 0) {
                                            for (var j = 0; j < PlanStateArray.length; j++) {
                                                if (data[i].DEVICE_ID == PlanStateArray[j].Device_ID) {
                                                    if (PlanStateArray[j].Control_Content == "正转") {
                                                        srcimg = "images/stat/index_" + src + "_img_Z.gif";
                                                    } else if (PlanStateArray[j].Control_Content == "反转") {
                                                        srcimg = "images/stat/index_" + src + "_img_F.gif";
                                                    } else if (PlanStateArray[j].Control_Content == "停止") {
                                                        srcimg = "images/stat/index_" + src + "_img.png";
                                                    }
                                                }
                                            }
                                            if (srcimg == "") {
                                                if (data[i].DATA != "" || data[i].DATA != null) {
                                                    srcimg = "images/stat/index_" + src + "_img.png";
                                                }
                                                if (data[i].DATA.split(',')[1] == "正转") {
                                                    srcimg = "images/stat/index_" + src + "_img_Z.gif";
                                                } else if (data[i].DATA.split(',')[1] == "反转") {
                                                    srcimg = "images/stat/index_" + src + "_img_F.gif";
                                                } else if (data[i].DATA.split(',')[1] == "停止") {
                                                    srcimg = "images/stat/index_" + src + "_img.png";
                                                } else {
                                                    srcimg = "images/stat/index_" + src + "_img_error.png";
                                                }
                                            }
                                        } else {
                                            if (data[i].DATA != "" || data[i].DATA != null) {
                                                srcimg = "images/stat/index_" + src + "_img.png";
                                            }
                                            if (data[i].DATA.split(',')[1] == "正转") {
                                                srcimg = "images/stat/index_" + src + "_img_Z.gif";
                                            } else if (data[i].DATA.split(',')[1] == "反转") {
                                                srcimg = "images/stat/index_" + src + "_img_F.gif";
                                            } else if (data[i].DATA.split(',')[1] == "停止") {
                                                srcimg = "images/stat/index_" + src + "_img.png";
                                            } else {
                                                srcimg = "images/stat/index_" + src + "_img_error.png";
                                            }
                                        }
                                    }
                                    img = $('<img id=' + data[i].DEVICE_ID + ' data-id=device_' + id + ' data-json=' + JSON.stringify(data[i]) + ' src=' + srcimg + ' style="position: absolute; cursor: move; z-index: 0; left: ' + data[i].COORDINATES_X + 'px; top: ' + data[i].COORDINATES_Y + 'px;"/>');
                                } else {
                                    var srcimg = "";
                                    if (($routeParams.id != undefined || $routeParams.AbEvent_ID == "null" || IsZX) && ControlFlag) {
                                        //   alert(0);
                                        if (data[i].CONNECT_STATE == "正常") {
                                            srcimg = "images/stat/index_" + src + "_img.png";
                                        } else if (data[i].CONNECT_STATE != "正常") {
                                            srcimg = "images/stat/index_" + src + "_img_error.png";
                                        }
                                    }
                                        // else if () {
                                        //    // alert(2);
                                        //    srcimg = "images/stat/index_" + src + "_img_error.png";
                                        //}
                                    else if (($routeParams.PlanID != null && $routeParams.PlanID != undefined || ($routeParams.PlanID == "undefined" && $routeParams.mapID == "undefined")) && ControlFlag) {
                                        if (PlanStateArray.length > 0) {
                                            for (var j = 0; j < PlanStateArray.length; j++) {
                                                if (data[i].DEVICE_ID == PlanStateArray[j].Device_ID) {
                                                    var src = GetNewState(data[i].DEVICE_TYPEID, data[i].DEVICE_DIRECTION, PlanStateArray[j].Control_Content);
                                                    srcimg = "images/stat/index_" + src + "_img.png";
                                                }
                                            }
                                        }
                                        if (srcimg == "") {
                                            srcimg = "images/stat/index_" + src + "_img_error.png";
                                        }
                                    }
                                    else if (!ControlFlag) {
                                        if (PlanStateArray.length > 0) {
                                            for (var j = 0; j < PlanStateArray.length; j++) {
                                                if (data[i].DEVICE_ID == PlanStateArray[j].Device_ID) {
                                                    var src = GetNewState(data[i].DEVICE_TYPEID, data[i].DEVICE_DIRECTION, PlanStateArray[j].Control_Content);
                                                    srcimg = "images/stat/index_" + src + "_img.png";
                                                }
                                            }
                                            if (srcimg == "") {
                                                if (data[i].CONNECT_STATE == "正常") {
                                                    srcimg = "images/stat/index_" + src + "_img.png";
                                                } else if (data[i].CONNECT_STATE != "正常") {
                                                    srcimg = "images/stat/index_" + src + "_img_error.png";
                                                }
                                            }
                                        } else {
                                            if (data[i].CONNECT_STATE == "正常") {
                                                srcimg = "images/stat/index_" + src + "_img.png";
                                            } else if (data[i].CONNECT_STATE != "正常") {
                                                srcimg = "images/stat/index_" + src + "_img_error.png";
                                            }
                                        }
                                    }
                                    img = $('<img id=' + data[i].DEVICE_ID + ' data-id=device_' + id + ' data-json=' + JSON.stringify(data[i]) + ' src=' + srcimg + ' style="position: absolute; cursor: move; z-index: 0; left: ' + data[i].COORDINATES_X + 'px; top: ' + data[i].COORDINATES_Y + 'px;"/>');
                                }
                                $('#highwayBox').append(img);
                                controlLayer.addEl(img);
                                deleteDevice(img, true);
                            }
                        }
                    }
                }
            })
        }
        //预案选择设备状态
        function GetNewState(DEVICE_TYPEID, DEVICE_DIRECTION, DATA) {
            var src = "";
            switch (DEVICE_TYPEID) {
                case 48: src = "01"; break;
                case 18: src = "02"; break;
                case 17: src = "03"; break;
                case 20: src = "04"; break;
                case 43: src = "05"; break;
                case 29: if (DEVICE_DIRECTION == "川口到大河家") {
                    switch (DATA) {
                        case "正向通行": src = "06"; break;
                        case "反向通行": src = "19"; break;
                        case "双向禁行": src = "20"; break;
                        case "关闭": src = "21"; break;
                    }
                } else {
                    switch (DATA) {
                        case "正向通行": src = "19"; break;
                        case "反向通行": src = "06"; break;
                        case "双向禁行": src = "20"; break;
                        case "关闭": src = "21"; break;
                    }
                } break;
                case 30: if (DEVICE_DIRECTION == "川口到大河家") {
                    switch (DATA) {
                        case "正向通行": src = "06"; break;
                        case "反向通行": src = "19"; break;
                        case "双向禁行": src = "20"; break;
                        case "关闭": src = "21"; break;
                        case "正向左转": src = "23"; break;
                        case "反向左转": src = "22"; break;
                    }
                } else {
                    switch (DATA) {
                        case "正向通行": src = "19"; break;
                        case "反向通行": src = "06"; break;
                        case "双向禁行": src = "20"; break;
                        case "关闭": src = "21"; break;
                        case "正向左转": src = "31"; break;
                        case "反向左转": src = "32"; break;
                    }
                } break;
                case 21: src = "07"; break;
                case 22: src = "07"; break;
                case 24: src = "08"; break;
                case 26: if (DEVICE_DIRECTION == "大河家到川口") { src = "18"; } else { src = "09"; } break;
                case 45: if (DEVICE_DIRECTION == "川口到大河家") { src = "18"; } else { src = "09"; } break;
                case 16: src = "10"; break;
                case 25:
                    if (DEVICE_DIRECTION == "川口到大河家") {
                        switch (DATA) {
                            case "直行": src = "11"; break;
                            case "禁行": src = "24"; break;
                            case "警告": src = "25"; break;
                            case "左转": src = "26"; break;
                        }
                    } else {
                        switch (DATA) {
                            case "直行": src = "27"; break;
                            case "禁行": src = "28"; break;
                            case "警告": src = "29"; break;
                            case "左转": src = "30"; break;
                        }
                    } break;
                case 40: src = "12"; break;
                case 14: src = "14"; break;
                case 11: src = "15"; break;
                case 12: src = "15"; break;
                case 15: src = "16"; break;
                case 19: src = "17"; break;
                    //卷帘门
                //case 46: src = "33"; break;
            }
            return src;
        }
        //新增设备信息
        function ComiitPost() {
            //  alert(1);
            var json = {
                type: "add",
                //  DEVICE_TYPEID: $("#DEVICE_TYPEID_QBB").find("option:selected").val(),
                DEVICE_MODELID: $("#DEVICE_MODELID_QBB").find("option:selected").val(),
                DEVICE_ID: $("#DEVICE_ID_QBB").val(),
                DEVICE_NAME: $("#DEVICE_NAME_QBB").val(),
                AGENCIES_ID: GetQueryString("id"),
                ROADID: $("#ROADID_QBB").val(),
                COMPANY_NAME: $("#COMPANY_NAME_QBB").find("option:selected").text(),
                COMPANY_ID: $("#COMPANY_NAME_QBB").find("option:selected").val(),
                COORDINATES_X: DEVICE_X,
                COORDINATES_Y: DEVICE_Y,
                CMS_COLUMN: $("#CMS_COLUMN_QBB").find("option:selected").text(),
                CMS_ROW: $("#CMS_ROW_QBB").find("option:selected").text(),
                CMS_RESOLUTION: $("#CMS_RESOLUTION_QBB").find("option:selected").text(),
                // DEVICE_SERIAL: $("#DEVICE_SERIAL_QBB").val(),
                DEVICE_SERIAL: "tcp",
                //  DATA: "",
                NOTE: $("#NOTE_QBB").val(),
                DEVICE_STAKE: $("#DEVICE_STAKE_QBB").val(),
                DEVICE_LOCATION: $("#DEVICE_LOCATION_QBB").val(),
                DEVICE_DIRECTION: $("#DEVICE_Direction_QBB").val(),
                //  DEVICE_SERIALINFO: "9600,N,8,1",
                CONMMUNCATION_TYPE: $("#CONMMUNCATION_TYPE_QBB").val(),
                IP_ADDRESS: $("#IP_ADDRESS_QBB").val(),
                // IP_PORT: "8080",
                // DEVICE_FLAG: 1
            }
            if (IsHide) {
                json.DEVICE_TYPEID = $("#DEVICE_TYPEID_QBB").find("option:selected").val();
            } else {
                json.DEVICE_TYPEID = resulttypeid;
            }
            if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(json.IP_ADDRESS)) {
                swal("IP格式错误！");
                return;
            }
            if (json.DEVICE_ID != "") {
                json.type = "update";
            }
            $.post("/JTJK/Ashx/index.ashx", json, function (data) {
                swal(data);
            })
        }
        //获得地址栏参数
        function GetQueryString(id) {
            if ($routeParams.id != undefined) {
                return $routeParams.id;//首页进去
            }
            //else if (window.localStorage.id != undefined) {
            //    return window.localStorage.id;
            //}
            if ($routeParams.mapID != "undefined") {
                return $routeParams.mapID;
            }
            else {
                return "S307810000U0001";//执行预案
            }


        }
        $("#AGENCIES_TYPE").bind('change', function () {
            $("#highwayBox img").remove();
            $("#highwayBox").append("<img src='images/stat/" + $("#AGENCIES_TYPE").val() + ".jpg' class='highway_img'/>")
            showAllDevices($("#AGENCIES_TYPE").val());
        });
        $("#Plan_Writes").bind('click', function () {
            $("#highwayBoxWrap").attr('data-id', "ZX");
            $("#highwayBox img").remove();
            $("#highwayBox").append("<img src='images/stat/" + GetQueryString("id") + ".jpg' class='highway_img'/>")
            showAllDevices(GetQueryString("id"));
        })
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
            if (($routeParams.id != null && $routeParams.id.length > 0) || $routeParams.ControlID != undefined) {
                $.post("/JTJK/Ashx/index.ashx", jsonMessage, function (data) {
                    swal(data);
                })
            } else {
                var json = {
                    type: "PlanDeviceCtrlAdd",
                    DEVICE_ID: DEVICE_ID,
                    sendStr: jsonMessage.contentstr,
                    Note: CONMMUNCATION_TYPE
                }
                json.Plan_ID = $routeParams.PlanID == "undefined" ? $("#highwayBoxWrap").attr('data-id') : $routeParams.PlanID;
                $.ajax({
                    type: 'get',
                    url: '/JTJK/Ashx/index.ashx',
                    async: false,
                    data: json,
                    success: function (data) {
                        data = data == "true" ? "设备控制状态添加成功！" : "没有找到对应的预案信息,添加失败！";
                        swal({
                            title: data,
                            confirmButtonText: "确定",
                        }, function () {
                            $("#highwayBox img").remove();
                            $("#highwayBox").append("<img src='images/stat/" + $("#AGENCIES_TYPE").val() + ".jpg' class='highway_img'/>")
                            showAllDevices($("#AGENCIES_TYPE").val());
                        });
                    }
                })
            }
        }

        function DeviceControl() {
            var json = {
                type: "PlanDeviceCtrlAdd",
                DEVICE_ID: DEVICE_ID,
                sendStr: controlText,
                Note: CONMMUNCATION_TYPE
            }
            if (($routeParams.id != null && $routeParams.id.length > 0) || $routeParams.ControlID != undefined) {
                if (statecontrol == "本地") {
                    swal("当前控制模式为本地，中心不可控!");
                } else {
                    json.type = "devicecontrol";
                    $.ajax({
                        type: 'get',
                        url: '/JTJK/Ashx/index.ashx',
                        async: false,
                        data: json,
                        success: function (data) {
                            swal({
                                title: data,
                                confirmButtonText: "确定",
                            }, function () {
                                $("#highwayBox img").remove();
                                $("#highwayBox").append("<img src='images/stat/" + GetQueryString("id") + ".jpg' class='highway_img'/>")
                                showAllDevices(GetQueryString("id"));
                            });

                        }
                    })
                }
            } else {
                json.Plan_ID = $routeParams.PlanID == "undefined" ? $("#highwayBoxWrap").attr('data-id') : $routeParams.PlanID;
                $.ajax({
                    type: 'get',
                    url: '/JTJK/Ashx/index.ashx',
                    async: false,
                    data: json,
                    success: function (data) {
                        data = data == "true" ? "设备控制状态添加成功！" : "没有找到对应的预案信息,添加失败！";
                        swal({
                            title: data,
                            confirmButtonText: "确定",
                        }, function () {
                            $("#highwayBox img").remove();
                            $("#highwayBox").append("<img src='images/stat/" + $("#AGENCIES_TYPE").val() + ".jpg' class='highway_img'/>")
                            showAllDevices($("#AGENCIES_TYPE").val());
                        });
                    }
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
                fontsize: $("#edit-size").find("option:selected").val(),
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
            $.post("/JTJK/Ashx/index.ashx", jsonMessage, function (data) {
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
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: { type: "GetDEVICE_TYPE" },
                success: function (data) {
                    data = JSON.parse(data);
                    if (value.length > 2) {
                        IsHide = true;
                        $("#DEVICE_TYPEID_QBB").hide();
                        var valuearray = value.split(',');
                        for (var i = 0; i < valuearray.length; i++) {
                            for (var j = 0; j < data.length; j++) {
                                if (valuearray[i] == data[j].SYS_CODE) {
                                    $("#DEVICE_TYPEID_QBB_Select").append("<option value=" + valuearray[i] + ">" + data[j].SYS_NAME + "</option>")
                                }
                            }
                        }
                        GetCOMPANY_NAME("", valuearray[0]);
                    } else {
                        $("#DEVICE_TYPEID_QBB_Select").hide();
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].SYS_CODE == value) {
                                resulttypeid = value;
                                $("#DEVICE_TYPEID_QBB").val(data[i].SYS_NAME);
                            }
                        }
                    }
                }
            })
        }
        //获得设备型号信息
        function GetDeviceModel(COMPANYID, TypeID, ID) {
            var JsonMessage = {
                typeid: TypeID,
                conmpanyid: COMPANYID,
                type: "GetDeviceModelByTypeIDAndCompanyId"
            }
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: JsonMessage,
                success: function (data) {
                    $("#DEVICE_MODELID_QBB").find("option").remove();
                    data = JSON.parse(data);
                    for (var i = 0; i < data.length; i++) {
                        $("#DEVICE_MODELID_QBB").append("<option value=" + data[i].ID + ">" + data[i].DEVICE_MODEL + "</option>")
                    }
                    if (ID != "") {
                        $("#ROADID_QBB_QBB").val(ID);
                    }
                }
            })
        }
        //获取厂商信息
        function GetCOMPANY_NAME(COMPANYID, TypeID) {
            $("#COMPANY_NAME_QBB").find("option").remove();
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: { type: "GetCOMPANY_NAME", TypeID: TypeID },
                success: function (data) {
                    data = JSON.parse(data);
                    for (var i = 0; i < data.length; i++) {
                        $("#COMPANY_NAME_QBB").append("<option value=" + data[i].COMPANY_ID + ">" + data[i].COMPANY_NAME + "</option>")
                    }
                    if (COMPANYID != "") {
                        $("#COMPANY_NAME_QBB").val(COMPANYID);
                    }
                }
            })
        }
        //获取道路信息
        function GetDeveiceRoad(RoadID) {
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: { type: "GetRoadList" },
                success: function (data) {
                    data = JSON.parse(data);
                    $("#ROADID_QBB").append("<option value=" + data[0].RoadID + ">" + data[0].RoadName + "</option>")
                    if (RoadID != "") {
                        $("#ROADID_QBB").val(RoadID);
                    }
                }
            })
        }
        //获取方向
        function GetDirections(RoadDirectionName) {
            $.ajax({
                type: 'post',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: { type: "GetDirection", RoadID: RoadID },
                success: function (data) {
                    data = JSON.parse(data);
                    for (var i = 0; i < data.length; i++) {
                        $("#DEVICE_Direction_QBB").append("<option value=" + data[i].RoadDirectionName + ">" + data[i].RoadDirectionName + "</option>")
                    }
                    if (RoadDirectionName != "") {
                        $("#DEVICE_Direction_QBB").val(RoadID);
                    }
                }
            });
        }
        function DeleteCMSInfo(infoid, deviceid) {
            var returnMessage;
            $.ajax({
                type: 'post',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: { type: "DeleteCMSInfo", INFO_ID: infoid, DEVICE_ID: deviceid },
                success: function (data) {
                    returnMessage = data;
                }
            })
            return returnMessage;
        }
        function GetMessageStyle(obj) {
            var fontcolor, bgcolor, fontsize, fontfamiliy, showstyle;
            var JsonStyle = JSON.parse(obj.find('input.txt').attr("data-jsonm"));
            // console.log(JsonStyle);
            // var style = JSON.parse(JsonStyle).SHOW_CONTENT;
            //var stylearray = style.split("\\");
            //var styleshow = stylearray[0].split(',');

            //switch (stylearray[3].substr(1, stylearray[3].length)) {
            //    case "255000000000": fontcolor = "红色";
            //        break;
            //    case "000255000000": fontcolor = "绿色";
            //        break;
            //    case "000000255000": fontcolor = "蓝色";
            //        break;
            //    case "255255000000": fontcolor = "黄色";
            //        break;
            //    case "255000255000": fontcolor = "紫色";
            //        break;
            //    case "000255255000": fontcolor = "青色";
            //        break;
            //    case "000000000255": fontcolor = "琥珀色";
            //        break;
            //    case "000000000000": fontcolor = "黑色";
            //        break;
            //    default: fontcolor = "透明色";
            //        break;
            //}
            //switch (stylearray[4].substr(1, stylearray[4].length)) {
            //    case "255000000000": bgcolor = "红色";
            //        break;
            //    case "000255000000": bgcolor = "绿色";
            //        break;
            //    case "000000255000": bgcolor = "蓝色";
            //        break;
            //    case "255255000000": bgcolor = "黄色";
            //        break;
            //    case "255000255000": bgcolor = "紫色";
            //        break;
            //    case "000255255000": bgcolor = "青色";
            //        break;
            //    case "000000000255": bgcolor = "琥珀色";
            //        break;
            //    case "000000000000": bgcolor = "黑色";
            //        break;
            //    default: bgcolor = "透明色";
            //        break;
            //}
            //switch (stylearray[5].substr(1, 1)) {
            //    case "h": fontfamiliy = "黑体";
            //        break;
            //    case "k": fontfamiliy = "楷体";
            //        break;
            //    case "s": fontfamiliy = "宋体";
            //        break;
            //    case "f": fontfamiliy = "仿宋";
            //        break;
            //}
            //fontsize = stylearray[5].substr(2, 2);
            switch (JsonStyle.Show_Type) {
                case "清屏": JsonStyle.Show_Type = "清屏";
                    break;
                case "立即显示": JsonStyle.Show_Type = "立即显示";
                    break;
                case "上移": JsonStyle.Show_Type = "fadeInUp";
                    break;
                case "下移": JsonStyle.Show_Type = "fadeInDown";
                    break;
                case "左移": JsonStyle.Show_Type = "fadeInRight";
                    break;
                case "右移": JsonStyle.Show_Type = "fadeInLeft";
                    break;
            }
            $("#edit-bgcolor").val(JsonStyle.Background_Color);
            $("#edit-color").val(JsonStyle.Font_Color);
            $("#edit-size").val(JsonStyle.Font_Size);
            $("#edit-show").val(JsonStyle.Show_Type);
            $("#edit-type").val(JsonStyle.Show_Font);
            $("#edit-delay").val(JsonStyle.Show_Time);
            fontcolor = GetColor(JsonStyle.Font_Color);
            bgcolor = GetColor(JsonStyle.Background_Color);
            $("#info-txt").css('color', fontcolor);
            $("#info-txt").css('font-size', +(JsonStyle.Font_Size) * 1.5);
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
            var JsonMeassage = {
                type: "GroupWrites",
                agencyid: GetQueryString("id"),
                typeid: GroupControl,
                direction: $("#SelectDirection").find("option:selected").text(),
                sendStr: controlText
            };
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: JsonMeassage,
                success: function (data) {
                    swal(data);
                }
            })
        }
    })
    .controller('IndexPlanDevice', function ($scope, $routeParams, $route, $location, ComAjax) {
        var PlanID = "";
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/index.ashx',
            async: false,
            data: { type: "GetPlanDevieceByID", PlanID: $routeParams.PlanID },
            success: function (data) {
                $scope.data = JSON.parse(data);
                $scope.data.Event_Type = String($scope.data.Event_Type);
                $scope.data.Event_Level = String($scope.data.Event_Level);
                // console.log($scope.data);
            }
        })
        ComAjax.query($scope);
        //保存方法
        $scope.SaveReservePlan = function () {
            var JsonReservePlan = {
                Plan_Name: $("#Plan_Name").val(),
                RecoveryID: $("#RecoveryID").val(),
                AGENCIES_ID: $("#AGENCIES_TYPE").find("option:selected").val(),
                AutoRun: $("#AutoRun").find("option:selected").val(),
                RoadID: $("#RoadList").find("option:selected").val(),
                Device_Direction: $("#Direction").find("option:selected").text(),
                Event_Type: $("#Warningtype").find("option:selected").val(),
                Event_Level: $("#Warninglevel").find("option:selected").val(),
                Start_Stake: $("#Start_Stake").val(),
                End_Stake: $("#End_Stake").val(),
                Wind_Direction: $("#Wind_Direction").find("option:selected").text(),
                Plan_Details: $("#Plan_Details").val()
            }
            if ($routeParams.PlanID == "undefined" || $routeParams.PlanID == "") {
                JsonReservePlan.type = "AddReservePlan";
            } else {
                JsonReservePlan.type = "UpdateReservePlan";
                JsonReservePlan.Plan_ID = $routeParams.PlanID;
            }
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: JsonReservePlan,
                success: function (data) {
                    if (data == "请先登录！") {
                        swal({
                            title: data,
                            confirmButtonText: "ok",
                        }, function () {
                            location.href = "/JTJK/traffic/html_home/login.html";
                        });
                    } else {
                        if (data.indexOf('|') != -1) {
                            PlanID = data.split('|')[1];
                            $("#highwayBoxWrap").attr('data-id', PlanID);
                            swal(data.split('|')[0]);
                        } else {
                            swal(data);
                        }
                    }
                }
            })
        }
    })
    .controller('caseeditCtrl', function ($scope, ComAjax, SinglePagination, Pagination) {
        ComAjax.query($scope);
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
        var allData = null;
        $scope.MessageDeal = new Array();
        //获取所有道路
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/index.ashx',
            async: false,
            data: { type: "GetRoadList" },
            success: function (data) {
                $scope.RoadList = JSON.parse(data);
            }
        })
        $scope.GetList = function (Warningtype, Warninglevel, RoadID, AGENCIES_ID, DEVICE_ID, RoadDirectionName, Deal_Flag, StartTime, EndTime) {
            var JsonMessage = {
                type: "ALLAbnormalEvents",
                Warningtype: Warningtype,
                Warninglevel: Warninglevel,
                RoadID: RoadID,
                AGENCIES_ID: AGENCIES_ID,
                DEVICE_ID: DEVICE_ID,
                RoadDirectionName: RoadDirectionName,
                Deal_Flag: Deal_Flag,
                StartTime: StartTime,
                EndTime: EndTime
            }
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: JsonMessage,
                success: function (data) {
                    allData = JSON.parse(data);
                    sessionStorage.setItem("totalItems",allData.length)
                    for (var i = 0; i < allData.length; i++) {
                        allData[i].Event_Time = new Date(allData[i].Event_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                    }
                    $scope.data = Pagination.getDataArr(allData, 0, 5);
                    SinglePagination.query($scope, allData);
                }
            })
        }
        $scope.GetList();
        $scope.Deal = function (ALL) {
            var json = {
                type: "AbnormalEventDealFlagUpdate",
                IsALL: ALL,
            }
            if (ALL != "ALL") {
                json.DealArray = JSON.stringify($scope.MessageDeal);
            }
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: json,
                success: function (data) {
                    swal(data);
                    $scope.GetList();
                    // $scope.data.splice($scope.data.indexOf(d), 1);
                    $scope.$apply($scope.data);
                }
            })
        }
        $scope.AgenciesChange = function (AGENCIES_ID) {
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/index.ashx',
                async: false,
                data: { type: "AgenciesID", AgenciesID: AGENCIES_ID },
                success: function (data) {
                    $scope.DeviceList = JSON.parse(data);
                }
            })
        }
        $scope.Detail = function (id) {
            location.href = '#/WarningPage/' + id;
        }
        $scope.GetDeal = function (d) {
            $scope.MessageDeal.push({
                ID: d.ID,
                Deal_Flag: d.Deal_Flag
            })
        }
    })



