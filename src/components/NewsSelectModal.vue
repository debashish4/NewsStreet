<template>
    <q-modal v-model="isNewsListModalOpen" position="left" :no-backdrop-dismiss="true">
        <h4>{{modalTitle}}</h4>
        <div class="news-list">
            <div class="news-item">
                <p v-for="(item, index) in newsSources" :key="index">{{item.name}}</p>
            </div>
        </div>
        <q-btn color="primary" @click="toggleNewsListModal">Close</q-btn>
    </q-modal>
</template>

<script>
    import {
        QBtn,
        QModal
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
                newsSources:[],
                modalTitle:'NewsStreet Channels'

            }
        },
        computed:{
            ...mapState({
                isNewsListModalOpen: state => state.app.isNewsListModalOpen
            })
        },
        methods:{
            ...mapActions(['toggleNewsListModal', 'closeNewsListModal']),
        },
        components: {
            QBtn,
            QModal
        },
        watch:{
            data: function(newNewsSources){
                this.newsSources = newNewsSources;
                console.log('newsSources', this.newsSources);
            },
            title:function(title){
                this.modalTitle = hyphenToSpace(title);
            }
        },
        props:['data', 'title']
    }
</script>
<style lang="scss" scoped>
    .news-list{
        .news-item{
            min-height: 20vh;
            max-height: 60vh;
            overflow-y: scroll;
        }
         
    }
</style>
