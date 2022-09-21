<!--
 * @Author: sheep669
 * @Description: 布局顶部
 * @Date: 2022-07-05 21:48:57
-->
<template>
    <div id="emo-header">
        <div class="logo">线上社区团购管理系统</div>
        <div class="tool">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                        v-for="(item, index) in breadCrumbList"
                        :key="index"
                        >{{ item.meta.title }}</el-breadcrumb-item
                    >
                </el-breadcrumb>
            </div>
            <div class="right">
                <div class="notice">
                    <el-badge value="new" class="item">
                        <el-button size="mini">通知</el-button>
                    </el-badge>
                </div>
                <div class="info">
                    <div class="avatar">
                        <el-avatar :size="50">
                            <img src="../../assets/images/tx.png" />
                        </el-avatar>
                        <el-dropdown>
                            <span class="el-dropdown-link"
                                ><i
                                    class="el-icon-arrow-down el-icon--right"
                                ></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="openDialog"
                                    >基本资料</el-dropdown-item
                                >
                                <el-dropdown-item @click.native="logout"
                                    >退出登陆</el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="user">{{ userinfo.user.username }}</div>
                </div>
            </div>
        </div>
        <el-dialog
            title="基本资料"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="false"
        >
            <el-descriptions class="margin-top" :column="3" border>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-user"></i>
                        用户名
                    </template>
                    {{ userinfo.user.username }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-mobile-phone"></i>
                        手机号
                    </template>
                    {{ userinfo.user.phoneNumber }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-wallet"></i>
                        账户余额
                    </template>
                    {{ userinfo.user.accountBalance }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-location-outline"></i>
                        居住地
                    </template>
                    {{ userinfo.user.location }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-price-tag"></i>
                        类型
                    </template>
                    <el-tag v-if="userinfo.user.userType == '1'" size="small"
                        >普通会员</el-tag
                    >
                    <el-tag v-if="userinfo.user.userType == '2'" size="small"
                        >超级会员</el-tag
                    >
                    <el-tag v-if="userinfo.user.userType == '3'" size="small"
                        >商铺会员</el-tag
                    >
                    <el-tag v-if="userinfo.user.userType == '4'" size="small"
                        >团长</el-tag
                    >
                    <el-tag v-if="userinfo.user.userType == '5'" size="small"
                        >管理员</el-tag
                    >
                </el-descriptions-item>
                <el-descriptions-item>
                    <template slot="label">
                        <i class="el-icon-office-building"></i>
                        联系地址
                    </template>
                    {{ userinfo.user.address }}
                </el-descriptions-item>
            </el-descriptions>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { doLogout } from "@/api/index";
export default {
    name: "EmoHeader",
    data() {
        return {
            dialogFormVisible: false,
        };
    },
    computed: {
        ...mapState("loginModule", ["userinfo"]),
        breadCrumbList() {
            return this.$route.matched;
        },
    },
    methods: {
        ...mapMutations("loginModule", ["clearUser"]),
        openDialog() {
            this.dialogFormVisible = true;
        },
        logout() {
            doLogout().then((res) => {
                console.log(res.data.msg);
                if (res.data.code === 200) {
                    localStorage.clear();
                    sessionStorage.clear();
                    this.clearUser();
                    this.$message({
                        message: res.data.msg,
                        type: "success",
                    });
                    setTimeout(() => {
                        window.location.reload();
                        this.$router.replace("/login");
                    }, 250);
                }
            });
        },
    },
};
</script>
<style lang='less' scoped>
.logo {
    width: 182px;
    background: #1e1e1e;
    color: white;
    height: 60px;
    float: left;
    text-align: left;
    line-height: 60px;
    padding-left: 18px;
}
.tool {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.right {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.info {
    width: 160px;
    display: flex;
    justify-content: space-around;
    margin-right: 12px;
}
.user {
    line-height: 60px;
    // padding-right: 8px;
    text-align: center;
}
.notice {
    margin-right: 35px;
    margin-left: 12px;
}
.avatar {
    margin-top: 6px;
}
.el-breadcrumb {
    margin-left: 8px;
}
/deep/.el-breadcrumb__separator {
    margin: 0 5px;
    font-weight: 550;
    color: #7ac0ff;
}
</style>