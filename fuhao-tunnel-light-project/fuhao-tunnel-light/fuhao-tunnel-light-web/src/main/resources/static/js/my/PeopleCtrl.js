angular.module('starter.PeopleCtrl', [])
    .controller('peoplemanagement', function ($scope, SinglePagination, Pagination) {
        var allData = null;
        $scope.UserList = {};
        $scope.GetList = function (UserName) {
            var JsonMessage = {
                type: "SelectUser",
                Uname: UserName
            };
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/Login.ashx',
                async: false,
                data: JsonMessage,
                success: function (data) {
                    allData = JSON.parse(data);
                    sessionStorage.setItem("totalItems",allData.length);
                    $scope.data = Pagination.getDataArr(allData, 0, 5);
                    SinglePagination.query($scope, allData);
                }
            })
        }
        $scope.GetList();
        $scope.AddUsers = function () {
            location.href = "/JTJK/traffic/html_home/register.html";
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
                               type: "DeleteUser",
                               ID: d.ID
                           };
                           $.ajax({
                               type: 'get',
                               url: '/JTJK/Ashx/Login.ashx',
                               async: false,
                               data: JsonMessage,
                               success: function (data) {
                                   if (data == "true" || data == "True") {
                                       swal("该用户已被删除！", "", "success");
                                       $scope.data.splice($scope.data.indexOf(d), 1);
                                       //console.log($scope.UserList);
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
        $scope.Update = function (ID) {
            location.href = '#/ManagePeople/' + ID;
        }
    })
    .controller('ManagePeople', function ($scope, $routeParams) {
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/Login.ashx',
            async: false,
            data: { type: "GetPower" },
            success: function (data) {
                $scope.PowerNameList = JSON.parse(data);
            }
        })
        var JsonMessage = {
            type: "GetOneUserMessage",
            ID: $routeParams.ID
        };
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/Login.ashx',
            async: false,
            data: JsonMessage,
            success: function (data) {
                $scope.UserList = JSON.parse(data)[0];
            }
        })
        $.ajax({
            type: 'get',
            url: '/JTJK/Ashx/index.ashx',
            async: false,
            data: { type: "GetAgenciesList" },
            success: function (data) {
                $scope.AgenciesList = JSON.parse(data);
            }
        })
        if ($scope.UserList.UseAgencies != null && $scope.UserList.UseAgencies != "") {
            $scope.UseAgenciesArray = $scope.UserList.UseAgencies.split(',');
        } else {
            $scope.UserList.UseAgencies = "";
        }
        $scope.Update = function () {
            for (var i = 0; i < $scope.PowerNameList.length; i++) {
                if ($scope.UserList.PowerID == $scope.PowerNameList[i].ID) {
                    $scope.UserList.PowerName = $scope.PowerNameList[i].PowerName;
                }
            }
            for (var i = 0; i < $scope.selected.length; i++) {
                $scope.UserList.UseAgencies += $scope.selected[i] + ",";
            }
            $.ajax({
                type: 'get',
                url: '/JTJK/Ashx/Login.ashx',
                async: false,
                data: { type: "UpdateUser", data: JSON.stringify($scope.UserList) },
                success: function (data) {
                    swal(data);
                }
            })
        }
        $scope.selected = [];
        $scope.selectedTags = [];
        $scope.updateSelection = function ($event, id) {
            var checkbox = $event.target;
            var action = (checkbox.checked ? 'add' : 'remove');
            updateSelected(action, id, checkbox.name);
        }
        var updateSelected = function (action, id, name) {
            if (action == 'add' && $scope.selected.indexOf(id) == -1) {
                $scope.selected.push(id);
                $scope.selectedTags.push(name);
            }
            if (action == 'remove') {
                var UseAgenciesid = "";
                for (var i = 0; i < $scope.UseAgenciesArray.length; i++) {
                    if ($scope.UseAgenciesArray[i] != id) {
                        UseAgenciesid += $scope.UseAgenciesArray[i] + ",";
                    }
                }
                UseAgenciesid = UseAgenciesid.substr(0, UseAgenciesid.length - 1);
                $scope.UserList.UseAgencies = UseAgenciesid;
                var idx = $scope.selected.indexOf(id);
                $scope.selected.splice(idx, 1);
                $scope.selectedTags.splice(idx, 1);
            }
        }
        $scope.VideoWatch = function () {
            location.href = "/JTJK/traffic/html_home/view/VideoWatch.html";
        }
        //$scope.AllAgencies = function () {
        //    $.ajax({
        //        type: 'get',
        //        url: '/JTJK/Ashx/index.ashx',
        //        async: false,
        //        data: { type: "GetAgenciesList" },
        //        success: function (data) {
        //            $scope.AgenciesList = JSON.parse(data);
        //            var UseAgenciesArray = $scope.UserList.UseAgencies.split(',');
        //            for (var i = 0; i < UseAgenciesArray.length; i++) {
        //                $("#" + UseAgenciesArray[i]).checked = true;
        //            }
        //        }
        //    })
        //}
    })