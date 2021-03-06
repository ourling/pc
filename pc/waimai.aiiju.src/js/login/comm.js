function goos_td_resize(min_value) {
    var min_outer_table_width = min_value;
    var outer_table_width = parseInt($(".outer_table").css("width"));
    if (outer_table_width < min_outer_table_width) {
        $(".goods_title").css("width", "265px");
    } else {
        $(".goods_title").css("width", "auto");
    }
}
function trim(a) {
    return "undefined" == typeof a || null == a ? "" : a.replace(/(^\s*)|(\s*$)/g, "")
}
function is_url(a) {
    return null == a.match(/http:\/\/.+/) ? !1 : !0
}
function show_obj_error_msg(a) {
    get_by_id(a + "_msg").innerHTML = "输入值格式错误！", get_by_id(a).focus()
}
function show_error_msg(a) {
    alert(a)
}
function show_suc_msg(a) {
    alert(a)
}
function get_by_id(a) {
    var b = document.getElementById(a);
    return (null == b || 0 == b.length) && alert(a), b
}
function get_val_by_id(a) {
    var b = get_by_id(a);
    return b.value
}
function common_ajax(url, params, func) {
    url = url, $.ajax({
        type: "post", url: url, data: params, dataType: "text", success: function (data) {
            var obj, kuohao,url;
            null == data ? (show_error_msg("操作超时，请稍后重试！"), void 0) : (obj = data.indexOf("}") > 0 ? eval("(" + data + ")") : data, kuohao = func.indexOf("("), kuohao > 0 ? func = func.substring(0, kuohao + 1) + "obj," + func.substring(kuohao + 1) : func += "(obj)", eval(func))
            console.log(data);
            console.log(obj);
            console.log(kuohao);
            url = obj.data.login_domain;
            if(typeof url == 'undefined'){
                show_error_msg(obj.data)
            }else{
                window.location.href = obj.data.login_domain
            }
        }, error: function (data) {
            var obj;
            return null == data ? (show_error_msg("操作超时，请稍后重试！"), void 0) : (data.indexOf("}") > 0 ? (obj = eval("(" + data + ")"), obj = obj.message) : obj = data, alert(obj), void 0)
        }
    })
}
function common_check_params(base_check_json) {
    var check_method_str, i, type, check_boolean;
    for (base_check_json = eval(base_check_json), check_method_str = !0, i = 0; i < base_check_json.length; i++)
        type = base_check_json[i].name + "", check_boolean = deal_check_method(type, base_check_json[i].methods), 0 == check_boolean && (check_method_str = !1);
    return check_method_str
}
function deal_check_method(a, b) {
    var d, c = b.split("|");
    for (d = 0; d < c.length; d++)
        if ("unique" != c[d] || "verifycode" != c[d]) {
            if ("required" == c[d] && !check_required(a))
                return !1;
            if ("email" == c[d] && !check_email(a))
                return !1;
            if ("mail" == c[d] && !check_email(a))
                return !1;
            if ("int" == c[d] && !check_int(a))
                return !1;
            if ("password" == c[d] && !check_password(a))
                return !1;
            if ("normal" == c[d] && !check_normal(a))
                return !1;
            if ("phone" == c[d] && !check_phone(a))
                return !1;
            if ("mobile" == c[d] && !check_mobile(a))
                return !1;
            if (c[d].indexOf("checklen") != -1 && !check_len(c[d], a))
                return !1;
        }
    return !0
}
function common_bind_event(base_check_json, id, url) {
    var len, i, str, method, action;
    for (base_check_json = eval(base_check_json), len = base_check_json.length, i = 0; len > i; i++)
        str = base_check_json[i].name, method = base_check_json[i].methods, action = base_check_json[i].action, eval("$('#" + str + "').bind('" + action + "',function(){deal_bind_method('" + str + "','" + method + "','" + url + "/check_unique_" + str + "','" + id + "');})")
}
function deal_bind_method(a, b, c, d) {
    var f, e = b.split("|");
    for (f = 0; f < e.length; f++) {
        if ("required" == e[f] && !check_required(a))
            return !1;
        if ("email" == e[f] && !check_email(a))
            return !1;
        if ("mail" == e[f] && !check_email(a))
            return !1;
        if ("int" == e[f] && !check_int(a))
            return !1;
        if ("password" == e[f] && !check_password(a))
            return !1;
        if ("normal" == e[f] && !check_normal(a))
            return !1;
        if ("unique" == e[f] && !check_unique(a, c, d))
            return !1;
        if ("verifycode" == e[f] && !check_verifycode(a))
            return !1;
        if ("phone" == e[f] && !check_phone(a))
            return !1;
        if ("mobile" == e[f] && !check_mobile(a))
            return !1;
        if (e[f].indexOf("checklen") != -1 && !check_len(e[f], a))
            return !1;
    }
    return !0
}
function check_len(str, a) {
    var b = get_by_id(a);
    var c = AS.trim(b.value);
    var len_ary = str.split("_");
    var start = 0;
    var end = 0;
    if (len_ary[1].indexOf("-") < 0) {
        start = parseInt(len_ary[1]);
    } else {
        len_ary = len_ary[1].split("-");
        start = parseInt(len_ary[0]);
        end = parseInt(len_ary[1]);
    }
    var msg = '';
    if (start == 0 && end != 0) {
        msg = "小于" + end + "位";
    } else if (start != 0 && end == 0) {
        msg = "大于" + start + "位";
    } else if (start != 0 && end != 0) {
        msg = start + "-" + end + "位";
    }
    var real_len = c.length;
    if ((end != 0 && real_len > end) || (start != 0 && real_len < start)) {
        show_error(a, "密码长度必须" + msg + "！");
        return false;
    }
    show_succ(a, "");
    return true;
}
function common_map_params(base_check_json) {
    var map, i;
    for (base_check_json = eval(base_check_json), map = new Map, i = 0; i < base_check_json.length; i++)
        map.put(base_check_json[i].name, trim(get_val_by_id(base_check_json[i].name)));
    return map
}
function common_map2json(map) {
    var i, keys = map.keys(), json_str = "";
    for (i = 0; i < keys.length; i++)
        json_str += '"' + keys[i] + '":"' + map.get(keys[i]) + '",';
    return json_str = "{" + json_str + '"random":' + 1e4 * Math.random() + "}", eval("(" + json_str + ")")
}
function addFavorite(a, b) {
    try {
        window.external.addFavorite(a, b)
    } catch (c) {
        try {
            window.sidebar.addPanel(b, a, "")
        } catch (c) {
            alert("请按 Ctrl+D 键添加到收藏夹")
        }
    }
}
function goPage(a) {
    var c, b = trim(get_val_by_id("go_page"));
    !AS.isBlank(b) && AS.isNum(b) && (c = parseInt(b), c > a && (c = a), 1 > c && (c = 1), spiltPage(c))
}
function spiltPage(a) {
    get_by_id("cur_page").value = a, get_by_id("splitForm").submit();
    $('html, body', parent.document).animate({scrollTop: 0}, "1");
}
function change_order(a, b) {
    get_by_id("order").value = a, b = "desc" == b ? "asc" : "desc", get_by_id("sequence").value = b, get_by_id("splitForm").submit()
}
function validate_checkbox(a, b) {
    var d, e, c = !1;
    if (check_box = b || "res_check_box", a.checked && (c = !0), d = document.getElementsByName(check_box), !(d.length <= 0))
        for (e = 0; e < d.length; e++)
            d[e].checked = c
}
function check_verifycode(a) {
    var c, b = trim(get_val_by_id(a));
    return "" == b ? (show_error(a, "请输入验证码！"), void 0) : (show_wait(a, ""), c = {
            verifycode: b,
            random: 1e4 * Math.random()
        }, common_ajax("common_code", c, "check_verifycode_callback('" + a + "')"))
}
function check_verifycode_callback(a, b) {
    return a.result ? (show_succ(b, ""), !0) : (show_error(b, a.message), !1)
}
function check_unique(a, b, c) {
    var d = {unique: trim(get_val_by_id(a)), resId: c, random: 1e4 * Math.random()};
    return show_wait(a, ""), common_ajax(b, d, "check_unique_callback('" + a + "')")
}
function check_unique_callback(a, b) {
    return a.result ? (show_succ(b, ""), !0) : (show_error(b, a.message), !1)
}
function change_verify_code(a) {
    get_by_id(a).src = globle_url + "mkimg.php?" + 1e4 * Math.random()
}
function check_required(a) {
    var b = get_by_id(a), c = b.value;
    return "" == trim(c) ? (show_error(a, "输入不能为空！"), !1) : (show_succ(a, ""), !0)
}
function check_int(a) {
    var b, c;
    return "" == a ? !0 : (b = get_by_id(a), c = AS.trim(b.value), AS.isNum(c) ? (show_succ(a, ""), !0) : (show_error(a, "输入值不是数字！"), !1))
}
function check_phone(a) {
    var b, c;
    return "" == a ? !0 : (b = get_by_id(a), c = AS.trim(b.value), AS.isPhone(c) ? (show_succ(a, ""), !0) : (show_error(a, "输入值不是电话！"), !1))
}
function check_mobile(a) {
    var b, c;
    return "" == a ? !0 : (b = get_by_id(a), c = AS.trim(b.value), AS.isMobile(c) ? (show_succ(a, ""), !0) : (show_error(a, "输入值不是手机号码！"), !1))
}
function check_email(a) {
    return check_mail(a)
}
function check_mail(a) {
    var b, c;
    return "" == a ? !0 : (b = get_by_id(a), c = AS.trim(b.value), AS.isEmail(c) ? (show_succ(a, ""), !0) : (show_error(a, "输入值不是邮箱！"), !1))
}
function check_password(a) {
    var b, c, d;
    return "" == a ? !0 : (b = a.substring(0, a.length - 4), c = AS.trim(get_val_by_id(b)), d = AS.trim(get_val_by_id(a)), c != d ? (show_error(a, "两次输入不一致！"), !1) : c.length > 12 || c.length < 6 ? (show_error(a, "密码长度必须6-12位！"), !1) : (show_succ(a, ""), !0))
}
function check_normal(a) {
    return "" === a ? !0 : !0
}
function show_error(a, b) {
    get_by_id(a + "_msg").innerHTML = '<img src="' + static_url + '/img/pic22.gif" style="cursor:pointer" title="' + b + '" alt="' + b + '"/>'
}
function show_succ(a, b) {
    "" === b && (b = "验证通过。"), get_by_id(a + "_msg").innerHTML = '<img src="' + static_url + '/img/pic21.gif" style="cursor:pointer" title="' + b + '" alt="' + b + '"/>'
}
function show_wait(a, b) {
    "" === b && (b = "正在校验，请稍后。"), get_by_id(a + "_msg").innerHTML = '<img src="' + static_url + '/img/waiting.gif" style="cursor:pointer" title="' + b + '" alt="' + b + '"/>'
}
function Map() {
    this.elements = new Array, this.size = function () {
        return this.elements.length
    }, this.isEmpty = function () {
        return this.elements.length < 1
    }, this.clear = function () {
        this.elements = new Array
    }, this.put = function (a, b) {
        1 == this.containsKey(a) ? this.containsValue(b) ? 1 == this.remove(a) && this.elements.push({
                    key: a,
                    value: b
                }) : this.elements.push({key: a, value: b}) : this.elements.push({key: a, value: b})
    }, this.remove = function (a) {
        var c, b = !1;
        try {
            for (c = 0; c < this.elements.length; c++)
                if (this.elements[c].key == a)
                    return this.elements.splice(c, 1), !0
        } catch (d) {
            b = !1
        }
        return b
    }, this.get = function (a) {
        try {
            for (var b = 0; b < this.elements.length; b++)
                if (this.elements[b].key == a)
                    return this.elements[b].value
        } catch (c) {
            return null
        }
    }, this.element = function (a) {
        return 0 > a || a >= this.elements.length ? null : this.elements[a]
    }, this.containsKey = function (a) {
        var c, b = !1;
        try {
            for (c = 0; c < this.elements.length; c++)
                this.elements[c].key == a && (b = !0)
        } catch (d) {
            b = !1
        }
        return b
    }, this.containsValue = function (a) {
        var c, b = !1;
        try {
            for (c = 0; c < this.elements.length; c++)
                this.elements[c].value == a && (b = !0)
        } catch (d) {
            b = !1
        }
        return b
    }, this.keys = function () {
        var b, a = new Array;
        for (b = 0; b < this.elements.length; b++)
            a.push(this.elements[b].key);
        return a
    }, this.values = function () {
        var b, a = new Array;
        for (b = 0; b < this.elements.length; b++)
            a.push(this.elements[b].value);
        return a
    }
}
function input_note(a, b) {
    input_note_auto("", b, 2, "", 0)
}
function input_note_auto(a, b, c, d, e) {
    0 == b && (b = $("body").height() / 2);
    var f = ($("body").width() - Number($("#note_show").width())) / 2;
    $("#note_show").css({display: "block", left: f + "px", top: "-100px"}).animate({
        top: b + "px",
        left: f + "px"
    }, 500), $("#fullbg").css({
        width: $("body").width(),
        height: $("body").height() + 100,
        display: "block"
    }), input_note_msg(a, c, d, e)
}
function input_note_msg(a, b, c, d) {
    0 == b ? get_by_id("message_info").innerHTML = "<img src='" + globle_url + "/assert/img/no.gif' style='border:0px' align='absmiddle'/> &nbsp;&nbsp;" + a : 1 == b ? get_by_id("message_info").innerHTML = "<img src='" + globle_url + "/assert/img/yes.gif' style='border:0px' align='absmiddle'/> &nbsp;&nbsp;" + a : 2 == b && (get_by_id("message_info").innerHTML = "<img src='" + globle_url + "/assert/img/loading9.gif' style='border:0px' align='absmiddle'/> &nbsp;&nbsp;正在处理，请稍后..."), d > 0 && "" == c ? setTimeout(output_note, d) : d > 0 && "" != c && (note_globle_url = c, setTimeout(output_note_url, d))
}
function output_note_url() {
    output_note(), window.location = note_globle_url
}
function output_note() {
    $("#note_show").animate({top: "0"}, 500, function () {
        $(this).css({display: "none", top: "-100px"})
    }), $("#fullbg").css("display", "none")
}
function bodyHeight() {
    for (var a = document.body; 0 == a.scrollTop && a.parentNode && "html" != a.tagName.toLowerCase();)
        a = a.parentNode;
    return a.clientHeight
}
function scrolltop() {
    for (var a = document.body; 0 == a.scrollTop && a.parentNode && "html" != a.tagName.toLowerCase();)
        a = a.parentNode;
    return a.scrollTop
}
function ImgAuto(a, b, c) {
    var e, f, g, d = new Image;
    d.src = a.src, e = d.width, f = d.height, g = e > b ? b : e, f * g / e > c ? (a.height = c, a.width = c / f * e) : (a.width = g, a.height = g / e * f)
}
function setCookie(a, b) {
    var f, c = setCookie.arguments, d = setCookie.arguments.length, e = d > 2 ? c[2] : null;
    null != e && (f = new Date, f.setTime(f.getTime() + 24 * 3600 * 1e3 * e)), document.cookie = a + "=" + escape(b) + (null == e ? "" : ";expires=" + f.toGMTString())
}
function getCookie(a) {
    var b = a + "=";
    return document.cookie.length > 0 ? (offset = document.cookie.indexOf(b), -1 != offset ? (offset += b.length, end = document.cookie.indexOf(";", offset), -1 == end && (end = document.cookie.length), unescape(document.cookie.substring(offset, end))) : "") : ""
}
function deleteCookie(a) {
    var b = new Date;
    b.setTime(b.getTime() - 864e5), setCookie(a, "", b)
}
function is_int(a) {
    return !/^(\+|-)?\d+$/.test(a) || 0 > a ? !1 : !0
}
var AS, note_globle_url;
!function (a, b) {
    function c(a) {
        return K.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }

    function d(a) {
        if (!pc[a]) {
            var b = H.body, c = K("<" + a + ">").appendTo(b), d = c.css("display");
            c.remove(), ("none" === d || "" === d) && (qc || (qc = H.createElement("iframe"), qc.frameBorder = qc.width = qc.height = 0), b.appendChild(qc), rc && qc.createElement || (rc = (qc.contentWindow || qc.contentDocument).document, rc.write(("CSS1Compat" === H.compatMode ? "<!doctype html>" : "") + "<html><body>"), rc.close()), c = rc.createElement(a), rc.body.appendChild(c), d = K.css(c, "display"), b.removeChild(qc)), pc[a] = d
        }
        return pc[a]
    }

    function e(a, b) {
        var c = {};
        return K.each(vc.concat.apply([], vc.slice(0, b)), function () {
            c[this] = a
        }), c
    }

    function f() {
        wc = b
    }

    function g() {
        return setTimeout(f, 0), wc = K.now()
    }

    function h() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function i() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function j(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var f, g, i, k, l, m, n, o, d = a.dataTypes, e = {}, h = d.length, j = d[0];
        for (f = 1; h > f; f++) {
            if (1 === f)
                for (g in a.converters)
                    "string" == typeof g && (e[g.toLowerCase()] = a.converters[g]);
            if (k = j, j = d[f], "*" === j)
                j = k;
            else if ("*" !== k && k !== j) {
                if (l = k + " " + j, m = e[l] || e["* " + j], !m) {
                    o = b;
                    for (n in e)
                        if (i = n.split(" "), (i[0] === k || "*" === i[0]) && (o = e[i[1] + " " + j])) {
                            n = e[n], n === !0 ? m = o : o === !0 && (m = n);
                            break
                        }
                }
                !m && !o && K.error("No conversion from " + l.replace(" ", " to ")), m !== !0 && (c = m ? m(c) : o(n(c)))
            }
        }
        return c
    }

    function k(a, c, d) {
        var h, i, j, k, e = a.contents, f = a.dataTypes, g = a.responseFields;
        for (i in g)
            i in d && (c[g[i]] = d[i]);
        for (; "*" === f[0];)
            f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)
            for (i in e)
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
        if (f[0] in d)
            j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        return j ? (j !== f[0] && f.unshift(j), d[j]) : void 0
    }

    function l(a, b, c, d) {
        if (K.isArray(b))
            K.each(b, function (b, e) {
                c || Rb.test(a) ? d(a, e) : l(a + "[" + ("object" == typeof e || K.isArray(e) ? b : "") + "]", e, c, d)
            });
        else if (c || null == b || "object" != typeof b)
            d(a, b);
        else
            for (var e in b)
                l(a + "[" + e + "]", b[e], c, d)
    }

    function m(a, c) {
        var d, e, f = K.ajaxSettings.flatOptions || {};
        for (d in c)
            c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
        e && K.extend(!0, a, e)
    }

    function n(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        for (var l, h = a[f], i = 0, j = h ? h.length : 0, k = a === ec; j > i && (k || !l); i++)
            l = h[i](c, d, e), "string" == typeof l && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = n(a, c, d, e, l, g)));
        return (k || !l) && !g["*"] && (l = n(a, c, d, e, "*", g)), l
    }

    function o(a) {
        return function (b, c) {
            if ("string" != typeof b && (c = b, b = "*"), K.isFunction(c))
                for (var g, h, i, d = b.toLowerCase().split(ac), e = 0, f = d.length; f > e; e++)
                    g = d[e], i = /^\+/.test(g), i && (g = g.substr(1) || "*"), h = a[g] = a[g] || [], h[i ? "unshift" : "push"](c)
        }
    }

    function p(a, b, c) {
        var d = "width" === b ? a.offsetWidth : a.offsetHeight, e = "width" === b ? Lb : Mb, f = 0, g = e.length;
        if (d > 0) {
            if ("border" !== c)
                for (; g > f; f++)
                    c || (d -= parseFloat(K.css(a, "padding" + e[f])) || 0), "margin" === c ? d += parseFloat(K.css(a, c + e[f])) || 0 : d -= parseFloat(K.css(a, "border" + e[f] + "Width")) || 0;
            return d + "px"
        }
        if (d = Nb(a, b, b), (0 > d || null == d) && (d = a.style[b] || 0), d = parseFloat(d) || 0, c)
            for (; g > f; f++)
                d += parseFloat(K.css(a, "padding" + e[f])) || 0, "padding" !== c && (d += parseFloat(K.css(a, "border" + e[f] + "Width")) || 0), "margin" === c && (d += parseFloat(K.css(a, c + e[f])) || 0);
        return d + "px"
    }

    function q(a, b) {
        b.src ? K.ajax({
                url: b.src,
                async: !1,
                dataType: "script"
            }) : K.globalEval((b.text || b.textContent || b.innerHTML || "").replace(Bb, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
    }

    function r(a) {
        var b = H.createElement("div");
        return Db.appendChild(b), b.innerHTML = a.outerHTML, b.firstChild
    }

    function s(a) {
        var b = (a.nodeName || "").toLowerCase();
        "input" === b ? t(a) : "script" !== b && "undefined" != typeof a.getElementsByTagName && K.grep(a.getElementsByTagName("input"), t)
    }

    function t(a) {
        ("checkbox" === a.type || "radio" === a.type) && (a.defaultChecked = a.checked)
    }

    function u(a) {
        return "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll("*") : []
    }

    function v(a, b) {
        var c;
        1 === b.nodeType && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), "object" === c ? b.outerHTML = a.outerHTML : "input" !== c || "checkbox" !== a.type && "radio" !== a.type ? "option" === c ? b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(K.expando))
    }

    function w(a, b) {
        if (1 === b.nodeType && K.hasData(a)) {
            var c, d, e, f = K._data(a), g = K._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; e > d; d++)
                        K.event.add(b, c + (h[c][d].namespace ? "." : "") + h[c][d].namespace, h[c][d], h[c][d].data)
            }
            g.data && (g.data = K.extend({}, g.data))
        }
    }

    function x(a) {
        return K.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function y(a) {
        var b = pb.split("|"), c = a.createDocumentFragment();
        if (c.createElement)
            for (; b.length;)
                c.createElement(b.pop());
        return c
    }

    function z(a, b, c) {
        if (b = b || 0, K.isFunction(b))
            return K.grep(a, function (a, d) {
                var e = !!b.call(a, d, a);
                return e === c
            });
        if (b.nodeType)
            return K.grep(a, function (a) {
                return a === b === c
            });
        if ("string" == typeof b) {
            var d = K.grep(a, function (a) {
                return 1 === a.nodeType
            });
            if (lb.test(b))
                return K.filter(b, d, !c);
            b = K.filter(b, d)
        }
        return K.grep(a, function (a) {
            return K.inArray(a, b) >= 0 === c
        })
    }

    function A(a) {
        return !a || !a.parentNode || 11 === a.parentNode.nodeType
    }

    function B() {
        return !0
    }

    function C() {
        return !1
    }

    function D(a, b, c) {
        var d = b + "defer", e = b + "queue", f = b + "mark", g = K._data(a, d);
        !(!g || "queue" !== c && K._data(a, e) || "mark" !== c && K._data(a, f) || !setTimeout(function () {
            !K._data(a, e) && !K._data(a, f) && (K.removeData(a, d, !0), g.fire())
        }, 0))
    }

    function E(a) {
        for (var b in a)
            if (("data" !== b || !K.isEmptyObject(a[b])) && "toJSON" !== b)
                return !1;
        return !0
    }

    function F(a, c, d) {
        if (d === b && 1 === a.nodeType) {
            var e = "data-" + c.replace(O, "-$1").toLowerCase();
            if (d = a.getAttribute(e), "string" == typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : K.isNumeric(d) ? parseFloat(d) : N.test(d) ? K.parseJSON(d) : d
                } catch (f) {
                }
                K.data(a, c, d)
            } else
                d = b
        }
        return d
    }

    function G(a) {
        var c, d, b = L[a] = {};
        for (a = a.split(/\s+/), c = 0, d = a.length; d > c; c++)
            b[a[c]] = !0;
        return b
    }

    var M, N, O, X, Y, Z, P, Q, R, S, T, U, V, W, $, _, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb, mb, nb, ob, pb, qb, rb, sb, tb, ub, vb, wb, xb, yb, zb, Ab, Bb, Cb, Db, Nb, Ob, Pb, Eb, Fb, Gb, Hb, Ib, Jb, Kb, Lb, Mb, gc, hc, Qb, Rb, Sb, Tb, Ub, Vb, Wb, Xb, Yb, Zb, $b, _b, ac, bc, cc, dc, ec, fc, ic, kc, lc, oc, mc, nc, qc, rc, uc, wc, pc, sc, tc, vc, xc, yc, H = a.document, I = a.navigator, J = a.location, K = function () {
        function c() {
            if (!d.isReady) {
                try {
                    H.documentElement.doScroll("left")
                } catch (a) {
                    return setTimeout(c, 1), void 0
                }
                d.ready()
            }
        }

        var g, y, z, A, d = function (a, b) {
            return new d.fn.init(a, b, g)
        }, e = a.jQuery, f = a.$, h = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, i = /\S/, j = /^\s+/, k = /\s+$/, l = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, m = /^[\],:{}\s]*$/, n = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, p = /(?:^|:|,)(?:\s*\[)+/g, q = /(webkit)[ \/]([\w.]+)/, r = /(opera)(?:.*version)?[ \/]([\w.]+)/, s = /(msie) ([\w.]+)/, t = /(mozilla)(?:.*? rv:([\w.]+))?/, u = /-([a-z]|[0-9])/gi, v = /^-ms-/, w = function (a, b) {
            return (b + "").toUpperCase()
        }, x = I.userAgent, B = Object.prototype.toString, C = Object.prototype.hasOwnProperty, D = Array.prototype.push, E = Array.prototype.slice, F = String.prototype.trim, G = Array.prototype.indexOf, J = {};
        return d.fn = d.prototype = {
            constructor: d, init: function (a, c, e) {
                var f, g, i, j;
                if (!a)
                    return this;
                if (a.nodeType)
                    return this.context = this[0] = a, this.length = 1, this;
                if ("body" === a && !c && H.body)
                    return this.context = H, this[0] = H.body, this.selector = a, this.length = 1, this;
                if ("string" == typeof a) {
                    if (f = "<" !== a.charAt(0) || ">" !== a.charAt(a.length - 1) || a.length < 3 ? h.exec(a) : [null, a, null], f && (f[1] || !c)) {
                        if (f[1])
                            return c = c instanceof d ? c[0] : c, j = c ? c.ownerDocument || c : H, i = l.exec(a), i ? d.isPlainObject(c) ? (a = [H.createElement(i[1])], d.fn.attr.call(a, c, !0)) : a = [j.createElement(i[1])] : (i = d.buildFragment([f[1]], [j]), a = (i.cacheable ? d.clone(i.fragment) : i.fragment).childNodes), d.merge(this, a);
                        if (g = H.getElementById(f[2]), g && g.parentNode) {
                            if (g.id !== f[2])
                                return e.find(a);
                            this.length = 1, this[0] = g
                        }
                        return this.context = H, this.selector = a, this
                    }
                    return !c || c.jquery ? (c || e).find(a) : this.constructor(c).find(a)
                }
                return d.isFunction(a) ? e.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), d.makeArray(a, this))
            }, selector: "", jquery: "1.7.1", length: 0, size: function () {
                return this.length
            }, toArray: function () {
                return E.call(this, 0)
            }, get: function (a) {
                return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
            }, pushStack: function (a, b, c) {
                var e = this.constructor();
                return d.isArray(a) ? D.apply(e, a) : d.merge(e, a), e.prevObject = this, e.context = this.context, "find" === b ? e.selector = this.selector + (this.selector ? " " : "") + c : b && (e.selector = this.selector + "." + b + "(" + c + ")"), e
            }, each: function (a, b) {
                return d.each(this, a, b)
            }, ready: function (a) {
                return d.bindReady(), z.add(a), this
            }, eq: function (a) {
                return a = +a, -1 === a ? this.slice(a) : this.slice(a, a + 1)
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, slice: function () {
                return this.pushStack(E.apply(this, arguments), "slice", E.call(arguments).join(","))
            }, map: function (a) {
                return this.pushStack(d.map(this, function (b, c) {
                    return a.call(b, c, b)
                }))
            }, end: function () {
                return this.prevObject || this.constructor(null)
            }, push: D, sort: [].sort, splice: [].splice
        }, d.fn.init.prototype = d.fn, d.extend = d.fn.extend = function () {
            var a, c, e, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            for ("boolean" == typeof i && (l = i, i = arguments[1] || {}, j = 2), "object" != typeof i && !d.isFunction(i) && (i = {}), k === j && (i = this, --j); k > j; j++)
                if (null != (a = arguments[j]))
                    for (c in a)
                        e = i[c], f = a[c], i !== f && (l && f && (d.isPlainObject(f) || (g = d.isArray(f))) ? (g ? (g = !1, h = e && d.isArray(e) ? e : []) : h = e && d.isPlainObject(e) ? e : {}, i[c] = d.extend(l, h, f)) : f !== b && (i[c] = f));
            return i
        }, d.extend({
            noConflict: function (b) {
                return a.$ === d && (a.$ = f), b && a.jQuery === d && (a.jQuery = e), d
            }, isReady: !1, readyWait: 1, holdReady: function (a) {
                a ? d.readyWait++ : d.ready(!0)
            }, ready: function (a) {
                if (a === !0 && !--d.readyWait || a !== !0 && !d.isReady) {
                    if (!H.body)
                        return setTimeout(d.ready, 1);
                    if (d.isReady = !0, a !== !0 && --d.readyWait > 0)
                        return;
                    z.fireWith(H, [d]), d.fn.trigger && d(H).trigger("ready").off("ready")
                }
            }, bindReady: function () {
                if (!z) {
                    if (z = d.Callbacks("once memory"), "complete" === H.readyState)
                        return setTimeout(d.ready, 1);
                    if (H.addEventListener)
                        H.addEventListener("DOMContentLoaded", A, !1), a.addEventListener("load", d.ready, !1);
                    else if (H.attachEvent) {
                        H.attachEvent("onreadystatechange", A), a.attachEvent("onload", d.ready);
                        var b = !1;
                        try {
                            b = null == a.frameElement
                        } catch (e) {
                        }
                        H.documentElement.doScroll && b && c()
                    }
                }
            }, isFunction: function (a) {
                return "function" === d.type(a)
            }, isArray: Array.isArray || function (a) {
                return "array" === d.type(a)
            }, isWindow: function (a) {
                return a && "object" == typeof a && "setInterval" in a
            }, isNumeric: function (a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            }, type: function (a) {
                return null == a ? String(a) : J[B.call(a)] || "object"
            }, isPlainObject: function (a) {
                if (!a || "object" !== d.type(a) || a.nodeType || d.isWindow(a))
                    return !1;
                try {
                    if (a.constructor && !C.call(a, "constructor") && !C.call(a.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (c) {
                    return !1
                }
                var e;
                for (e in a)
                    ;
                return e === b || C.call(a, e)
            }, isEmptyObject: function (a) {
                for (var b in a)
                    return !1;
                return !0
            }, error: function (a) {
                throw new Error(a)
            }, parseJSON: function (b) {
                return "string" == typeof b && b ? (b = d.trim(b), a.JSON && a.JSON.parse ? a.JSON.parse(b) : m.test(b.replace(n, "@").replace(o, "]").replace(p, "")) ? new Function("return " + b)() : (d.error("Invalid JSON: " + b), void 0)) : null
            }, parseXML: function (c) {
                var e, f;
                try {
                    a.DOMParser ? (f = new DOMParser, e = f.parseFromString(c, "text/xml")) : (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(c))
                } catch (g) {
                    e = b
                }
                return (!e || !e.documentElement || e.getElementsByTagName("parsererror").length) && d.error("Invalid XML: " + c), e
            }, noop: function () {
            }, globalEval: function (b) {
                b && i.test(b) && (a.execScript || function (b) {
                    a.eval.call(a, b)
                })(b)
            }, camelCase: function (a) {
                return a.replace(v, "ms-").replace(u, w)
            }, nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
            }, each: function (a, c, e) {
                var f, g = 0, h = a.length, i = h === b || d.isFunction(a);
                if (e)
                    if (i) {
                        for (f in a)
                            if (c.apply(a[f], e) === !1)
                                break
                    } else
                        for (; h > g && c.apply(a[g++], e) !== !1;)
                            ;
                else if (i) {
                    for (f in a)
                        if (c.call(a[f], f, a[f]) === !1)
                            break
                } else
                    for (; h > g && c.call(a[g], g, a[g++]) !== !1;)
                        ;
                return a
            }, trim: F ? function (a) {
                    return null == a ? "" : F.call(a)
                } : function (a) {
                    return null == a ? "" : (a + "").replace(j, "").replace(k, "")
                }, makeArray: function (a, b) {
                var e, c = b || [];
                return null != a && (e = d.type(a), null == a.length || "string" === e || "function" === e || "regexp" === e || d.isWindow(a) ? D.call(c, a) : d.merge(c, a)), c
            }, inArray: function (a, b, c) {
                var d;
                if (b) {
                    if (G)
                        return G.call(b, a, c);
                    for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                        if (c in b && b[c] === a)
                            return c
                }
                return -1
            }, merge: function (a, c) {
                var f, d = a.length, e = 0;
                if ("number" == typeof c.length)
                    for (f = c.length; f > e; e++)
                        a[d++] = c[e];
                else
                    for (; c[e] !== b;)
                        a[d++] = c[e++];
                return a.length = d, a
            }, grep: function (a, b, c) {
                var e, f, g, d = [];
                for (c = !!c, f = 0, g = a.length; g > f; f++)
                    e = !!b(a[f], f), c !== e && d.push(a[f]);
                return d
            }, map: function (a, c, e) {
                var f, g, h = [], i = 0, j = a.length, k = a instanceof d || j !== b && "number" == typeof j && (j > 0 && a[0] && a[j - 1] || 0 === j || d.isArray(a));
                if (k)
                    for (; j > i; i++)
                        f = c(a[i], i, e), null != f && (h[h.length] = f);
                else
                    for (g in a)
                        f = c(a[g], g, e), null != f && (h[h.length] = f);
                return h.concat.apply([], h)
            }, guid: 1, proxy: function (a, c) {
                var e, f, g;
                return "string" == typeof c && (e = a[c], c = a, a = e), d.isFunction(a) ? (f = E.call(arguments, 2), g = function () {
                        return a.apply(c, f.concat(E.call(arguments)))
                    }, g.guid = a.guid = a.guid || g.guid || d.guid++, g) : b
            }, access: function (a, c, e, f, g, h) {
                var j, k, i = a.length;
                if ("object" == typeof c) {
                    for (j in c)
                        d.access(a, j, c[j], f, g, e);
                    return a
                }
                if (e !== b) {
                    for (f = !h && f && d.isFunction(e), k = 0; i > k; k++)
                        g(a[k], c, f ? e.call(a[k], k, g(a[k], c)) : e, h);
                    return a
                }
                return i ? g(a[0], c) : b
            }, now: function () {
                return (new Date).getTime()
            }, uaMatch: function (a) {
                a = a.toLowerCase();
                var b = q.exec(a) || r.exec(a) || s.exec(a) || a.indexOf("compatible") < 0 && t.exec(a) || [];
                return {browser: b[1] || "", version: b[2] || "0"}
            }, sub: function () {
                function a(b, c) {
                    return new a.fn.init(b, c)
                }

                d.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function (c, e) {
                    return e && e instanceof d && !(e instanceof a) && (e = a(e)), d.fn.init.call(this, c, e, b)
                }, a.fn.init.prototype = a.fn;
                var b = a(H);
                return a
            }, browser: {}
        }), d.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
            J["[object " + b + "]"] = b.toLowerCase()
        }), y = d.uaMatch(x), y.browser && (d.browser[y.browser] = !0, d.browser.version = y.version), d.browser.webkit && (d.browser.safari = !0), i.test(" ") && (j = /^[\s\xA0]+/, k = /[\s\xA0]+$/), g = d(H), H.addEventListener ? A = function () {
                H.removeEventListener("DOMContentLoaded", A, !1), d.ready()
            } : H.attachEvent && (A = function () {
                "complete" === H.readyState && (H.detachEvent("onreadystatechange", A), d.ready())
            }), d
    }(), L = {};
    K.Callbacks = function (a) {
        a = a ? L[a] || G(a) : {};
        var e, f, g, h, i, c = [], d = [], j = function (b) {
            var d, e, f, g;
            for (d = 0, e = b.length; e > d; d++)
                f = b[d], g = K.type(f), "array" === g ? j(f) : "function" === g && (!a.unique || !l.has(f)) && c.push(f)
        }, k = function (b, j) {
            for (j = j || [], e = !a.memory || [b, j], f = !0, i = g || 0, g = 0, h = c.length; c && h > i; i++)
                if (c[i].apply(b, j) === !1 && a.stopOnFalse) {
                    e = !0;
                    break
                }
            f = !1, c && (a.once ? e === !0 ? l.disable() : c = [] : d && d.length && (e = d.shift(), l.fireWith(e[0], e[1])))
        }, l = {
            add: function () {
                if (c) {
                    var a = c.length;
                    j(arguments), f ? h = c.length : e && e !== !0 && (g = a, k(e[0], e[1]))
                }
                return this
            }, remove: function () {
                var b, d, e, g;
                if (c)
                    for (b = arguments, d = 0, e = b.length; e > d; d++)
                        for (g = 0; g < c.length && (b[d] !== c[g] || (f && h >= g && (h--, i >= g && i--), c.splice(g--, 1), !a.unique)); g++)
                            ;
                return this
            }, has: function (a) {
                if (c)
                    for (var b = 0, d = c.length; d > b; b++)
                        if (a === c[b])
                            return !0;
                return !1
            }, empty: function () {
                return c = [], this
            }, disable: function () {
                return c = d = e = b, this
            }, disabled: function () {
                return !c
            }, lock: function () {
                return d = b, (!e || e === !0) && l.disable(), this
            }, locked: function () {
                return !d
            }, fireWith: function (b, c) {
                return d && (f ? a.once || d.push([b, c]) : (!a.once || !e) && k(b, c)), this
            }, fire: function () {
                return l.fireWith(this, arguments), this
            }, fired: function () {
                return !!e
            }
        };
        return l
    }, M = [].slice, K.extend({
        Deferred: function (a) {
            var i, b = K.Callbacks("once memory"), c = K.Callbacks("once memory"), d = K.Callbacks("memory"), e = "pending", f = {
                resolve: b,
                reject: c,
                notify: d
            }, g = {
                done: b.add, fail: c.add, progress: d.add, state: function () {
                    return e
                }, isResolved: b.fired, isRejected: c.fired, then: function (a, b, c) {
                    return h.done(a).fail(b).progress(c), this
                }, always: function () {
                    return h.done.apply(h, arguments).fail.apply(h, arguments), this
                }, pipe: function (a, b, c) {
                    return K.Deferred(function (d) {
                        K.each({done: [a, "resolve"], fail: [b, "reject"], progress: [c, "notify"]}, function (a, b) {
                            var f, c = b[0], e = b[1];
                            K.isFunction(c) ? h[a](function () {
                                    f = c.apply(this, arguments), f && K.isFunction(f.promise) ? f.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === h ? d : this, [f])
                                }) : h[a](d[e])
                        })
                    }).promise()
                }, promise: function (a) {
                    if (null == a)
                        a = g;
                    else
                        for (var b in g)
                            a[b] = g[b];
                    return a
                }
            }, h = g.promise({});
            for (i in f)
                h[i] = f[i].fire, h[i + "With"] = f[i].fireWith;
            return h.done(function () {
                e = "resolved"
            }, c.disable, d.lock).fail(function () {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(h, h), h
        }, when: function (a) {
            function b(a) {
                return function (b) {
                    g[a] = arguments.length > 1 ? M.call(arguments, 0) : b, j.notifyWith(k, g)
                }
            }

            function c(a) {
                return function (b) {
                    d[a] = arguments.length > 1 ? M.call(arguments, 0) : b, --h || j.resolveWith(j, d)
                }
            }

            var d = M.call(arguments, 0), e = 0, f = d.length, g = Array(f), h = f, j = 1 >= f && a && K.isFunction(a.promise) ? a : K.Deferred(), k = j.promise();
            if (f > 1) {
                for (; f > e; e++)
                    d[e] && d[e].promise && K.isFunction(d[e].promise) ? d[e].promise().then(c(e), j.reject, b(e)) : --h;
                h || j.resolveWith(j, d)
            } else
                j !== a && j.resolveWith(j, f ? [a] : []);
            return k
        }
    }), K.support = function () {
        var b, c, d, e, f, g, h, i, j, l, m, n, o = H.createElement("div");
        if (H.documentElement, o.setAttribute("className", "t"), o.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", c = o.getElementsByTagName("*"), d = o.getElementsByTagName("a")[0], !c || !c.length || !d)
            return {};
        e = H.createElement("select"), f = e.appendChild(H.createElement("option")), g = o.getElementsByTagName("input")[0], b = {
            leadingWhitespace: 3 === o.firstChild.nodeType,
            tbody: !o.getElementsByTagName("tbody").length,
            htmlSerialize: !!o.getElementsByTagName("link").length,
            style: /top/.test(d.getAttribute("style")),
            hrefNormalized: "/a" === d.getAttribute("href"),
            opacity: /^0.55/.test(d.style.opacity),
            cssFloat: !!d.style.cssFloat,
            checkOn: "on" === g.value,
            optSelected: f.selected,
            getSetAttribute: "t" !== o.className,
            enctype: !!H.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== H.createElement("nav").cloneNode(!0).outerHTML,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, g.checked = !0, b.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, b.optDisabled = !f.disabled;
        try {
            delete o.test
        } catch (q) {
            b.deleteExpando = !1
        }
        if (!o.addEventListener && o.attachEvent && o.fireEvent && (o.attachEvent("onclick", function () {
                b.noCloneEvent = !1
            }), o.cloneNode(!0).fireEvent("onclick")), g = H.createElement("input"), g.value = "t", g.setAttribute("type", "radio"), b.radioValue = "t" === g.value, g.setAttribute("checked", "checked"), o.appendChild(g), i = H.createDocumentFragment(), i.appendChild(o.lastChild), b.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = g.checked, i.removeChild(g), i.appendChild(o), o.innerHTML = "", a.getComputedStyle && (h = H.createElement("div"), h.style.width = "0", h.style.marginRight = "0", o.style.width = "2px", o.appendChild(h), b.reliableMarginRight = 0 === (parseInt((a.getComputedStyle(h, null) || {marginRight: 0}).marginRight, 10) || 0)), o.attachEvent)
            for (m in{submit: 1, change: 1, focusin: 1})
                l = "on" + m, n = l in o, n || (o.setAttribute(l, "return;"), n = "function" == typeof o[l]), b[m + "Bubbles"] = n;
        return i.removeChild(o), i = e = f = h = o = g = null, K(function () {
            var a, c, d, f, g, h, i, k, l, m, p = H.getElementsByTagName("body")[0];
            !p || (h = 1, i = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", k = "visibility:hidden;border:0;", l = "style='" + i + "border:5px solid #000;padding:0;'", m = "<div " + l + "><div></div></div><table " + l + " cellpadding='0' cellspacing='0'><tr><td></td></tr></table>", a = H.createElement("div"), a.style.cssText = k + "width:0;height:0;position:static;top:0;margin-top:" + h + "px", p.insertBefore(a, p.firstChild), o = H.createElement("div"), a.appendChild(o), o.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", j = o.getElementsByTagName("td"), n = 0 === j[0].offsetHeight, j[0].style.display = "", j[1].style.display = "none", b.reliableHiddenOffsets = n && 0 === j[0].offsetHeight, o.innerHTML = "", o.style.width = o.style.paddingLeft = "1px", K.boxModel = b.boxModel = 2 === o.offsetWidth, "undefined" != typeof o.style.zoom && (o.style.display = "inline", o.style.zoom = 1, b.inlineBlockNeedsLayout = 2 === o.offsetWidth, o.style.display = "", o.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = 2 !== o.offsetWidth), o.style.cssText = i + k, o.innerHTML = m, c = o.firstChild, d = c.firstChild, f = c.nextSibling.firstChild.firstChild, g = {
                doesNotAddBorder: 5 !== d.offsetTop,
                doesAddBorderForTableAndCells: 5 === f.offsetTop
            }, d.style.position = "fixed", d.style.top = "20px", g.fixedPosition = 20 === d.offsetTop || 15 === d.offsetTop, d.style.position = d.style.top = "", c.style.overflow = "hidden", c.style.position = "relative", g.subtractsBorderForOverflowNotVisible = -5 === d.offsetTop, g.doesNotIncludeMarginInBodyOffset = p.offsetTop !== h, p.removeChild(a), o = a = null, K.extend(b, g))
        }), b
    }(), N = /^(?:\{.*\}|\[.*\])$/, O = /([A-Z])/g, K.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (K.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0},
        hasData: function (a) {
            return a = a.nodeType ? K.cache[a[K.expando]] : a[K.expando], !!a && !E(a)
        },
        data: function (a, c, d, e) {
            if (K.acceptData(a)) {
                var f, g, h, i = K.expando, j = "string" == typeof c, k = a.nodeType, l = k ? K.cache : a, m = k ? a[i] : a[i] && i, n = "events" === c;
                if (!(m && l[m] && (n || e || l[m].data) || !j || d !== b))
                    return;
                return m || (k ? a[i] = m = ++K.uuid : m = i), l[m] || (l[m] = {}, k || (l[m].toJSON = K.noop)), ("object" == typeof c || "function" == typeof c) && (e ? l[m] = K.extend(l[m], c) : l[m].data = K.extend(l[m].data, c)), f = g = l[m], e || (g.data || (g.data = {}), g = g.data), d !== b && (g[K.camelCase(c)] = d), n && !g[c] ? f.events : (j ? (h = g[c], null == h && (h = g[K.camelCase(c)])) : h = g, h)
            }
        },
        removeData: function (a, b, c) {
            if (K.acceptData(a)) {
                var d, e, f, g = K.expando, h = a.nodeType, i = h ? K.cache : a, j = h ? a[g] : g;
                if (!i[j])
                    return;
                if (b && (d = c ? i[j] : i[j].data)) {
                    K.isArray(b) || (b in d ? b = [b] : (b = K.camelCase(b), b = b in d ? [b] : b.split(" ")));
                    for (e = 0, f = b.length; f > e; e++)
                        delete d[b[e]];
                    if (!(c ? E : K.isEmptyObject)(d))
                        return
                }
                if (!c && (delete i[j].data, !E(i[j])))
                    return;
                K.support.deleteExpando || !i.setInterval ? delete i[j] : i[j] = null, h && (K.support.deleteExpando ? delete a[g] : a.removeAttribute ? a.removeAttribute(g) : a[g] = null)
            }
        },
        _data: function (a, b, c) {
            return K.data(a, b, c, !0)
        },
        acceptData: function (a) {
            if (a.nodeName) {
                var b = K.noData[a.nodeName.toLowerCase()];
                if (b)
                    return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), K.fn.extend({
        data: function (a, c) {
            var d, e, f, h, i, g = null;
            if ("undefined" == typeof a) {
                if (this.length && (g = K.data(this[0]), 1 === this[0].nodeType && !K._data(this[0], "parsedAttrs"))) {
                    for (e = this[0].attributes, h = 0, i = e.length; i > h; h++)
                        f = e[h].name, 0 === f.indexOf("data-") && (f = K.camelCase(f.substring(5)), F(this[0], f, g[f]));
                    K._data(this[0], "parsedAttrs", !0)
                }
                return g
            }
            return "object" == typeof a ? this.each(function () {
                    K.data(this, a)
                }) : (d = a.split("."), d[1] = d[1] ? "." + d[1] : "", c === b ? (g = this.triggerHandler("getData" + d[1] + "!", [d[0]]), g === b && this.length && (g = K.data(this[0], a), g = F(this[0], a, g)), g === b && d[1] ? this.data(d[0]) : g) : this.each(function () {
                        var b = K(this), e = [d[0], c];
                        b.triggerHandler("setData" + d[1] + "!", e), K.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
                    }))
        }, removeData: function (a) {
            return this.each(function () {
                K.removeData(this, a)
            })
        }
    }), K.extend({
        _mark: function (a, b) {
            a && (b = (b || "fx") + "mark", K._data(a, b, (K._data(a, b) || 0) + 1))
        }, _unmark: function (a, b, c) {
            if (a !== !0 && (c = b, b = a, a = !1), b) {
                c = c || "fx";
                var d = c + "mark", e = a ? 0 : (K._data(b, d) || 1) - 1;
                e ? K._data(b, d, e) : (K.removeData(b, d, !0), D(b, c, "mark"))
            }
        }, queue: function (a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = K._data(a, b), c && (!d || K.isArray(c) ? d = K._data(a, b, K.makeArray(c)) : d.push(c)), d || []) : void 0
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = K.queue(a, b), d = c.shift(), e = {};
            "inprogress" === d && (d = c.shift()), d && ("fx" === b && c.unshift("inprogress"), K._data(a, b + ".run", e), d.call(a, function () {
                K.dequeue(a, b)
            }, e)), c.length || (K.removeData(a, b + "queue " + b + ".run", !0), D(a, b, "queue"))
        }
    }), K.fn.extend({
        queue: function (a, c) {
            return "string" != typeof a && (c = a, a = "fx"), c === b ? K.queue(this[0], a) : this.each(function () {
                    var b = K.queue(this, a, c);
                    "fx" === a && "inprogress" !== b[0] && K.dequeue(this, a)
                })
        }, dequeue: function (a) {
            return this.each(function () {
                K.dequeue(this, a)
            })
        }, delay: function (a, b) {
            return a = K.fx ? K.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, c) {
            function d() {
                --h || e.resolveWith(f, [f])
            }

            "string" != typeof a && (c = a, a = b), a = a || "fx";
            for (var l, e = K.Deferred(), f = this, g = f.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark"; g--;)
                (l = K.data(f[g], i, b, !0) || (K.data(f[g], j, b, !0) || K.data(f[g], k, b, !0)) && K.data(f[g], i, K.Callbacks("once memory"), !0)) && (h++, l.add(d));
            return d(), e.promise()
        }
    }), P = /[\n\t\r]/g, Q = /\s+/, R = /\r/g, S = /^(?:button|input)$/i, T = /^(?:button|input|object|select|textarea)$/i, U = /^a(?:rea)?$/i, V = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, W = K.support.getSetAttribute, K.fn.extend({
        attr: function (a, b) {
            return K.access(this, a, b, !0, K.attr)
        }, removeAttr: function (a) {
            return this.each(function () {
                K.removeAttr(this, a)
            })
        }, prop: function (a, b) {
            return K.access(this, a, b, !0, K.prop)
        }, removeProp: function (a) {
            return a = K.propFix[a] || a, this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {
                }
            })
        }, addClass: function (a) {
            var b, c, d, e, f, g, h;
            if (K.isFunction(a))
                return this.each(function (b) {
                    K(this).addClass(a.call(this, b, this.className))
                });
            if (a && "string" == typeof a)
                for (b = a.split(Q), c = 0, d = this.length; d > c; c++)
                    if (e = this[c], 1 === e.nodeType)
                        if (e.className || 1 !== b.length) {
                            for (f = " " + e.className + " ", g = 0, h = b.length; h > g; g++)
                                ~f.indexOf(" " + b[g] + " ") || (f += b[g] + " ");
                            e.className = K.trim(f)
                        } else
                            e.className = a;
            return this
        }, removeClass: function (a) {
            var c, d, e, f, g, h, i;
            if (K.isFunction(a))
                return this.each(function (b) {
                    K(this).removeClass(a.call(this, b, this.className))
                });
            if (a && "string" == typeof a || a === b)
                for (c = (a || "").split(Q), d = 0, e = this.length; e > d; d++)
                    if (f = this[d], 1 === f.nodeType && f.className)
                        if (a) {
                            for (g = (" " + f.className + " ").replace(P, " "), h = 0, i = c.length; i > h; h++)
                                g = g.replace(" " + c[h] + " ", " ");
                            f.className = K.trim(g)
                        } else
                            f.className = "";
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a, d = "boolean" == typeof b;
            return K.isFunction(a) ? this.each(function (c) {
                    K(this).toggleClass(a.call(this, c, this.className, b), b)
                }) : this.each(function () {
                    if ("string" === c)
                        for (var e, f = 0, g = K(this), h = b, i = a.split(Q); e = i[f++];)
                            h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e);
                    else
                        ("undefined" === c || "boolean" === c) && (this.className && K._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : K._data(this, "__className__") || "")
                })
        }, hasClass: function (a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(P, " ").indexOf(b) > -1)
                    return !0;
            return !1
        }, val: function (a) {
            var c, d, e, f = this[0];
            return arguments.length ? (e = K.isFunction(a), this.each(function (d) {
                    var g, f = K(this);
                    1 === this.nodeType && (g = e ? a.call(this, d, f.val()) : a, null == g ? g = "" : "number" == typeof g ? g += "" : K.isArray(g) && (g = K.map(g, function (a) {
                                return null == a ? "" : a + ""
                            })), c = K.valHooks[this.nodeName.toLowerCase()] || K.valHooks[this.type], c && "set" in c && c.set(this, g, "value") !== b || (this.value = g))
                })) : f ? (c = K.valHooks[f.nodeName.toLowerCase()] || K.valHooks[f.type], c && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, "string" == typeof d ? d.replace(R, "") : null == d ? "" : d)) : void 0
        }
    }), K.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            }, select: {
                get: function (a) {
                    var b, c, d, e, f = a.selectedIndex, g = [], h = a.options, i = "select-one" === a.type;
                    if (0 > f)
                        return null;
                    for (c = i ? f : 0, d = i ? f + 1 : h.length; d > c; c++)
                        if (e = h[c], !(!e.selected || (K.support.optDisabled ? e.disabled : null !== e.getAttribute("disabled")) || e.parentNode.disabled && K.nodeName(e.parentNode, "optgroup"))) {
                            if (b = K(e).val(), i)
                                return b;
                            g.push(b)
                        }
                    return i && !g.length && h.length ? K(h[f]).val() : g
                }, set: function (a, b) {
                    var c = K.makeArray(b);
                    return K(a).find("option").each(function () {
                        this.selected = K.inArray(K(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1), c
                }
            }
        },
        attrFn: {val: !0, css: !0, html: !0, text: !0, data: !0, width: !0, height: !0, offset: !0},
        attr: function (a, c, d, e) {
            var f, g, h, i = a.nodeType;
            return a && 3 !== i && 8 !== i && 2 !== i ? e && c in K.attrFn ? K(a)[c](d) : "undefined" == typeof a.getAttribute ? K.prop(a, c, d) : (h = 1 !== i || !K.isXMLDoc(a), h && (c = c.toLowerCase(), g = K.attrHooks[c] || (V.test(c) ? Y : X)), d !== b ? null === d ? (K.removeAttr(a, c), void 0) : g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, "" + d), d) : g && "get" in g && h && null !== (f = g.get(a, c)) ? f : (f = a.getAttribute(c), null === f ? b : f)) : void 0
        },
        removeAttr: function (a, b) {
            var c, d, e, f, g = 0;
            if (b && 1 === a.nodeType)
                for (d = b.toLowerCase().split(Q), f = d.length; f > g; g++)
                    e = d[g], e && (c = K.propFix[e] || e, K.attr(a, e, ""), a.removeAttribute(W ? e : c), V.test(e) && c in a && (a[c] = !1))
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (S.test(a.nodeName) && a.parentNode)
                        K.error("type property can't be changed");
                    else if (!K.support.radioValue && "radio" === b && K.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }, value: {
                get: function (a, b) {
                    return X && K.nodeName(a, "button") ? X.get(a, b) : b in a ? a.value : null
                }, set: function (a, b, c) {
                    return X && K.nodeName(a, "button") ? X.set(a, b, c) : (a.value = b, void 0)
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (a, c, d) {
            var e, f, g, h = a.nodeType;
            return a && 3 !== h && 8 !== h && 2 !== h ? (g = 1 !== h || !K.isXMLDoc(a), g && (c = K.propFix[c] || c, f = K.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && null !== (e = f.get(a, c)) ? e : a[c]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : T.test(a.nodeName) || U.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), K.attrHooks.tabindex = K.propHooks.tabIndex, Y = {
        get: function (a, c) {
            var d, e = K.prop(a, c);
            return e === !0 || "boolean" != typeof e && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        }, set: function (a, b, c) {
            var d;
            return b === !1 ? K.removeAttr(a, c) : (d = K.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
        }
    }, W || (Z = {name: !0, id: !0}, X = K.valHooks.button = {
        get: function (a, c) {
            var d;
            return d = a.getAttributeNode(c), d && (Z[c] ? "" !== d.nodeValue : d.specified) ? d.nodeValue : b
        }, set: function (a, b, c) {
            var d = a.getAttributeNode(c);
            return d || (d = H.createAttribute(c), a.setAttributeNode(d)), d.nodeValue = b + ""
        }
    }, K.attrHooks.tabindex.set = X.set, K.each(["width", "height"], function (a, b) {
        K.attrHooks[b] = K.extend(K.attrHooks[b], {
            set: function (a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
            }
        })
    }), K.attrHooks.contenteditable = {
        get: X.get, set: function (a, b, c) {
            "" === b && (b = "false"), X.set(a, b, c)
        }
    }), K.support.hrefNormalized || K.each(["href", "src", "width", "height"], function (a, c) {
        K.attrHooks[c] = K.extend(K.attrHooks[c], {
            get: function (a) {
                var d = a.getAttribute(c, 2);
                return null === d ? b : d
            }
        })
    }), K.support.style || (K.attrHooks.style = {
        get: function (a) {
            return a.style.cssText.toLowerCase() || b
        }, set: function (a, b) {
            return a.style.cssText = "" + b
        }
    }), K.support.optSelected || (K.propHooks.selected = K.extend(K.propHooks.selected, {
        get: function (a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    })), K.support.enctype || (K.propFix.enctype = "encoding"), K.support.checkOn || K.each(["radio", "checkbox"], function () {
        K.valHooks[this] = {
            get: function (a) {
                return null === a.getAttribute("value") ? "on" : a.value
            }
        }
    }), K.each(["radio", "checkbox"], function () {
        K.valHooks[this] = K.extend(K.valHooks[this], {
            set: function (a, b) {
                return K.isArray(b) ? a.checked = K.inArray(K(a).val(), b) >= 0 : void 0
            }
        })
    }), $ = /^(?:textarea|input|select)$/i, _ = /^([^\.]*)?(?:\.(.+))?$/, ab = /\bhover(\.\S+)?\b/, bb = /^key/, cb = /^(?:mouse|contextmenu)|click/, db = /^(?:focusinfocus|focusoutblur)$/, eb = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, fb = function (a) {
        var b = eb.exec(a);
        return b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")), b
    }, gb = function (a, b) {
        var c = a.attributes || {};
        return !(b[1] && a.nodeName.toLowerCase() !== b[1] || b[2] && (c.id || {}).value !== b[2] || b[3] && !b[3].test((c["class"] || {}).value))
    }, hb = function (a) {
        return K.event.special.hover ? a : a.replace(ab, "mouseenter$1 mouseleave$1")
    }, K.event = {
        add: function (a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, q, r;
            if (3 !== a.nodeType && 8 !== a.nodeType && c && d && (g = K._data(a))) {
                for (d.handler && (o = d, d = o.handler), d.guid || (d.guid = K.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function (a) {
                    return "undefined" == typeof K || a && K.event.triggered === a.type ? b : K.event.dispatch.apply(h.elem, arguments)
                }, h.elem = a), c = K.trim(hb(c)).split(" "), j = 0; j < c.length; j++)
                    k = _.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), r = K.event.special[l] || {}, l = (f ? r.delegateType : r.bindType) || l, r = K.event.special[l] || {}, n = K.extend({
                        type: l,
                        origType: k[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: f,
                        quick: fb(f),
                        namespace: m.join(".")
                    }, o), q = i[l], q || (q = i[l] = [], q.delegateCount = 0, r.setup && r.setup.call(a, e, m, h) !== !1 || (a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h))), r.add && (r.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? q.splice(q.delegateCount++, 0, n) : q.push(n), K.event.global[l] = !0;
                a = null
            }
        },
        global: {},
        remove: function (a, b, c, d, e) {
            var g, h, i, j, k, l, m, n, o, p, q, r, f = K.hasData(a) && K._data(a);
            if (f && (n = f.events)) {
                for (b = K.trim(hb(b || "")).split(" "), g = 0; g < b.length; g++)
                    if (h = _.exec(b[g]) || [], i = j = h[1], k = h[2], i) {
                        for (o = K.event.special[i] || {}, i = (d ? o.delegateType : o.bindType) || i, q = n[i] || [], l = q.length, k = k ? new RegExp("(^|\\.)" + k.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null, m = 0; m < q.length; m++)
                            r = q[m], !(!e && j !== r.origType || c && c.guid !== r.guid || k && !k.test(r.namespace) || d && d !== r.selector && ("**" !== d || !r.selector) || (q.splice(m--, 1), r.selector && q.delegateCount--, !o.remove || !o.remove.call(a, r)));
                        0 === q.length && l !== q.length && ((!o.teardown || o.teardown.call(a, k) === !1) && K.removeEvent(a, i, f.handle), delete n[i])
                    } else
                        for (i in n)
                            K.event.remove(a, i + b[g], c, d, !0);
                K.isEmptyObject(n) && (p = f.handle, p && (p.elem = null), K.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {getData: !0, setData: !0, changeData: !0},
        trigger: function (c, d, e, f) {
            if (!e || 3 !== e.nodeType && 8 !== e.nodeType) {
                var i, j, k, l, m, n, o, p, q, r, g = c.type || c, h = [];
                if (db.test(g + K.event.triggered))
                    return;
                if (g.indexOf("!") >= 0 && (g = g.slice(0, -1), j = !0), g.indexOf(".") >= 0 && (h = g.split("."), g = h.shift(), h.sort()), (!e || K.event.customEvent[g]) && !K.event.global[g])
                    return;
                if (c = "object" == typeof c ? c[K.expando] ? c : new K.Event(g, c) : new K.Event(g), c.type = g, c.isTrigger = !0, c.exclusive = j, c.namespace = h.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, n = g.indexOf(":") < 0 ? "on" + g : "", !e) {
                    i = K.cache;
                    for (k in i)
                        i[k].events && i[k].events[g] && K.event.trigger(c, d, i[k].handle.elem, !0);
                    return
                }
                if (c.result = b, c.target || (c.target = e), d = null != d ? K.makeArray(d) : [], d.unshift(c), o = K.event.special[g] || {}, o.trigger && o.trigger.apply(e, d) === !1)
                    return;
                if (q = [[e, o.bindType || g]], !f && !o.noBubble && !K.isWindow(e)) {
                    for (r = o.delegateType || g, l = db.test(r + g) ? e : e.parentNode, m = null; l; l = l.parentNode)
                        q.push([l, r]), m = l;
                    m && m === e.ownerDocument && q.push([m.defaultView || m.parentWindow || a, r])
                }
                for (k = 0; k < q.length && !c.isPropagationStopped(); k++)
                    l = q[k][0], c.type = q[k][1], p = (K._data(l, "events") || {})[c.type] && K._data(l, "handle"), p && p.apply(l, d), p = n && l[n], p && K.acceptData(l) && p.apply(l, d) === !1 && c.preventDefault();
                return c.type = g, !(f || c.isDefaultPrevented() || o._default && o._default.apply(e.ownerDocument, d) !== !1 || "click" === g && K.nodeName(e, "a") || !K.acceptData(e) || !n || !e[g] || ("focus" === g || "blur" === g) && 0 === c.target.offsetWidth || K.isWindow(e) || (m = e[n], m && (e[n] = null), K.event.triggered = g, e[g](), K.event.triggered = b, !m || !(e[n] = m))), c.result
            }
        },
        dispatch: function (c) {
            c = K.event.fix(c || a.event);
            var i, j, k, l, m, n, o, p, q, r, d = (K._data(this, "events") || {})[c.type] || [], e = d.delegateCount, f = [].slice.call(arguments, 0), g = !c.exclusive && !c.namespace, h = [];
            if (f[0] = c, c.delegateTarget = this, e && !c.target.disabled && (!c.button || "click" !== c.type))
                for (l = K(this), l.context = this.ownerDocument || this, k = c.target; k != this; k = k.parentNode || this) {
                    for (n = {}, p = [], l[0] = k, i = 0; e > i; i++)
                        q = d[i], r = q.selector, n[r] === b && (n[r] = q.quick ? gb(k, q.quick) : l.is(r)), n[r] && p.push(q);
                    p.length && h.push({elem: k, matches: p})
                }
            for (d.length > e && h.push({
                elem: this,
                matches: d.slice(e)
            }), i = 0; i < h.length && !c.isPropagationStopped(); i++)
                for (o = h[i], c.currentTarget = o.elem, j = 0; j < o.matches.length && !c.isImmediatePropagationStopped(); j++)
                    q = o.matches[j], (g || !c.namespace && !q.namespace || c.namespace_re && c.namespace_re.test(q.namespace)) && (c.data = q.data, c.handleObj = q, m = ((K.event.special[q.origType] || {}).handle || q.handler).apply(o.elem, f), m !== b && (c.result = m, m === !1 && (c.preventDefault(), c.stopPropagation())));
            return c.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, c) {
                var d, e, f, g = c.button, h = c.fromElement;
                return null == a.pageX && null != c.clientX && (d = a.target.ownerDocument || H, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), !a.which && g !== b && (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
            }
        },
        fix: function (a) {
            if (a[K.expando])
                return a;
            var c, d, e = a, f = K.event.fixHooks[a.type] || {}, g = f.props ? this.props.concat(f.props) : this.props;
            for (a = K.Event(e), c = g.length; c;)
                d = g[--c], a[d] = e[d];
            return a.target || (a.target = e.srcElement || H), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey), f.filter ? f.filter(a, e) : a
        },
        special: {
            ready: {setup: K.bindReady},
            load: {noBubble: !0},
            focus: {delegateType: "focusin"},
            blur: {delegateType: "focusout"},
            beforeunload: {
                setup: function (a, b, c) {
                    K.isWindow(this) && (this.onbeforeunload = c)
                }, teardown: function (a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = K.extend(new K.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
            d ? K.event.trigger(e, null, b) : K.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, K.event.handle = K.event.dispatch, K.removeEvent = H.removeEventListener ? function (a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        } : function (a, b, c) {
            a.detachEvent && a.detachEvent("on" + b, c)
        }, K.Event = function (a, b) {
        return this instanceof K.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? B : C) : this.type = a, b && K.extend(this, b), this.timeStamp = a && a.timeStamp || K.now(), this[K.expando] = !0, void 0) : new K.Event(a, b)
    }, K.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = B;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        }, stopPropagation: function () {
            this.isPropagationStopped = B;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }, stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = B, this.stopPropagation()
        }, isDefaultPrevented: C, isPropagationStopped: C, isImmediatePropagationStopped: C
    }, K.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        K.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var g, c = this, d = a.relatedTarget, e = a.handleObj;
                return e.selector, (!d || d !== c && !K.contains(c, d)) && (a.type = e.origType, g = e.handler.apply(this, arguments), a.type = b), g
            }
        }
    }), K.support.submitBubbles || (K.event.special.submit = {
        setup: function () {
            return K.nodeName(this, "form") ? !1 : (K.event.add(this, "click._submit keypress._submit", function (a) {
                    var c = a.target, d = K.nodeName(c, "input") || K.nodeName(c, "button") ? c.form : b;
                    d && !d._submit_attached && (K.event.add(d, "submit._submit", function (a) {
                        this.parentNode && !a.isTrigger && K.event.simulate("submit", this.parentNode, a, !0)
                    }), d._submit_attached = !0)
                }), void 0)
        }, teardown: function () {
            return K.nodeName(this, "form") ? !1 : (K.event.remove(this, "._submit"), void 0)
        }
    }), K.support.changeBubbles || (K.event.special.change = {
        setup: function () {
            return $.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (K.event.add(this, "propertychange._change", function (a) {
                    "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                }), K.event.add(this, "click._change", function (a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, K.event.simulate("change", this, a, !0))
                })), !1) : (K.event.add(this, "beforeactivate._change", function (a) {
                    var b = a.target;
                    $.test(b.nodeName) && !b._change_attached && (K.event.add(b, "change._change", function (a) {
                        this.parentNode && !a.isSimulated && !a.isTrigger && K.event.simulate("change", this.parentNode, a, !0)
                    }), b._change_attached = !0)
                }), void 0)
        }, handle: function (a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        }, teardown: function () {
            return K.event.remove(this, "._change"), $.test(this.nodeName)
        }
    }), K.support.focusinBubbles || K.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var c = 0, d = function (a) {
            K.event.simulate(b, a.target, K.event.fix(a), !0)
        };
        K.event.special[b] = {
            setup: function () {
                0 === c++ && H.addEventListener(a, d, !0)
            }, teardown: function () {
                0 === --c && H.removeEventListener(a, d, !0)
            }
        }
    }), K.fn.extend({
        on: function (a, c, d, e, f) {
            var g, h;
            if ("object" == typeof a) {
                "string" != typeof c && (d = c, c = b);
                for (h in a)
                    this.on(h, c, d, a[h], f);
                return this
            }
            if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1)
                e = C;
            else if (!e)
                return this;
            return 1 === f && (g = e, e = function (a) {
                return K().off(a), g.apply(this, arguments)
            }, e.guid = g.guid || (g.guid = K.guid++)), this.each(function () {
                K.event.add(this, a, e, d, c)
            })
        }, one: function (a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1)
        }, off: function (a, c, d) {
            var e, f;
            if (a && a.preventDefault && a.handleObj)
                return e = a.handleObj, K(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler), this;
            if ("object" == typeof a) {
                for (f in a)
                    this.off(f, c, a[f]);
                return this
            }
            return (c === !1 || "function" == typeof c) && (d = c, c = b), d === !1 && (d = C), this.each(function () {
                K.event.remove(this, a, d, c)
            })
        }, bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, live: function (a, b, c) {
            return K(this.context).on(a, this.selector, b, c), this
        }, die: function (a, b) {
            return K(this.context).off(a, this.selector || "**", b), this
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return 1 == arguments.length ? this.off(a, "**") : this.off(b, a, c)
        }, trigger: function (a, b) {
            return this.each(function () {
                K.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            return this[0] ? K.event.trigger(a, b, this[0], !0) : void 0
        }, toggle: function (a) {
            var b = arguments, c = a.guid || K.guid++, d = 0, e = function (c) {
                var e = (K._data(this, "lastToggle" + a.guid) || 0) % d;
                return K._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
            };
            for (e.guid = c; d < b.length;)
                b[d++].guid = c;
            return this.click(e)
        }, hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), K.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        K.fn[b] = function (a, c) {
            return null == c && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, K.attrFn && (K.attrFn[b] = !0), bb.test(b) && (K.event.fixHooks[b] = K.event.keyHooks), cb.test(b) && (K.event.fixHooks[b] = K.event.mouseHooks)
    }), function () {
        function a(a, b, c, d, f, g) {
            var h, i, j, k;
            for (h = 0, i = d.length; i > h; h++)
                if (j = d[h]) {
                    for (k = !1, j = j[a]; j;) {
                        if (j[e] === c) {
                            k = d[j.sizset];
                            break
                        }
                        if (1 === j.nodeType)
                            if (g || (j[e] = c, j.sizset = h), "string" != typeof b) {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        j = j[a]
                    }
                    d[h] = k
                }
        }

        function c(a, b, c, d, f, g) {
            var h, i, j, k;
            for (h = 0, i = d.length; i > h; h++)
                if (j = d[h]) {
                    for (k = !1, j = j[a]; j;) {
                        if (j[e] === c) {
                            k = d[j.sizset];
                            break
                        }
                        if (1 === j.nodeType && !g && (j[e] = c, j.sizset = h), j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    d[h] = k
                }
        }

        var m, n, o, p, q, r, s, u, v, w, d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, e = "sizcache" + (Math.random() + "").replace(".", ""), f = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [0, 0].sort(function () {
            return i = !1, 0
        }), m = function (a, b, c, e) {
            var f, h, i, j, k, l, n, q, r, t, u, v, x;
            if (c = c || [], b = b || H, f = b, 1 !== b.nodeType && 9 !== b.nodeType)
                return [];
            if (!a || "string" != typeof a)
                return c;
            t = !0, u = m.isXML(b), v = [], x = a;
            do
                if (d.exec(""), h = d.exec(x), h && (x = h[3], v.push(h[1]), h[2])) {
                    k = h[3];
                    break
                }
            while (h);
            if (v.length > 1 && p.exec(a))
                if (2 === v.length && o.relative[v[0]])
                    i = w(v[0] + v[1], b, e);
                else
                    for (i = o.relative[v[0]] ? [b] : m(v.shift(), b); v.length;)
                        a = v.shift(), o.relative[a] && (a += v.shift()), i = w(a, i, e);
            else if (!e && v.length > 1 && 9 === b.nodeType && !u && o.match.ID.test(v[0]) && !o.match.ID.test(v[v.length - 1]) && (l = m.find(v.shift(), b, u), b = l.expr ? m.filter(l.expr, l.set)[0] : l.set[0]), b)
                for (l = e ? {
                        expr: v.pop(),
                        set: s(e)
                    } : m.find(v.pop(), 1 !== v.length || "~" !== v[0] && "+" !== v[0] || !b.parentNode ? b : b.parentNode, u), i = l.expr ? m.filter(l.expr, l.set) : l.set, v.length > 0 ? j = s(i) : t = !1; v.length;)
                    n = v.pop(), q = n, o.relative[n] ? q = v.pop() : n = "", null == q && (q = b), o.relative[n](j, q, u);
            else
                j = v = [];
            if (j || (j = i), j || m.error(n || a), "[object Array]" === g.call(j))
                if (t)
                    if (b && 1 === b.nodeType)
                        for (r = 0; null != j[r]; r++)
                            j[r] && (j[r] === !0 || 1 === j[r].nodeType && m.contains(b, j[r])) && c.push(i[r]);
                    else
                        for (r = 0; null != j[r]; r++)
                            j[r] && 1 === j[r].nodeType && c.push(i[r]);
                else
                    c.push.apply(c, j);
            else
                s(j, c);
            return k && (m(k, f, c, e), m.uniqueSort(c)), c
        }, m.uniqueSort = function (a) {
            if (u && (h = i, a.sort(u), h))
                for (var b = 1; b < a.length; b++)
                    a[b] === a[b - 1] && a.splice(b--, 1);
            return a
        }, m.matches = function (a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function (a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function (a, b, c) {
            var d, e, f, g, h, i;
            if (!a)
                return [];
            for (e = 0, f = o.order.length; f > e; e++)
                if (h = o.order[e], (g = o.leftMatch[h].exec(a)) && (i = g[1], g.splice(1, 1), "\\" !== i.substr(i.length - 1) && (g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c), null != d))) {
                    a = a.replace(o.match[h], "");
                    break
                }
            return d || (d = "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName("*") : []), {
                set: d,
                expr: a
            }
        }, m.filter = function (a, c, d, e) {
            for (var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]); a && c.length;) {
                for (h in o.filter)
                    if (null != (f = o.leftMatch[h].exec(a)) && f[2]) {
                        if (k = o.filter[h], l = f[1], g = !1, f.splice(1, 1), "\\" === l.substr(l.length - 1))
                            continue;
                        if (s === r && (r = []), o.preFilter[h])
                            if (f = o.preFilter[h](f, s, d, r, e, t)) {
                                if (f === !0)
                                    continue
                            } else
                                g = i = !0;
                        if (f)
                            for (n = 0; null != (j = s[n]); n++)
                                j && (i = k(j, f, n, s), p = e ^ i, d && null != i ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                        if (i !== b) {
                            if (d || (s = r), a = a.replace(o.match[h], ""), !g)
                                return [];
                            break
                        }
                    }
                if (a === q) {
                    if (null != g)
                        break;
                    m.error(a)
                }
                q = a
            }
            return s
        }, m.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, n = m.getText = function (a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (1 === d || 9 === d) {
                    if ("string" == typeof a.textContent)
                        return a.textContent;
                    if ("string" == typeof a.innerText)
                        return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling)
                        e += n(a)
                } else if (3 === d || 4 === d)
                    return a.nodeValue
            } else
                for (b = 0; c = a[b]; b++)
                    8 !== c.nodeType && (e += n(c));
            return e
        }, o = m.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {"class": "className", "for": "htmlFor"},
            attrHandle: {
                href: function (a) {
                    return a.getAttribute("href")
                }, type: function (a) {
                    return a.getAttribute("type")
                }
            },
            relative: {
                "+": function (a, b) {
                    var h, f, g, c = "string" == typeof b, d = c && !l.test(b), e = c && !d;
                    for (d && (b = b.toLowerCase()), f = 0, g = a.length; g > f; f++)
                        if (h = a[f]) {
                            for (; (h = h.previousSibling) && 1 !== h.nodeType;)
                                ;
                            a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                        }
                    e && m.filter(b, a, !0)
                }, ">": function (a, b) {
                    var c, g, d = "string" == typeof b, e = 0, f = a.length;
                    if (d && !l.test(b))
                        for (b = b.toLowerCase(); f > e; e++)
                            c = a[e], c && (g = c.parentNode, a[e] = g.nodeName.toLowerCase() === b ? g : !1);
                    else {
                        for (; f > e; e++)
                            c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && m.filter(b, a, !0)
                    }
                }, "": function (b, d, e) {
                    var g, h = f++, i = a;
                    "string" == typeof d && !l.test(d) && (d = d.toLowerCase(), g = d, i = c), i("parentNode", d, h, b, g, e)
                }, "~": function (b, d, e) {
                    var g, h = f++, i = a;
                    "string" == typeof d && !l.test(d) && (d = d.toLowerCase(), g = d, i = c), i("previousSibling", d, h, b, g, e)
                }
            },
            find: {
                ID: function (a, b, c) {
                    if ("undefined" != typeof b.getElementById && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [d] : []
                    }
                }, NAME: function (a, b) {
                    var c, d, e, f;
                    if ("undefined" != typeof b.getElementsByName) {
                        for (c = [], d = b.getElementsByName(a[1]), e = 0, f = d.length; f > e; e++)
                            d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return 0 === c.length ? null : c
                    }
                }, TAG: function (a, b) {
                    return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a[1]) : void 0
                }
            },
            preFilter: {
                CLASS: function (a, b, c, d, e, f) {
                    if (a = " " + a[1].replace(j, "") + " ", f)
                        return a;
                    for (var h, g = 0; null != (h = b[g]); g++)
                        h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1
                }, ID: function (a) {
                    return a[1].replace(j, "")
                }, TAG: function (a) {
                    return a[1].replace(j, "").toLowerCase()
                }, CHILD: function (a) {
                    if ("nth" === a[1]) {
                        a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec("even" === a[2] && "2n" || "odd" === a[2] && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                    } else
                        a[2] && m.error(a[0]);
                    return a[0] = f++, a
                }, ATTR: function (a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    return !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), "~=" === a[2] && (a[4] = " " + a[4] + " "), a
                }, PSEUDO: function (a, b, c, e, f) {
                    if ("not" === a[1]) {
                        if (!((d.exec(a[3]) || "").length > 1 || /^\w/.test(a[3]))) {
                            var g = m.filter(a[3], b, c, !0 ^ f);
                            return c || e.push.apply(e, g), !1
                        }
                        a[3] = m(a[3], null, null, b)
                    } else if (o.match.POS.test(a[0]) || o.match.CHILD.test(a[0]))
                        return !0;
                    return a
                }, POS: function (a) {
                    return a.unshift(!0), a
                }
            },
            filters: {
                enabled: function (a) {
                    return a.disabled === !1 && "hidden" !== a.type
                }, disabled: function (a) {
                    return a.disabled === !0
                }, checked: function (a) {
                    return a.checked === !0
                }, selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                }, parent: function (a) {
                    return !!a.firstChild
                }, empty: function (a) {
                    return !a.firstChild
                }, has: function (a, b, c) {
                    return !!m(c[3], a).length
                }, header: function (a) {
                    return /h\d/i.test(a.nodeName)
                }, text: function (a) {
                    var b = a.getAttribute("type"), c = a.type;
                    return "input" === a.nodeName.toLowerCase() && "text" === c && (b === c || null === b)
                }, radio: function (a) {
                    return "input" === a.nodeName.toLowerCase() && "radio" === a.type
                }, checkbox: function (a) {
                    return "input" === a.nodeName.toLowerCase() && "checkbox" === a.type
                }, file: function (a) {
                    return "input" === a.nodeName.toLowerCase() && "file" === a.type
                }, password: function (a) {
                    return "input" === a.nodeName.toLowerCase() && "password" === a.type
                }, submit: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return ("input" === b || "button" === b) && "submit" === a.type
                }, image: function (a) {
                    return "input" === a.nodeName.toLowerCase() && "image" === a.type
                }, reset: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return ("input" === b || "button" === b) && "reset" === a.type
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                }, input: function (a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                }, focus: function (a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function (a, b) {
                    return 0 === b
                }, last: function (a, b, c, d) {
                    return b === d.length - 1
                }, even: function (a, b) {
                    return 0 === b % 2
                }, odd: function (a, b) {
                    return 1 === b % 2
                }, lt: function (a, b, c) {
                    return b < c[3] - 0
                }, gt: function (a, b, c) {
                    return b > c[3] - 0
                }, nth: function (a, b, c) {
                    return c[3] - 0 === b
                }, eq: function (a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function (a, b, c, d) {
                    var g, h, i, e = b[1], f = o.filters[e];
                    if (f)
                        return f(a, c, b, d);
                    if ("contains" === e)
                        return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                    if ("not" === e) {
                        for (g = b[3], h = 0, i = g.length; i > h; h++)
                            if (g[h] === a)
                                return !1;
                        return !0
                    }
                    m.error(e)
                }, CHILD: function (a, b) {
                    var c, d, f, g, i, j, k = b[1], l = a;
                    switch (k) {
                        case"only":
                        case"first":
                            for (; l = l.previousSibling;)
                                if (1 === l.nodeType)
                                    return !1;
                            if ("first" === k)
                                return !0;
                            l = a;
                        case"last":
                            for (; l = l.nextSibling;)
                                if (1 === l.nodeType)
                                    return !1;
                            return !0;
                        case"nth":
                            if (c = b[2], d = b[3], 1 === c && 0 === d)
                                return !0;
                            if (f = b[0], g = a.parentNode, g && (g[e] !== f || !a.nodeIndex)) {
                                for (i = 0, l = g.firstChild; l; l = l.nextSibling)
                                    1 === l.nodeType && (l.nodeIndex = ++i);
                                g[e] = f
                            }
                            return j = a.nodeIndex - d, 0 === c ? 0 === j : 0 === j % c && j / c >= 0
                    }
                }, ID: function (a, b) {
                    return 1 === a.nodeType && a.getAttribute("id") === b
                }, TAG: function (a, b) {
                    return "*" === b && 1 === a.nodeType || !!a.nodeName && a.nodeName.toLowerCase() === b
                }, CLASS: function (a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                }, ATTR: function (a, b) {
                    var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : null != a[c] ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
                    return null == d ? "!=" === f : !f && m.attr ? null != d : "=" === f ? e === g : "*=" === f ? e.indexOf(g) >= 0 : "~=" === f ? (" " + e + " ").indexOf(g) >= 0 : g ? "!=" === f ? e !== g : "^=" === f ? 0 === e.indexOf(g) : "$=" === f ? e.substr(e.length - g.length) === g : "|=" === f ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                }, POS: function (a, b, c, d) {
                    var e = b[2], f = o.setFilters[e];
                    return f ? f(a, c, b, d) : void 0
                }
            }
        }, p = o.match.POS, q = function (a, b) {
            return "\\" + (b - 0 + 1)
        };
        for (r in o.match)
            o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        s = function (a, b) {
            return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a
        };
        try {
            Array.prototype.slice.call(H.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function (a, b) {
                var e, c = 0, d = b || [];
                if ("[object Array]" === g.call(a))
                    Array.prototype.push.apply(d, a);
                else if ("number" == typeof a.length)
                    for (e = a.length; e > c; c++)
                        d.push(a[c]);
                else
                    for (; a[c]; c++)
                        d.push(a[c]);
                return d
            }
        }
        H.documentElement.compareDocumentPosition ? u = function (a, b) {
                return a === b ? (h = !0, 0) : a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
            } : (u = function (a, b) {
                var c, d, e, f, g, i, j, k;
                if (a === b)
                    return h = !0, 0;
                if (a.sourceIndex && b.sourceIndex)
                    return a.sourceIndex - b.sourceIndex;
                if (e = [], f = [], g = a.parentNode, i = b.parentNode, j = g, g === i)
                    return v(a, b);
                if (!g)
                    return -1;
                if (!i)
                    return 1;
                for (; j;)
                    e.unshift(j), j = j.parentNode;
                for (j = i; j;)
                    f.unshift(j), j = j.parentNode;
                for (c = e.length, d = f.length, k = 0; c > k && d > k; k++)
                    if (e[k] !== f[k])
                        return v(e[k], f[k]);
                return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
            }, v = function (a, b, c) {
                if (a === b)
                    return c;
                for (var d = a.nextSibling; d;) {
                    if (d === b)
                        return -1;
                    d = d.nextSibling
                }
                return 1
            }), function () {
            var a = H.createElement("div"), c = "script" + (new Date).getTime(), d = H.documentElement;
            a.innerHTML = "<a name='" + c + "'/>", d.insertBefore(a, d.firstChild), H.getElementById(c) && (o.find.ID = function (a, c, d) {
                if ("undefined" != typeof c.getElementById && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function (a, b) {
                var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                return 1 === a.nodeType && c && c.nodeValue === b
            }), d.removeChild(a), d = a = null
        }(), function () {
            var a = H.createElement("div");
            a.appendChild(H.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function (a, b) {
                var d, e, c = b.getElementsByTagName(a[1]);
                if ("*" === a[1]) {
                    for (d = [], e = 0; c[e]; e++)
                        1 === c[e].nodeType && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && "undefined" != typeof a.firstChild.getAttribute && "#" !== a.firstChild.getAttribute("href") && (o.attrHandle.href = function (a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), H.querySelectorAll && function () {
            var d, a = m, b = H.createElement("div"), c = "__sizzle__";
            if (b.innerHTML = "<p class='TEST'></p>", !b.querySelectorAll || 0 !== b.querySelectorAll(".TEST").length) {
                m = function (b, d, e, f) {
                    var g, h, j, k, l, n, p;
                    if (d = d || H, !f && !m.isXML(d)) {
                        if (g = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b), g && (1 === d.nodeType || 9 === d.nodeType)) {
                            if (g[1])
                                return s(d.getElementsByTagName(b), e);
                            if (g[2] && o.find.CLASS && d.getElementsByClassName)
                                return s(d.getElementsByClassName(g[2]), e)
                        }
                        if (9 === d.nodeType) {
                            if ("body" === b && d.body)
                                return s([d.body], e);
                            if (g && g[3]) {
                                if (h = d.getElementById(g[3]), !h || !h.parentNode)
                                    return s([], e);
                                if (h.id === g[3])
                                    return s([h], e)
                            }
                            try {
                                return s(d.querySelectorAll(b), e)
                            } catch (i) {
                            }
                        } else if (1 === d.nodeType && "object" !== d.nodeName.toLowerCase()) {
                            j = d, k = d.getAttribute("id"), l = k || c, n = d.parentNode, p = /^\s*[+~]/.test(b), k ? l = l.replace(/'/g, "\\$&") : d.setAttribute("id", l), p && n && (d = d.parentNode);
                            try {
                                if (!p || n)
                                    return s(d.querySelectorAll("[id='" + l + "'] " + b), e)
                            } catch (q) {
                            } finally {
                                k || j.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, d, e, f)
                };
                for (d in a)
                    m[d] = a[d];
                b = null
            }
        }(), function () {
            var c, d, a = H.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                c = !b.call(H.createElement("div"), "div"), d = !1;
                try {
                    b.call(H.documentElement, "[test!='']:sizzle")
                } catch (e) {
                    d = !0
                }
                m.matchesSelector = function (a, e) {
                    if (e = e.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']"), !m.isXML(a))
                        try {
                            if (d || !o.match.PSEUDO.test(e) && !/!=/.test(e)) {
                                var f = b.call(a, e);
                                if (f || !c || a.document && 11 !== a.document.nodeType)
                                    return f
                            }
                        } catch (g) {
                        }
                    return m(e, null, null, [a]).length > 0
                }
            }
        }(), function () {
            var a = H.createElement("div");
            if (a.innerHTML = "<div class='test e'></div><div class='test'></div>", a.getElementsByClassName && 0 !== a.getElementsByClassName("e").length) {
                if (a.lastChild.className = "e", 1 === a.getElementsByClassName("e").length)
                    return;
                o.order.splice(1, 0, "CLASS"), o.find.CLASS = function (a, b, c) {
                    return "undefined" == typeof b.getElementsByClassName || c ? void 0 : b.getElementsByClassName(a[1])
                }, a = null
            }
        }(), m.contains = H.documentElement.contains ? function (a, b) {
                return a !== b && (a.contains ? a.contains(b) : !0)
            } : H.documentElement.compareDocumentPosition ? function (a, b) {
                    return !!(16 & a.compareDocumentPosition(b))
                } : function () {
                    return !1
                }, m.isXML = function (a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, w = function (a, b, c) {
            for (var d, h, i, e = [], f = "", g = b.nodeType ? [b] : b; d = o.match.PSEUDO.exec(a);)
                f += d[0], a = a.replace(o.match.PSEUDO, "");
            for (a = o.relative[a] ? a + "*" : a, h = 0, i = g.length; i > h; h++)
                m(a, g[h], e, c);
            return m.filter(f, e)
        }, m.attr = K.attr, m.selectors.attrMap = {}, K.find = m, K.expr = m.selectors, K.expr[":"] = K.expr.filters, K.unique = m.uniqueSort, K.text = m.getText, K.isXMLDoc = m.isXML, K.contains = m.contains
    }(), ib = /Until$/, jb = /^(?:parents|prevUntil|prevAll)/, kb = /,/, lb = /^.[^:#\[\.,]*$/, mb = Array.prototype.slice, nb = K.expr.match.POS, ob = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    }, K.fn.extend({
        find: function (a) {
            var c, d, f, g, h, e, b = this;
            if ("string" != typeof a)
                return K(a).filter(function () {
                    for (c = 0, d = b.length; d > c; c++)
                        if (K.contains(b[c], this))
                            return !0
                });
            for (e = this.pushStack("", "find", a), c = 0, d = this.length; d > c; c++)
                if (f = e.length, K.find(a, this[c], e), c > 0)
                    for (g = f; g < e.length; g++)
                        for (h = 0; f > h; h++)
                            if (e[h] === e[g]) {
                                e.splice(g--, 1);
                                break
                            }
            return e
        }, has: function (a) {
            var b = K(a);
            return this.filter(function () {
                for (var a = 0, c = b.length; c > a; a++)
                    if (K.contains(this, b[a]))
                        return !0
            })
        }, not: function (a) {
            return this.pushStack(z(this, a, !1), "not", a)
        }, filter: function (a) {
            return this.pushStack(z(this, a, !0), "filter", a)
        }, is: function (a) {
            return !!a && ("string" == typeof a ? nb.test(a) ? K(a, this.context).index(this[0]) >= 0 : K.filter(a, this).length > 0 : this.filter(a).length > 0)
        }, closest: function (a, b) {
            var d, e, g, h, c = [], f = this[0];
            if (K.isArray(a)) {
                for (g = 1; f && f.ownerDocument && f !== b;) {
                    for (d = 0; d < a.length; d++)
                        K(f).is(a[d]) && c.push({selector: a[d], elem: f, level: g});
                    f = f.parentNode, g++
                }
                return c
            }
            for (h = nb.test(a) || "string" != typeof a ? K(a, b || this.context) : 0, d = 0, e = this.length; e > d; d++)
                for (f = this[d]; f;) {
                    if (h ? h.index(f) > -1 : K.find.matchesSelector(f, a)) {
                        c.push(f);
                        break
                    }
                    if (f = f.parentNode, !f || !f.ownerDocument || f === b || 11 === f.nodeType)
                        break
                }
            return c = c.length > 1 ? K.unique(c) : c, this.pushStack(c, "closest", a)
        }, index: function (a) {
            return a ? "string" == typeof a ? K.inArray(this[0], K(a)) : K.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        }, add: function (a, b) {
            var c = "string" == typeof a ? K(a, b) : K.makeArray(a && a.nodeType ? [a] : a), d = K.merge(this.get(), c);
            return this.pushStack(A(c[0]) || A(d[0]) ? d : K.unique(d))
        }, andSelf: function () {
            return this.add(this.prevObject)
        }
    }), K.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        }, parents: function (a) {
            return K.dir(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return K.dir(a, "parentNode", c)
        }, next: function (a) {
            return K.nth(a, 2, "nextSibling")
        }, prev: function (a) {
            return K.nth(a, 2, "previousSibling")
        }, nextAll: function (a) {
            return K.dir(a, "nextSibling")
        }, prevAll: function (a) {
            return K.dir(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return K.dir(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return K.dir(a, "previousSibling", c)
        }, siblings: function (a) {
            return K.sibling(a.parentNode.firstChild, a)
        }, children: function (a) {
            return K.sibling(a.firstChild)
        }, contents: function (a) {
            return K.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : K.makeArray(a.childNodes)
        }
    }, function (a, b) {
        K.fn[a] = function (c, d) {
            var e = K.map(this, b, c);
            return ib.test(a) || (d = c), d && "string" == typeof d && (e = K.filter(d, e)), e = this.length > 1 && !ob[a] ? K.unique(e) : e, (this.length > 1 || kb.test(d)) && jb.test(a) && (e = e.reverse()), this.pushStack(e, a, mb.call(arguments).join(","))
        }
    }), K.extend({
        filter: function (a, b, c) {
            return c && (a = ":not(" + a + ")"), 1 === b.length ? K.find.matchesSelector(b[0], a) ? [b[0]] : [] : K.find.matches(a, b)
        }, dir: function (a, c, d) {
            for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !K(f).is(d));)
                1 === f.nodeType && e.push(f), f = f[c];
            return e
        }, nth: function (a, b, c) {
            b = b || 1;
            for (var e = 0; a && (1 !== a.nodeType || ++e !== b); a = a[c])
                ;
            return a
        }, sibling: function (a, b) {
            for (var c = []; a; a = a.nextSibling)
                1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), pb = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", qb = / jQuery\d+="(?:\d+|null)"/g, rb = /^\s+/, sb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, tb = /<([\w:]+)/, ub = /<tbody/i, vb = /<|&#?\w+;/, wb = /<(?:script|style)/i, xb = /<(?:script|object|embed|option|style)/i, yb = new RegExp("<(?:" + pb + ")", "i"), zb = /checked\s*(?:[^=]|=\s*.checked.)/i, Ab = /\/(java|ecma)script/i, Bb = /^\s*<!(?:\[CDATA\[|\-\-)/, Cb = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    }, Db = y(H), Cb.optgroup = Cb.option, Cb.tbody = Cb.tfoot = Cb.colgroup = Cb.caption = Cb.thead, Cb.th = Cb.td, K.support.htmlSerialize || (Cb._default = [1, "div<div>", "</div>"]), K.fn.extend({
        text: function (a) {
            return K.isFunction(a) ? this.each(function (b) {
                    var c = K(this);
                    c.text(a.call(this, b, c.text()))
                }) : "object" != typeof a && a !== b ? this.empty().append((this[0] && this[0].ownerDocument || H).createTextNode(a)) : K.text(this)
        }, wrapAll: function (a) {
            if (K.isFunction(a))
                return this.each(function (b) {
                    K(this).wrapAll(a.call(this, b))
                });
            if (this[0]) {
                var b = K(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)
                        a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        }, wrapInner: function (a) {
            return K.isFunction(a) ? this.each(function (b) {
                    K(this).wrapInner(a.call(this, b))
                }) : this.each(function () {
                    var b = K(this), c = b.contents();
                    c.length ? c.wrapAll(a) : b.append(a)
                })
        }, wrap: function (a) {
            var b = K.isFunction(a);
            return this.each(function (c) {
                K(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                K.nodeName(this, "body") || K(this).replaceWith(this.childNodes)
            }).end()
        }, append: function () {
            return this.domManip(arguments, !0, function (a) {
                1 === this.nodeType && this.appendChild(a)
            })
        }, prepend: function () {
            return this.domManip(arguments, !0, function (a) {
                1 === this.nodeType && this.insertBefore(a, this.firstChild)
            })
        }, before: function () {
            if (this[0] && this[0].parentNode)
                return this.domManip(arguments, !1, function (a) {
                    this.parentNode.insertBefore(a, this)
                });
            if (arguments.length) {
                var a = K.clean(arguments);
                return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments)
            }
        }, after: function () {
            if (this[0] && this[0].parentNode)
                return this.domManip(arguments, !1, function (a) {
                    this.parentNode.insertBefore(a, this.nextSibling)
                });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                return a.push.apply(a, K.clean(arguments)), a
            }
        }, remove: function (a, b) {
            for (var d, c = 0; null != (d = this[c]); c++)
                (!a || K.filter(a, [d]).length) && (!b && 1 === d.nodeType && (K.cleanData(d.getElementsByTagName("*")), K.cleanData([d])), d.parentNode && d.parentNode.removeChild(d));
            return this
        }, empty: function () {
            for (var b, a = 0; null != (b = this[a]); a++)
                for (1 === b.nodeType && K.cleanData(b.getElementsByTagName("*")); b.firstChild;)
                    b.removeChild(b.firstChild);
            return this
        }, clone: function (a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                return K.clone(this, a, b)
            })
        }, html: function (a) {
            if (a === b)
                return this[0] && 1 === this[0].nodeType ? this[0].innerHTML.replace(qb, "") : null;
            if ("string" != typeof a || wb.test(a) || !K.support.leadingWhitespace && rb.test(a) || Cb[(tb.exec(a) || ["", ""])[1].toLowerCase()])
                K.isFunction(a) ? this.each(function (b) {
                        var c = K(this);
                        c.html(a.call(this, b, c.html()))
                    }) : this.empty().append(a);
            else {
                a = a.replace(sb, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; d > c; c++)
                        1 === this[c].nodeType && (K.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                } catch (e) {
                    this.empty().append(a)
                }
            }
            return this
        }, replaceWith: function (a) {
            return this[0] && this[0].parentNode ? K.isFunction(a) ? this.each(function (b) {
                        var c = K(this), d = c.html();
                        c.replaceWith(a.call(this, b, d))
                    }) : ("string" != typeof a && (a = K(a).detach()), this.each(function () {
                        var b = this.nextSibling, c = this.parentNode;
                        K(this).remove(), b ? K(b).before(a) : K(c).append(a)
                    })) : this.length ? this.pushStack(K(K.isFunction(a) ? a() : a), "replaceWith", a) : this
        }, detach: function (a) {
            return this.remove(a, !0)
        }, domManip: function (a, c, d) {
            var e, f, g, h, k, l, m, i = a[0], j = [];
            if (!K.support.checkClone && 3 === arguments.length && "string" == typeof i && zb.test(i))
                return this.each(function () {
                    K(this).domManip(a, c, d, !0)
                });
            if (K.isFunction(i))
                return this.each(function (e) {
                    var f = K(this);
                    a[0] = i.call(this, e, c ? f.html() : b), f.domManip(a, c, d)
                });
            if (this[0]) {
                if (h = i && i.parentNode, e = K.support.parentNode && h && 11 === h.nodeType && h.childNodes.length === this.length ? {fragment: h} : K.buildFragment(a, this, j), g = e.fragment, f = 1 === g.childNodes.length ? g = g.firstChild : g.firstChild, f)
                    for (c = c && K.nodeName(f, "tr"), k = 0, l = this.length, m = l - 1; l > k; k++)
                        d.call(c ? x(this[k], f) : this[k], e.cacheable || l > 1 && m > k ? K.clone(g, !0, !0) : g);
                j.length && K.each(j, q)
            }
            return this
        }
    }), K.buildFragment = function (a, b, c) {
        var d, e, f, g, h = a[0];
        return b && b[0] && (g = b[0].ownerDocument || b[0]), g.createDocumentFragment || (g = H), 1 === a.length && "string" == typeof h && h.length < 512 && g === H && "<" === h.charAt(0) && !xb.test(h) && (K.support.checkClone || !zb.test(h)) && (K.support.html5Clone || !yb.test(h)) && (e = !0, f = K.fragments[h], f && 1 !== f && (d = f)), d || (d = g.createDocumentFragment(), K.clean(a, g, d, c)), e && (K.fragments[h] = f ? d : 1), {
            fragment: d,
            cacheable: e
        }
    }, K.fragments = {}, K.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        K.fn[a] = function (c) {
            var g, h, i, d = [], e = K(c), f = 1 === this.length && this[0].parentNode;
            if (f && 11 === f.nodeType && 1 === f.childNodes.length && 1 === e.length)
                return e[b](this[0]), this;
            for (g = 0, h = e.length; h > g; g++)
                i = (g > 0 ? this.clone(!0) : this).get(), K(e[g])[b](i), d = d.concat(i);
            return this.pushStack(d, a, e.selector)
        }
    }), K.extend({
        clone: function (a, b, c) {
            var d, e, f, g = K.support.html5Clone || !yb.test("<" + a.nodeName) ? a.cloneNode(!0) : r(a);
            if (!(K.support.noCloneEvent && K.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || K.isXMLDoc(a)))
                for (v(a, g), d = u(a), e = u(g), f = 0; d[f]; ++f)
                    e[f] && v(d[f], e[f]);
            if (b && (w(a, g), c))
                for (d = u(a), e = u(g), f = 0; d[f]; ++f)
                    w(d[f], e[f]);
            return d = e = null, g
        }, clean: function (a, b, c, d) {
            var e, g, f, i, h, j, k, l, m, n, o, p, q;
            for (b = b || H, "undefined" == typeof b.createElement && (b = b.ownerDocument || b[0] && b[0].ownerDocument || H), f = [], h = 0; null != (i = a[h]); h++)
                if ("number" == typeof i && (i += ""), i) {
                    if ("string" == typeof i)
                        if (vb.test(i)) {
                            for (i = i.replace(sb, "<$1></$2>"), j = (tb.exec(i) || ["", ""])[1].toLowerCase(), k = Cb[j] || Cb._default, l = k[0], m = b.createElement("div"), b === H ? Db.appendChild(m) : y(b).appendChild(m), m.innerHTML = k[1] + i + k[2]; l--;)
                                m = m.lastChild;
                            if (!K.support.tbody)
                                for (n = ub.test(i), o = "table" !== j || n ? "<table>" !== k[1] || n ? [] : m.childNodes : m.firstChild && m.firstChild.childNodes, g = o.length - 1; g >= 0; --g)
                                    K.nodeName(o[g], "tbody") && !o[g].childNodes.length && o[g].parentNode.removeChild(o[g]);
                            !K.support.leadingWhitespace && rb.test(i) && m.insertBefore(b.createTextNode(rb.exec(i)[0]), m.firstChild), i = m.childNodes
                        } else
                            i = b.createTextNode(i);
                    if (!K.support.appendChecked)
                        if (i[0] && "number" == typeof (p = i.length))
                            for (g = 0; p > g; g++)
                                s(i[g]);
                        else
                            s(i);
                    i.nodeType ? f.push(i) : f = K.merge(f, i)
                }
            if (c)
                for (e = function (a) {
                    return !a.type || Ab.test(a.type)
                }, h = 0; f[h]; h++)
                    !d || !K.nodeName(f[h], "script") || f[h].type && "text/javascript" !== f[h].type.toLowerCase() ? (1 === f[h].nodeType && (q = K.grep(f[h].getElementsByTagName("script"), e), f.splice.apply(f, [h + 1, 0].concat(q))), c.appendChild(f[h])) : d.push(f[h].parentNode ? f[h].parentNode.removeChild(f[h]) : f[h]);
            return f
        }, cleanData: function (a) {
            var b, c, h, g, i, d = K.cache, e = K.event.special, f = K.support.deleteExpando;
            for (g = 0; null != (h = a[g]); g++)
                if ((!h.nodeName || !K.noData[h.nodeName.toLowerCase()]) && (c = h[K.expando])) {
                    if (b = d[c], b && b.events) {
                        for (i in b.events)
                            e[i] ? K.event.remove(h, i) : K.removeEvent(h, i, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    f ? delete h[K.expando] : h.removeAttribute && h.removeAttribute(K.expando), delete d[c]
                }
        }
    }), Eb = /alpha\([^)]*\)/i, Fb = /opacity=([^)]*)/, Gb = /([A-Z]|^ms)/g, Hb = /^-?\d+(?:px)?$/i, Ib = /^-?\d/, Jb = /^([\-+])=([\-+.\de]+)/, Kb = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Lb = ["Left", "Right"], Mb = ["Top", "Bottom"], K.fn.css = function (a, c) {
        return 2 === arguments.length && c === b ? this : K.access(this, a, c, !0, function (a, c, d) {
                return d !== b ? K.style(a, c, d) : K.css(a, c)
            })
    }, K.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = Nb(a, "opacity", "opacity");
                        return "" === c ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": K.support.cssFloat ? "cssFloat" : "styleFloat"},
        style: function (a, c, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f, g, h = K.camelCase(c), i = a.style, j = K.cssHooks[h];
                if (c = K.cssProps[h] || h, d === b)
                    return j && "get" in j && (f = j.get(a, !1, e)) !== b ? f : i[c];
                if (g = typeof d, "string" === g && (f = Jb.exec(d)) && (d = +(f[1] + 1) * +f[2] + parseFloat(K.css(a, c)), g = "number"), null == d || "number" === g && isNaN(d))
                    return;
                if ("number" === g && !K.cssNumber[h] && (d += "px"), !(j && "set" in j && (d = j.set(a, d)) === b))
                    try {
                        i[c] = d
                    } catch (k) {
                    }
            }
        },
        css: function (a, c, d) {
            var e, f;
            return c = K.camelCase(c), f = K.cssHooks[c], c = K.cssProps[c] || c, "cssFloat" === c && (c = "float"), f && "get" in f && (e = f.get(a, !0, d)) !== b ? e : Nb ? Nb(a, c) : void 0
        },
        swap: function (a, b, c) {
            var e, d = {};
            for (e in b)
                d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b)
                a.style[e] = d[e]
        }
    }), K.curCSS = K.css, K.each(["height", "width"], function (a, b) {
        K.cssHooks[b] = {
            get: function (a, c, d) {
                var e;
                return c ? 0 !== a.offsetWidth ? p(a, b, d) : (K.swap(a, Kb, function () {
                            e = p(a, b, d)
                        }), e) : void 0
            }, set: function (a, b) {
                return Hb.test(b) ? (b = parseFloat(b), b >= 0 ? b + "px" : void 0) : b
            }
        }
    }), K.support.opacity || (K.cssHooks.opacity = {
        get: function (a, b) {
            return Fb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        }, set: function (a, b) {
            var c = a.style, d = a.currentStyle, e = K.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
            c.zoom = 1, b >= 1 && "" === K.trim(f.replace(Eb, "")) && (c.removeAttribute("filter"), d && !d.filter) || (c.filter = Eb.test(f) ? f.replace(Eb, e) : f + " " + e)
        }
    }), K(function () {
        K.support.reliableMarginRight || (K.cssHooks.marginRight = {
            get: function (a, b) {
                var c;
                return K.swap(a, {display: "inline-block"}, function () {
                    c = b ? Nb(a, "margin-right", "marginRight") : a.style.marginRight
                }), c
            }
        })
    }), H.defaultView && H.defaultView.getComputedStyle && (Ob = function (a, b) {
        var c, d, e;
        return b = b.replace(Gb, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), "" === c && !K.contains(a.ownerDocument.documentElement, a) && (c = K.style(a, b))), c
    }), H.documentElement.currentStyle && (Pb = function (a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        return null === f && g && (e = g[b]) && (f = e), !Hb.test(f) && Ib.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = "fontSize" === b ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d)), "" === f ? "auto" : f
    }), Nb = Ob || Pb, K.expr && K.expr.filters && (K.expr.filters.hidden = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return 0 === b && 0 === c || !K.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || K.css(a, "display"))
    }, K.expr.filters.visible = function (a) {
        return !K.expr.filters.hidden(a)
    }), Qb = /%20/g, Rb = /\[\]$/, Sb = /\r?\n/g, Tb = /#.*$/, Ub = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Vb = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, Wb = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Xb = /^(?:GET|HEAD)$/, Yb = /^\/\//, Zb = /\?/, $b = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, _b = /^(?:select|textarea)/i, ac = /\s+/, bc = /([?&])_=[^&]*/, cc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, dc = K.fn.load, ec = {}, fc = {}, ic = ["*/"] + ["*"];
    try {
        gc = J.href
    } catch (jc) {
        gc = H.createElement("a"), gc.href = "", gc = gc.href
    }
    hc = cc.exec(gc.toLowerCase()) || [], K.fn.extend({
        load: function (a, c, d) {
            var e, f, g, h;
            return "string" != typeof a && dc ? dc.apply(this, arguments) : this.length ? (e = a.indexOf(" "), e >= 0 && (f = a.slice(e, a.length), a = a.slice(0, e)), g = "GET", c && (K.isFunction(c) ? (d = c, c = b) : "object" == typeof c && (c = K.param(c, K.ajaxSettings.traditional), g = "POST")), h = this, K.ajax({
                        url: a, type: g, dataType: "html", data: c, complete: function (a, b, c) {
                            c = a.responseText, a.isResolved() && (a.done(function (a) {
                                c = a
                            }), h.html(f ? K("<div>").append(c.replace($b, "")).find(f) : c)), d && h.each(d, [c, b, a])
                        }
                    }), this) : this
        }, serialize: function () {
            return K.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                return this.elements ? K.makeArray(this.elements) : this
            }).filter(function () {
                return this.name && !this.disabled && (this.checked || _b.test(this.nodeName) || Vb.test(this.type))
            }).map(function (a, b) {
                var c = K(this).val();
                return null == c ? null : K.isArray(c) ? K.map(c, function (a) {
                            return {name: b.name, value: a.replace(Sb, "\r\n")}
                        }) : {name: b.name, value: c.replace(Sb, "\r\n")}
            }).get()
        }
    }), K.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        K.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), K.each(["get", "post"], function (a, c) {
        K[c] = function (a, d, e, f) {
            return K.isFunction(d) && (f = f || e, e = d, d = b), K.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: f
            })
        }
    }), K.extend({
        getScript: function (a, c) {
            return K.get(a, b, c, "script")
        },
        getJSON: function (a, b, c) {
            return K.get(a, b, c, "json")
        },
        ajaxSetup: function (a, b) {
            return b ? m(a, K.ajaxSettings) : (b = a, a = K.ajaxSettings), m(a, b), a
        },
        ajaxSettings: {
            url: gc,
            isLocal: Wb.test(hc[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": ic
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText"},
            converters: {"* text": a.String, "text html": !0, "text json": K.parseJSON, "text xml": K.parseXML},
            flatOptions: {context: !0, url: !0}
        },
        ajaxPrefilter: o(ec),
        ajaxTransport: o(fc),
        ajax: function (a, c) {
            function d(a, c, d, n) {
                if (2 !== v) {
                    v = 2, t && clearTimeout(t), s = b, q = n || "", y.readyState = a > 0 ? 4 : 0;
                    var o, p, r, z, A, u = c, x = d ? k(e, y, d) : b;
                    if (a >= 200 && 300 > a || 304 === a)
                        if (e.ifModified && ((z = y.getResponseHeader("Last-Modified")) && (K.lastModified[m] = z), (A = y.getResponseHeader("Etag")) && (K.etag[m] = A)), 304 === a)
                            u = "notmodified", o = !0;
                        else
                            try {
                                p = j(e, x), u = "success", o = !0
                            } catch (B) {
                                u = "parsererror", r = B
                            }
                    else
                        r = u, (!u || a) && (u = "error", 0 > a && (a = 0));
                    y.status = a, y.statusText = "" + (c || u), o ? h.resolveWith(f, [p, u, y]) : h.rejectWith(f, [y, u, r]), y.statusCode(l), l = b, w && g.trigger("ajax" + (o ? "Success" : "Error"), [y, e, o ? p : r]), i.fireWith(f, [y, u]), w && (g.trigger("ajaxComplete", [y, e]), --K.active || K.event.trigger("ajaxStop"))
                }
            }

            var m, q, r, s, t, u, w, x, e, f, g, h, i, l, o, p, v, y, z, A;
            if ("object" == typeof a && (c = a, a = b), c = c || {}, e = K.ajaxSetup({}, c), f = e.context || e, g = f !== e && (f.nodeType || f instanceof K) ? K(f) : K.event, h = K.Deferred(), i = K.Callbacks("once memory"), l = e.statusCode || {}, o = {}, p = {}, v = 0, y = {
                    readyState: 0, setRequestHeader: function (a, b) {
                        if (!v) {
                            var c = a.toLowerCase();
                            a = p[c] = p[c] || a, o[a] = b
                        }
                        return this
                    }, getAllResponseHeaders: function () {
                        return 2 === v ? q : null
                    }, getResponseHeader: function (a) {
                        var c;
                        if (2 === v) {
                            if (!r)
                                for (r = {}; c = Ub.exec(q);)
                                    r[c[1].toLowerCase()] = c[2];
                            c = r[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    }, overrideMimeType: function (a) {
                        return v || (e.mimeType = a), this
                    }, abort: function (a) {
                        return a = a || "abort", s && s.abort(a), d(0, a), this
                    }
                }, h.promise(y), y.success = y.done, y.error = y.fail, y.complete = i.add, y.statusCode = function (a) {
                    if (a) {
                        var b;
                        if (2 > v)
                            for (b in a)
                                l[b] = [l[b], a[b]];
                        else
                            b = a[y.status], y.then(b, b)
                    }
                    return this
                }, e.url = ((a || e.url) + "").replace(Tb, "").replace(Yb, hc[1] + "//"), e.dataTypes = K.trim(e.dataType || "*").toLowerCase().split(ac), null == e.crossDomain && (u = cc.exec(e.url.toLowerCase()), e.crossDomain = !(!u || u[1] == hc[1] && u[2] == hc[2] && (u[3] || ("http:" === u[1] ? 80 : 443)) == (hc[3] || ("http:" === hc[1] ? 80 : 443)))), e.data && e.processData && "string" != typeof e.data && (e.data = K.param(e.data, e.traditional)), n(ec, e, c, y), 2 === v)
                return !1;
            w = e.global, e.type = e.type.toUpperCase(), e.hasContent = !Xb.test(e.type), w && 0 === K.active++ && K.event.trigger("ajaxStart"), e.hasContent || (e.data && (e.url += (Zb.test(e.url) ? "&" : "?") + e.data, delete e.data), m = e.url, e.cache === !1 && (z = K.now(), A = e.url.replace(bc, "$1_=" + z), e.url = A + (A === e.url ? (Zb.test(e.url) ? "&" : "?") + "_=" + z : ""))), (e.data && e.hasContent && e.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", e.contentType), e.ifModified && (m = m || e.url, K.lastModified[m] && y.setRequestHeader("If-Modified-Since", K.lastModified[m]), K.etag[m] && y.setRequestHeader("If-None-Match", K.etag[m])), y.setRequestHeader("Accept", e.dataTypes[0] && e.accepts[e.dataTypes[0]] ? e.accepts[e.dataTypes[0]] + ("*" !== e.dataTypes[0] ? ", " + ic + "; q=0.01" : "") : e.accepts["*"]);
            for (x in e.headers)
                y.setRequestHeader(x, e.headers[x]);
            if (e.beforeSend && (e.beforeSend.call(f, y, e) === !1 || 2 === v))
                return y.abort(), !1;
            for (x in{success: 1, error: 1, complete: 1})
                y[x](e[x]);
            if (s = n(fc, e, c, y)) {
                y.readyState = 1, w && g.trigger("ajaxSend", [y, e]), e.async && e.timeout > 0 && (t = setTimeout(function () {
                    y.abort("timeout")
                }, e.timeout));
                try {
                    v = 1, s.send(o, d)
                } catch (B) {
                    if (!(2 > v))
                        throw B;
                    d(-1, B)
                }
            } else
                d(-1, "No Transport");
            return y
        },
        param: function (a, c) {
            var f, d = [], e = function (a, b) {
                b = K.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
            if (c === b && (c = K.ajaxSettings.traditional), K.isArray(a) || a.jquery && !K.isPlainObject(a))
                K.each(a, function () {
                    e(this.name, this.value)
                });
            else
                for (f in a)
                    l(f, a[f], c, e);
            return d.join("&").replace(Qb, "+")
        }
    }), K.extend({active: 0, lastModified: {}, etag: {}}), kc = K.now(), lc = /(\=)\?(&|$)|\?\?/i, K.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            return K.expando + "_" + kc++
        }
    }), K.ajaxPrefilter("json jsonp", function (b, c, d) {
        var f, g, h, i, j, k, e = "application/x-www-form-urlencoded" === b.contentType && "string" == typeof b.data;
        return "jsonp" === b.dataTypes[0] || b.jsonp !== !1 && (lc.test(b.url) || e && lc.test(b.data)) ? (g = b.jsonpCallback = K.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h = a[g], i = b.url, j = b.data, k = "$1" + g + "$2", b.jsonp !== !1 && (i = i.replace(lc, k), b.url === i && (e && (j = j.replace(lc, k)), b.data === j && (i += (/\?/.test(i) ? "&" : "?") + b.jsonp + "=" + g))), b.url = i, b.data = j, a[g] = function (a) {
                f = [a]
            }, d.always(function () {
                a[g] = h, f && K.isFunction(h) && a[g](f[0])
            }), b.converters["script json"] = function () {
                return f || K.error(g + " was not called"), f[0]
            }, b.dataTypes[0] = "json", "script") : void 0
    }), K.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /javascript|ecmascript/},
        converters: {
            "text script": function (a) {
                return K.globalEval(a), a
            }
        }
    }), K.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), K.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var c, d = H.head || H.getElementsByTagName("head")[0] || H.documentElement;
            return {
                send: function (e, f) {
                    c = H.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, e) {
                        (e || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || f(200, "success"))
                    }, d.insertBefore(c, d.firstChild)
                }, abort: function () {
                    c && c.onload(0, 1)
                }
            }
        }
    }), mc = a.ActiveXObject ? function () {
            for (var a in oc)
                oc[a](0, 1)
        } : !1, nc = 0, K.ajaxSettings.xhr = a.ActiveXObject ? function () {
            return !this.isLocal && i() || h()
        } : i, function (a) {
        K.extend(K.support, {ajax: !!a, cors: !!a && "withCredentials" in a})
    }(K.ajaxSettings.xhr()), K.support.ajax && K.ajaxTransport(function (c) {
        if (!c.crossDomain || K.support.cors) {
            var d;
            return {
                send: function (e, f) {
                    var h, i, g = c.xhr();
                    if (c.username ? g.open(c.type, c.url, c.async, c.username, c.password) : g.open(c.type, c.url, c.async), c.xhrFields)
                        for (i in c.xhrFields)
                            g[i] = c.xhrFields[i];
                    c.mimeType && g.overrideMimeType && g.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (i in e)
                            g.setRequestHeader(i, e[i])
                    } catch (j) {
                    }
                    g.send(c.hasContent && c.data || null), d = function (a, e) {
                        var i, j, k, l, m;
                        try {
                            if (d && (e || 4 === g.readyState))
                                if (d = b, h && (g.onreadystatechange = K.noop, mc && delete oc[h]), e)
                                    4 !== g.readyState && g.abort();
                                else {
                                    i = g.status, k = g.getAllResponseHeaders(), l = {}, m = g.responseXML, m && m.documentElement && (l.xml = m), l.text = g.responseText;
                                    try {
                                        j = g.statusText
                                    } catch (n) {
                                        j = ""
                                    }
                                    i || !c.isLocal || c.crossDomain ? 1223 === i && (i = 204) : i = l.text ? 200 : 404
                                }
                        } catch (o) {
                            e || f(-1, o)
                        }
                        l && f(i, j, l, k)
                    }, c.async && 4 !== g.readyState ? (h = ++nc, mc && (oc || (oc = {}, K(a).unload(mc)), oc[h] = d), g.onreadystatechange = d) : d()
                }, abort: function () {
                    d && d(0, 1)
                }
            }
        }
    }), pc = {}, sc = /^(?:toggle|show|hide)$/, tc = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, vc = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]], K.fn.extend({
        show: function (a, b, c) {
            var f, g, h, i;
            if (a || 0 === a)
                return this.animate(e("show", 3), a, b, c);
            for (h = 0, i = this.length; i > h; h++)
                f = this[h], f.style && (g = f.style.display, !K._data(f, "olddisplay") && "none" === g && (g = f.style.display = ""), "" === g && "none" === K.css(f, "display") && K._data(f, "olddisplay", d(f.nodeName)));
            for (h = 0; i > h; h++)
                f = this[h], f.style && (g = f.style.display, ("" === g || "none" === g) && (f.style.display = K._data(f, "olddisplay") || ""));
            return this
        }, hide: function (a, b, c) {
            if (a || 0 === a)
                return this.animate(e("hide", 3), a, b, c);
            for (var d, f, g = 0, h = this.length; h > g; g++)
                d = this[g], d.style && (f = K.css(d, "display"), "none" !== f && !K._data(d, "olddisplay") && K._data(d, "olddisplay", f));
            for (g = 0; h > g; g++)
                this[g].style && (this[g].style.display = "none");
            return this
        }, _toggle: K.fn.toggle, toggle: function (a, b, c) {
            var d = "boolean" == typeof a;
            return K.isFunction(a) && K.isFunction(b) ? this._toggle.apply(this, arguments) : null == a || d ? this.each(function () {
                        var b = d ? a : K(this).is(":hidden");
                        K(this)[b ? "show" : "hide"]()
                    }) : this.animate(e("toggle", 3), a, b, c), this
        }, fadeTo: function (a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, e) {
            function f() {
                g.queue === !1 && K._mark(this);
                var f, h, i, j, k, l, m, n, o, b = K.extend({}, g), c = 1 === this.nodeType, e = c && K(this).is(":hidden");
                b.animatedProperties = {};
                for (i in a) {
                    if (f = K.camelCase(i), i !== f && (a[f] = a[i], delete a[i]), h = a[f], K.isArray(h) ? (b.animatedProperties[f] = h[1], h = a[f] = h[0]) : b.animatedProperties[f] = b.specialEasing && b.specialEasing[f] || b.easing || "swing", "hide" === h && e || "show" === h && !e)
                        return b.complete.call(this);
                    c && ("height" === f || "width" === f) && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], "inline" === K.css(this, "display") && "none" === K.css(this, "float") && (K.support.inlineBlockNeedsLayout && "inline" !== d(this.nodeName) ? this.style.zoom = 1 : this.style.display = "inline-block"))
                }
                null != b.overflow && (this.style.overflow = "hidden");
                for (i in a)
                    j = new K.fx(this, b, i), h = a[i], sc.test(h) ? (o = K._data(this, "toggle" + i) || ("toggle" === h ? e ? "show" : "hide" : 0), o ? (K._data(this, "toggle" + i, "show" === o ? "hide" : "show"), j[o]()) : j[h]()) : (k = tc.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (K.cssNumber[i] ? "" : "px"), "px" !== n && (K.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, K.style(this, i, l + n)), k[1] && (m = ("-=" === k[1] ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
                return !0
            }

            var g = K.speed(b, c, e);
            return K.isEmptyObject(a) ? this.each(g.complete, [!1]) : (a = K.extend({}, a), g.queue === !1 ? this.each(f) : this.queue(g.queue, f))
        }, stop: function (a, c, d) {
            return "string" != typeof a && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                function b(a, b, c) {
                    var e = b[c];
                    K.removeData(a, c, !0), e.stop(d)
                }

                var c, e = !1, f = K.timers, g = K._data(this);
                if (d || K._unmark(!0, this), null == a)
                    for (c in g)
                        g[c] && g[c].stop && c.indexOf(".run") === c.length - 4 && b(this, g, c);
                else
                    g[c = a + ".run"] && g[c].stop && b(this, g, c);
                for (c = f.length; c--;)
                    f[c].elem === this && (null == a || f[c].queue === a) && (d ? f[c](!0) : f[c].saveState(), e = !0, f.splice(c, 1));
                (!d || !e) && K.dequeue(this, a)
            })
        }
    }), K.each({
        slideDown: e("show", 1),
        slideUp: e("hide", 1),
        slideToggle: e("toggle", 1),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        K.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), K.extend({
        speed: function (a, b, c) {
            var d = a && "object" == typeof a ? K.extend({}, a) : {
                    complete: c || !c && b || K.isFunction(a) && a,
                    duration: a,
                    easing: c && b || b && !K.isFunction(b) && b
                };
            return d.duration = K.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in K.fx.speeds ? K.fx.speeds[d.duration] : K.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function (a) {
                K.isFunction(d.old) && d.old.call(this), d.queue ? K.dequeue(this, d.queue) : a !== !1 && K._unmark(this)
            }, d
        }, easing: {
            linear: function (a, b, c, d) {
                return c + d * a
            }, swing: function (a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        }, timers: [], fx: function (a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), K.fx.prototype = {
        update: function () {
            this.options.step && this.options.step.call(this.elem, this.now, this), (K.fx.step[this.prop] || K.fx.step._default)(this)
        }, cur: function () {
            if (null != this.elem[this.prop] && (!this.elem.style || null == this.elem.style[this.prop]))
                return this.elem[this.prop];
            var a, b = K.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? b && "auto" !== b ? b : 0 : a
        }, custom: function (a, c, d) {
            function e(a) {
                return f.step(a)
            }

            var f = this, h = K.fx;
            this.startTime = wc || g(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (K.cssNumber[this.prop] ? "" : "px"), e.queue = this.options.queue, e.elem = this.elem, e.saveState = function () {
                f.options.hide && K._data(f.elem, "fxshow" + f.prop) === b && K._data(f.elem, "fxshow" + f.prop, f.start)
            }, e() && K.timers.push(e) && !uc && (uc = setInterval(h.tick, h.interval))
        }, show: function () {
            var a = K._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || K.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom("width" === this.prop || "height" === this.prop ? 1 : 0, this.cur()), K(this.elem).show()
        }, hide: function () {
            this.options.orig[this.prop] = K._data(this.elem, "fxshow" + this.prop) || K.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        }, step: function (a) {
            var b, c, d, e = wc || g(), f = !0, h = this.elem, i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties)
                    i.animatedProperties[b] !== !0 && (f = !1);
                if (f) {
                    if (null != i.overflow && !K.support.shrinkWrapBlocks && K.each(["", "X", "Y"], function (a, b) {
                            h.style["overflow" + b] = i.overflow[a]
                        }), i.hide && K(h).hide(), i.hide || i.show)
                        for (b in i.animatedProperties)
                            K.style(h, b, i.orig[b]), K.removeData(h, "fxshow" + b, !0), K.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            return 1 / 0 == i.duration ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = K.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
        }
    }, K.extend(K.fx, {
        tick: function () {
            for (var a, b = K.timers, c = 0; c < b.length; c++)
                a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || K.fx.stop()
        }, interval: 13, stop: function () {
            clearInterval(uc), uc = null
        }, speeds: {slow: 600, fast: 200, _default: 400}, step: {
            opacity: function (a) {
                K.style(a.elem, "opacity", a.now)
            }, _default: function (a) {
                a.elem.style && null != a.elem.style[a.prop] ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), K.each(["width", "height"], function (a, b) {
        K.fx.step[b] = function (a) {
            K.style(a.elem, b, Math.max(0, a.now) + a.unit)
        }
    }), K.expr && K.expr.filters && (K.expr.filters.animated = function (a) {
        return K.grep(K.timers, function (b) {
            return a === b.elem
        }).length
    }), xc = /^t(?:able|d|h)$/i, yc = /^(?:body|html)$/i, K.fn.offset = "getBoundingClientRect" in H.documentElement ? function (a) {
            var d, f, g, h, i, j, k, l, m, n, o, b = this[0];
            if (a)
                return this.each(function (b) {
                    K.offset.setOffset(this, a, b)
                });
            if (!b || !b.ownerDocument)
                return null;
            if (b === b.ownerDocument.body)
                return K.offset.bodyOffset(b);
            try {
                d = b.getBoundingClientRect()
            } catch (e) {
            }
            return f = b.ownerDocument, g = f.documentElement, d && K.contains(g, b) ? (h = f.body, i = c(f), j = g.clientTop || h.clientTop || 0, k = g.clientLeft || h.clientLeft || 0, l = i.pageYOffset || K.support.boxModel && g.scrollTop || h.scrollTop, m = i.pageXOffset || K.support.boxModel && g.scrollLeft || h.scrollLeft, n = d.top + l - j, o = d.left + m - k, {
                    top: n,
                    left: o
                }) : d ? {top: d.top, left: d.left} : {top: 0, left: 0}
        } : function (a) {
            var c, d, e, f, g, h, i, j, k, l, b = this[0];
            if (a)
                return this.each(function (b) {
                    K.offset.setOffset(this, a, b)
                });
            if (!b || !b.ownerDocument)
                return null;
            if (b === b.ownerDocument.body)
                return K.offset.bodyOffset(b);
            for (d = b.offsetParent, e = b, f = b.ownerDocument, g = f.documentElement, h = f.body, i = f.defaultView, j = i ? i.getComputedStyle(b, null) : b.currentStyle, k = b.offsetTop, l = b.offsetLeft; (b = b.parentNode) && b !== h && b !== g && (!K.support.fixedPosition || "fixed" !== j.position);)
                c = i ? i.getComputedStyle(b, null) : b.currentStyle, k -= b.scrollTop, l -= b.scrollLeft, b === d && (k += b.offsetTop, l += b.offsetLeft, K.support.doesNotAddBorder && (!K.support.doesAddBorderForTableAndCells || !xc.test(b.nodeName)) && (k += parseFloat(c.borderTopWidth) || 0, l += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), K.support.subtractsBorderForOverflowNotVisible && "visible" !== c.overflow && (k += parseFloat(c.borderTopWidth) || 0, l += parseFloat(c.borderLeftWidth) || 0), j = c;
            return ("relative" === j.position || "static" === j.position) && (k += h.offsetTop, l += h.offsetLeft), K.support.fixedPosition && "fixed" === j.position && (k += Math.max(g.scrollTop, h.scrollTop), l += Math.max(g.scrollLeft, h.scrollLeft)), {
                top: k,
                left: l
            }
        }, K.offset = {
        bodyOffset: function (a) {
            var b = a.offsetTop, c = a.offsetLeft;
            return K.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(K.css(a, "marginTop")) || 0, c += parseFloat(K.css(a, "marginLeft")) || 0), {
                top: b,
                left: c
            }
        }, setOffset: function (a, b, c) {
            var l, m, e, f, g, h, i, j, k, d = K.css(a, "position");
            "static" === d && (a.style.position = "relative"), e = K(a), f = e.offset(), g = K.css(a, "top"), h = K.css(a, "left"), i = ("absolute" === d || "fixed" === d) && K.inArray("auto", [g, h]) > -1, j = {}, k = {}, i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), K.isFunction(b) && (b = b.call(a, c, f)), null != b.top && (j.top = b.top - f.top + l), null != b.left && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j)
        }
    }, K.fn.extend({
        position: function () {
            if (!this[0])
                return null;
            var a = this[0], b = this.offsetParent(), c = this.offset(), d = yc.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            return c.top -= parseFloat(K.css(a, "marginTop")) || 0, c.left -= parseFloat(K.css(a, "marginLeft")) || 0, d.top += parseFloat(K.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(K.css(b[0], "borderLeftWidth")) || 0, {
                top: c.top - d.top,
                left: c.left - d.left
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var a = this.offsetParent || H.body; a && !yc.test(a.nodeName) && "static" === K.css(a, "position");)
                    a = a.offsetParent;
                return a
            })
        }
    }), K.each(["Left", "Top"], function (a, d) {
        var e = "scroll" + d;
        K.fn[e] = function (d) {
            var f, g;
            return d === b ? (f = this[0]) ? (g = c(f), g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : K.support.boxModel && g.document.documentElement[e] || g.document.body[e] : f[e]) : null : this.each(function () {
                    g = c(this), g ? g.scrollTo(a ? K(g).scrollLeft() : d, a ? d : K(g).scrollTop()) : this[e] = d
                })
        }
    }), K.each(["Height", "Width"], function (a, c) {
        var d = c.toLowerCase();
        K.fn["inner" + c] = function () {
            var a = this[0];
            return a ? a.style ? parseFloat(K.css(a, d, "padding")) : this[d]() : null
        }, K.fn["outer" + c] = function (a) {
            var b = this[0];
            return b ? b.style ? parseFloat(K.css(b, d, a ? "margin" : "border")) : this[d]() : null
        }, K.fn[d] = function (a) {
            var f, g, h, i, e = this[0];
            return e ? K.isFunction(a) ? this.each(function (b) {
                        var c = K(this);
                        c[d](a.call(this, b, c[d]()))
                    }) : K.isWindow(e) ? (f = e.document.documentElement["client" + c], g = e.document.body, "CSS1Compat" === e.document.compatMode && f || g && g["client" + c] || f) : 9 === e.nodeType ? Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]) : a === b ? (h = K.css(e, d), i = parseFloat(h), K.isNumeric(i) ? i : h) : this.css(d, "string" == typeof a ? a : a + "px") : null == a ? null : this
        }
    }), a.jQuery = a.$ = K, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return K
    })
}(window), String.prototype.toDate = function (a, b) {
    var c, d, e, f;
    return null == a && (a = "-"), null == b && (b = "ymd"), c = this.split(a), d = parseInt(c[b.indexOf("y")]), d.toString().length <= 2 && (d += 2e3), isNaN(d) && (d = (new Date).getFullYear()), e = parseInt(c[b.indexOf("m")]) - 1, f = parseInt(c[b.indexOf("d")]), isNaN(f) && (f = 1), new Date(d, e, f)
}, Date.prototype.format = function (a) {
    var c, b = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "w+": "天一二三四五六".charAt(this.getDay()),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (c in b)
        new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
    return a
}, AS = {}, AS.isBlank = function (a) {
    var b = AS.trimSBCcase(AS.trim(a));
    return 0 == b.length ? !0 : !1
}, AS.trim = function (a) {
    a = (a || "").replace(/^\s\s*/, "");
    for (var b = /\s/, c = a.length; b.test(a.charAt(--c));)
        ;
    return a.slice(0, c + 1)
}, AS.byteLength = function (a) {
    return (a || "").replace(/[^\x00-\xff]/g, "**").length
}, AS.trimSBCcase = function (a) {
    return (a || "").replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g, "")
}, AS.adjustStr = function (a, b) {
    var c, d, e, f, g;
    if (AS.byteLength(a) < b)
        return a;
    for (c = [], d = 0, e = 0, f = (a || "").length; f > e; e++)
        g = a.charAt(e), d += AS.byteLength(g), b >= d && (c[e] = g);
    return c.push("..."), c.join("")
}, AS.length = function (a) {
    var c, b = 0;
    for (c = 0; c < a.length; c++)
        b += "\n" == a.charAt(c) ? 2 : this.isChineses(a.charAt(c)) ? 2 : 1;
    return b
}, AS.isChineses = function (a) {
    var c, b = !0;
    for (c = 0; c < a.length; c++)
        b = b && a.charCodeAt(c) >= 256;
    return b
}, AS.isInRange = function (a, b, c) {
    var e, d = !0;
    return (0 != c || 0 != b) && (a = this.trim(a), e = this.length(a), (e > c || b > e) && (d = !1)), d
}, AS.isValidUrl = function (a) {
    var b = new RegExp("http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?");
    return b.test(a.toLowerCase()) ? !0 : !1
}, AS.isEmail = function (a) {
    return /^[A-Z_a-z0-9-\.]+@([A-Z_a-z0-9-]+\.)+[a-z0-9A-Z]{2,4}$/.test(a)
}, AS.isPhone = function (a) {
    return /^((\(\d{2,3}\))|(\d{3}[\-]?))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}([\-]?\d{1,4})?$/.test(a)
}, AS.isMobile = function (a) {
    return /^1[3-8]+\d{9}$/.test(a)
}, AS.isIp = function (a) {
    return /^(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5]).(0|[1-9]\d?|[0-1]\d{2}|2[0-4]\d|25[0-5])$/.test(a)
}, AS.isNum = function (a) {
    return /^\d+$/.test(a)
}, AS.isZip = function (a) {
    return /^[1-9]\d{5}$/.test(a)
}, AS.isEN = function (a) {
    return /^[A-Za-z]+$/.test(a)
}, note_globle_url = "", String.prototype.replaceAll = function (a, b, c) {
    return RegExp.prototype.isPrototypeOf(a) ? this.replace(a, b) : this.replace(new RegExp(a, c ? "gi" : "g"), b)
};
function isDate(strInputDate) {
    if (strInputDate == "") {
        return false;
    }
    strInputDate = strInputDate.replace(/-/g, "/");
    var d = new Date(strInputDate);
    if (isNaN(d)) {
        return false;
    }
    var arr = strInputDate.split("/");
    return ((parseInt(arr[0], 10) == d.getFullYear()) && (parseInt(arr[1], 10) == (d.getMonth() + 1)) && (parseInt(arr[2], 10) == d.getDate()));
}
function getDateDiff(startDate, endDate) {
    var startTime = new Date(Date.parse(startDate.replace(/-/g, "/"))).getTime();
    var endTime = new Date(Date.parse(endDate.replace(/-/g, "/"))).getTime();
    var dates = (endTime - startTime) / (1000 * 60 * 60 * 24);
    return dates;
}
function special_date() {
}
function sync_datas() {
    if (!confirm("您确定将淘宝商品数据同步到本软件吗？")) {
        return;
    }
    show_tip_sync();
    sync_item();
}
var tip_show_div = null;
function show_tip(str) {
    if (tip_show_div === null) {
        tip_show_div = $("#background,#progressBar");
    }
    if (str !== '') {
        $("#progressBar").html(str);
    }

    $("#background").css('height', "100%");
    setDivCenter('#progressBar');
    tip_show_div.show();
}
function close_tip() {
    if (tip_show_div != null) {
        tip_show_div.hide();
    }
}
function bgreen() {
    $("#myImage0").attr("src", static_url + "images/top_return_h_green.png");
}
function bgrey() {
    $("#myImage0").attr("src", static_url + "images/top_return.png");
}
function bgreen1() {
    $("#myImage1").attr("src", static_url + "images/ewm_h_green.png");
    $("#ewm_big").css('display', "block");
}
function bgrey1() {
    $("#myImage1").attr("src", static_url + "images/ewm.png");
    $("#ewm_big").css('display', "none");
}
function bgreen2() {
    $("#myImage2").attr("src", static_url + "images/js_h.png");
}
function bgrey2() {
    $("#myImage2").attr("src", static_url + "images/js.png");
}
function over() {
    $("#myImage").css('display', "block");
}
function out() {
    $("#myImage").css('display', "none");
}
function setDivCenter(divName) {
    var top = 200;
    var left = ($(window).width() - $(divName).width()) / 2;
    var scrollTop = $(document).scrollTop();
    var scrollLeft = $(document).scrollLeft();
    $(divName).css({position: 'fixed', 'top': top + scrollTop, left: left + scrollLeft});
}
function show_tip_sync(str) {
    if (str !== '') {
        $("#sync_progressBar").html(str);
    }
    $("#sync_background").css('height', $(document.body).outerHeight(true));
    var ajaxbg_sync = $("#sync_background,#sync_progressBar");
    ajaxbg_sync.show();
}
function close_tip_sync() {
    var ajaxbg_sync = $("#sync_background,#sync_progressBar");
    ajaxbg_sync.hide();
}
$(window).resize(function () {
    var win_resise_width = $(this).width();
    var obj = null;
    $(".mybox_con").each(function () {
        if ($(this).parents(".mybox").css("display") == 'block') {
            obj = $(this);
        }
    });
    if (obj != null)
        mybox_con_middle(win_resise_width, obj)
});

