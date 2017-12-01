<template>
    <div class='box'>
        <div class='wave -one'></div>
        <div class='wave -two'></div>
        <div class='wave -three'></div>
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style lang="scss" scoped>
    /*waves****************************/
    
    .box {
        position: relative;
        top: 0;
        transform: rotate(80deg);
        left: 0;
    }
    
    .wave {
        position: fixed;
        top: 0;
        left: 0;
        opacity: .4;
        position: absolute;
        top: 3%;
        left: 10%;
        background: #0af;
        width: 1500px;
        height: 1300px;
        margin-left: -150px;
        margin-top: -250px;
        transform-origin: 50% 48%;
        border-radius: 43%;
        animation: drift 7000ms infinite linear;
    }
    
    .wave.-three {
        animation: drift 7500ms infinite linear;
        position: fixed;
        background-color: #77daff;
    }
    
    .wave.-two {
        animation: drift 3000ms infinite linear;
        opacity: .1;
        background: black;
        position: fixed;
    }
    
    .box:after {
        content: '';
        display: block;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 11;
        transform: translate3d(0, 0, 0);
    }
    
    @keyframes drift {
        from {
            transform: rotate(0deg);
        }
        from {
            transform: rotate(360deg);
        }
    }
</style>


