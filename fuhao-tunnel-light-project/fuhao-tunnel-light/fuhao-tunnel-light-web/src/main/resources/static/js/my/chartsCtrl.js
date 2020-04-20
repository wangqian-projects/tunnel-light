angular.module('starter.chartsCtrl', [])
    .controller('distrigraphCtrl', function ($scope, LineCharts, ChartsShow) {
        ChartsShow.query($scope, "12");
        $scope.GetlistShow = function (Device_ID) {
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/ReportChart.ashx',
                async: false,
                data: { type: "ShowCharts", Data_Type: "微波车", Device_ID: Device_ID },
                success: function (data) {
                    $scope.XDataCarTop = new Array();
                    $scope.YDataCarTop = new Array();
                    $scope.XDataSpeedTop = new Array();
                    $scope.YDataSpeedTop = new Array();
                    $scope.XDataCarDown = new Array();
                    $scope.YDataCarDown = new Array();
                    $scope.XDataSpeedDown = new Array();
                    $scope.YDataSpeedDown = new Array();
                    $scope.GetList = JSON.parse(data);
                    for (var i = 0; i < $scope.GetList.ListCarTop.length; i++) {
                        $scope.GetList.ListCarTop[i].record_time = $scope.GetList.ListCarTop[i].record_time.split('T')[1].substr(0, 5);
                        $scope.XDataCarTop.push($scope.GetList.ListCarTop[i].record_time);
                        $scope.YDataCarTop.push($scope.GetList.ListCarTop[i].record_value);
                    }
                    for (var i = 0; i < $scope.GetList.ListSpeedTop.length; i++) {
                        $scope.GetList.ListSpeedTop[i].record_time = $scope.GetList.ListSpeedTop[i].record_time.split('T')[1].substr(0, 5);
                        $scope.XDataSpeedTop.push($scope.GetList.ListSpeedTop[i].record_time);
                        $scope.YDataSpeedTop.push($scope.GetList.ListSpeedTop[i].record_value);
                    }
                    for (var i = 0; i < $scope.GetList.ListCarDown.length; i++) {
                        $scope.GetList.ListCarDown[i].record_time = $scope.GetList.ListCarDown[i].record_time.split('T')[1].substr(0, 5);
                        $scope.XDataCarDown.push($scope.GetList.ListCarDown[i].record_time);
                        $scope.YDataCarDown.push($scope.GetList.ListCarDown[i].record_value);
                    }
                    for (var i = 0; i < $scope.GetList.ListSpeedDown.length; i++) {
                        $scope.GetList.ListSpeedDown[i].record_time = $scope.GetList.ListSpeedDown[i].record_time.split('T')[1].substr(0, 5);
                        $scope.XDataSpeedDown.push($scope.GetList.ListSpeedDown[i].record_time);
                        $scope.YDataSpeedDown.push($scope.GetList.ListSpeedDown[i].record_value);
                    }
                    var carFlow = {
                        id: 'carFlow',
                        title: '川口至大河家车流量分析',
                        xName: '时间',
                        yName: '辆/H',
                        xData: $scope.XDataCarTop,
                        yData: $scope.YDataCarTop
                    };
                    LineCharts.create(carFlow);
                    var carSpeed = {
                        id: 'carSpeed',
                        title: '川口至大河家车速分析',
                        xName: '时间',
                        yName: '辆/H',
                        xData: $scope.XDataSpeedTop,
                        yData: $scope.YDataSpeedTop
                    };
                    LineCharts.create(carSpeed);
                    var carFlow2 = {
                        id: 'carFlow2',
                        title: '大河家到川口车流量分析',
                        xName: '时间',
                        yName: '辆/H',
                        xData: $scope.XDataCarDown,
                        yData: $scope.YDataCarDown
                    };
                    LineCharts.create(carFlow2);
                    var carSpeed2 = {
                        id: 'carSpeed2',
                        title: '大河家到川口车速分析',
                        xName: '时间',
                        yName: '辆/H',
                        xData: $scope.XDataSpeedDown,
                        yData: $scope.YDataSpeedDown
                    };
                    LineCharts.create(carSpeed2);
                }

            })
        }
        // $scope.GetlistShow($scope.GetDeviceName[0].DEVICE_ID);
        $scope.GetlistShow("VD000001");

    })
 .controller('stationgraph', function ($scope, LineCharts, ChartsShow) {
     ChartsShow.query($scope, "44");
     $scope.GetlistShow = function (Device_ID) {
         $.ajax({
             type: 'get',
             url: '/JTJK/Ashx/ReportChart.ashx',
             async: false,
             data: { type: "ShowCharts", Data_Type: "交调站", Device_ID: Device_ID },
             success: function (data) {
                 $scope.GetList = JSON.parse(data);
                 $scope.XDataCarTop = new Array();
                 $scope.YDataCarTop = new Array();
                 $scope.XDataSpeedTop = new Array();
                 $scope.YDataSpeedTop = new Array();
                 $scope.XDataCarDown = new Array();
                 $scope.YDataCarDown = new Array();
                 $scope.XDataSpeedDown = new Array();
                 $scope.YDataSpeedDown = new Array();
                 for (var i = 0; i < $scope.GetList.ListCarTop.length; i++) {
                     $scope.GetList.ListCarTop[i].record_time = $scope.GetList.ListCarTop[i].record_time.split('T')[1].substr(0, 5);
                     $scope.XDataCarTop.push($scope.GetList.ListCarTop[i].record_time);
                     $scope.YDataCarTop.push($scope.GetList.ListCarTop[i].record_value);
                 }
                 for (var i = 0; i < $scope.GetList.ListSpeedTop.length; i++) {
                     $scope.GetList.ListSpeedTop[i].record_time = $scope.GetList.ListSpeedTop[i].record_time.split('T')[1].substr(0, 5);
                     $scope.XDataSpeedTop.push($scope.GetList.ListSpeedTop[i].record_time);
                     $scope.YDataSpeedTop.push($scope.GetList.ListSpeedTop[i].record_value);
                 }
                 for (var i = 0; i < $scope.GetList.ListCarDown.length; i++) {
                     $scope.GetList.ListCarDown[i].record_time = $scope.GetList.ListCarDown[i].record_time.split('T')[1].substr(0, 5);
                     $scope.XDataCarDown.push($scope.GetList.ListCarDown[i].record_time);
                     $scope.YDataCarDown.push($scope.GetList.ListCarDown[i].record_value);
                 }
                 for (var i = 0; i < $scope.GetList.ListSpeedDown.length; i++) {
                     $scope.GetList.ListSpeedDown[i].record_time = $scope.GetList.ListSpeedDown[i].record_time.split('T')[1].substr(0, 5);
                     $scope.XDataSpeedDown.push($scope.GetList.ListSpeedDown[i].record_time);
                     $scope.YDataSpeedDown.push($scope.GetList.ListSpeedDown[i].record_value);
                 }
                 var carFlow = {
                     id: 'carFlow',
                     title: '川口至大河家车流量分析',
                     xName: '时间',
                     yName: '辆/H',
                     xData: $scope.XDataCarTop,
                     yData: $scope.YDataCarTop
                 };
                 LineCharts.create(carFlow);
                 var carSpeed = {
                     id: 'carSpeed',
                     title: '川口至大河家车速分析',
                     xName: '时间',
                     yName: '辆/H',
                     xData: $scope.XDataSpeedTop,
                     yData: $scope.YDataSpeedTop
                 };
                 LineCharts.create(carSpeed);
                 var carFlow2 = {
                     id: 'carFlow2',
                     title: '大河家到川口车流量分析',
                     xName: '时间',
                     yName: '辆/H',
                     xData: $scope.XDataCarDown,
                     yData: $scope.YDataCarDown
                 };
                 LineCharts.create(carFlow2);
                 var carSpeed2 = {
                     id: 'carSpeed2',
                     title: '大河家到川口车速分析',
                     xName: '时间',
                     yName: '辆/H',
                     xData: $scope.XDataSpeedDown,
                     yData: $scope.YDataSpeedDown
                 };
                 LineCharts.create(carSpeed2);
             }

         })
     }
     $scope.GetlistShow($scope.GetDeviceName[0].Device_ID);

 })

