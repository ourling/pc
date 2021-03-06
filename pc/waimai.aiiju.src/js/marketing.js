/**
 * Created by All-aiju on 2017/11/24.
 */



var app = new Vue({
    el: "#marketing",
    data: {
        warpObj: {
            title: "加盟动态",
            btnArr: [{ title: "咖啡", href: "javascript:;" }, { title: "烘焙", href: "javascript:;" }, {
                title: "便当",
                href: "javascript:;"
            }]
        },
        container_1: {
            title: "外卖行业中遇到的梗",
            arr: [{ id: 1, title: "微商城", titleBar: "一个微商城内只能开一个门店，不支持LBS自动定位最近门店进行接单配送。" }, { id: 2, title: "收银台", titleBar: "只能处理单店的收银支付，不能处理独立的外卖订单，不支持堂食点单。" }, { id: 3, title: "会员营销", titleBar: "营销方式比较单一，不支持线上与线下门店会员打通。" }, { id: 4, title: "门店管理", titleBar: "多门店与线上的库存及财务没有打通，无法进行统一管理。" }, { id: 5, title: "配送问题", titleBar: "不支持第三方平台(达达配送、蜂鸟快送、蜂鸟专送)接单配送。" }]
        },
        container_2: {
            title: "云店宝 提高外卖营收五大神器",
            titleBar: "国内首款外卖餐厅新零售管理系统",
            arr: [{ id: 1, title: "多门店微商城", titleBar: "一个微商城内包含多个门店，且每个门店可根据权限管理独立操作，LBS自动定位最近门店进行接单配送。" }, { id: 2, title: "聚合收银台", titleBar: "多主体的聚合收银，适合直营加盟混合管理；多种订单管理：堂食、外卖订单均可管理。" }, { id: 3, title: "对接第三方外卖平台", titleBar: "可对接美团、饿了么、百度等外卖平台，实时同步各平台订单与财务数据。" }, { id: 4, title: "对接第三方配送平台", titleBar: "可对接达达、点我达等第三方配送平台，商户可直接发单。" }, { id: 5, title: "会员营销管理", titleBar: "强大的吸粉和营销功能：支持多种营销手段，优惠券、带参二维码、客户达标。" }]
        },
        container_3: {
            title: "外卖微商城 线上引流吸引新客到店",
            titleBar: "国内首款外卖餐厅新零售管理系统",
            arr: [{ id: 1, title: "LBS自动定位", titleBar: "LBS自动定位最近门店进行接单配送，支持隐藏费配送范围的店铺" }, { id: 2, title: "门店管理", titleBar: "一个微商城内包含多个门店，且每个门店可根据权限管理独立操作" }, { id: 3, title: "配送平台", titleBar: "对接第三方配送平台（通过API接口，对接达达、点我达等配送平台）" }, { id: 4, title: "数据分析", titleBar: "微商城流量统计与分析：微商城主页UV统计，微商城单店UV统计" }]
        },
        container_4: {
            title: "外卖微商城 线上引流吸引新客到店",
            titleBar: "国内首款外卖餐厅新零售管理系统"
        },
        container_5: {
            title: "外卖收银台 软硬件一体化管理方案",
            titleBar: "一套系统即可完整解决您的收银、店内下单、处理外卖订单等各个环节的需求",
            arr: [{ id: 1, title: "智能二维码", titleBar: "外卖内物料上的二维码吸粉带参二维码，可支持追溯客户/粉丝来源，转化平台用户" }, { id: 2, title: "裂变营销", titleBar: "扫码关注，微信分享有礼，集赞抢免吃等分销式的裂变传播，换取积分用于兑换红包/商品" }, { id: 3, title: "粉丝营销", titleBar: "可自定义根据消费行为进行用户分类，可对不同的用户分类发放不同类型的优惠or红包，支持短信带连接推送（带可追溯连接）" }, { id: 4, title: "企业订餐", titleBar: "专门的企业点餐入口，优势：客户黏性高，且提高现金储备" }, { id: 5, title: "用户点评", titleBar: "自定义管理评价，管理销量，提高品牌商城口碑" }, { id: 6, title: "优惠券", titleBar: "优惠/优惠券使用规则设置，优惠券发放规则设置，优惠券自定义设计。" }]
        },
        container_6: {
            title: "支持多个行业",
            titleBar: "丰富的功能，灵活的设计，让我们可以支持多个不同的行业提供更合适您的解决方案",
            arr: [{ id: 1, title: "快餐便当" }, { id: 2, title: "果蔬生鲜" }, { id: 3, title: "四川湘菜" }, { id: 4, title: "浪漫鲜花" }, { id: 5, title: "医药健康" }, { id: 6, title: "汉堡薯条" }, { id: 7, title: "包子粥店" }, { id: 8, title: "地方菜系" }, { id: 9, title: "披萨意面" }, { id: 10, title: "西式快餐" }, { id: 11, title: "甜品饮品" }, { id: 12, title: "小吃夜宵" }, { id: 13, title: "商超便利" }, { id: 14, title: "能量套餐" }, { id: 15, title: "特色面食" }, { id: 16, title: "麻辣诱惑" }]
        }
    },
    components: {
        'my-foot': Foot,
        'my-head': Head,
        'warp-container': warpContainer
    }
});