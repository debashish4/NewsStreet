<template>
    <div class="side-bar-panel">
        <div class="categories clearfix">
            <div class="icon technology" @click="insertDataToSelectNewsModal('technology')">
                <p><i class="ns-technology"></i>
                    <span class="text">Technology</span></p>
            </div>
            <div class="icon general" @click="insertDataToSelectNewsModal('general')">
                <p><i class="ns-general"></i>
                    <span class="text">General</span></p>
            </div>
            <div class="icon entertainment" @click="insertDataToSelectNewsModal('entertainment')">
                <p><i class="ns-entertainment"></i>
                    <span class="text">Entertainment</span></p>
            </div>
            <div class="icon gaming" @click="insertDataToSelectNewsModal('gaming')">
                <p><i class="ns-gaming"></i>
                    <span class="text">Gaming</span></p>
            </div>
            <div class="icon health-and-medical" @click="insertDataToSelectNewsModal('health-and-medical')">
                <p><i class="ns-health-and-medical"></i>
                    <span class="text">Health & Medical</span></p>
            </div>
            <div class="icon business" @click="insertDataToSelectNewsModal('business')">
                <p><i class="ns-business"></i>
                    <span class="text">Business</span></p>
            </div>
            <div class="icon politics" @click="insertDataToSelectNewsModal('politics')">
                <p><i class="ns-politics"></i>
                    <span class="text">Politics</span></p>
            </div>
            <div class="icon sport" @click="insertDataToSelectNewsModal('sport')">
                <p><i class="ns-sports"></i>
                    <span class="text">Sports</span></p>
            </div>
            <div class="icon science-and-nature" @click="insertDataToSelectNewsModal('science-and-nature')">
                <p><i class="ns-science-and-nature"></i>
                    <span class="text">Science & Nature</span></p>
            </div>
            <div class="icon music" @click="insertDataToSelectNewsModal('music')">
                <p><i class="ns-music"></i>
                    <span class="text">Music</span></p>
            </div>
    
        </div>
        <news-select-modal :title="selectNewsModalDataTitle" :data="selectNewsModalData" />
    </div>
</template>

<script>
    import {
        QIcon
    } from 'quasar'
    import {
        mapActions
    } from 'vuex'
    import NewsSelectModal from '@/NewsSelectModal'
    import {
        fetchNewsSource
    } from '../network/requestNews'
    import {
        NEWS_CATEGORY
    } from '../constants/UI_constants';
    
    export default {
        data() {
            return {
                NewsCategories: {
                    general: [],
                    business: [],
                    entertainment: [],
                    gaming: [],
                    music: [],
                    politics: [],
                    science_and_nature: [],
                    health_and_medical: [],
                    sport: [],
                    technology: []
                },
                checkedItems: [],
                isPanelOpen: false,
                selectNewsModalData: [],
                selectNewsModalDataTitle: ''
            }
        },
        mounted() {
            fetchNewsSource().then(res => {
                res.sources.map((item, index, arr) => {
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
                        case NEWS_CATEGORY.GAMING:
                            {
                                this.NewsCategories.gaming.push(item);
                                break;
                            }
                        case NEWS_CATEGORY.MUSIC:
                            {
                                this.NewsCategories.music.push(item);
                                break;
                            }
                        case NEWS_CATEGORY.POLITICS:
                            {
                                console.log("politics", item);
                                this.NewsCategories.politics.push(item);
                                break;
                            }
                        case NEWS_CATEGORY.SCIENCE_AND_NATURE:
                            {
                                this.NewsCategories.science_and_nature.push(item);
                                break;
                            }
                        case NEWS_CATEGORY.HEALTH_AND_MEDICAL:
                            {
                                this.NewsCategories.health_and_medical.push(item);
                                break;
                            }
                        case NEWS_CATEGORY.SPORT:
                            {
                                console.log("sport", item);
                                this.NewsCategories.sport.push(item);
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
    
            this.$root.$on('openPanel', () => {
                this.isPanelOpen = true
            });
        },
        methods: {
            ...mapActions(['toggleNewsListModal']),
            insertDataToSelectNewsModal(category) {
                switch (category) {
                    case NEWS_CATEGORY.GENERAL:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.GENERAL;
                            this.selectNewsModalData = this.NewsCategories.general;
                            break;
                        }
                    case NEWS_CATEGORY.BUSINESS:
                        {
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
                    case NEWS_CATEGORY.GAMING:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.GAMING
                            this.selectNewsModalData = this.NewsCategories.gaming;
                            break;
                        }
                    case NEWS_CATEGORY.MUSIC:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.MUSIC
                            this.selectNewsModalData = this.NewsCategories.music;
                            break;
                        }
                    case NEWS_CATEGORY.POLITICS:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.POLITICS
                            this.selectNewsModalData = this.NewsCategories.politics;
                            break;
                        }
                    case NEWS_CATEGORY.SCIENCE_AND_NATURE:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.SCIENCE_AND_NATURE;
                            this.selectNewsModalData = this.NewsCategories.science_and_nature;
                            break;
                        }
                    case NEWS_CATEGORY.HEALTH_AND_MEDICAL:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.HEALTH_AND_MEDICAL
                            this.selectNewsModalData = this.NewsCategories.health_and_medical;
                            break;
                        }
                    case NEWS_CATEGORY.SPORT:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.SPORT
                            console.log('title', this.selectNewsModalDataTitle);
                            this.selectNewsModalData = this.NewsCategories.sport;
                            break;
                        }
                    case NEWS_CATEGORY.TECHNOLOGY:
                        {
                            this.selectNewsModalDataTitle = NEWS_CATEGORY.TECHNOLOGY
                            this.selectNewsModalData = this.NewsCategories.technology;
                            break;
                        }
                }
                this.toggleNewsListModal();
            }
        },
        components: {
            QIcon,
            NewsSelectModal
        }
    }
</script>

<style lang="scss" scoped>
    .side-bar-panel {
        width: 100%;
    }
    
    .icon {
        margin: 0.5rem;
        padding-top: 1rem;
        display: flex;
        border-radius: 1rem;
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
    
    .gaming {
        background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    }
    
    .general {
        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    }
    
    .health-and-medical {
        background-image: linear-gradient(-60deg, #a8edea 0%, #fed6e3 100%);
    }
    
    .music {
        background-image: linear-gradient(-60deg, #accbee 0%, #e7f0fd 100%);
    }
    
    .politics {
        background: linear-gradient(-180deg, #BCC5CE 0%, #929EAD 100%);
    }
    
    .science-and-nature {
        background-image: linear-gradient(to top, #e6b980 0%, #eacda3 100%);
    }
    
    .sport {
        background-image: linear-gradient(60deg, #ffc3a0 0%, #ffafbd 100%);
    }
    
    .technology {
        background-image: linear-gradient(-225deg, #FFE29F 0%, #FFA99F 100%);
    }
</style>


