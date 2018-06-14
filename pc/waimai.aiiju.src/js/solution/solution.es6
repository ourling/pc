let app = new Vue({
    el: "#app",
    data: {
        warpObj: {
            title: "加盟动态",
            btnArr: [{title: "咖啡", href: "javascript:;"}, {title: "烘焙", href: "javascript:;"}, {
                title: "便当",
                href: "javascript:;"
            }]
        }
    },
    components: {
        'my-foot': Foot,
        'my-head': Head,
        'warp-container': warpContainer
    }
})