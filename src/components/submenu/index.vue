<!--
 * @Author: sheep669
 * @Description: 封装的子菜单组件
 * @Date: 2022-06-30 09:30:26
-->
<template>
    <el-menu :default-active="defaultActiveIndex" router>
        <div v-for="(item, index1) in subMenuData" :key="index1">
            <el-submenu :index="index1 + ''">
                <template slot="title">
                    <span style="font-weight: bold">{{
                        item.detailTitle
                    }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item
                        v-for="(subitem, index2) in item.submenu"
                        :key="index2"
                        :index="subitem.path"
                        >{{ subitem.submenuTitle }}</el-menu-item
                    >
                </el-menu-item-group>
            </el-submenu>
            <el-divider v-if="!item.hidden"></el-divider>
        </div>
    </el-menu>
</template>
<script>
export default {
    name: "EmoSubmenu",
    props: {
        type: Array,
        subMenuData: [],
        defaultActiveIndex: String,
    },
};
</script>
<style lang='less' scoped>
.el-menu {
    width: 160px;
}
.el-menu .el-submenu__title {
    padding: 0 !important;
}
.el-submenu {
    width: 160px;
    text-align: left;
}
.el-menu-item-group {
    width: 160px;
}
.el-menu-item {
    text-align: left;
    width: 160px;
    line-height: 40px;
    padding-left: 20px !important;
}

.el-divider--horizontal {
    margin: 0;
}
.el-divider {
    opacity: 0.6;
}
</style>