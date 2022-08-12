<!--
 * @Author: sheep669
 * @Description: 
 * @Date: 2022-07-19 18:37:59
-->
<template>
    <div id="app">
        <!-- <emo-layout> -->
        <!-- <emo-timeline slot="main_content" /> -->
        <!-- </emo-layout> -->
        <router-view />
    </div>
</template>

<script>
// import EmoLayout from "@/components/layout/index.vue";
// import EmoTimeline from "@/components/timeline/index.vue";
export default {
    name: "app",
    // components: { EmoLayout },
    // components: { EmoLayout, EmoTimeline },
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

