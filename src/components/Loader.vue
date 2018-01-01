<template>
    <div class='box' v-if="isShown">
        <q-spinner-gears :size="100"/>
    </div>
</template>

<script>
    import {
        Loading,
        QSpinnerGears
    } from 'quasar'
    import {
        eventBus
    } from '../utils/eventBus'
    console.log('eventBus', eventBus);
    export default {
        data() {
            return {
                isShown: false,
            }
        },
        mounted() {
            eventBus.$on('startLoader', () => {
                this.isShown = true;
                // with a custom delay
                Loading.show({
                    delay: 300, // milliseconds
                    spinner: QSpinnerGears,
                    message: 'Loading news...',
                    messageColor: 'white',
                    spinnerSize: 250, // in pixels
                    spinnerColor: 'white',
                    customClass: 'loader-bg'
                })
            });
            eventBus.$on('stopLoader', () => {
                this.isShown = false;
                // with a custom delay
                Loading.hide({
                    delay: 300 // milliseconds
                })
            })
        },
        methods: {
    
        },
        components: {
            QSpinnerGears
        }
    }
</script>

<style lang="scss" scoped>
    .box {
        display: none;
        z-index: 2001;
        width: 100vw;
        height: 100vh;
        box-shadow: 0 2px 30px rgba(black, .2);
        background: #fff;
        position: relative;
        overflow: hidden;
        transform: translate3d(0, 0, 0);
    }
</style>


