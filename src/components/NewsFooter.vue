<template>
    <!-- Footer -->
    <q-toolbar class="news-footer" slot="footer">
        <q-toolbar-title>
            <q-btn @click="shareNews" flat>
            <q-icon name="share" />
            </q-btn>
            <q-btn @click="moveTofirst" flat>
            <q-icon name="vertical align top" class="change_history"/>
            </q-btn>
        </q-toolbar-title>
    </q-toolbar>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import {
        QToolbar,
        QToolbarTitle,
        QIcon,
        QBtn,
        Events
    } from 'quasar'
    import { cordovaShare } from '../utils/commonUtils'

    export default {
        data() {
            return {}
        },
        computed:{
            ...mapState({
                socialShareData: state => state.news.socialShareData
            })
        },
        methods: {
            moveTofirst(){
                Events.$emit('moveTofirst');
            },
            shareNews() {
                const {
                    description,
                    title,
                    url,
                    urlToImage
                } = this.socialShareData;
                cordovaShare({description, title, url})
            }
        },
        components: {
            QToolbar,
            QToolbarTitle,
            QIcon,
            QBtn
        }
    }
</script>

<style lang="scss" scoped>
    .news-footer{
        width:100%;
        .change_history{
            transform: rotate(-90deg);
        }
    }
</style>


