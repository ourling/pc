/**
 * Created by Administrator on 2017/9/7.
 */
let app = new Vue({
    el: "#app",
    components: {
        'app-head': Head,
        'app-foot': Foot,
        'app-mask-tel': MaskTel,
        'app-mask-menu': MaskMenu
    },
    mixins: [mixinMask,mixin],
    data: {

    },
    mounted(){

    },
    methods: {
        linkUrl(url){
            if(url != ''){
                location.href = url
            }
        }
    }
});