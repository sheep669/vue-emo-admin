<!--
 * @Author: sheep669
 * @Description: 
 * @Date: 2022-07-19 18:37:59
-->
<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "app",
};
</script>
<style lang='less' scoped>
#app {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

