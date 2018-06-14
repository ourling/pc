$(()=>{
    new Vue({
        el: '#supply',
        components: {
            'app-nav': appNav,
            'app-foot': appFoot,
            'app-floor': floor,
            'card-title': cardTitle,
            'slide-card-4': slideCard_4,
            'double-card-2': doubleCard_2
        },
        data: {
            part_title_1: {
                title: '挖到—国内领先、免费、最全的微营销产品',
                titleBar: '首屈一指的社交微分销服务平台,360°全方位专注社交营销,全网微营销最佳解决方案'
            },
            part_title_2: {
                title: '关于美车优选',
                titleBar: ''
            },
            part_1: [
                {content: {title: '微橱窗',txt: '企业信息的展示和推广', id: 1},text: {title: '微橱窗', txt: '企业的独立商城，粉丝即客户，客户即粉丝；完整的开店系统和促销工具。',desc: '适用于：线上和线下大中小型企业用户', href: 'javascript:;', hasBtn: true}},
                {content: {title: '微橱窗',txt: '企业信息的展示和推广', id: 2},text: {title: '微橱窗', txt: '企业的独立商城，粉丝即客户，客户即粉丝；完整的开店系统和促销工具。',desc: '适用于：线上和线下大中小型企业用户', href: 'javascript:;', hasBtn: true}},
                {content: {title: '微橱窗',txt: '企业信息的展示和推广', id: 3},text: {title: '微橱窗', txt: '企业的独立商城，粉丝即客户，客户即粉丝；完整的开店系统和促销工具。',desc: '适用于：线上和线下大中小型企业用户', href: 'javascript:;', hasBtn: false}},
                {content: {title: '微橱窗',txt: '企业信息的展示和推广', id: 4},text: {title: '微橱窗', txt: '企业的独立商城，粉丝即客户，客户即粉丝；完整的开店系统和促销工具。',desc: '适用于：线上和线下大中小型企业用户', href: 'javascript:;', hasBtn: true}}
            ],
            part_2: [
                {url: 'images/index/banner.png', desc: '美车优选作为专业汽车流通服务平台，通过“美车拍拍”、“美车直送”、“美车金融”，致力于为平行进口车商、中小汽车经销商提供供应链+SaaS技术平台+服务的整套销售服务管理体系。帮助经销商一站式解决车源、资金、流转、服务问题，提高经营效率、降低经营成本。'},
                {url: 'images/index/banner.png', desc: '车优选已与全国各大主机厂、经销商集团和自贸区建立战略合作关系，累计服务经销商千余家，致力于打造专业汽车流通服务第一品牌。'}
            ]
        },
        mounted(){

        },
        methods:{

        }
    });
})