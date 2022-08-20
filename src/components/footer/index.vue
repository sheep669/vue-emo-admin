<!--
 * @Author: sheep669
 * @Description: 
 * @Date: 2022-06-30 10:35:10
-->
<template>
    <div id="emo-footer">
        <el-footer>
            Copyright © 2022 Designed by sheep669 All Rights Reserved</el-footer
        >
    </div>
</template>
<script>
export default {
    name: "EmoFooter",
};
</script>
<style lang='less' scoped>
.el-footer {
    position: absolute;
    left: 200px;
    bottom: 0;
    width: calc(100% - 200px);
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
    box-shadow: 0 -2px 2px rgb(0 0 0 / 5%);
}
</style>