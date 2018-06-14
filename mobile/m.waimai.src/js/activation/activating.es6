new Vue({
    el: "#app",
    data: {
        code: "",
        codeMsg: "",
        https: {
            submit: '//acrm.ecbao.cn/index.php/expand_api/addUser'
        },
        boo: {
            showMsg: false,
            active: false,
        }
    },
    mounted(){
        sessionStorage.waimai_phone = '';
        sessionStorage.waimai_pwd = '';
    },
    methods: {
        checkCode(code){
            let _self = this
            switch (code.length){
                case 0:
                    _self.codeMsg = "体验码不能为空！"
                    _self.boo.showMsg = true
                    _self.boo.active = false
                    break;
                case 6:
                    _self.codeMsg = ""
                    _self.boo.showMsg = false
                    _self.boo.active = true
                    break;
                default:
                    _self.codeMsg = "体验码位数不正确！"
                    _self.boo.showMsg = true
                    _self.boo.active = false
                    break;
            }
        },
        blur(){
            let _self = this
            _self.checkCode(_self.code)
        },
        submit(){
            let _self = this
            if(!_self.boo.active) return
            let url = `${_self.https.submit}?code=${_self.code}`;
            _self.$http.get(url).then(
                (res)=>{
                    res = JSON.parse(res.data)
                    if(res.success){
                        sessionStorage.waimai_phone = res.data.mobile;
                        sessionStorage.waimai_pwd = res.data.password;
                        window.location.href = `./activated.html`
                        _self.boo.showMsg = false
                    }else{
                        _self.boo.showMsg = true
                        _self.codeMsg = res.msg
                    }
                    if(res.code == '10002'){
                        _self.boo.active = true
                    }else{
                        _self.boo.active = false
                    }
                },
                (err)=>{
                    alert(JSON.stringify(err))
                }
            )
        }
    }
})