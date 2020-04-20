function wrapper_lock() {
    $("#lock").bind("click", function () {
        $("#scrn_back").removeClass("dn");

        $("#lock_ok").bind("click", function () {
            var d = /^\w+$/;
            var pwd_name_val = $(".pwd_name").val();
            if (!(d.test(pwd_name_val))) {
                $("#text_ts").removeClass("dn");
            } else {
                $("#text_ts").addClass("dn");
                $("#text_ts1").removeClass("dn");
                $(".lock_colse").addClass("dn");
                $(".pwd_name").val("");
            }
        });
    });

    $(".lock_colse").bind("click", function () {
        $("#scrn_back").addClass("dn");
    });
}