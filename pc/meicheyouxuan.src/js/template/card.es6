let cardTitle = {
    template: `
        <div class="title-container">
            <h4 class="title">{{titleobj.title}}</h4>
            <p class="title-bar">{{titleobj.titleBar}}</p>
        </div>
    `,
    props: {
      titleobj: Object
    },
}
let slideCard_4 = {
    template: `
        <div class="card-container slide-animate-container">
            <div v-for="(item,index) in cardarr" class="card-4">
                <div class="content">
                    <h5 class="card-title">{{item.content.title}}</h5>
                    <p class="txt">{{item.content.txt}}</p>
                    <i :class="['icon','icon-' + item.content.id]"></i>
                </div>
                <div class="text-content">
                    <h5 class="txt-title">{{item.text.title}}</h5>
                    <p class="txt-txt">{{item.text.txt}}</p>
                    <p class="txt-txt-m">{{item.text.desc}}</p>
                    <a v-if="item.text.hasBtn" :href="item.text.href" class="txt-btn">了解详情</a>
                </div>
            </div>
        </div>
    `,
    props: {
        cardarr: Array
    },
    data(){
        return {

        }
    },
    mounted(){},
    methods: {

    }
}
let doubleCard_2 = {
    template: `
        <div class="card-container double-photo-container">
                <div v-for="(item,index) in cardarr" class="content">
                    <div class="card-2 photo">
                        <img class="response-img" :src="item.url" alt="">
                    </div>
                    <div class="card-2 text">
                        <h5 class="txt">{{item.desc}}</h5>
                    </div>
                </div>
            </div>
    `,
    props: {
        cardarr: Array
    }
}


