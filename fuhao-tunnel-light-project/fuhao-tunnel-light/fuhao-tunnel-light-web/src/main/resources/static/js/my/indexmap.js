$(function () {
    $.get("/Ashx/index.ashx", { type: "map" }, function (data) {
        if (data == "请先登录！") {
            swal({
                title: data,                
                confirmButtonText: "ok",              
            }, function () {
                location.href = "/traffic/html_home/login.html";
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
                $("#map_test").append("<a class='" + classmap + "' title='" + data[i]["AGENCIES_NAME"] + "' style='top:" + data[i]["COORDINATE_X"] + "px;left:" + COORDINATE_Y + "px;' href='index_er.html?id=" + data[i]["AGENCIES_ID"] + "'></a>");
            }
        }
    });
});