.controller('weathergraph', function ($scope, LineCharts, ChartsShow) {
    ChartsShow.query($scope, "15");
    $scope.GetlistShow = function (Device_ID) {
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/ReportChart.ashx',
            async: false,
            data: { type: "ShowCharts", Data_Type: "气象", Device_ID: Device_ID },
            success: function (data) {
                $scope.GetList = JSON.parse(data);
                $scope.XDataRain = new Array();
                $scope.YDataRain = new Array();
                $scope.XDataSee = new Array();
                $scope.YDataSee = new Array();
                $scope.XDataCode = new Array();
                $scope.YDataCode = new Array();
                $scope.XDataRoadCode = new Array();
                $scope.YDataRoadCode = new Array();
                $scope.XDataSpeed = new Array();
                $scope.YDataSpeed = new Array();
                $scope.XDataWater = new Array();
                $scope.YDataWater = new Array();
                for (var i = 0; i < $scope.GetList.ListRain.length; i++) {
                    $scope.GetList.ListRain[i].record_time = $scope.GetList.ListRain[i].record_time.split('T')[1].substr(0, 5);
                    $scope.XDataRain.push($scope.GetList.ListRain[i].record_time);
                    $scope.YDataRain.push($scope.GetList.ListRain[i].record_value);
                }
                for (var i = 0; i < $scope.GetList.ListSee.length; i++) {
                    $scope.GetList.ListSee[i].record_time = $scope.GetList.ListSee[i].record_time.split('T')[1].substr(0, 5);
                    $scope.XDataSee.push($scope.GetList.ListSee[i].record_time);
                    $scope.YDataSee.push($scope.GetList.ListSee[i].record_value);
                }
                for (var i = 0; i < $scope.GetList.ListCode.length; i++) {
                    $scope.GetList.ListCode[i].record_time = $scope.GetList.ListCode[i].record_time.split('T')[1].substr(0, 5);
                    $scope.XDataCode.push($scope.GetList.ListCode[i].record_time);
                    $scope.YDataCode.push($scope.GetList.ListCode[i].record_value);
                }
                for (var i = 0; i < $scope.GetList.ListRoadCode.length; i++) {
                    $scope.GetList.ListRoadCode[i].record_time = $scope.GetList.ListRoadCode[i].record_time.split('T')[1].substr(0, 5);
                    $scope.XDataRoadCode.push($scope.GetList.ListRoadCode[i].record_time);
                    $scope.YDataRoadCode.push($scope.GetList.ListRoadCode[i].record_value);
                }
                for (var i = 0; i < $scope.GetList.ListSpeed.length; i++) {
                    $scope.GetList.ListSpeed[i].record_time = $scope.GetList.ListSpeed[i].record_time.split('T')[1].substr(0, 5);
                    $scope.XDataSpeed.push($scope.GetList.ListSpeed[i].record_time);
                    $scope.YDataSpeed.push($scope.GetList.ListSpeed[i].record_value);
                }
                for (var i = 0; i < $scope.GetList.ListWater.length; i++) {
                    $scope.GetList.ListWater[i].record_time = $scope.GetList.ListWater[i].record_time.split('T')[1].substr(0, 5);
                    $scope.XDataWater.push($scope.GetList.ListWater[i].record_time);
                    $scope.YDataWater.push($scope.GetList.ListWater[i].record_value);
                }
                var Rain = {
                    id: 'Rain',
                    title: '雨量曲线图',
                    xName: '时间',
                    yName: 'ML/H',
                    xData: $scope.XDataRain,
                    yData: $scope.YDataRain
                };
                LineCharts.create(Rain);
                var See = {
                    id: 'See',
                    title: '能见度曲线图',
                    xName: '时间',
                    yName: 'M/H',
                    xData: $scope.XDataSee,
                    yData: $scope.YDataSee
                };
                LineCharts.create(See);
                var Code = {
                    id: 'Code',
                    title: '大气温度曲线图',
                    xName: '时间',
                    yName: '°C/H',
                    xData: $scope.XDataCode,
                    yData: $scope.YDataCode
                };
                LineCharts.create(Code);
                var RoadCode = {
                    id: 'RoadCode',
                    title: '地表温度曲线图',
                    xName: '时间',
                    yName: '°C/H',
                    xData: $scope.XDataRoadCode,
                    yData: $scope.YDataRoadCode
                };
                LineCharts.create(RoadCode);
                var Speed = {
                    id: 'Speed',
                    title: '风速曲线图',
                    xName: '时间',
                    yName: 'M/H',
                    xData: $scope.XDataSpeed,
                    yData: $scope.YDataSpeed
                };
                LineCharts.create(Speed);
                var Water = {
                    id: 'Water',
                    title: '湿度曲线图',
                    xName: '时间',
                    yName: 'ML/H',
                    xData: $scope.XDataWater,
                    yData: $scope.YDataWater
                };
                LineCharts.create(Water);
            }
        })
    }
    $scope.GetlistShow($scope.GetDeviceName[0].DEVICE_ID);

})
.controller('covigraph', function ($scope, LineCharts, ChartsShow) {
    ChartsShow.query($scope, "40");
    $scope.GetlistShow = function (Device_ID) {
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/ReportChart.ashx',
            async: false,
            data: { type: "ShowCharts", Data_Type: "COVI", Device_ID: Device_ID },
            success: function (data) {
                $scope.GetList = JSON.parse(data);
                $scope.XDataCO = new Array();
                $scope.YDataCO = new Array();
                $scope.XDataVI = new Array();
                $scope.YDataVI = new Array();
                for (var i = 0; i < $scope.GetList.ListCO.length; i++) {
                    $scope.GetList.ListCO[i].record_time = $scope.GetList.ListCO[i].record_time.split('T')[1].substr(0, 5);
                    $scope.XDataCO.push($scope.GetList.ListCO[i].record_time);
                    $scope.YDataCO.push($scope.GetList.ListCO[i].record_value);
                }
                for (var i = 0; i < $scope.GetList.ListVI.length; i++) {
                    $scope.GetList.ListVI[i].record_time = $scope.GetList.ListVI[i].record_time.split('T')[1].substr(0, 5);
                    $scope.XDataVI.push($scope.GetList.ListVI[i].record_time);
                    $scope.YDataVI.push($scope.GetList.ListVI[i].record_value);
                }
                var CO = {
                    id: 'CO',
                    title: '一氧化碳曲线图',
                    xName: '时间',
                    yName: 'PPM/H',
                    xData: $scope.XDataCO,
                    yData: $scope.YDataCO
                };
                LineCharts.create(CO);
                var VI = {
                    id: 'VI',
                    title: '能见度曲线图',
                    xName: '时间',
                    yName: 'M/H',
                    xData: $scope.XDataVI,
                    yData: $scope.YDataVI
                };
                LineCharts.create(VI);
            }
        })
    }
    $scope.GetlistShow($scope.GetDeviceName[0].DEVICE_ID);

})
.controller('visibilitygraph', function ($scope, LineCharts, ChartsShow) {
    ChartsShow.query($scope, "14");
    $scope.GetlistShow = function (Device_ID) {
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/ReportChart.ashx',
            async: false,
            data: { type: "ShowCharts", Data_Type: "能见度", Device_ID: Device_ID },
            success: function (data) {
                $scope.ListSaw = JSON.parse(data);
                $scope.XDataSaw = new Array();
                $scope.YDataSaw = new Array();
                for (var i = 0; i < $scope.ListSaw.length; i++) {
                    $scope.ListSaw[i].record_time = $scope.ListSaw[i].record_time.split('T')[1].substr(0, 5);
                    $scope.XDataSaw.push($scope.ListSaw[i].record_time);
                    $scope.YDataSaw.push($scope.ListSaw[i].record_value);
                }
                var Saw = {
                    id: 'Saw',
                    title: '能见度曲线图',
                    xName: '时间',
                    yName: 'M/H',
                    xData: $scope.XDataSaw,
                    yData: $scope.YDataSaw
                };
                LineCharts.create(Saw);
            }
        })
    }
    $scope.GetlistShow($scope.GetDeviceName[0].DEVICE_ID);

})
.controller('lightgraph', function ($scope, LineCharts, ChartsShow) {
    ChartsShow.query($scope, "26,45");
    $scope.GetlistShow = function (Device_ID) {
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/ReportChart.ashx',
            async: false,
            data: { type: "ShowCharts", Data_Type: "光强", Device_ID: Device_ID },
            success: function (data) {
                $scope.ListLight = JSON.parse(data);
                $scope.XDataLight = new Array();
                $scope.YDataLight = new Array();
                for (var i = 0; i < $scope.ListLight.length; i++) {
                    $scope.ListLight[i].record_time = $scope.ListLight[i].record_time.split('T')[1].substr(0, 5);
                    $scope.XDataSaw.push($scope.ListLight[i].record_time);
                    $scope.YDataSaw.push($scope.ListLight[i].record_value);
                }
                var Light = {
                    id: 'Light',
                    title: '光强曲线图',
                    xName: '时间',
                    yName: 'M/H',
                    xData: $scope.XDataLight,
                    yData: $scope.YDataLight
                };
                LineCharts.create(Light);
            }
        })
    }
    $scope.GetlistShow($scope.GetDeviceName[0].DEVICE_ID);

})
.controller('windgraph', function ($scope, LineCharts, ChartsShow) {
    ChartsShow.query($scope, "16");
    $scope.GetlistShow = function (Device_ID) {
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/ReportChart.ashx',
            async: false,
            data: { type: "ShowCharts", Data_Type: "光强", Device_ID: Device_ID },
            success: function (data) {
                $scope.ListWind = JSON.parse(data);
                $scope.XDataWind = new Array();
                $scope.YDataWind = new Array();
                for (var i = 0; i < $scope.ListLight.length; i++) {
                    $scope.ListWind[i].record_time = $scope.ListWind[i].record_time.split('T')[1].substr(0, 5);
                    $scope.XDataWind.push($scope.ListWind[i].record_time);
                    $scope.YDataWind.push($scope.ListWind[i].record_value);
                }
                var Wind = {
                    id: 'Wind',
                    title: '风速风向曲线图',
                    xName: '时间',
                    yName: 'M/S',
                    xData: $scope.XDataWind,
                    yData: $scope.YDataWind
                };
                LineCharts.create(Wind);
            }
        })
    }
    $scope.GetlistShow($scope.GetDeviceName[0].DEVICE_ID);

})