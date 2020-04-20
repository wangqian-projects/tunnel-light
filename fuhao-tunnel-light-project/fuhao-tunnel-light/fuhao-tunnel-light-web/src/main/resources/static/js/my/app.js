var app = angular.module('starter', ['ngRoute', 'starter.controllers', 'starter.services', 'starter.reportsCtrl', 'starter.chartsCtrl', 'starter.PeopleCtrl', 'tm.pagination', 'starter.EventManage']);
app.config(function ($routeProvider) {
    // console.log(isShowTopProvider);
    $routeProvider.
    when('/index/:id', {
        templateUrl: 'view/index.html',
        controller: 'IndexController'
    }).
    when('/indexMap', {
        templateUrl: 'view/indexMap.html',
        controller: 'IndexMapCtrl'
    }).
    when('/caseedit', {
        templateUrl: 'view/caseedit.html',
        controller: 'caseeditCtrl'
    }).
    when('/casesearchresult', {
        templateUrl: 'view/casesearchresult.html',
        controller: 'IndexCasesearchresult'
    }).
    when('/VideoWatch/:Event_Stake/:RoadID', {
        templateUrl: 'view/VideoWatch.html',
        controller: 'VideoWatch'
    }).
    when('/caseinfosearch', {
        templateUrl: 'view/caseinfosearch.html'
        //                        controller: 'AboutController'
    }).
    //=====================统计报表 start==================//
    when('/reports/logsearch', {
        templateUrl: 'view/reports/logsearch.html',
        controller: 'logsearch'
    }).
    when('/reports/vedetstatementsearch', {
        templateUrl: 'view/reports/vedetstatementsearch.html',
        controller: 'vedetstatementsearch'
    }).
    when('/reports/trafficstatmentsearch', {
        templateUrl: 'view/reports/trafficstatmentsearch.html',
        controller: 'trafficstatmentsearch'
    }).
    when('/reports/covistatmentsearch', {
        templateUrl: 'view/reports/covistatmentsearch.html',
        controller: 'covistatmentsearch'
    }).
    when('/reports/weatherstatementsearch', {
        templateUrl: 'view/reports/weatherstatementsearch.html',
        controller: 'weatherstatementsearch'
    }).
    when('/reports/incidentstatementsearch', {
        templateUrl: 'view/reports/incidentstatementsearch.html',
        controller: 'incidentstatementsearch'
    }).
    when('/reports/restrictedstatmentsearch', {
        templateUrl: 'view/reports/restrictedstatmentsearch.html',
        controller: 'restrictedstatmentsearch'
    }).
    when('/reports/lightstatmentsearch', {
        templateUrl: 'view/reports/lightstatmentsearch.html',
        controller: 'lightstatmentsearch'
    }).
    when('/reports/vedetstatement', {
        templateUrl: 'view/reports/vedetstatement.html',
        controller: 'vedetstatement'
    }).
    when('/reports/trafficstatment', {
        templateUrl: 'view/reports/trafficstatment.html',
        controller: 'trafficstatment'
    }).
    when('/reports/weatherstatement', {
        templateUrl: 'view/reports/weatherstatement.html',
        controller: 'weatherstatement'
    }).
    when('/reports/incidentstatement', {
        templateUrl: 'view/reports/incidentstatement.html',
        controller: 'incidentstatement'
    }).
    when('/reports/analyzestatment', {
        templateUrl: 'view/reports/analyzestatment.html'
        //                        controller: 'AboutController'
    }).
    when('/reports/covistatment', {
        templateUrl: 'view/reports/covistatment.html',
        controller: 'covistatment'
    }).
    when('/reports/restrictedstatment', {
        templateUrl: 'view/reports/restrictedstatment.html',
        controller: 'restrictedstatment'
    }).
    when('/reports/lightstatment', {
        templateUrl: 'view/reports/lightstatment.html',
        controller: 'lightstatment'
    }).
    //=====================统计报表 end==================//
    //=====================图表展示 start==================//
    when('/charts/covigraph', {
        templateUrl: 'view/charts/covigraph.html',
        controller: 'covigraph'
    }).
    when('/charts/distrigraph', {
        templateUrl: 'view/charts/distrigraph.html',
        controller: 'distrigraphCtrl'
    }).
    when('/charts/lightgraph', {
        templateUrl: 'view/charts/lightgraph.html',
        controller: 'lightgraph'
    }).
    when('/charts/stationgraph', {
        templateUrl: 'view/charts/stationgraph.html',
        controller: 'stationgraph'
    }).
    when('/charts/visibilitygraph', {
        templateUrl: 'view/charts/visibilitygraph.html',
        controller: 'visibilitygraph'
    }).
    when('/charts/weathergraph', {
        templateUrl: 'view/charts/weathergraph.html',
        controller: 'weathergraph'
    }).
    when('/charts/windgraph', {
        templateUrl: 'view/charts/windgraph.html',
        controller: 'windgraph'
    }).
         //=====================信息管理 end==================//
     when('/infoentry/:id/:typeid', {
         templateUrl: 'view/infoentry.html',
         controller: 'infoentry'
     }).when('/infomaintain', {
         templateUrl: 'view/infomaintain.html',
         controller: 'infomaintain'
     }).when('/exceptionhand', {
         templateUrl: 'view/exceptionhand.html',
         controller: 'exceptionhand'
     }).

    //=====================图表展示 end==================//

    when('/peoplemanagement', {
        templateUrl: 'view/peoplemanagement.html',
        controller: 'peoplemanagement'
    }).
    when('/ManagePeople/:ID', {
        templateUrl: 'view/ManagePeople.html',
        controller: 'ManagePeople'
    }).
    when('/casesearchresultAdd/:PlanID/:mapID', {
        templateUrl: 'view/PlanDevice.html',
        controller: 'IndexController'
    }).
    when('/WarningPage/:id', {
        templateUrl: 'view/WarningPage.html',
        controller: 'IndexWarningPage'
    }).
    when('/PlanStart/:PlanID/:AbEvent_ID/:mapID/:ControlID', {
        templateUrl: 'view/PlanStart.html',
        controller: 'IndexController'
    }).
    when('/PlanLog/:ID', {
        templateUrl: 'view/PlanLog.html',
        controller: 'PlanLog'
    }).
    when('/IndexPlanLog', {
        templateUrl: 'view/IndexPlanLog.html',
        controller: 'IndexPlanLog'
    }).
    when('/IndexDeviceLog/:EXID/:mapID', {
        templateUrl: 'view/IndexDeviceLog.html',
        controller: 'IndexController'
    }).
    otherwise({
        redirectTo: ''
    });

})



