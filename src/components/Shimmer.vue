<template>
    <div class="container">
        <div class="card">
            <div class="shimmer"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    /* container */
    
    
    /* card */
    
    .card {
        margin: 0 auto;
        max-width: 100%;
    }
    
    
    /* Shimmer content */
    
    .shimmer {
        width: 100%;
        height: 100vh;
        background-image: /* highlight */
        linear-gradient( 90deg, rgba(255, 255, 255, 0.5) 30%, rgba(255, 255, 255, 0.25) 35%, rgba(255, 255, 255, 0) 45%, rgba(255, 255, 255, 0.25) 55%, rgba(255, 255, 255, 0.5) 60%), radial-gradient( circle 21.5px at 21.5px 21.5px, rgb(237, 237, 237) 99%, transparent 0), /* circle */
        linear-gradient( rgb(237, 237, 237) 14px, transparent 0), /* name */
        linear-gradient( rgb(237, 237, 237) 12px, transparent 0), /* date */
        linear-gradient( rgb(237, 237, 237) 130px, transparent 0), /* image */
        linear-gradient( rgb(237, 237, 237) 20px, transparent 0), /* title */
        linear-gradient( rgb(237, 237, 237) 15px, transparent 0), /* description 1 */
        linear-gradient( rgb(237, 237, 237) 15px, transparent 0);
        /* description 2 */
        background-repeat: no-repeat;
        background-size: 1640px 395px, /* highlight */
        100px 395px, /* circle */
        100px 395px, /* name */
        60px 395px, /* date */
        calc(97.3% - 30px) 395px, /* image */
        calc(81% - 30px) 395px, /* title */
        calc(96% - 30px) 395px, /* description 1 */
        calc(66% - 30px) 395px;
        /* description 2 */
        background-position: 100% 0, /* highlight */
        23px 18px, /* circle */
        84px 22px, /* name */
        84px 43px, /* date */
        23px 82px, /* image */
        23px 238px, /* title */
        23px 275px, /* description 1 */
        23px 306px;
        /* description 2 */
        animation: shine 2s infinite;
    }
    
    @keyframes shine {
        to {
            background-position: 0 0, /* highlight */
            23px 18px, /* circle position */
            84px 22px, /* name */
            84px 43px, /* date */
            23px 82px, /* image */
            23px 238px, /* title */
            23px 275px, /* description 1 */
            23px 306px;
            /* description 2 */
        }
    }
</style>

