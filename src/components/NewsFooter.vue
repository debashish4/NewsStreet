<template>
    <!-- Footer -->
    <q-toolbar class="news-footer" slot="footer">
        <q-toolbar-title class="footer-icons">
            <q-btn @click="shareNews" flat>
                <q-icon name="share" />
            </q-btn>
            <q-btn @click="saveNewsToLS" flat>
                <q-icon name="save" />
            </q-btn>
            <q-btn @click="getNewsFromLS" flat>
                <q-icon name="chrome reader mode" />
            </q-btn>
            <q-btn @click="moveTofirst" flat>
                <q-icon name="vertical align top" class="change_history" />
            </q-btn>
        </q-toolbar-title>
        <div>
            <q-modal class="saved-news-list-wrapper" v-model="isSavedNewsCollectionWindowOpen" minimized>
                <ol class="saved-news-list">
                    <li v-for="(item, index) in savedNewsCollection" :key="index">
                        <p class="saved-news">{{item.title}}</p>
                        <button class="clear" @click="removeSavedItem(item, index)"><q-icon name="clear" /></button>
                    </li>
                </ol>
                <div class="actions">
                    <q-btn @click="removeAllSavedNews" color="red" :outline="true" class="clear">
                        Clear All
                    </q-btn>
                    <q-btn class="close" color="red" @click="isSavedNewsCollectionWindowOpen = false" label="Close">
                        Close
                    </q-btn>
                </div>
            </q-modal>
        </div>
    </q-toolbar>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex'
    import {
        QToolbar,
        QToolbarTitle,
        QIcon,
        QBtn,
        Events,
        QModal
    } from 'quasar'
    import {
        cordovaShare
    } from '../utils/commonUtils'
    
    export default {
        data() {
            return {
                isSavedNewsCollectionWindowOpen: false,
                savedNewsCollection: []
            }
        },
        computed: {
            ...mapState({
                socialShareData: state => state.news.socialShareData
            })
        },
        methods: {
            moveTofirst() {
                Events.$emit('moveTofirst');
            },
            shareNews() {
                const {
                    description,
                    title,
                    url,
                    urlToImage
                } = this.socialShareData;
                cordovaShare({
                    description,
                    title,
                    url
                })
            },
            saveNewsToLS() {
                let savedNews = [];
                let getSavedNews = localStorage.getItem('readLater');
                if (getSavedNews) {
                    let savedNewsArr = JSON.parse(getSavedNews);
                    savedNewsArr.push(this.socialShareData);
                    let stringifySavedNews = JSON.stringify(savedNewsArr);
                    console.log('stringifySavedNews', stringifySavedNews);
                    localStorage.setItem('readLater', stringifySavedNews);
                } else {
                    savedNews.push(this.socialShareData);
                    let stringifySavedNews = JSON.stringify(savedNews);
                    localStorage.setItem('readLater', stringifySavedNews);
                };
            },
            getNewsFromLS() {
                this.isSavedNewsCollectionWindowOpen = true;
                let getSavedNews = JSON.parse(localStorage.getItem('readLater'));
                this.savedNewsCollection = getSavedNews;
                console.log('this.savedNewsCollection', this.savedNewsCollection);
            },
            removeAllSavedNews() {
                this.savedNewsCollection = [];
                localStorage.setItem('readLater', '[]');
            },
            removeSavedItem(item, index){
                this.savedNewsCollection.splice(index,1);
                let stringifyNewsCollection = JSON.stringify(this.savedNewsCollection);
                localStorage.setItem('readLater', stringifyNewsCollection);
            }
        },
        components: {
            QToolbar,
            QToolbarTitle,
            QIcon,
            QBtn,
            QModal
        }
    }
</script>

<style lang="scss">
    .news-footer {
        width: 100%;
        .footer-icons {
            display: flex;
            justify-content: space-between;
        }
        .change_history {
            transform: rotate(-90deg);
        }
    }
    
    .saved-news-list-wrapper {
        .modal-content {
            width: 90vw!important;
            max-height: 90vh!important;
            overflow: hidden;
            padding: 1rem;
        }
        .saved-news-list {
            height: 80vh;
            overflow: hidden;
            overflow-y: scroll;
            li:nth-child(even) {
                background: rgb(255, 245, 245);
            }
            li:nth-child(odd) {
                background: rgb(255, 226, 226);
            }
            li {
                min-height: 5rem;
                display: flex;
                align-items: stretch;
                padding: 0 0 0 1rem;
                font-size: 1.6rem;
            }
            .saved-news {
                color: dodgerblue;
                padding: 1rem 0;
                text-decoration: underline;
            }
            .clear {
                background: rgba(51,51,51,0.8);
                color: #fff;
                border: none;
                padding:0 1rem;
            }
        }
        .actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }
    }
</style>


