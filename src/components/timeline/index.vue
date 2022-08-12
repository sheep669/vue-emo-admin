<template>
    <el-card class="wrapper" shadow="always" body-style="0px">
        <el-timeline>
            <el-timeline-item
                placement="top"
                v-for="(activity, index) in activities"
                :key="index"
                :color="activity.color"
                :timestamp="activity.timestamp"
            >
                <!-- <el-card
                    style="height: 300px"
                    body-style="padding:0 6px"
                    shadow="hover"
                >
                    <pre v-highlightjs>
                            <code class="javascript">console.log('data',data)</code>
                        </pre>
                    <p>王小虎 提交于 {{ activity.timestamp }}</p>
                </el-card> -->
                <el-card
                    class="schedule-pane"
                    shadow="hover"
                    body-style="padding:6px;"
                >
                    <h4>项目开始 <span class="title">start</span></h4>
                    <div class="left">
                        <div class="item">
                            <span class="schedule">项目进度</span>
                            <el-progress
                                type="circle"
                                :percentage="0.5"
                            ></el-progress>
                        </div>
                    </div>
                    <div class="right">
                        <el-popover
                            placement="top-start"
                            title="sheep669"
                            width="200"
                            trigger="hover"
                        >
                            <div class="online">
                                在线<span style="float: right">
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="编辑留言"
                                        placement="top"
                                    >
                                        <el-button
                                            icon="el-icon-edit"
                                            circle
                                            size="mini"
                                        ></el-button>
                                    </el-tooltip>
                                </span>
                            </div>
                            <div>
                                完成了项目进度页的设计<br />你很优秀<br />非常乐意与你共事!
                            </div>
                            <el-avatar
                                class="avatar"
                                :size="70"
                                slot="reference"
                            >
                                <img
                                    src="https://img2.woyaogexing.com/2022/06/26/b9332ba777a54b12!400x400.jpg"
                                />
                            </el-avatar>
                        </el-popover>
                        <el-popover
                            placement="top-start"
                            title="刘洋"
                            width="200"
                            trigger="hover"
                        >
                            <div class="offline">
                                离线<span style="float: right">
                                    <el-tooltip
                                        class="item"
                                        effect="dark"
                                        content="编辑留言"
                                        placement="top"
                                    >
                                        <el-button
                                            icon="el-icon-edit"
                                            circle
                                            size="mini"
                                        ></el-button>
                                    </el-tooltip>
                                </span>
                            </div>
                            <div>升级了功能,优化了速度<br />非常nice！</div>
                            <el-avatar
                                class="avatar"
                                :size="70"
                                slot="reference"
                            >
                                <img
                                    src="https://img2.woyaogexing.com/2022/06/25/5858c247cba5433d!400x400.jpg"
                                />
                            </el-avatar>
                        </el-popover>
                        <el-dropdown placement="bottom" class="opbtn">
                            <i
                                class="el-icon-setting"
                                style="
                                    margin: 3px;
                                    font-size: 24px;
                                    cursor: pointer;
                                "
                            ></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>添加成员</el-dropdown-item>
                                <el-dropdown-item>删除成员</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-divider></el-divider>
                        <span class="info"
                            ><i class="el-icon-user"></i>sheep669</span
                        >
                        <span class="info"
                            ><i class="el-icon-user"></i>刘洋</span
                        >
                        <span class="desc">参与成员</span>
                    </div>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </el-card>
</template>
<script>
export default {
    name: "EmoTimeline",
    components: {},
    data() {
        return {
            activities: [
                {
                    timestamp: "2018-04-13 21:46",
                    color: "#0dbc79",
                },
                {
                    timestamp: "2018-03-03 18:46",
                    color: "#fddd79",
                },
                {
                    timestamp: "2019-04-03 10:45",
                    color: "#e44d26",
                },
                {
                    timestamp: "2018-04-03 20:46",
                    color: "#42a5f5",
                },
            ],
        };
    },
};
</script>
<style lang='less' scoped>
.online::before {
    content: "";
    display: inline-block;
    width: 9px;
    height: 9px;
    background: #41b883;
    border-radius: 50%;
    margin-right: 4px;
}
.online {
    margin-bottom: 5px;
}
.offline::before {
    content: "";
    display: inline-block;
    width: 9px;
    height: 9px;
    background: #90a4ae;
    border-radius: 50%;
    margin-right: 4px;
}
.offline {
    margin-bottom: 5px;
}
.schedule-pane {
    height: 260px;
    width: 814px;
    overflow-y: auto;
}
.desc {
    float: right;
    margin-right: 2px;
}
.el-divider--horizontal {
    width: 615px;
    margin: 15px 0 22px 0;
}
.opbtn {
    float: right;
}
.info,
.avatar {
    margin-right: 12px;
}
.left {
    float: left;
    width: 160px;
    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
.right {
    width: 615px;
    height: 143px;
    border: rgb(0 0 0 / 10%) 1px solid;
    border-radius: 2px;
    float: right;
    padding: 4px;
}
.wrapper {
    margin: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}
/deep/.el-timeline {
    width: 780px;
    text-align: left;
}
p {
    margin: 0;
}
pre {
    margin: 0;
    code {
        border-left: 10px solid #0dbc79;
        border-radius: 2px;
    }
}
.hljs {
    padding: 1.5em;
    text-align: left;
}
h4 {
    height: 57px;
    width: 780px;
    border-left: 10px solid #0dbc79;
    border-radius: 2px;
    background-color: #474949;
    color: white;
    line-height: 57px;
    text-align: left;
    padding-left: 12px;
}
h5 {
    font-weight: 800;
}
.schedule {
    display: block;
    font-weight: bold;
    font-family: "微软雅黑";
    margin-bottom: 8px;
}
.title {
    font-family: "Comic Sans MS";
    font-weight: bold;
}
.name {
    font-family: "Microsoft YaHei", "Microsoft Sans Serif", "Microsoft SanSerf",
        "微软雅黑";
    font-size: 14px;
}
.info {
    font-family: "Microsoft YaHei", "Microsoft Sans Serif", "Microsoft SanSerf",
        "微软雅黑";
    i {
        margin-right: 3px;
    }
}
</style>