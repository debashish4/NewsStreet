<template>
    <div class="side-bar-panel">
        <div class="categories">
            <div class="icon technology">
                <p><i class="ns-technology"></i>
                    <span class="text">Technology</span></p>
            </div>
            <div class="icon general">
                <p><i class="ns-general"></i>
                    <span class="text">General</span></p>
            </div>
            <div class="icon entertainment">
                <p><i class="ns-entertainment"></i>
                    <span class="text">Entertainment</span></p>
            </div>
            <div class="icon gaming">
                <p><i class="ns-gaming"></i>
                    <span class="text">Gaming</span></p>
            </div>
            <div class="icon health-and-medical">
                <p><i class="ns-health-and-medical"></i>
                    <span class="text">Health & Medical</span></p>
            </div>
            <div class="icon business">
                <p><i class="ns-business"></i>
                    <span class="text">Business</span></p>
            </div>
            <div class="icon politics">
                <p><i class="ns-politics"></i>
                    <span class="text">Politics</span></p>
            </div>
            <div class="icon sports">
                <p><i class="ns-sports"></i>
                    <span class="text">Sports</span></p>
            </div>
            <div class="icon science-and-nature">
                <p><i class="ns-science-and-nature"></i>
                    <span class="text">Science & Nature</span></p>
            </div>
            <div class="icon music">
                <p><i class="ns-music"></i>
                    <span class="text">Music</span></p>
            </div>
    
        </div>
    
    </div>
</template>

<script>
    import {
        QIcon
    } from 'quasar';
    export default {
        data() {
            return {
    
            }
        },
        components: {
            QIcon
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
        background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
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
        background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
    }
    
    .music {
        background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
    }
    
    .politics {
        background: linear-gradient(-180deg, #BCC5CE 0%, #929EAD 98%), radial-gradient(at top left, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%);
    }
    
    .science-and-nature {
        background-image: linear-gradient(to top, #e6b980 0%, #eacda3 100%);
    }
    
    .sports {
        background-image: linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%);
    }
    
    .technology {
        background-image: linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%);
    }
</style>


