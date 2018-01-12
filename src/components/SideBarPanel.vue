<template>
    <div class="side-bar-panel-wrapper">
        <div class="side-bar-panel">
            <div class="country categories clearfix">
                <div class="heading-wrapper">
                    <div class="heading">
                        <!-- <h4>News based on Country</h4> -->
                        <h4>Country</h4>
                        <div class="skew"></div>
                    </div>
                    <div class="border"></div>
    
                </div>
                <div class="icon india" @click="insertDataToSelectNewsModal('technology')">
                    <p><i class="country-flag"></i>
                        <span class="text">India</span></p>
                </div>
                <div class="icon usa" @click="insertDataToSelectNewsModal('technology')">
                    <p><i class="country-flag"></i>
                        <span class="text">USA</span></p>
                </div>
            </div>
            <div class="world categories clearfix">
                <div class="heading-wrapper">
                    <div class="heading">
                        <!-- <h4>World News -- Top Headlines from world best news sites</h4> -->
                        <h4>World News</h4>
                        <div class="skew"></div>
                    </div>
                    <div class="border"></div>
    
                </div>
                <div class="icon technology" v-touch-hold="()=>openNewsSelectModal('technology')" @click="insertDataToSelectNewsModal('technology')">
                    <p><i class="nw-technology"></i>
                        <span class="text">Technology</span></p>
                </div>
                <div class="icon general" v-touch-hold="()=>openNewsSelectModal('general')" @click="insertDataToSelectNewsModal('general')">
                    <p><i class="nw-general"></i>
                        <span class="text">General</span></p>
                </div>
                <div class="icon entertainment" v-touch-hold="()=>openNewsSelectModal('entertainment')" @click="insertDataToSelectNewsModal('entertainment')">
                    <p><i class="nw-entertainment"></i>
                        <span class="text">Entertainment</span></p>
                </div>
                <div class="icon health" v-touch-hold="()=>openNewsSelectModal('health')" @click="insertDataToSelectNewsModal('health')">
                    <p><i class="nw-health"></i>
                        <span class="text">Health</span></p>
                </div>
                <div class="icon business" v-touch-hold="()=>openNewsSelectModal('business')" @click="insertDataToSelectNewsModal('business')">
                    <p><i class="nw-business"></i>
                        <span class="text">Business</span></p>
                </div>
                <div class="icon sports" v-touch-hold="()=>openNewsSelectModal('sports')" @click="insertDataToSelectNewsModal('sports')">
                    <p><i class="nw-sports"></i>
                        <span class="text">Sports</span></p>
                </div>
                <div class="icon science" v-touch-hold="()=>openNewsSelectModal('science')" @click="insertDataToSelectNewsModal('science')">
                    <p><i class="nw-science"></i>
                        <span class="text">Science</span></p>
                </div>
              
            </div>
            <news-select-modal :title="selectNewsModalDataTitle" :data="selectNewsModalData" />
        </div>
        <!-- <div class="continue full-width">
            <q-btn class="full-width load-news" big @click="loadNews">Load Selected News</q-btn>
        </div> -->
    </div>
</template>

