<!--
 * @Author: sheep669
 * @Description: 配送模块主侧边栏
 * @Date: 2022-7-5 18:44:56
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
    name: "EmoDelivery",
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
        this.$router.push("/create_delivery_paper");
    },
    methods: {
        getSubMenuData() {
            // console.log("全部路由", this.$router.options.routes);
            this.navData.forEach((v) => {
                //按需提取子路由
                if (v.name == "delivery") {
                    this.subMenuData = v.children;
                    this.activeIndex = v.children[0].submenu[0].path;
                    return;
                }
            });
            this.subMenuData.forEach((v2) => {
                v2.submenu.forEach((v3) => {
                    //按需添加子路由
                    this.$router.addRoute("delivery", {
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