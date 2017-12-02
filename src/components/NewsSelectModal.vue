<template>
    <q-modal v-model="isNewsListModalOpen" position="left" :no-backdrop-dismiss="true">
        <div class="news-list-wrapper">
            <h4 class="title">{{modalTitle}}</h4>
            <div class="news-list">
                <div v-for="(item, index) in newsSources" :key="index" :class="{'selected':item.isSelected}" class="news-item" @click="selectNews(item,$event)">
                    <div class="news-thumb">
                        <p class="source-logo"><img :src="`https://icons.better-idea.org/icon?url=${item.url}&size=70..120..200`" :alt="`${item.name} logo`" /></p>
                        <p class="source-name">{{item.name}}</p>
                    </div>
                </div>
            </div>
            <div class="action">
                <q-btn class="deselectAll" color="secondary" @click="deselectAll">
                    Deselect All
                </q-btn>
                <q-btn class="okay" color="primary" @click="saveNews">
                    Okay
                </q-btn>
    
    
            </div>
        </div>
    </q-modal>
</template>

<script>
    import {
        QBtn,
        QModal,
        LocalStorage
    } from 'quasar'
    import {
        mapActions,
        mapState
    } from 'vuex'
    import {
        hyphenToSpace
    } from '../utils/commonUtils'
    
    export default {
        data() {
            return {
                open: false,
                newsSources: [],
                modalTitle: 'NewsStreet Channels',
                selectedNewsId: [],
                selectedNews: [],
            }
        },
        computed: {
            ...mapState({
                isNewsListModalOpen: state => state.app.isNewsListModalOpen
            }),
            isSelected() {
                return {
                    'selected': true
                }
            }
        },
        mounted() {
            console.log({
                newsSources: this.newsSources
            });
    
            if (localStorage.getItem('selectedNews') && localStorage.getItem('selectedNews')) {
                this.selectedNews = JSON.parse(localStorage.getItem('selectedNews'));
                this.selectedNewsId = JSON.parse(localStorage.getItem('selectedNewsId'));
                 this.saveSelectedNews(this.selectedNews);
            }
        },
        methods: {
            ...mapActions(['toggleNewsListModal', 'closeNewsListModal', 'saveSelectedNews']),
            selectNews(item, event) {
                if (this.selectedNewsId.indexOf(item.id) == '-1') {
                    item.isSelected = !item.isSelected;
                    this.selectedNewsId.push(item.id);
                    this.selectedNews.push(item);
                } else {
                    item.isSelected = !item.isSelected;
                    let indexOfItemToBeRemoved = this.selectedNewsId.indexOf(item.id);
                    this.selectedNewsId.splice(indexOfItemToBeRemoved, 1);
                    this.selectedNews.splice(indexOfItemToBeRemoved, 1);
                }
                console.log('selectedNews', this.selectedNews);
                console.log('selectedNewsID', this.selectedNewsId);
                console.log('newsSources', this.newsSources);
            },
            deselectNews(item, event) {
                item.isSelected = !item.isSelected;
            },
            saveNews() {
                console.log('save news', this.selectedNews);
                this.toggleNewsListModal();
                this.saveSelectedNews(this.selectedNews);
                localStorage.setItem('selectedNews', JSON.stringify(this.selectedNews));
                localStorage.setItem('selectedNewsId', JSON.stringify(this.selectedNewsId));
            },
            deselectAll() {
                let _toBeRemovedItemsIndex = [];
                let removedIdName = [];
                console.log('selectedNews', this.selectedNews);
                console.log({
                    modalTitle: this.modalTitle
                });
                this.selectedNews.forEach((item, index) => {
                    console.log({
                        itemCategory: item.category,
                        modalTitle: this.title
                    });
                    if (item.category === this.title) {
                        console.log({
                            title: this.modalTitle
                        });
                        item.isSelected = false;
                        _toBeRemovedItemsIndex.push(index);
                        console.log('_toBeRemovedItemsIndex', _toBeRemovedItemsIndex);
                    }
                });
    
                for (var i = _toBeRemovedItemsIndex.length - 1; i >= 0; i--) {
                    this.selectedNews.splice(_toBeRemovedItemsIndex[i], 1);
                    let removedItem = this.selectedNewsId.splice(_toBeRemovedItemsIndex[i], 1);
                    removedIdName.push(...removedItem);
                }
    
                console.log({
                    removedIdName
                });
                removedIdName.forEach((xitem, xindex) => {
                    console.log({xitem});
                    this.newsSources.some((yitem, yindex) => {
                    console.log({yitem:yitem.id});
                        if (xitem === yitem.id) {
                            this.newsSources[yindex].isSelected = false;
                            return true;
                        }
                    })
                });
                console.log('new selected news', this.selectedNews);
                console.log('newsSources', this.newsSources);
            },
        },
        components: {
            QBtn,
            QModal
        },
        watch: {
            data: function(newNewsSources) {
                if (this.selectedNews && this.selectedNewsId) {
                    this.selectedNewsId.forEach((xitem, xindex) => {
                        newNewsSources.some((yitem, yindex) => {
                            if (xitem === yitem.id) {
                                newNewsSources[yindex].isSelected = true;
                                return true;
                            }
                        })
                    });
                    this.newsSources = newNewsSources;
                }
    
            },
            title: function(title) {
                this.modalTitle = hyphenToSpace(title);
            }
        },
        props: ['data', 'title']
    }
</script>

<style lang="scss" scoped>
    .news-list-wrapper {
        background-image: url('../assets/cream-pixels.png');
        .title {
            margin: 0;
            padding: 1rem;
            height: 5rem;
            color: #fff;
            background: #595959;
        }
    }
    
    .news-list {
        min-height: 20vh;
        max-height: 60vh;
        overflow-y: scroll;
        .news-item {
            position: relative;
            width: 40vw;
            height: 40vw;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0.5rem;
            float: left;
            margin: 0.5rem;
            background: transparent;
            .news-thumb {
                height: 35vw;
                padding: 0.5rem;
                border-radius: 0.5rem;
            }
            .source-logo {
                width: 10rem;
                height: 10rem;
                display: block;
                margin: 0 auto;
                img {
                    display: block;
                    background: #ccc;
                    border-radius: 1rem;
                    width: 100%;
                    height: 100%;
                }
            }
            .source-name {
                text-align: center;
                font-size: 1.5rem;
            }
        }
    }
    
    .action {
        height: 5rem;
        overflow: hidden;
        background: #595959;
        display: flex;
        justify-content: space-between;
        .okay,
        .deselectAll {
            width: 50%;
            height: 100%;
        }
    }
</style>