<script>
    import {
        QIcon,
        QBtn,
        TouchSwipe,
        TouchHold
    } from 'quasar'
    import {
        mapActions
    } from 'vuex'
    import {
        NEWS_CATEGORY
    } from '../constants/UI_constants';
    import {
        fetchNewsSource
    } from '../network/requestNews'
    import {
        categoryName,
        eventBus
    } from '../utils/eventBus'
    import NewsSelectModal from '@/NewsSelectModal'
    
    export default {
        data() {
            return {
                NewsCategories: {
                    general: [],
                    business: [],
                    entertainment: [],
                    science: [],
                    health: [],
                    sports: [],
                    technology: []
                },
                checkedItems: [],
                isPanelOpen: false,
                selectNewsModalData: [],
                selectNewsModalDataTitle: ''
            }
        },
        directives: {
            TouchSwipe,
            TouchHold
        },
        mounted() {
            fetchNewsSource().then(res => {
                    res.sources.map((item, index, arr) => {
                        item.isSelected = false; // used to select/deselect item in news source list
                        switch (item.category) {
                            case NEWS_CATEGORY.GENERAL:
                                {
                                    this.NewsCategories.general.push(item);
                                    break;
                                }
                            case NEWS_CATEGORY.BUSINESS:
                                {
                                    this.NewsCategories.business.push(item);
                                    break;
                                }
                            case NEWS_CATEGORY.ENTERTAINMENT:
                                {
                                    this.NewsCategories.entertainment.push(item);
                                    break;
                                }
                            case NEWS_CATEGORY.SCIENCE:
                                {
                                    this.NewsCategories.science.push(item);
                                    break;
                                }
                            case NEWS_CATEGORY.HEALTH:
                                {
                                    this.NewsCategories.health.push(item);
                                    break;
                                }
                            case NEWS_CATEGORY.SPORTS:
                                {
                                    this.NewsCategories.sports.push(item);
                                    break;
                                }
                            case NEWS_CATEGORY.TECHNOLOGY:
                                {
                                    this.NewsCategories.technology.push(item);
                                    break;
                                }
                        }
                    })
                })
                .catch(err => console.log('sdfdsf', err))
        console.log('NewsCategories data', this.NewsCategories);
        },
        methods: {
            ...mapActions(['toggleNewsListModal', 'toggleDrawer', 'saveSelectedNews']),
            insertDataToSelectNewsModal(category) {
                switch (category) {
                    case NEWS_CATEGORY.GENERAL:
                        {
                            this.saveSelectedNews(this.NewsCategories.general);
                            this.loadNews();
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.GENERAL;
                            this.selectNewsModalData = this.NewsCategories.general;
                            break;
                        }
                    case NEWS_CATEGORY.BUSINESS:
                        {
                            this.saveSelectedNews(this.NewsCategories.business);
                            this.loadNews();
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.BUSINESS
                            this.selectNewsModalData = this.NewsCategories.business;
                            break;
                        }
                    case NEWS_CATEGORY.ENTERTAINMENT:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.ENTERTAINMENT
                            this.selectNewsModalData = this.NewsCategories.entertainment;
                            break;
                        }
                    case NEWS_CATEGORY.SCIENCE:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.SCIENCE;
                            this.selectNewsModalData = this.NewsCategories.science;
                            break;
                        }
                    case NEWS_CATEGORY.HEALTH:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.HEALTH
                            this.selectNewsModalData = this.NewsCategories.health;
                            break;
                        }
                    case NEWS_CATEGORY.SPORTS:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.SPORTS
                            this.selectNewsModalData = this.NewsCategories.sports;
                            break;
                        }
                    case NEWS_CATEGORY.TECHNOLOGY:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.TECHNOLOGY
                            this.selectNewsModalData = this.NewsCategories.technology;
                            break;
                        }
                }
                // this.toggleNewsListModal();
            },
            openNewsSelectModal(categoryName) {
                console.log('openNewsSelectModal', categoryName);
                
                switch (categoryName) {
                    case NEWS_CATEGORY.GENERAL:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.GENERAL;
                            this.selectNewsModalData = this.NewsCategories.general;
                            this.toggleNewsListModal();
                            break;
                        }
                    case NEWS_CATEGORY.BUSINESS:
                        {
                            console.log('hello', this.NewsCategories.business);
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.BUSINESS;
                            this.selectNewsModalData = this.NewsCategories.business;
                            this.toggleNewsListModal();
                            break;
                        }
                    case NEWS_CATEGORY.ENTERTAINMENT:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.ENTERTAINMENT
                            this.selectNewsModalData = this.NewsCategories.entertainment;
                            this.toggleNewsListModal();                            
                            break;
                        }
                    case NEWS_CATEGORY.SCIENCE:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.SCIENCE;
                            this.selectNewsModalData = this.NewsCategories.science;
                            this.toggleNewsListModal();
                            break;
                        }
                    case NEWS_CATEGORY.HEALTH:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.HEALTH
                            this.selectNewsModalData = this.NewsCategories.health;
                            this.toggleNewsListModal();
                            break;
                        }
                    case NEWS_CATEGORY.SPORTS:
                        {
                            console.log('sports content',this.NewsCategories.sports);
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.SPORTS
                            this.selectNewsModalData = this.NewsCategories.sports;
                            this.toggleNewsListModal();
                            break;
                        }
                    case NEWS_CATEGORY.TECHNOLOGY:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.TECHNOLOGY
                            this.selectNewsModalData = this.NewsCategories.technology;
                            this.toggleNewsListModal();
                            break;
                        }
                }
    
            },
            loadNews() {
                eventBus.$emit('loadNews', 'hello');
                this.toggleDrawer();
            }
        },
        components: {
            QIcon,
            QBtn,
            NewsSelectModal
        }
    }
