function isBlank(varValue) {
    if (varValue !== null && varValue !== undefined && varValue !== '' && varValue !== 'null') {
        return false;
    }
    return true;
}
let Local =  'http://api.waimaishop.com/site';
let app = new Vue({
    el: "#mobile",
    data: {
        https: {
            register:`${Local}/passport/register`,
            getCode: `${Local}/mobile/send_code`,
            index: './success.html'
        },
        arg: {
            mobile: '',
            code: '',
            password: '',
            repassword: '',
        },
        isOver: false, //表单是否完成
        codeTxt: '',//code倒计时文本
        isCodeBtn: true//是否显示code  BTN
    },
    methods: {
        contentUpdate() {
            /* input文字修改 */
            this.isOver = !isBlank(this.arg.mobile) && !isBlank(this.arg.code) && !isBlank(this.arg.password) ? true : false;
        },
        blurEvent(e, type){
            /****
             * 失去焦点判断事件
             */
            let target, text;
            target = e.currentTarget;
            text = $(target).val();
            if (isBlank(text)) {
                $(target).siblings('.txt').fadeIn();
            } else {
                this.type(text, type);
            }
        },
        type(val, type){
            //表单数据判断
            switch (type) {
                case 'phone':
                    if (!(/^1(3|4|5|7|8)\d{9}$/.test(val))) {
                        this.arg.mobile = '';
                        layer.msg('手机号码错误', {icon: 5, time: 1000});
                    }
                    break;
                case 'password':
                    if (val.length < 8) {
                        this.arg.password = '';
                        layer.msg('密码长度不能少于8位数', {icon: 5, time: 1000});
                        return;
                    }
                    break;
            }
        },
        submit(){
            if(this.isOver) {
                this.arg.repassword = this.arg.mobile
                this.http(this.arg)
            } else {
                layer.msg('表单未完成', {icon: 5, time: 1000});
            }
        },
        http(arg){
            let _self = this
            this.$http.post(_self.https.register,arg,{emulateJSON:true}).then(
                (res)=>{
                    res = res.body
                    if(res.success){
                        _self.arg = {
                            mobile: '',
                            code: '',
                            password: '',
                            repassword: ''
                        };
                        setTimeout(function(){
                            window.location.href = `${_self.https.index}?visit_id=${res.data.visit_id}`
                        },2000);
                        return layer.msg(res.msg, {icon: 1, time: 1000});
                    }else {
                        layer.msg(res.msg, {icon: 5, time: 1000});
                    }
                },
                (err)=>{
                    layer.msg('网络连接超时，请稍候重试', {icon: 5, time: 1000});
                }
            )
        },
        getCode(tel){
            let _self = this
            let timeTotal = 59;
            let timeId = '';
            this.$http.post(this.https.getCode,{mobile:tel,type: 'register'},{emulateJSON:true}).then(
                (res)=>{
                    res = res.body
                    if(res.success){
                        _self.isCodeBtn = false;
                        if (timeTotal >= 1) {
                            _self.codeTxt = `${timeTotal}s后可重发`
                            timeId = setInterval(function () {
                                timeTotal -= 1;
                                _self.codeTxt = `${timeTotal}s后可重发`
                                if (timeTotal == 0) {
                                    clearInterval(timeId);
                                    _self.codeTxt = ``
                                    _self.isCodeBtn = true;
                                }
                            }, 1000);
                        }
                    }else{
                        layer.msg(res.msg, {icon: 5, time: 1000});
                    }
                },
                (err)=>{
                    layer.msg('网络连接超时，请稍候重试', {icon: 5, time: 1000});
                }
            )
        },
        countDown() {
            let _self = this
            if(isBlank(_self.arg.mobile)) {
                layer.msg('请输入您的手机号码', {icon: 5, time: 1000});
                return;
            }
            _self.getCode(_self.arg.mobile);
        }
    }
})