<template>
    <div class="side-bar-panel">
        <div class="categories clearfix">
            <div class="icon technology" @click="toggleNewsListModal">
                <p><i class="ns-technology"></i>
                    <span class="text">Technology</span></p>
            </div>
            <div class="icon general" @click="toggleNewsListModal">
                <p><i class="ns-general"></i>
                    <span class="text">General</span></p>
            </div>
            <div class="icon entertainment" @click="toggleNewsListModal">
                <p><i class="ns-entertainment"></i>
                    <span class="text">Entertainment</span></p>
            </div>
            <div class="icon gaming" @click="toggleNewsListModal">
                <p><i class="ns-gaming"></i>
                    <span class="text">Gaming</span></p>
            </div>
            <div class="icon health-and-medical" @click="toggleNewsListModal">
                <p><i class="ns-health-and-medical"></i>
                    <span class="text">Health & Medical</span></p>
            </div>
            <div class="icon business" @click="toggleNewsListModal">
                <p><i class="ns-business"></i>
                    <span class="text">Business</span></p>
            </div>
            <div class="icon politics" @click="toggleNewsListModal">
                <p><i class="ns-politics"></i>
                    <span class="text">Politics</span></p>
            </div>
            <div class="icon sports" @click="toggleNewsListModal">
                <p><i class="ns-sports"></i>
                    <span class="text">Sports</span></p>
            </div>
            <div class="icon science-and-nature" @click="toggleNewsListModal">
                <p><i class="ns-science-and-nature"></i>
                    <span class="text">Science & Nature</span></p>
            </div>
            <div class="icon music" @click="toggleNewsListModal">
                <p><i class="ns-music"></i>
                    <span class="text">Music</span></p>
            </div>
        
        </div>
        <news-select-modal/> 
    </div>
</template>

<script>
    import {
        QIcon
    } from 'quasar'
    import NewsSelectModal from '@/NewsSelectModal'
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
            }
        },
        methods:{
            ...mapActions(['toggleNewsListModal']),
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
        .text{
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
    
    .sports {
        background-image: linear-gradient(60deg, #ffc3a0 0%, #ffafbd 100%);
    }
    
    .technology {
        background-image: linear-gradient(-225deg, #FFE29F 0%, #FFA99F 100%);
    }
</style>


