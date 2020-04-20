angular.module('starter.services', [])
    .factory('HttpPost', function ($http, $q) {
        return {
            query: function (type, config, url) {
                var deferred = $q.defer(); // �����Ӻ�ִ�У���ʾҪȥ��غ����ִ��
                $http({
                    method: type,
                    // url: '/changeSpace/lbbspace/public/'+url,
                    url: '/' + url,
                    data: config
                }).success(function (data, status, headers, config) {
                    deferred.resolve(data);  // ����ִ�гɹ�����http�������ݳɹ������Է���������
                }).error(function (data, status, headers, config) {
                    deferred.reject(data);   // ����ִ��ʧ�ܣ������������ش���
                });
                return deferred.promise;   // ���س�ŵ�����ﲢ�����������ݣ����Ƿ����������ݵ�API
            }
        }
    })
    .factory('ComAjax', function () {
        return {
            query: function ($scope) {
                //所属机构
                $.ajax({
                    type: 'get',
                    url: '/JTJK/Ashx/index.ashx',
                    async: false,
                    data: { type: "map" },
                    success: function (data) {
                        $scope.Agencies = JSON.parse(data);
                    }
                })
                //所属道路
                $.ajax({
                    type: 'get',
                    url: '/JTJK/Ashx/index.ashx',
                    async: false,
                    data: { type: "GetRoadList" },
                    success: function (data) {
                        $scope.RoadList = JSON.parse(data);
                    }
                })
                //获取警告类型和警告级别
                $.ajax({
                    type: 'get',
                    url: '/JTJK/Ashx/index.ashx',
                    async: false,
                    data: { type: "GetCode" },
                    success: function (data) {
                        $scope.WarningType = JSON.parse(data).WarningType;
                        $scope.WarningLevel = JSON.parse(data).WarningLevel;
                    }
                })
                //预案方向
                $.ajax({
                    type: 'get',
                    url: '/JTJK/Ashx/index.ashx',
                    async: false,
                    data: { type: "GetDirection", RoadID: $scope.RoadList[0].RoadID },
                    success: function (data) {
                        $scope.RoadDirection = JSON.parse(data);
                    }
                })
            }

        }

    })
    //转换时间
    .factory('ChangeDateTime', function (dateTime) {
        var date = new Date(parseInt(dateTime.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + min;
    })
    .factory('LineCharts', function () {
        var fac = {};
        fac.create = function (opt) {
            var id = opt.id;
            var title = opt.title;
            var xName = opt.xName;
            var yName = opt.yName;
            var xData = opt.xData;
            var yData = opt.yData;
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(id));
            var option = {
                title: {
                    text: title,
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    show: false
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData,
                    name: xName
                },
                yAxis: {
                    type: 'value',
                    name: yName
                },
                series: [{
                    type: 'line',
                    data: yData,
                    name: yName,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        };
        return fac;
    })
    .factory('DeviceType', function (Pagination, IndexPage) {
        return {
            query: function ($scope, device_typeid, reporttype) {
                if (device_typeid != "null") {
                    $.ajax({
                        type: 'get',
                        url: '/JTJK/Ashx/ReportForm.ashx',
                        async: false,
                        data: { type: "GetInfosByAgenciesIdAndTypeId", Device_TypeID: device_typeid },
                        success: function (data) {
                            $scope.DeviceList = JSON.parse(data);
                        }
                    })
                }
                $scope.GetList = function (deviceid, reportTimeStart, reportTimeEnd) {
                    if (deviceid != "" & deviceid != undefined) {
                        for (var i = 0; i < $scope.DeviceList.length; i++) {
                            if (deviceid == $scope.DeviceList[i].DEVICE_ID) {
                                $scope.DEVICENAME = $scope.DeviceList[i].DEVICE_NAME;
                            }
                        }
                    }
                    if (reportTimeStart != "" && reportTimeStart != undefined && reportTimeEnd != "" && reportTimeEnd != undefined) {
                        $scope.Times = reportTimeStart + "至" + reportTimeEnd;
                    }
                    var date = new Date();
                    var seperator1 = "-";
                    $scope.NowTime = date.getFullYear() + seperator1 + ((+date.getMonth()) + 1) + seperator1 + date.getDate();
                    var allData = null;
                    $scope.ReportList = {};
                    $scope.ReportList.ListinfoDay = [];
                    $scope.ReportList.ListinfoMonth = [];
                    $scope.ReportList.ListinfoYear = [];
                    var JsonMessage = {
                        type: "GetJson",
                        funtype: reporttype,
                        deviceid: deviceid,
                        reportTimeStart: reportTimeStart,
                        reportTimeEnd: reportTimeEnd
                    };
                    $.ajax({
                        type: 'get',
                        url: '/JTJK/Ashx/ReportForm.ashx',
                        async: false,
                        data: JsonMessage,
                        success: function (data) {
                            allData = JSON.parse(data);
                            $scope.type = "Reports";
                            $scope.ReportList.UserName = allData.UserName;
                            IndexPage.query($scope, allData);
                        }
                    })
                }
                $scope.GetList();
                $scope.times = [{ name: '日' }, { name: '月' }, { name: '年' }];
                $scope.nowPage = 0;
                $scope.tabTime = function ($index) {
                    $scope.nowPage = $index;
                    //  console.log($index);
                }
                $scope.ExcelOut = function (ReportList, StartTime, EndTime, Title) {
                    var JsonMessage = {
                        type: reporttype,
                        List: JSON.stringify(ReportList),
                        UserName: $scope.ReportList.UserName,
                        StartTime: StartTime,
                        EndTime: EndTime,
                        Title: Title
                    }
                    $.ajax({
                        type: 'get',
                        url: '/JTJK/Ashx/ExcelExport.ashx',
                        async: false,
                        data: JsonMessage,
                        success: function (data) {
                            location.href = "/JTJK/UpFiles/ExcelFiles/" + data;
                        }
                    })
                }
                $scope.OpenPrintPage = function (Title, Type, DEVICEID, StartTime, EndTime, PrintType) {
                    switch (PrintType) {
                        case "GetMTDReport":
                            window.open("/JTJK/traffic/html_home/view/reports/PrintPage.html?Title=" + Title + "&Type=" + Type + "&DEVICEID=" + DEVICEID + "&StartTime=" + StartTime + "&EndTime=" + EndTime + "");
                            break;
                        case "GetTSSReport":
                            window.open("/JTJK/traffic/html_home/view/reports/PrintPageTSS.html?Title=" + Title + "&Type=" + Type + "&DEVICEID=" + DEVICEID + "&StartTime=" + StartTime + "&EndTime=" + EndTime + "");
                            break;
                        case "GetWSDReport":
                            window.open("/JTJK/traffic/html_home/view/reports/PrintPageWSD.html?Title=" + Title + "&Type=" + Type + "&DEVICEID=" + DEVICEID + "&StartTime=" + StartTime + "&EndTime=" + EndTime + "");
                            break;
                        case "GetCOVIReport":
                            window.open("/JTJK/traffic/html_home/view/reports/PrintPageCOVI.html?Title=" + Title + "&Type=" + Type + "&DEVICEID=" + DEVICEID + "&StartTime=" + StartTime + "&EndTime=" + EndTime + "");
                            break;
                        case "GetVIReport":
                            window.open("/JTJK/traffic/html_home/view/reports/PrintPageVI.html?Title=" + Title + "&Type=" + Type + "&DEVICEID=" + DEVICEID + "&StartTime=" + StartTime + "&EndTime=" + EndTime + "");
                            break;
                        case "GetLOReport":
                            window.open("/JTJK/traffic/html_home/view/reports/PrintPageLO.html?Title=" + Title + "&Type=" + Type + "&DEVICEID=" + DEVICEID + "&StartTime=" + StartTime + "&EndTime=" + EndTime + "");
                            break;
                        case "GetEventReport":
                            window.open("/JTJK/traffic/html_home/view/reports/PrintPageEvent.html?Title=" + Title + "&Type=" + Type + "&DEVICEID=" + DEVICEID + "&StartTime=" + StartTime + "&EndTime=" + EndTime + "");
                            break;
                    }
                }
            }
        };
    })
    .factory('ChartsShow', function () {
        return {
            query: function ($scope, deviceType) {
                $.ajax({
                    type: 'get',
                    url: '/JTJK/Ashx/ReportChart.ashx',
                    async: false,
                    data: { type: "GetInfosByAgenciesIdAndTypeId", Device_TypeID: deviceType },
                    success: function (data) {
                        $scope.GetDeviceName = JSON.parse(data);
                    }
                })
            }
        };
    })
    .factory('DATASEARCH', function (Pagination, SinglePagination) {
        return {            
            query: function ($scope, device_typeid, reporttype) {                
                if (device_typeid != "null") {
                    $.ajax({
                        type: 'get',
                        url: '/JTJK/Ashx/ReportForm.ashx',
                        async: false,
                        data: { type: "GetInfosByAgenciesIdAndTypeId", Device_TypeID: device_typeid },
                        success: function (data) {
                            $scope.DeviceList = JSON.parse(data);
                            if ($scope.DeviceList.length > 0) {
                                $scope.DEVICEID = $scope.DeviceList[0].DEVICE_ID;
                            }
                        }
                    })
                }
                $scope.GetList = function (deviceid, reportTimeStart, reportTimeEnd) {
                    var allData = null;
                    var JsonMessage = {
                        type: reporttype,
                        deviceid: deviceid,
                        StartTime: reportTimeStart,
                        EndTime: reportTimeEnd
                    };
                    $.ajax({
                        type: 'get',
                        url: '/JTJK/Ashx/DataSearch.ashx',
                        async: false,
                        data: JsonMessage,
                        success: function (data) {
                            allData = JSON.parse(data);
                            for (var i = 0; i < allData.length; i++) {
                                allData[i].Update_Time = new Date(allData[i].Update_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                            }
                            $scope.data = Pagination.getDataArr(allData, 0, 4);
                            SinglePagination.query($scope, allData);
                        }
                    })
                }
                if ($scope.DeviceList != undefined) {
                    if ($scope.DeviceList.length > 0) {
                        $scope.GetList($scope.DeviceList[0].DEVICE_ID);
                    }                    
                }
                
            }
        };
    })
    .factory('Pagination', function () {
        return {
            getDataArr: function (arr, page, pageSize) {
                var res = [];
                for (var i = 0; i < arr.length; i++) {
                    res[i] = arr[i];
                }
                var startIndex;
                startIndex = page * pageSize;
                res = res.splice(startIndex, pageSize);
                return res;
            }
        };
    })
    .factory('SinglePagination', function (Pagination) {
        return {
            query: function ($scope, allData) {
                var Pagesize = 4;
                $scope.paginationConf = {
                    currentPage: 1,
                    totalItems: allData.length,//数据总数
                    itemsPerPage: Pagesize,//每页条数
                    onChange: function () {
                        var p = $scope.paginationConf.currentPage;
                        //console.log(p+"aaa");
                        $scope.data = Pagination.getDataArr(allData, p - 1, Pagesize);
                    }
                };
                $scope.$watch('paginationConf.currentPage', function (news) {
                    var p = $scope.paginationConf.currentPage;
                    //console.log(p+"KKK");
                    $scope.data = Pagination.getDataArr(allData, p - 1, Pagesize);
                })
            }
        };
    })
    .factory('IndexPage', function (Pagination) {
        return {
            query: function ($scope, allData) {
                var Pagesize = 4;
                $scope.paginationConf = {
                    currentPage: 1,
                    totalItems: allData.length,//数据总数
                    itemsPerPage: Pagesize,//每页条数
                    onChange: function () {
                        var p = $scope.paginationConf.currentPage;
                        // alert(2);
                        $scope.data = Pagination.getDataArr(allData, p - 1, Pagesize);
                    }
                };
                $scope.paginationConfDay = {
                    currentPage: 1,
                    totalItems: allData.ListinfoDay.length,//数据总数
                    itemsPerPage: Pagesize,//每页条数
                    onChange: function () {
                        var p = $scope.paginationConfDay.currentPage;
                        $scope.ReportList.ListinfoDay = Pagination.getDataArr(allData.ListinfoDay, p - 1, Pagesize);
                        for (var i = 0; i < $scope.ReportList.ListinfoDay.length; i++) {
                            $scope.ReportList.ListinfoDay[i].Report_Time = new Date($scope.ReportList.ListinfoDay[i].Report_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                        }
                    }
                };
                $scope.paginationConfMonth = {
                    currentPage: 1,
                    totalItems: allData.ListinfoMonth.length,//数据总数
                    itemsPerPage: Pagesize,//每页条数
                    onChange: function () {
                        var p = $scope.paginationConfMonth.currentPage;
                        $scope.ReportList.ListinfoMonth = Pagination.getDataArr(allData.ListinfoMonth, p - 1, Pagesize);
                        for (var i = 0; i < $scope.ReportList.ListinfoMonth.length; i++) {
                            $scope.ReportList.ListinfoMonth[i].Report_Time = new Date($scope.ReportList.ListinfoMonth[i].Report_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                        }
                    }
                };
                $scope.paginationConfYear = {
                    currentPage: 1,
                    totalItems: allData.ListinfoYear.length,//数据总数
                    itemsPerPage: Pagesize,//每页条数
                    onChange: function () {
                        var p = $scope.paginationConfYear.currentPage;
                        $scope.ReportList.ListinfoYear = Pagination.getDataArr(allData.ListinfoYear, p - 1, Pagesize);
                        for (var i = 0; i < $scope.ReportList.ListinfoYear.length; i++) {
                            $scope.ReportList.ListinfoYear[i].Report_Time = new Date($scope.ReportList.ListinfoYear[i].Report_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                        }
                    }
                };
            }

        };
    })


