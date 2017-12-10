<template>
    <!-- Footer -->
    <q-toolbar class="news-footer" slot="footer">
        <q-toolbar-title>
            <q-btn flat>
            <q-icon @click="cordovaShare" name="share" />
            </q-btn>
            <q-btn flat>
            <q-icon @click="scrollToStart" name="vertical align top" class="change_history"/>
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
            scrollToStart(){
                Events.$emit('scrollToStart');
            },
            cordovaShare() {
                const {
                    description,
                    title,
                    url,
                    urlToImage
                } = this.socialShareData;
                // this is the complete list of currently supported params you can pass to the plugin (all optional)
                var options = {
                    message: `${title}
                                  
                  ${description}
                  
                  Read More: ` || null, // not supported on some apps (Facebook, Instagram)
                    subject: title, // fi. for email
                    files: null, // an array of filenames either locally or remotely
                    url: url || null,
                    chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
                }
    
                var onSuccess = function(result) {
                    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
                    console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
                }
    
                var onError = function(msg) {
                    console.log("Sharing failed with message: " + msg);
                }
                try {
                    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
                } catch (err) {
                    console.log(err);
                }
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
        position:fixed;
        width:100%;
        bottom:0;

        .change_history{
            transform: rotate(-90deg);
        }
    }
</style>


