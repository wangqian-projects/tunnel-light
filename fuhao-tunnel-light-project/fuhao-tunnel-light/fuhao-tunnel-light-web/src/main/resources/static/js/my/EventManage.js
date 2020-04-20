angular.module('starter.EventManage', [])
   .controller('infoentry', function ($scope, $routeParams, ComAjax) {
       $scope.EventInfo = {};
       //控制只读
       if ($routeParams.typeid == "2") {
           $scope.type = true;
           $("select ").attr("disabled", "disabled");
       } else {
           $scope.type = false;
       }
       var date = new Date();
       var seperator1 = "-";
       $scope.EventInfo.Report_Time1 = date.getFullYear() + seperator1 + ((+date.getMonth()) + 1) + seperator1 + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();       
       if ($routeParams.id != null && $routeParams.id != "null") {
           $.ajax({
               type: 'get',
               url: '/JTJK/Ashx/EventMange.ashx',
               async: false,
               data: { type: "Search", EventID: $routeParams.id },
               success: function (data) {
                   $scope.EventInfo = JSON.parse(data);
                   $scope.EventInfo.Start_Time = new Date($scope.EventInfo.Start_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                   $scope.EventInfo.End_Time = new Date($scope.EventInfo.End_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                   $scope.EventInfo.Report_Time1 = new Date($scope.EventInfo.Report_Time1).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                   $scope.EventInfo.Wound_Num =String($scope.EventInfo.Wound_Num);
                   $scope.EventInfo.Dead_Num = String($scope.EventInfo.Dead_Num);
                   $scope.EventInfo.DamageCar_Num = String($scope.EventInfo.DamageCar_Num);
               }
           });
       }
       $.ajax({
           type: 'get',
           url: '/JTJK/Ashx/EventMange.ashx',
           async: false,
           data: { type: "GetCookie" },
           success: function (data) {
               $scope.GetUserMessage = JSON.parse(data);
           }
       });
       $scope.EventTypeList = new Array();
       $scope.EventStateList = new Array();
       $scope.EventCarList = new Array();
       $scope.EventMessageList = new Array();
       $scope.EventTypesList = new Array();
       ComAjax.query($scope);
       $.ajax({
           type: 'get',
           url: '/JTJK/Ashx/EventMange.ashx',
           async: false,
           data: { type: "GetSysCodeByTypeCode" },
           success: function (data) {
               data = JSON.parse(data);
               for (var i = 0; i < data.length; i++) {
                   switch (data[i].TYPE_CODE) {
                       case 7:
                           $scope.EventTypeList.push(data[i]);
                           break;
                       case 8:
                           $scope.EventStateList.push(data[i]);
                           break;
                       case 9:
                           $scope.EventCarList.push(data[i]);
                           break;
                       case 10:
                           $scope.EventMessageList.push(data[i]);
                           break;
                       case 11:
                           $scope.EventTypesList.push(data[i]);
                           break;
                   }
               }
           }
       })
       $scope.SaveMessage = function () {
           $scope.EventInfo.Reserved1 = $scope.GetUserMessage.UserName;
           $scope.EventInfo.Report_Man1 = $scope.GetUserMessage.UserID;
           var type = "EventADD";
           if ($routeParams.id != null && $routeParams.id != "null") {
               type = "Update";
           }
           $.ajax({
               type: 'get',
               url: '/JTJK/Ashx/EventMange.ashx',
               async: false,
               data: { type: type, EventInfo: JSON.stringify($scope.EventInfo) },
               success: function (data) {
                   swal(data);
               }
           })
       }
       $('#datetimepicker').datetimepicker();
       $('#datetimepicker2').datetimepicker();
       $('#datetimepicker3').datetimepicker();
   })
   .controller('infomaintain', function ($scope, ComAjax) {
       ComAjax.query($scope);
       $scope.EventTypeList = new Array();
       $scope.EventStateList = new Array();
       $scope.EventCarList = new Array();
       $scope.EventMessageList = new Array();
       $scope.EventTypesList = new Array();
       $.ajax({
           type: 'get',
           url: '/JTJK/Ashx/EventMange.ashx',
           async: false,
           data: { type: "GetSysCodeByTypeCode" },
           success: function (data) {
               data = JSON.parse(data);
               for (var i = 0; i < data.length; i++) {
                   switch (data[i].TYPE_CODE) {
                       case 7:
                           $scope.EventTypeList.push(data[i]);
                           break;
                       case 8:
                           $scope.EventStateList.push(data[i]);
                           break;
                       case 9:
                           $scope.EventCarList.push(data[i]);
                           break;
                       case 10:
                           $scope.EventMessageList.push(data[i]);
                           break;
                       case 11:
                           $scope.EventTypesList.push(data[i]);
                           break;
                   }
               }
           }
       })
       $scope.GetList = function (Road_ID, Event_Type, Start_Time, End_Time) {
           var EventInfo = {
               type: "GetEventList",
               Road_ID: Road_ID,
               Event_Type: Event_Type,
               Start_Time: Start_Time,
               End_Time: End_Time
           }
           $.ajax({
               type: 'get',
               url: '/JTJK/Ashx/EventMange.ashx',
               async: false,
               data: EventInfo,
               success: function (data) {
                   $scope.List = JSON.parse(data);
                   for (var i = 0; i < $scope.List.length; i++) {
                       $scope.List[i].Start_Time = new Date($scope.List[i].Start_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                       $scope.List[i].End_Time = new Date($scope.List[i].End_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                       $scope.List[i].Report_Time1 = new Date($scope.List[i].Report_Time1).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                   }
               }
           })
       }
       $scope.GetList();
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
                          $.ajax({
                              type: 'get',
                              url: '/JTJK/Ashx/EventMange.ashx',
                              async: false,
                              data: { type: "Delete", EventID: d.EventID },
                              success: function (data) {
                                  if (data == "true" || data == "True") {
                                      swal("该事件已被删除！", "", "success");
                                      $scope.List.splice($scope.List.indexOf(d), 1);
                                      $scope.$apply($scope.List);
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
       $scope.Search = function (id) {
           location.href = "#/infoentry/" + id + "/" + 2 + "";
       }
       $scope.Update = function (id) {
           location.href = "#/infoentry/" + id + "/" + 1 + "";
       }
       $('#datetimepicker').datetimepicker();
       $('#datetimepicker2').datetimepicker();

   })
    .controller('exceptionhand', function ($scope, ComAjax) {
        $scope.EventTypeList = new Array();
        $scope.EventStateList = new Array();
        $scope.EventCarList = new Array();
        $scope.EventMessageList = new Array();
        $scope.EventTypesList = new Array();
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/EventMange.ashx',
            async: false,
            data: { type: "GetSysCodeByTypeCode" },
            success: function (data) {
                data = JSON.parse(data);
                for (var i = 0; i < data.length; i++) {
                    switch (data[i].TYPE_CODE) {
                        case 7:
                            $scope.EventTypeList.push(data[i]);
                            break;
                        case 8:
                            $scope.EventStateList.push(data[i]);
                            break;
                        case 9:
                            $scope.EventCarList.push(data[i]);
                            break;
                        case 10:
                            $scope.EventMessageList.push(data[i]);
                            break;
                        case 11:
                            $scope.EventTypesList.push(data[i]);
                            break;
                    }
                }
            }
        })
    })

