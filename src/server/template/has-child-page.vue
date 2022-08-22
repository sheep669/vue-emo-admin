<!--
 * @Author: sheep669
 * @Description: replaceDesc模块主侧边栏
 * @Date: replaceTime
-->
<template>
    <div style="width: 100%; height: calc(100% - 2px)">
        <div
            class="left"
            style="
                width: 160px;
                background: #ffffff;
                height: 100%;
                float: left;
                overflow-x: hidden;
                overflow-y: auto;
                border-top: 2px solid rgb(0 0 0 / 5%);
            "
        >
            <!-- 插入 emo-submenu-->
            <emo-submenu
                :subMenuData="subMenuData"
                :defaultActiveIndex="activeIndex"
            />
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import EmoSubmenu from "@/components/submenu/index";
export default {
    name: "replace2",
    data() {
        return {
            subMenuData: [],
            activeIndex: "",
        };
    },
    computed: mapGetters(["navData"]),
    created() {
        this.getSubMenuData();
        //默认重定向到子路由的第一个path
        this.$router.push(this.activeIndex);
    },
    methods: {
        getSubMenuData() {
            console.log("全部路由", this.$router.options.routes);
            this.navData.forEach((v) => {
                //按需提取子路由
                if (v.name == "replace1") {
                    this.subMenuData = v.children;
                    this.activeIndex = v.children[0].submenu[0].path;
                    return;
                }
            });
            this.subMenuData.forEach((v2) => {
                v2.submenu.forEach((v3) => {
                    //按需添加子路由
                    this.$router.addRoute("replace1", {
                        path: v3.path,
                        component: () =>
                            import("@/views" + v3.component + ".vue"),
                    });
                });
            });
        },
    },
    components: {
        EmoSubmenu,
    },
};
</script>
<style lang='less' scoped>
</style>