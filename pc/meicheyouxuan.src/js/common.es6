let appFoot = {
    template : `
        <footer>
            <div class="partner">
                <div class="footer-container partner-container">
                <div class="card-container">
                    <div class="card-2-spe">
                        <div class="top-item clear">
                            <span class="logo"><img :src="URL + 'images/index/foot-logo.png'" alt=""></span>
                            <span v-for="item in downicon" :class="['item',item.hasBar ? 'cut-off':'']">{{item.title}}</span>
                        </div>
                        <p class="foot-desc">联系方式：<span class="tel">13916365384</span></p>
                        <h4 class="foot-desc date">客服工作时间：9:30-17:30</h4>
                        <p class="foot-desc address">地址：上海杨浦区隆昌路619号城市概念7号楼2层</p>
                        <p class="foot-desc mail-num">邮编：200080021</p>
                        <p class="foot-desc mail">邮箱：443882302@qq.com</p>
                    </div>
                    <div class="card-2-spe right">
                        <img class="erwei" :src="URL + 'images/index/erwei.png'" alt="">
                        <p class="txt">扫码关注</p>
                    </div>
                </div>
            </div>
            </div>
            <div class="down-icon">
                <div class="footer-container">
                    <p>美车优选旗下：
                        <a v-for="(item,index) in downicon" :href="item.href" target="_blank">{{item.title}} <span v-if="item.hasBar"> | </span> </a>
                    </p>
                    <p>软件证书编号：浙RC-2017-0975 | 软件著作权登记号：2016SR358590 | 浙ICP备16019390号-4 | <a style="display:inline-block;text-decoration:none;height:20px;line-height:20px;color:#9e9e9e;" :href="lastLink.href" target="_blank"><img  :src="lastLink.url" style="vertical-align: sub">  {{lastLink.title}}</a></p>
                    <p>Copyright@ 2012 - 2017 Aiiju inc. All Rights Reserved 杭州挖到科技有限公司版权所有</p>
                </div>
            </div>
        </footer>
    `,
    data(){
        return {
            URL: `${GLOBAL_STATIC_URL}/`,
            downicon: [
                {hasBar: true,href: `${GLOBAL_STATIC_URL}/supply_chain`,title: "美车供应链"},
                {hasBar: true,href: "javascript:;",title: "美车销售管理"},
                {hasBar: true,href: `${GLOBAL_STATIC_URL}/serve.html`,title: "美车服务"},
                {hasBar: false,href: "javascript:;",title: "美车金融"}
            ],
            lastLink: {
                href: "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602004534",
                url: "http://www.ecbao.cn/dsb/assert/home_login/images/safe.png",
                title: "浙公网安备 33010602003879号"
            }
        }
    }
}
let Menu = {
    template: `
        <ul class="submenu">
            <li v-for="(item,index) in arritem" class="menu-item"><a :href="item.href">{{item.name}}</a></li>
        </ul>
    `,
    props: {
        arritem: Array
    }
}
let appNav = {
    template: `
        <header id="head" class="nav">
            <div class="nav-container clear">
                <span class="logo"></span>
                <Select class="nav-select" v-model="city" placeholder="请选择城市" @on-change="selectCity($event)">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <ul class="menu">
                    <li v-for="(item,index) in navObj">
                        <a :href="item.href" target="_blank">{{item.name}}</a>
                        <menu-item v-if="item.hasMenu" :arritem="item.navItem"></menu-item>
                    </li>
                </ul>
                <div class="login-container">
                    <a :href="http.register" target="_blank" class="item"><img :src="URL + 'images/comm/nav/login.png'" alt="" style="vertical-align: middle"> &nbsp;&nbsp;</a> |
                    <a :href="http.login" target="_blank" class="item"> &nbsp;&nbsp;经销商登录</a>
                </div>
            </div>
        </header>
    `,
    props: {
        num : Number
    },
    components: {
        'menu-item': Menu
    },
    data(){
        return {
            URL: `${GLOBAL_STATIC_URL}/`,
            navObj: [
                {name: "首页", href: `${GLOBAL_STATIC_URL}/index.html`, hasMenu: false},
                {name: "美车供应链", href: `${GLOBAL_STATIC_URL}/supply_chain`, hasMenu: false,navItem: [
                    {name: 'test1',href: "javascript:;"},
                    {name: 'test2',href: "javascript:;"},
                    {name: 'test3',href: "javascript:;"},
                    {name: 'test4',href: "javascript:;"},
                    {name: 'test5',href: "javascript:;"}
                ]},
                {name: "美车服务", href: `${GLOBAL_STATIC_URL}/serve.html`, hasMenu: false,navItem: [
                    {name: 'test1',href: "javascript:;"},
                    {name: 'test2',href: "javascript:;"},
                    {name: 'test3',href: "javascript:;"},
                    {name: 'test4',href: "javascript:;"}
                 ]},
                {name: "美车销售管理", href: `javascript:;`, hasMenu: false,navItem:[
                    {name: 'test1',href: "javascript:;"}
                ]},
                {name: "美车金融", href: "javascript:;", hasMenu: false,navItem: [
                    {name: 'test1',href: "javascript:;"},
                    {name: 'test2',href: "javascript:;"},
                    {name: 'test4',href: "javascript:;"}
                ]},
                {name: "关于我们", href: `${GLOBAL_STATIC_URL}/aboutus.html`, hasMenu: false,navItem:[
                    {name: 'test1',href: "javascript:;"},
                    {name: 'test2',href: "javascript:;"}
                ]}
            ],
            http: {
                login: 'javascript:;',
                register: 'javascript:;'
            },
            cityList: [
                {value: '热门',label: '热门'},
                {value: '北京',label: '北京'},
                {value: '宁波',label: '宁波'},
                {value: '深圳',label: '深圳'},
                {value: '厦门',label: '厦门'},
                {value: '成都',label: '成都'},
                {value: '杭州',label: '杭州'},
                {value: '华北',label: '华北'},
                {value: '东北',label: '东北'},
                {value: '华中',label: '华中'},
                {value: '华南',label: '华南'},
                {value: '西南',label: '西南'},
                {value: '西北',label: '西北'}
            ],
            city: ''
        }
    },
    mounted(){

    },
    methods :{
        selectCity(val){
            console.log(val);
        }
    }
}
let floor = {
    template: `
        <div class="floor-container">
            <div class="floor">
                <a class="item" href="javascript:;">我的</a>
                <a v-for="(item,index) in floor" class="item cut-off" :href="item.url" target="_blank">
                    <i :class="['icon','icon-'+item.id]"></i>
                    {{item.name}}</a>
            </div>
            <transition name="fade">
                <a v-show="!Boo.isTop" href="javascript:;" class="return-top" @click="toTop">∧ TOP</a>
            </transition>
        </div>
    `,
    data(){
        return {
            Boo: {
                isTop: true
            },
            floor: [
                {name: '关注',id: 1,url: 'javascript:;'},
                {name: '咨询',id: 2,url: '//wpa.qq.com/msgrd?v=3&uin=512909&site=qq&menu=yes'},
                {name: '估价',id: 3,url: 'javascript:;'},
                {name: '反馈',id: 4,url: 'javascript:;'}
            ]
        }
    },
    mounted(){
        this.initScroll();
    },
    methods:{
        toTop(){
            let _self = this
            $('html,body').animate({scrollTop: '0px'}, 800,function(){
                _self.Boo.isTop = true
            })
        },
        initScroll(){
            let _self = this
            $(window).scroll(function () {
                let winPos = $(window).scrollTop();
                if (winPos >= 200) {
                    _self.Boo.isTop = false;
                }else{
                    _self.Boo.isTop = true;
                }
            });
        }
    }
}
$(window).scroll(function () {
    var winPos = $(window).scrollTop();
    if (winPos >= 200) {
        $(".nav").addClass("fix-nav");
    } else {
        $(".nav").removeClass("fix-nav");
    }
});
let  linkTag = `<link rel="shortcut icon" href="${GLOBAL_STATIC_URL}/images/comm/favicon.ico">`;
// 动态将ico添加到head里
$($('head')[0]).append(linkTag);