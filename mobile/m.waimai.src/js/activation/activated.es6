new Vue({
    el: "#app",
    data: {
        info: {
            phone: "",
            pwd: ""
        }
    },
    mounted(){
        let _self = this
        let phone = typeof sessionStorage.waimai_phone == 'undefined' ? '' : sessionStorage.waimai_phone;
        let pwd = sessionStorage.waimai_pwd == 'undefined' ? '' : sessionStorage.waimai_pwd;
        if(phone == "" || pwd == "") {
            window.location.href = `./activating.html`
        }else{
            _self.info = {
                phone: phone,
                pwd: pwd,
            }
        }
    }
})