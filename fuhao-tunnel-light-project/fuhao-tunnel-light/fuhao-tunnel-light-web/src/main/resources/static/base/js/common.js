/**
 * <p>Title: header</p>
 * <p>Description: header</p>
 * <p>Copyright: Copyright (c) 2018</p>
 *
 * @author fuhao
 * @date 2018-02-06
 * @version 1.0
 */
function getContextPath() {
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0, index + 1);
    return result;
}

$('.headerWrap').html('<header class="pure-g" id="header"> <div class="pure-u-1 pure-u-lg-4-24"> ' +
    '<div class="logo"><a href="' + getContextPath() + '"><img src="https://fuhao-projects.github.io/fuhao-tunnel-light/fuhao-tunnel-light-project/fuhao-tunnel-light/fuhao-tunnel-light-web/src/main/resources/static/base/imgs/tunnel-light-logo.svg" class="pure-img" alt="" /></a>' +
    '</div> ' +
    '</div> <input type="checkbox" id="menu-toggle-cb"> ' +
    '<label id="menu-toggle" for="menu-toggle-cb" onclick><s class="bar"></s><s class="bar"></s><s class="bar"></s></label> ' +
    '<div class="pure-u-1 pure-u-lg-20-24 box-relative menu-wrapper"> ' +
    '     <nav class="pure-menu pure-menu-horizontal menu-local"> ' +
    '         <ul class="pure-menu-list"> ' +
    '             <li class="pure-menu-item"><a href="' + getContextPath() + '" class="pure-menu-link">Home</a></li> ' +
    '             <li class="pure-menu-item"><a href="' + getContextPath() + '/articles/" class="pure-menu-link">Articles</a></li> ' +
    '             <li class="pure-menu-item"><a href="' + getContextPath() + '/projects/" class="pure-menu-link">Projects</a></li> ' +
    '             <li class="pure-menu-item"><a href="' + getContextPath() + '/about/" class="pure-menu-link">About</a></li> ' +
    '             <li class="pure-menu-item"><a href="' + getContextPath() + '/sponsor/" class="pure-menu-link">Sponsor</a></li> ' +
    '         </ul> ' +
    '     </nav> ' +
    '     <nav class="pure-menu pure-menu-horizontal menu-external"> ' +
    '         <ul class="pure-menu-list"> ' +
    '             <li class="pure-menu-item"><a href="https://fuhao-projects.github.io/fuhao-tunnel-light/fuhao-tunnel-light-project/fuhao-tunnel-light/fuhao-tunnel-light-web/src/main/resources/static/github_pages/page/walte-wiki.html" class="pure-menu-link">wiki</a></li> ' +
    '             <li class="pure-menu-item"><a href="https://github.com/fuhao-projects/fuhao-tunnel-light" class="pure-menu-link"><i class="fa fa-github"></i> github</a></li> ' +
    '             <li class="pure-menu-item"><a href="mailto:fuhao_live@163.com" class="pure-menu-link"><meta itemprop="email" content="fuhao_live@163.com"/>mail</a></li> ' +
    '             <li class="pure-menu-item"><a href="' + getContextPath() + '/' +
    '           main/page/friendly/000.html" class="pure-menu-link">author</a></li>              <li class="pure-menu-item"><a href=' + getContextPath() + '"main/page/friendly/000.html" class="pure-menu-link"><i class="fa fa-user-circle"></i> sign in</a></li> ' +
    '         </ul> ' +
    '     </nav> ' +
    ' </div> ' +
    ' </header>');

$('.footerWrap').html('<footer>© Copyright 2018 fuhao tunnel-light all rights reserved | <a href="' + getContextPath() + 'main/page/policy/privacy-policy.html">Privacy Policy</a></footer>');

//使元素为class="href-Invalid"的href失效
$(".href-invalid").click(function () {
    return false;
});


function httpPost(url, params) {
    var formTemp = document.createElement("form");
    formTemp.action = url;
    formTemp.method = "post";
    formTemp.style.display = "none";
    for (var x in params) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = params[x];
        formTemp.appendChild(opt);
    }
    document.body.appendChild(formTemp);
    formTemp.submit();
    return formTemp;
}