</script>

<style lang="scss" scoped>
    .side-bar-panel {
        width: 100%;
        height: 100vh;
        padding-bottom: 5rem;
        overflow: scroll;
        .categories {
            padding: 1rem 0.5rem;
        }
    }
    
    .continue {
        height: 50px;
        position: fixed;
        bottom: 0;
        button {
            color: white;
            height: 100%;
            background: #d23f50;
        }
    }
    
    .icon {
        margin: 1.2vw;
        padding-top: 1rem;
        display: flex;
        border-radius: 0.8rem;
        float: left;
        align-items: center;
        justify-content: center;
        width: 30vw;
        height: 30vw;
        overflow: hidden;
        i {
            width: 100%;
            display: block;
            color: #343434;
            font-size: 7rem;
            text-align: center;
        }
        .text {
            text-align: center;
            font-size: 1.3rem;
            display: inline-block;
            width: 100%;
        }
    }
    
    .business {
        background-image: linear-gradient(60deg, #96deda 0%, #50c9c3 100%);
    }
    
    .entertainment {
        background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
    }
    
    .general {
        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    }
    
    .health {
        background-image: linear-gradient(-60deg, #a8edea 0%, #fed6e3 100%);
    }
    
    .science {
        background-image: linear-gradient(to top, #e6b980 0%, #eacda3 100%);
    }
    
    .sports {
        background-image: linear-gradient(60deg, #ffc3a0 0%, #ffafbd 100%);
    }
    
    .technology {
        background-image: linear-gradient(-225deg, #ffe29f 0%, #ffa99f 100%);
    }
    
    .country {
        .country-flag {
            width: 8rem !important;
            height: 8rem;
            border-radius: 50%;
            display: block;
            background-size: cover;
        }
        .icon {
            background: #a2ded0;
            background-size: cover;
        }
        .india .country-flag {
            background-image: url("../assets/in.svg");
        }
        .usa .country-flag {
            background-image: url("../assets/us.svg");
        }
    }
    
    .heading {
        height: 30px;
        width: 200px;
        position: relative;
        display: flex;
        align-content: center;
        background: #333;
    }
    
    .heading .skew {
        background: #333;
        height: 100%;
        width: 120px;
        position: absolute;
        right: -10px;
        transform: skew(35deg);
    }
    
    .border {
        position: relative;
        z-index: 12;
        width: 100%;
        border: 0.2rem solid #d23f50;
        margin-bottom: 1rem;
    }
    
    h4 {
        position: absolute;
        padding: 0.5rem;
        color: #fff;
        z-index: 1;
        top: 0;
        font-size: 1.7rem;
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
        -webkit-margin-start: 0;
        -webkit-margin-end: 0;
    }
</style>