function is_good_money(input_val) {
    if (input_val == '0') {
        return true;
    }
    var reg = new RegExp("^[0-9]+(.[0-9]{1,2})?$", "g");
    if (!reg.test(input_val)) {
        return false;
    }
    return true;
}
function onStart(event) {
    show_tip("正在处理中，请稍后......");
}
function onComplete(event, xhr, settings) {
    close_tip();
}
function clear_not_ints(e) {
    var node = $(e);
    var node_val = node.val();
    if (!is_int(node_val)) {
        node.val('');
    }
}
function clear_not_num(e) {
    var node = $(e);
    var node_val = node.val();
    if (!$.isNumeric(node_val)) {
        node.val('');
    }
}
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
};
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};
function accSubtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
Number.prototype.subtr = function (arg) {
    return accSubtr(arg, this);
};
function is_good_title(str) {
    return /[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(str);
}
function in_array(needle, haystack, argStrict) {
    var key = '', strict = !!argStrict;
    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }
    return false;
}
function getDate(day) {
    var zdate = new Date();
    var sdate = zdate.getTime() - (1 * 24 * 60 * 60 * 1000);
    var edate = new Date(sdate - (day * 24 * 60 * 60 * 1000)).format("yyyy-MM-dd");
    return edate;
}
function check_time(date_start, date_end) {
    var start = $("#" + date_start).val();
    var end = $("#" + date_end).val();
    if (AS.isBlank(start) && AS.isBlank(end)) {
        return true;
    }
    if (!AS.isBlank(start) && !start.isDate()) {
        alert("开始时间格式不正确！");
        return false;
    }
    if (!AS.isBlank(end) && !end.isDate()) {
        alert("结束时间格式不正确！");
        return false;
    }
    return true;
    if (!AS.isBlank(start) && !AS.isBlank(end) && getDateDiff(start, end) < 0) {
        alert("结束时间要大于开始时间");
        return false;
    }
    var today = getDate(-1);
    if (!AS.isBlank(end) && getDateDiff(today, end) > 0) {
        alert("结束时间不能大于今天！");
        return false;
    }
    if (!AS.isBlank(start) && !AS.isBlank(end) && getDateDiff(start, end) > 31) {
        alert("结束时间和开始时间间隔不能大于30天！");
        return false;
    }
    if (!AS.isBlank(start) && AS.isBlank(end) && getDateDiff(start, today) > 31) {
        alert("只能查询最近三十天的数据！");
        return false;
    }
    return true;
}
String.prototype.isDate = function () {
    var r = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {
        return false;
    }
    var d = new Date(r[1], r[3] - 1, r[4]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
}

//var i18n=$.extend({},i18n||{},{datepicker:{dateformat:{fulldayvalue:"yyyy-MM-dd",separator:"-",year_index:0,month_index:1,day_index:2,sun:"日",mon:"一",tue:"二",wed:"三",thu:"四",fri:"五",sat:"六",jan:"一",feb:"二",mar:"三",apr:"四",may:"五",jun:"六",jul:"七",aug:"八",sep:"九",oct:"十",nov:"十一",dec:"十二",postfix:"月"},ok:" 確定 ",cancel:" 取消 ",today:"今天",prev_month_title:"上一月",next_month_title:"下一月"}}),def={weekStart:0,weekName:[i18n.datepicker.dateformat.sun,i18n.datepicker.dateformat.mon,i18n.datepicker.dateformat.tue,i18n.datepicker.dateformat.wed,i18n.datepicker.dateformat.thu,i18n.datepicker.dateformat.fri,i18n.datepicker.dateformat.sat],monthName:[i18n.datepicker.dateformat.jan,i18n.datepicker.dateformat.feb,i18n.datepicker.dateformat.mar,i18n.datepicker.dateformat.apr,i18n.datepicker.dateformat.may,i18n.datepicker.dateformat.jun,i18n.datepicker.dateformat.jul,i18n.datepicker.dateformat.aug,i18n.datepicker.dateformat.sep,i18n.datepicker.dateformat.oct,i18n.datepicker.dateformat.nov,i18n.datepicker.dateformat.dec],monthp:i18n.datepicker.dateformat.postfix,Year:(new Date).getFullYear(),Month:(new Date).getMonth()+1,Day:(new Date).getDate(),today:new Date,btnOk:i18n.datepicker.ok,btnCancel:i18n.datepicker.cancel,btnToday:i18n.datepicker.today,inputDate:null,onReturn:!1,version:"1.1",applyrule:!1,showtarget:null,picker:""};!function($){var dateFormat,DateAdd,DateDiff,userAgent;dateFormat&&"function"==typeof dateFormat||(dateFormat=function(a){var c,b={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"H+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),w:"0123456".indexOf(this.getDay()),S:this.getMilliseconds()};/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(c in b)new RegExp("("+c+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?b[c]:("00"+b[c]).substr((""+b[c]).length)));return a}),DateAdd&&"function"==typeof DateDiff||(DateAdd=function(interval,number,idate){number=parseInt(number);var date;switch("string"==typeof idate&&(date=idate.split(/\D/),eval("var date = new Date("+date.join(",")+")")),"object"==typeof idate&&(date=new Date(idate.toString())),interval){case"y":date.setFullYear(date.getFullYear()+number);break;case"m":date.setMonth(date.getMonth()+number);break;case"d":date.setDate(date.getDate()+number);break;case"w":date.setDate(date.getDate()+7*number);break;case"h":date.setHours(date.getHours()+number);break;case"n":date.setMinutes(date.getMinutes()+number);break;case"s":date.setSeconds(date.getSeconds()+number);break;case"l":date.setMilliseconds(date.getMilliseconds()+number)}return date}),DateDiff&&"function"==typeof DateDiff||(DateDiff=function(a,b,c){var d,e,f;switch(a){case"d":case"w":b=new Date(b.getFullYear(),b.getMonth(),b.getDate()),c=new Date(c.getFullYear(),c.getMonth(),c.getDate());break;case"h":b=new Date(b.getFullYear(),b.getMonth(),b.getDate(),b.getHours()),c=new Date(c.getFullYear(),c.getMonth(),c.getDate(),c.getHours());break;case"n":b=new Date(b.getFullYear(),b.getMonth(),b.getDate(),b.getHours(),b.getMinutes()),c=new Date(c.getFullYear(),c.getMonth(),c.getDate(),c.getHours(),c.getMinutes());break;case"s":b=new Date(b.getFullYear(),b.getMonth(),b.getDate(),b.getHours(),b.getMinutes(),b.getSeconds()),c=new Date(c.getFullYear(),c.getMonth(),c.getDate(),c.getHours(),c.getMinutes(),c.getSeconds())}switch(d=b.getTime(),e=c.getTime(),f=0/0,a){case"y":f=c.getFullYear()-b.getFullYear();break;case"m":f=12*(c.getFullYear()-b.getFullYear())+c.getMonth()-b.getMonth();break;case"d":f=Math.floor(e/864e5)-Math.floor(d/864e5);break;case"w":f=Math.floor((e+3456e5)/6048e5)-Math.floor((d+3456e5)/6048e5);break;case"h":f=Math.floor(e/36e5)-Math.floor(d/36e5);break;case"n":f=Math.floor(e/6e4)-Math.floor(d/6e4);break;case"s":f=Math.floor(e/1e3)-Math.floor(d/1e3);break;case"l":f=e-d}return f}),userAgent=window.navigator.userAgent.toLowerCase(),$.browser.msie8=$.browser.msie&&/msie 8\.0/i.test(userAgent),$.browser.msie7=$.browser.msie&&/msie 7\.0/i.test(userAgent),$.browser.msie6=!$.browser.msie8&&!$.browser.msie7&&$.browser.msie&&/msie 6\.0/i.test(userAgent),void 0==$.fn.noSelect&&($.fn.noSelect=function(a){return prevent=null==a?!0:a,prevent?this.each(function(){$.browser.msie||$.browser.safari?$(this).bind("selectstart",function(){return!1}):$.browser.mozilla?($(this).css("MozUserSelect","none"),$("body").trigger("focus")):$.browser.opera?$(this).bind("mousedown",function(){return!1}):$(this).attr("unselectable","on")}):this.each(function(){$.browser.msie||$.browser.safari?$(this).unbind("selectstart"):$.browser.mozilla?$(this).css("MozUserSelect","inherit"):$.browser.opera?$(this).unbind("mousedown"):$(this).removeAttr("unselectable","on")})}),$.fn.datepicker=function(a){function g(){$("#BBIT-DP-TODAY").click(v),b.click(r),$("#BBIT_DP_INNER tbody").click(q),$("#BBIT_DP_LEFTBTN").click(t),$("#BBIT_DP_RIGHTBTN").click(u),$("#BBIT_DP_YMBTN").click(o),$("#BBIT-DP-MP").click(n).dblclick(m),$("#BBIT-DP-MP-PREV").click(j),$("#BBIT-DP-MP-NEXT").click(k),$("#BBIT-DP-MP-OKBTN").click(i),$("#BBIT-DP-MP-CANCELBTN").click(h)}function h(){return $("#BBIT-DP-MP").animate({top:-193},{duration:200,complete:function(){$("#BBIT-DP-MP").hide()}}),!1}function i(){return def.Year=def.cy,def.Month=def.cm+1,def.Day=1,$("#BBIT-DP-MP").animate({top:-193},{duration:200,complete:function(){$("#BBIT-DP-MP").hide()}}),x(),!1}function j(){var a=def.ty-10;return def.ty=a,l(a),!1}function k(){var a=def.ty+10;return def.ty=a,l(a),!1}function l(a){var d,b=a-4,c=[];for(d=0;5>d;d++)c.push(b+d),c.push(b+d+5);$("#BBIT-DP-MP td.bbit-dp-mp-year").each(function(a){def.Year==c[a]?$(this).addClass("bbit-dp-mp-sel"):$(this).removeClass("bbit-dp-mp-sel"),$(this).html("<a href='javascript:void(0);'>"+c[a]+"</a>").attr("xyear",c[a])})}function m(a){var b=a.target||a.srcElement,c=p(b);return null==c?!1:(($(c).hasClass("bbit-dp-mp-month")||$(c).hasClass("bbit-dp-mp-year"))&&i(a),!1)}function n(a){var e,b=$(this),c=a.target||a.srcElement,d=p(c);return null==d?!1:($(d).hasClass("bbit-dp-mp-month")&&($(d).hasClass("bbit-dp-mp-sel")||(e=b.find("td.bbit-dp-mp-month.bbit-dp-mp-sel"),e.length>0&&e.removeClass("bbit-dp-mp-sel"),$(d).addClass("bbit-dp-mp-sel"),def.cm=parseInt($(d).attr("xmonth")))),$(d).hasClass("bbit-dp-mp-year")&&($(d).hasClass("bbit-dp-mp-sel")||(e=b.find("td.bbit-dp-mp-year.bbit-dp-mp-sel"),e.length>0&&e.removeClass("bbit-dp-mp-sel"),$(d).addClass("bbit-dp-mp-sel"),def.cy=parseInt($(d).attr("xyear")))),!1)}function o(){var c,d,e,f,a=$("#BBIT-DP-MP"),b=def.Year;for(def.cy=def.ty=b,c=def.Month-1,def.cm=c,d=$("#BBIT-DP-MP td.bbit-dp-mp-month"),e=d.length-1;e>=0;e--)f=$(d[e]).attr("xmonth"),f==c?$(d[e]).addClass("bbit-dp-mp-sel"):$(d[e]).removeClass("bbit-dp-mp-sel");l(b),a.css("top",-193).show().animate({top:0},{duration:200})}function p(a){if("TD"==a.tagName.toUpperCase())return a;if("BODY"==a.tagName.toUpperCase())return null;var b=$(a).parent();return b.length>0?"TD"!=b[0].tagName.toUpperCase()?p(b[0]):b[0]:null}function q(a){var e,f,c=a.target||a.srcElement,d=p(c);return null==d?!1:(e=$(d),$(d).hasClass("bbit-dp-disabled")||(f=e.attr("xdate"),b.data("indata",s(f)),w()),!1)}function r(){return!1}function s(a){var b,c,d,e;try{return b=a.split("-"),c=parseInt(b[0]),d=0+b[1]-1,e=parseInt(b[2]),new Date(c,d,e)}catch(f){return null}}function t(){return 1==def.Month?(def.Year--,def.Month=12):def.Month--,x(),!1}function u(){return 12==def.Month?(def.Year++,def.Month=1):def.Month++,x(),!1}function v(){b.data("indata",new Date),w()}function w(){var a=b.data("ctarget"),c=b.data("cpk"),d=b.data("onReturn"),e=b.data("indata"),f=b.data("ads"),g=b.data("ade"),h=!1;f&&f>e&&(h=!0),g&&e>g&&(h=!0),h||(d&&jQuery.isFunction(d)?d.call(a[0],b.data("indata")):a.val(dateFormat.call(b.data("indata"),i18n.datepicker.dateformat.fulldayvalue)),c.attr("isshow","0"),b.removeData("ctarget").removeData("cpk").removeData("indata").removeData("onReturn").removeData("ads").removeData("ade"),b.css("visibility","hidden"),a=c=null)}function x(){var c,d,e,f,h,i,j,k,l,m,n,o,p,q,r,a=$("#BBIT_DP_INNER tbody");for($("#BBIT_DP_YMBTN").html(def.monthName[def.Month-1]+def.monthp+" "+def.Year),c=new Date(def.Year,def.Month-1,1),d=def.weekStart-c.getDay(),e=def.Month-1,d>0&&(d-=7),f=DateAdd("d",d,c),DateAdd("d",42,f),h=b.data("ads"),i=b.data("ade"),j=[],k=dateFormat.call(def.today,i18n.datepicker.dateformat.fulldayvalue),l=b.data("indata"),m=null!=l?dateFormat.call(l,i18n.datepicker.dateformat.fulldayvalue):"",n=1;42>=n;n++)1==n%7&&j.push("<tr>"),o=DateAdd("d",n-1,f),p=[],q=!1,h&&h>o&&(q=!0),i&&o>i&&(q=!0),o.getMonth()<e?p.push("bbit-dp-prevday"):o.getMonth()>e&&p.push("bbit-dp-nextday"),q?p.push("bbit-dp-disabled"):p.push("bbit-dp-active"),r=dateFormat.call(o,i18n.datepicker.dateformat.fulldayvalue),r==k&&p.push("bbit-dp-today"),r==m&&p.push("bbit-dp-selected"),j.push("<td class='",p.join(" "),"' title='",dateFormat.call(o,i18n.datepicker.dateformat.fulldayvalue),"' xdate='",dateFormat.call(o,i18n.datepicker.dateformat.fulldayvalue),"'><a href='javascript:void(0);'><em><span>",o.getDate(),"</span></em></a></td>"),0==n%7&&j.push("</tr>");a.html(j.join(""))}var b,c,d,e,f;if($.extend(def,a),b=$("#BBIT_DP_CONTAINER"),0==b.length){for(c=[],c.push("<div id='BBIT_DP_CONTAINER' class='bbit-dp' style='width:185px;z-index:10001;'>"),$.browser.msie6&&c.push('<iframe style="position:absolute;z-index:-1;width:100%;height:205px;top:0;left:0;scrolling:no;" frameborder="0" src="about:blank"></iframe>'),c.push("<table class='dp-maintable' cellspacing='0' cellpadding='0' style='width:185px;'><tbody><tr><td>"),c.push("<table class='bbit-dp-top' cellspacing='0'><tr><td class='bbit-dp-top-left'> <a id='BBIT_DP_LEFTBTN' href='javascript:void(0);' title='",i18n.datepicker.prev_month_title,"'>&nbsp;</a></td><td class='bbit-dp-top-center' align='center'><em><button id='BBIT_DP_YMBTN'></button></em></td><td class='bbit-dp-top-right'><a id='BBIT_DP_RIGHTBTN' href='javascript:void(0);' title='",i18n.datepicker.next_month_title,"'>&nbsp;</a></td></tr></table>"),c.push("</td></tr>"),c.push("<tr><td>"),c.push("<table id='BBIT_DP_INNER' class='bbit-dp-inner' cellspacing='0'><thead><tr>"),d=def.weekStart,e=0;7>e;e++)c.push("<th><span>",def.weekName[d],"</span></th>"),6==d?d=0:d++;c.push("</tr></thead>"),c.push("<tbody></tbody></table>"),c.push("</td></tr>"),c.push("<tr><td class='bbit-dp-bottom' align='center'><button id='BBIT-DP-TODAY' class='btn btn-primary btn-sm' style='padding:1px 3px;'>",def.btnToday,"</button></td></tr>"),c.push("</tbody></table>"),c.push("<div id='BBIT-DP-MP' class='bbit-dp-mp'  style='z-index:auto;'><table id='BBIT-DP-T' style='width: 185px; height: 193px' border='0' cellspacing='0'><tbody>"),c.push("<tr>"),c.push("<td class='bbit-dp-mp-month' xmonth='0'><a href='javascript:void(0);'>",def.monthName[0],"</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='6'><a href='javascript:void(0);'>",def.monthName[6],"</a></td><td class='bbit-dp-mp-ybtn' align='middle'><a id='BBIT-DP-MP-PREV' class='bbit-dp-mp-prev'></a></td><td class='bbit-dp-mp-ybtn' align='middle'><a id='BBIT-DP-MP-NEXT' class='bbit-dp-mp-next'></a></td>"),c.push("</tr>"),c.push("<tr>"),c.push("<td class='bbit-dp-mp-month' xmonth='1'><a href='javascript:void(0);'>",def.monthName[1],"</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='7'><a href='javascript:void(0);'>",def.monthName[7],"</a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td>"),c.push("</tr>"),c.push("<tr>"),c.push("<td class='bbit-dp-mp-month' xmonth='2'><a href='javascript:void(0);'>",def.monthName[2],"</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='8'><a href='javascript:void(0);'>",def.monthName[8],"</a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td>"),c.push("</tr>"),c.push("<tr>"),c.push("<td class='bbit-dp-mp-month' xmonth='3'><a href='javascript:void(0);'>",def.monthName[3],"</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='9'><a href='javascript:void(0);'>",def.monthName[9],"</a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td>"),c.push("</tr>"),c.push("<tr>"),c.push("<td class='bbit-dp-mp-month' xmonth='4'><a href='javascript:void(0);'>",def.monthName[4],"</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='10'><a href='javascript:void(0);'>",def.monthName[10],"</a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td>"),c.push("</tr>"),c.push("<tr>"),c.push("<td class='bbit-dp-mp-month' xmonth='5'><a href='javascript:void(0);'>",def.monthName[5],"</a></td><td class='bbit-dp-mp-month bbit-dp-mp-sep' xmonth='11'><a href='javascript:void(0);'>",def.monthName[11],"</a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td><td class='bbit-dp-mp-year'><a href='javascript:void(0);'></a></td>"),c.push("</tr>"),c.push("<tr class='bbit-dp-mp-btns'>"),c.push("<td colspan='4'><button id='BBIT-DP-MP-OKBTN' class='bbit-dp-mp-ok'>",def.btnOk,"</button><button id='BBIT-DP-MP-CANCELBTN' class='bbit-dp-mp-cancel'>",def.btnCancel,"</button></td>"),c.push("</tr>"),c.push("</tbody></table>"),c.push("</div>"),c.push("</div>"),f=c.join(""),$(document.body).append(f),b=$("#BBIT_DP_CONTAINER"),g()}return $(this).each(function(){var a=$(this).addClass("bbit-dp-input"),c=$(def.picker);null==def.showtarget&&a.after(c),c.click(function(){var g,h,i,j,k,l,m,n,o,d=$(this).attr("isshow"),e=$(this),f=a.val();return""!=f&&(f=s(f)),null==f||""==f?(def.Year=(new Date).getFullYear(),def.Month=(new Date).getMonth()+1,def.Day=(new Date).getDate(),def.inputDate=null):(def.Year=f.getFullYear(),def.Month=f.getMonth()+1,def.Day=f.getDate(),def.inputDate=f),"visible"==b.css("visibility")&&b.css(" visibility","hidden"),"1"==d?(e.attr("isshow","0"),b.removeData("ctarget").removeData("cpk").removeData("indata").removeData("onReturn"),!1):(b.data("ctarget",a).data("cpk",e).data("indata",def.inputDate).data("onReturn",def.onReturn),def.applyrule&&$.isFunction(def.applyrule)?(g=def.applyrule.call(a,a[0].id),g&&(g.startdate?b.data("ads",g.startdate):b.removeData("ads"),g.enddate?b.data("ade",g.enddate):b.removeData("ade"))):b.removeData("ads").removeData("ade"),x(),$("#BBIT-DP-T").height(b.height()),h=def.showtarget||a,i=h.offset(),j=h.outerHeight(),k={left:i.left,top:i.top+j},l=b.width(),m=b.height(),n=document.documentElement.clientWidth,o=document.documentElement.clientHeight,k.left+l>=n&&(k.left=n-l-2),k.top+m>=o&&(k.top=i.top-m-2),k.left<0&&(k.left=10),k.top<0&&(k.top=10),$("#BBIT-DP-MP").hide(),k.visibility="visible",b.css(k),$(this).attr("isshow","1"),$(document).one("click",function(){e.attr("isshow","0"),b.removeData("ctarget").removeData("cpk").removeData("indata"),b.css("visibility","hidden")}),!1)})})}}(jQuery);
// 子页面打开父页面的弹出框
function mybox_con_middle1(win_width, obj) {
    var win_width = win_width;
    var mybox_con_width = $(obj, parent.document).outerWidth();
    var mybox_con_left = (win_width - mybox_con_width) / 2;
    $(obj, parent.document).css("left", mybox_con_left);
}
function show_parent_mybox(box_id) {
    var box = $('#' + box_id, parent.document);
    var mybox_con_top = box.find(" div.mybox_con_top");
    var mybox_con_body = box.find(" div.mybox_con_body");
    var mybox_con_bottom = box.find(" div.mybox_con_bottom");
    var mybox_con = box.find(" div.mybox_con");
    var win_width = $(window).outerWidth();
    var obj = mybox_con;
    mybox_con_middle1(win_width, obj);
    box.fadeIn("fast");
    mybox_con_top.unbind("mousedown");
    mybox_con_top.mousedown(function (event) {
        var isMove = true;
        var abs_x = event.pageX - mybox_con.offset().left;
        var abs_y = event.pageY - mybox_con.offset().top;
        $(document).mousemove(function (event) {
            if (isMove) {
                var obj = mybox_con;
                var left_p = document.body.scrollTop;
                if (left_p == 0) {
                    left_p = document.documentElement.scrollTop;
                }
                obj.css({'left': left_position, 'top': top_position});
            }
        }).mouseup(function () {
            isMove = false;
        });
    });
    var win_oter_height = $(window).outerHeight();
    var win_oter_width = $(window).outerWidth();
    var mybox_con_width = mybox_con.outerWidth();
    var mybox_con_maxheight = parseInt($('.ui-tabs-panel', parent.document).css("height")) - 10;
    mybox_con.css("max-height", mybox_con_maxheight);
    var mybox_con_topheight = parseInt(mybox_con_top.css("height"));
    var mybox_con_btmheight = mybox_con_bottom.outerHeight();
    var mybox_con_bodyheight = mybox_con_maxheight - mybox_con_topheight - mybox_con_btmheight - 70;
    if (box_id !== 'add_author_token') {
        if (mybox_con.hasClass("valign_middle")) {
            var mybox_con_height1 = parseInt(obj.height());
            var mybox_con_top1 = (win_oter_height - mybox_con_height1) / 2;
            obj.css("top", mybox_con_top1);
        } else {
            mybox_con.css("top", '50px');
        }
    }
    mybox_con_body.css("max-height", mybox_con_bodyheight);
}
function close_parent_mybox(obj) {
    close_parent_bg();
    $(obj, parent.document).parent().parent().parent().fadeOut("fast");
    $(document).unbind('mousemove');
}
function show_parent_bg() {
    $('#parent_bg', parent.document).css('width', $(document).width()).css('height', $(document).height()).css('display', '');
}
function close_parent_bg() {
    $('#parent_bg', parent.document).css('display', 'none');
}
function close_parent_mybox_specail(obj) {
    $("#" + obj, parent.document).fadeOut("fast");
    close_bg();
}
//end

/**
 * 自定义弹窗
 * @author xiaotu
 * options.title 标题，options.con 内容，options.width 对话框宽度,options.height 对话框高度
 */
definedMsg = (function () {
    var definedMsgId = "definedMsg";
    return {
        show: function (options) {
            options = options || {};
            var title = options.title ? options.title : "";
            var msgWidth = options.width ? options.width : "";
            var msgHeight = options.height ? options.height : "";
            var con = options.con ? options.con : "";
            var url = options.url ? options.url : "";
            var btn = options.btn ? options.btn : "";

            if (msgWidth) {
                $("#" + definedMsgId).css({"width": msgWidth, "margin-left": -msgWidth / 2});
            }
            if (msgHeight) {
                $("#" + definedMsgId).css({"height": msgHeight, "margin-top": -msgHeight / 2});
            }
            $("#" + definedMsgId + "Title").text(title);
            var footer = $("#" + definedMsgId + "Footer").empty();
            footer.append(btn);
            var body = $("#" + definedMsgId + "Body").empty();
            if (url != '') {
                $("#" + definedMsgId + "Body").load(system_url + url);
            } else {
                body.append(con);
            }
            if (!btn) {
                footer.removeClass("modal-footer");
            }
            $("#" + definedMsgId).modal('show');
        },
        hide: function () {
            $("#" + definedMsgId).modal('hide');
        }
    };
})();
/**
 * 客服咨询浮层hover事件
 * @returns {undefined}
 */
function linkMenuHover() {
    $(".hover_li").mouseenter(function () {
        $(this).find(".hover_box").show();
    }).mouseleave(function () {
        $(this).find(".hover_box").hide();
    })
}

/**
 * @author xiaotu
 * 给列表添加pt_icon
 * @returns {undefined} id:店铺id，a:平台标志
 */
function addPtIcon(id, a) {
    var i = a;
    var thisObj = $("#" + id);
    var icon_name;
    var icon_alt;
    switch (i) {
        case 1:
            icon_name = 'tao';
            icon_alt = '淘宝网';
            break;
        case 2:
            icon_name = 'bb';
            icon_alt = '贝贝网';
            break;
        case 3:
            icon_name = 'wd';
            icon_alt = '微店(口袋购物)';
            break;
        case 4:
            icon_name = 'mgj';
            icon_alt = '蘑菇街';
            break;
        case 5:
            icon_name = 'mls';
            icon_alt = '美丽说';
            break;
        case 6:
            icon_name = 'zhe800';
            icon_alt = 'zhe800';
            break;
    }
    str = '<img class="pt_icon" src=' + static_url + 'images/pt_logo/icon/' + icon_name + '.png alt="' + icon_alt + '" />';
    thisObj.prepend(str);
}
/**
 * 咨询我们
 * @author xiaotu
 * @returns {undefined}
 */
$(function () {
    $(".slideBar").click(function () {
        var keBox = $(this).parent();
        var boxCon = $(this).siblings(".slideCon");
        if (keBox.css("right") == '0px') {
            keBox.animate({"right": '-190px'}, 300)
            setTimeout(function () {
                boxCon.addClass('hide')
            }, 300);
            $(this).removeClass("active");
        } else {
            boxCon.removeClass("hide");
            keBox.animate({"right": '0px'}, 300);
            $(this).addClass("active");
        }
    });
});
/**
 * 按F5刷新当前iframe页面
 * @author xiaotu
 * @returns {undefined}
 */
$(function () {
    // IE兼容模式 下 JSON未定义解决方案
    if (typeof JSON == 'undefined') {
        $('head').append($("<script type='text/javascript' src='http://www.ecbao.cn/dsb_asserts/json2/json2.js'>"));
    }
})


$(function () {
    $(".no_content td").prepend("<i class='fa fa-info-circle' ></i>");
})


function cache_refresh(e) {
    var e = e || window.event;
    //116 是f5按键代码
    if (e.keyCode == 116) {
        var activeSrc = $("iframe.active").attr("src");
        $("iframe.active").attr("src", activeSrc);
        return false;
    }
}

/**
 * 全选按钮和多选框列表点击关联事件
 * @author xiaoke
 */
function tag() {
    var n = document.getElementsByTagName("input");
    var C = new Array();
    for (i = 0; i < n.length; i++)
        if (n.item(i).type == "checkbox" && n.item(i).getAttribute('data-id')) {
            // 返回直属上级菜单
            n.item(i).CP = function () {
                var s = this.getAttribute('data-id');
                var n = s.lastIndexOf("_");
                if (n) {
                    var t = s.substring(0, n);
                    for (i in C)
                        if (C[i].getAttribute('data-id') == t)
                            return C[i];
                }
            };

            //当前对象子集的选中状态和当前对象的状态一致
            n.item(i).CA = function () {
                var s = this.getAttribute('data-id');
                for (i in C) {
                    if (C[i].getAttribute('data-id').indexOf(s) == 0 && C[i] !== this) {
                        // C[i].indeterminate = false;
                        C[i].checked = this.checked;
                    }
                }
            };

            n.item(i).CK = function () {
                var s = this.getAttribute('data-id') + "_";
                var s1 = true;
                var s2 = true;
                for (i in C) {
                    if (C[i].getAttribute('data-id').indexOf(s) == 0) { //子集都是选中状态则s1为true,子集都是未选中状态则s2为true,
                        s1 = (s1 && C[i].checked);
                        s2 = (s2 && !C[i].checked)
                    }
                }
                if (s1) {//子集都是选中状态
                    return 2;
                } else if (s2) {//子集都是未选中状态
                    return 1;
                } else {//其他
                    return 3;
                }
            };
            n.item(i).onclick = function () {
                this.CA();
                var CN = this.CP();
                while (CN) {
                    if (CN.CK() < 3) {
                        //CN.indeterminate = false;
                        CN.checked = CN.CK() - 1;
                    } else {
                        CN.checked = false;// 原：CN.indeterminate = true;
                    }
                    CN = CN.CP();
                }
            };
            C.push(n.item(i));
        }
}
/**
 * 添加一个获取当前时间的函数
 * @author xionger
 */
function get_current_time() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

