<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style lang="less">
    html, body {
        padding: 0;
        margin: 0;
        height: 100%;
        font-size: 62.5%;
        #app {
            height: 100%;
        }
    }
</style>
