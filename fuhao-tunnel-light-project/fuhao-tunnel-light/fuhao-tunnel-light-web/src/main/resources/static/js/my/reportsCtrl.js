angular.module('starter.reportsCtrl', [])
 //΢�����챨��
    .controller('vedetstatement', function ($scope, DeviceType) {
        DeviceType.query($scope, "12", "GetMTDReport");
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
    //��ͨ
    .controller('trafficstatment', function ($scope, DeviceType) {
        DeviceType.query($scope, "44", "GetTSSReport");
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
    //����
    .controller('weatherstatement', function ($scope, DeviceType) {
        DeviceType.query($scope, "15", "GetWSDReport");
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
    //COVI
    .controller('covistatment', function ($scope, DeviceType) {
        DeviceType.query($scope, "40", "GetCOVIReport");
         $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
   //�ܼ��?
    .controller('restrictedstatment', function ($scope, DeviceType) {
        DeviceType.query($scope, "14", "GetVIReport");
         $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
   //��ǿ
    .controller('lightstatment', function ($scope, DeviceType) {
        DeviceType.query($scope, "26,45", "GetLOReport");
          $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
    //�¼�
    .controller('incidentstatement', function ($scope, DeviceType) {
        DeviceType.query($scope, "null", "GetEventReport");
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
    //΢��������ݲ��?
    .controller('vedetstatementsearch', function ($scope, DATASEARCH) {
        DATASEARCH.query($scope, "12", "MTD");
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
    //��ͨ
    .controller('trafficstatmentsearch', function ($scope, DATASEARCH) {
        DATASEARCH.query($scope, "44", "TSS");
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
    //����
    .controller('weatherstatementsearch', function ($scope, DATASEARCH) {
        DATASEARCH.query($scope, "15", "WSD");
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
    //COVI
    .controller('covistatmentsearch', function ($scope, DATASEARCH) {
        DATASEARCH.query($scope, "40", "COVI");
         $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
   //�ܼ��?
    .controller('restrictedstatmentsearch', function ($scope, DATASEARCH) {
        DATASEARCH.query($scope, "14", "VI");
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
   //��ǿ
    .controller('lightstatmentsearch', function ($scope, DATASEARCH) {
        DATASEARCH.query($scope, "26,45", "LI");
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })
    //�¼�
    .controller('incidentstatementsearch', function ($scope, Pagination, SinglePagination) {
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
        $scope.GetList = function (EventType, EventLevel,dealFlag, reportTimeStart, reportTimeEnd) {
            var allData = null;
            var JsonMessage = {
                type: "Event",
                EventType: EventType,
                EventLevel: EventLevel,
                dealFlag:dealFlag,
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
                    sessionStorage.setItem("totalItems",allData.length);
                    for (var i = 0; i < allData.length; i++) {
                        allData[i].Event_Time = new Date(allData[i].Event_Time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
                    }
                    $scope.data = Pagination.getDataArr(allData, 0, 10);
                    SinglePagination.query($scope, allData);
                }
            })
        }
        $scope.GetList();
     //   DATASEARCH.query($scope, "null", "Event");
        $('#datetimepicker').datetimepicker();
        $('#datetimepicker2').datetimepicker();
    })


