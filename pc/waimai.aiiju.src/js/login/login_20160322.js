/**
 * 打开财务版注册页面
 * @returns {undefined}
 */

function open_register() {
    window.open(system_url + 'home_login/login?do=register');//打开注册页面 
}

/**
 * 打开财务版找回密码页面
 * @returns {undefined}
 */
function open_findPassword() {
    window.open(system_url + 'find_password');
}
/**
 * 回车事件
 * @param {type} event
 * @returns {Boolean}
 */
function press_button(event) {
    if (event.keyCode !== 13) {
        return true;
    }
    console.log('keyup')
    $(".input_box input").blur();
    submitCheck();
}

function isExitsVariable(variableName) {
    try {
        if (typeof (variableName) == "undefined") {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * 登陆注册按钮点击验证表单
 * @returns {Boolean}
 */
function submitCheck() {
    console.log(1)
    var inputBox = $(".input_box");
    var loginBox = $(".login_new_box");
    var btnSubmit = loginBox.find(".submit_btn");
    var display = $('#register_new').css('display');
    var source = $("#source").val();
    inputBox.removeClass("dangrous");
    if (display != 'none') {
        var inputPwd = $('.pwd_password');
        var inputUserName = $('.cell_name');
        var inputShopName = 'test';
        setCookie('phone', inputUserName.val());
    } else {
        var inputPwd = loginBox.find("#pwd");
        var inputUserName = loginBox.find("#user_name");
        var inputShopName = loginBox.find("#shop_name");
        if (inputShopName.val() == '') {
//            inputShopName.next().html("店铺名不能为空！");
            inputShopName.parent().addClass("dangrous");
            return false;
        }
        if (inputPwd.val().length < 6) {
            inputPwd.next().html("用户名或密码错误！");
            inputPwd.parent().addClass("dangrous");
            return false;
        }

        setCookie('shop_name', inputShopName.val());
        setCookie('user_name', inputUserName.val());
    }
    if (inputUserName.val() == '') {
        inputUserName.parent().addClass("dangrous");
        return false;
    } else if (inputPwd.val() == '') {
        inputPwd.parent().addClass("dangrous");
        return false;
    }
    if (inputPwd.val().length < 6) {
        inputPwd.next().html("用户名或密码错误！");
        inputPwd.parent().addClass("dangrous");
        return false;
    }

    //判断是登陆按钮还是注册按钮，分别执行登陆验证或注册验证
    if (!isExitsVariable(redirect)) {
        var redirect = GetQueryString("redirect");
    }
    
    if (btnSubmit.attr('id') == 'dsb_login_submit') {
        var display = $('#register_new').css('display');
        if (display != 'none') {
            var login_parm = {'phone': $('.cell_name').val(), 'password': $('.pwd_password').val(), 'source': source, 'redirect': redirect};
        } else {
            var login_parm = {'shop_name': inputShopName.val(), 'user_name': inputUserName.val(), 'password': inputPwd.val(), 'source': source, 'redirect': redirect};
        }
        var url = "https://appscrm.aiiju.com/api/login.json";
        common_ajax(url, login_parm, 'do_register_suc');
    } else {
        var parm = {'shop_name': inputShopName.val(), 'user_name': inputUserName.val(), 'password': inputPwd.val(), 'phone': '', 'email': '', 'source': source, 'redirect': redirect};
        show_tip('正在执行注册验证，请稍等...');
        common_ajax("home_login_opers/register", parm, 'do_register_suc');
    }

    //密码错误3次不能登录
//    if (window.localStorage.getItem("errNum") == null) {
//        window.localStorage.setItem("errNum", "0");
//    }
//    var errNum = window.localStorage.getItem("errNum");
//    errNum++;
//    window.localStorage.setItem("errNum", errNum);
//    if (errNum == 3) {
//        window.localStorage.setItem("errNum", "0");
//        show_err_msg(null, '<p class="err_name">登录失败<span>密码已输错3次，休息1分钟或<em onclick="open_findPassword()">忘记密码</em></span></p>');
//        $(".submit_btn").attr("disabled", true);
////        document.getElementsByClassName("submit_btn").disabled = true;
//        setTimeout(function () {
//            $(".submit_btn").removeAttr("disabled");
////            document.getElementsByClassName("submit_btn").disabled = false;
//        }, 60000);
//    }
}

function do_register_suc(obj) {
    close_tip();
    if (!obj.result) {
        if (obj.message == 'mul') {
            show_err_msg(null, '存在多个账号绑定，请用公司名+账号+密码登录！')
            $('#register_old').css('display', 'none');
            $('#register_new').css('display', 'block');
            return;
        }
        var display = $('#register_old').css('display');
        if (display == 'block') {
            $("#register_old #user_name").next().html('用户名或密码错误！');
            $("#register_old #user_name").parent().addClass("dangrous");
        } else {
            $("#register_new #user_name").next().html('用户名或密码错误！');
            $("#register_new #user_name").parent().addClass("dangrous");
        }
        if (obj.message == 'timeOut') {
            show_err_msg(null, '<p class="err_name">登录失败<span>密码已输入错5次，休息1分钟吧或<em onclick="open_findPassword()">忘记密码</em></span></p>');
        }
        return false;
    }

    var callbackurl = GetQueryString("callbackurl");
    if (callbackurl != '' && callbackurl != undefined) {
        window.location.href = obj.redirect + '&callbackurl=' + escape(callbackurl);
        return;
    }

    var sign = GetQueryString("sign");
    var index = GetQueryString('index');

    if (sign == "crmRst" || sign == "crmVip") {
        window.location.href = obj.redirect + '&source=' + sign;
        return;
    }
    if (sign == "buy") {
        window.location.href = obj.redirect + '&source=' + sign + '&index=' + index;
        return;
    }
    if (obj.message == 'oa_login') {
        window.location.href = obj.redirect;
        return;
    }
    window.location.href = '/dsb/';
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return  unescape(r[2]);
    return '';
}

/**
 * 新旧登录界面切换
 * @author xiaoke
 * @param {type} a
 * @returns {undefined}
 */
function showBtn(a) {
    $("#dsb_login_submit").css({"background": "rgba(255, 255, 255, 0.29)", "cursor": "auto"});
    $(".tips").empty();
    if (a == 1) {
        $("#change_btn").addClass("active");
        $("#change_btn2").removeClass("active");
        $("#register_old").hide();
        $("#register_new").show();
        btn_focus();
    } else {
        $("#change_btn2").addClass("active");
        $("#change_btn").removeClass("active");
        $("#register_old").show();
        $("#register_new").hide();
        btn_focus();
    }
}



/**
 * 判断是否是IE浏览器，解决透明度问题
 * @returns {undefined}
 */
function getExplorer() {
    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("MSIE") >= 0) {
        $(".login_new_box .inputs_box input").css({
            "height": "18px",
            "min-height": "18px"
        });
        $(".login_new_box").addClass("ie_style");
        $(".find_pwd").css("color", "#fff");
        $(".regist_link").css("color", "#fff");
        $(".change_btn")
    }
}

/**
 *登陆错误提示
 *@author xiaotu
 *obj:input框对象，msg：错误内容
 */
function show_err_msg(obj, msg) {
    art.dialog({
        title: false,
        content: msg,
        width: 308,
        time: 2000,
        ok: function () {
            if (obj && obj != '')
                $(obj).focus();
            this.close()
        }

    });
}

