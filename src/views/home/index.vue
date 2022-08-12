<!--
 * @Author: sheep669
 * @Description: 首页模块
 * @Date: 2022-06-30 10:17:00
-->
<template>
    <div id="emo-home">
        <el-card
            shadow="always"
            body-style="0px"
            style="margin: 8px; background: transparent"
        >
            <div class="statistic-panel">
                <div class="wrapper">
                    <div class="top">
                        <h4>待备货订单 (单)</h4>
                        <h1 class="num">0</h1>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <span>今日订单:</span> <span class="num">0</span>
                        </div>
                        <div class="right">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="top">
                        <h4>库存预警 (项)</h4>
                        <h1 class="num">0</h1>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <span>现有商品数:</span> <span class="num">0</span>
                        </div>
                        <div class="right">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="top">
                        <h4>团长待审核 (人)</h4>
                        <h1 class="num">0</h1>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <span>团长:</span> <span class="num">0</span>
                        </div>
                        <div class="right">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
                <div class="wrapper">
                    <div class="top">
                        <h4>待处理售后 (单)</h4>
                        <h1 class="num">0</h1>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <span>今日成交额:</span> <span class="num">0</span>
                        </div>
                        <div class="right">
                            <i class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chart">
                <el-card class="box-card1" shadow="hover">
                    <div slot="header">
                        <span>团购经营状态</span>
                    </div>
                    <div
                        ref="group_purchase_business_status"
                        style="width: 100%; height: 400px; margin: 2px auto"
                    ></div>
                </el-card>
                <el-card class="box-card2" shadow="hover">
                    <div slot="header">
                        <span>会员统计</span>
                    </div>
                    <div
                        ref="member_statistics"
                        style="width: 100%; height: 400px; margin: 2px auto"
                    ></div>
                </el-card>
            </div>
            <div class="table">
                <el-card class="box-card1" shadow="hover">
                    <div slot="header">
                        <span>团长佣金排名</span>
                    </div>
                    <el-table
                        :data="tableData1"
                        style="width: 100%"
                        border
                        empty-text="暂无数据"
                    >
                        <el-table-column
                            prop="ranking"
                            label="排名"
                            width="40"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="store_name"
                            label="店铺名称"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="phone_number"
                            label="联系方式"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="commission_balance"
                            label="佣金"
                            align="center"
                        >
                        </el-table-column>
                    </el-table>
                </el-card>
                <el-card class="box-card2" shadow="hover">
                    <div slot="header">
                        <span>会员消费排名</span>
                    </div>
                    <el-table
                        :data="tableData2"
                        style="width: 100%"
                        border
                        empty-text="暂无数据"
                    >
                        <el-table-column
                            prop="ranking"
                            label="排名"
                            width="40"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="nickname"
                            label="会员名称"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="buy_orders"
                            label="购买订单数"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="total_spend_money"
                            label="交易额"
                            align="center"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="register_time"
                            label="注册时间"
                            align="center"
                        >
                        </el-table-column>
                    </el-table>
                </el-card>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name: "EmoHome",
    components: {},
    data() {
        return {
            tableData1: [
                {
                    ranking: 1,
                    store_name: "小渔村",
                    phone_number: "13203034344",
                    commission_balance: "2元",
                },
                {
                    ranking: 2,
                    store_name: "小渔村",
                    phone_number: "13203034344",
                    commission_balance: "2元",
                },
                {
                    ranking: 3,
                    store_name: "小渔村",
                    phone_number: "13203034344",
                    commission_balance: "2元",
                },
            ],
            tableData2: [
                {
                    ranking: 1,
                    nickname: "小红",
                    buy_orders: "1320",
                    total_spend_money: "200元",
                    register_time: "2021-2-23",
                },
                {
                    ranking: 2,
                    nickname: "小渔村",
                    buy_orders: "134",
                    total_spend_money: "39元",
                    register_time: "2002-2-23",
                },
                {
                    ranking: 3,
                    nickname: "小渔3村",
                    buy_orders: "100",
                    total_spend_money: "20元",
                    register_time: "2022-2-23",
                },
            ],
        };
    },
    mounted() {
        this.getEchartData();
    },
    methods: {
        getEchartData() {
            const gpbs_chart = this.$refs.group_purchase_business_status;
            const ms_chart = this.$refs.member_statistics;
            // 基于准备好的dom，初始化echarts实例
            const gpbs_chart_option = {
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["营业额", "订单量"],
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: { show: true, type: ["line", "bar"] },
                        restore: { show: true },
                    },
                },
                calculable: true,
                xAxis: [
                    {
                        type: "category",
                        // prettier-ignore
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                    },
                ],
                series: [
                    {
                        name: "营业额",
                        type: "bar",
                        data: [
                            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6,
                            20.0, 6.4, 3.3,
                        ],
                        markPoint: {
                            data: [
                                { type: "max", name: "Max" },
                                { type: "min", name: "Min" },
                            ],
                        },
                    },
                    {
                        name: "订单量",
                        type: "bar",
                        data: [
                            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7,
                            18.8, 6.0, 2.3,
                        ],
                        markPoint: {
                            data: [
                                {
                                    name: "Max",
                                    value: 182.2,
                                    xAxis: 7,
                                    yAxis: 183,
                                },
                                {
                                    name: "Min",
                                    value: 2.3,
                                    xAxis: 11,
                                    yAxis: 3,
                                },
                            ],
                        },
                    },
                ],
            };
            const ms_chart_option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                legend: {
                    top: "top",
                },
                series: [
                    {
                        name: "会员统计饼状图",
                        type: "pie",
                        radius: [20, 140],
                        center: ["50%", "50%"],
                        roseType: "area",
                        itemStyle: {
                            borderRadius: 8,
                        },
                        data: [
                            { value: 40, name: "普通会员" },
                            { value: 38, name: "超级会员" },
                            { value: 32, name: "商铺会员" },
                            { value: 30, name: "团长" },
                            { value: 28, name: "管理员" },
                        ],
                    },
                ],
            };
            this.$echarts.init(gpbs_chart).setOption(gpbs_chart_option);
            this.$echarts.init(ms_chart).setOption(ms_chart_option);
        },
    },
};
</script>
<style lang='less' scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.statistic-panel {
    display: flex;
    justify-content: space-around;
}
div {
    margin-right: 4px;
}
.top {
    color: white;
    .num {
        font-size: 40px;
    }
}
.bottom {
    border-top: #e9eff0 1px solid;
    padding-top: 10px;
    margin-bottom: 5px;
    width: 98%;
    color: white;
    display: flex;
    justify-content: space-around;
    .num {
        font-size: 18px;
    }
    .right {
        width: 30px;
        height: 30px;
        border: 1px silver solid;
        border-radius: 50%;
    }
    i {
        line-height: 30px;
    }
}
.statistic-panel .wrapper:nth-child(1) {
    width: 25%;
    height: 250px;
    border-radius: 4px;
    background: #208cf1;
    opacity: 0.9;
}
.statistic-panel .wrapper:nth-child(2) {
    width: 25%;
    height: 250px;
    border-radius: 4px;
    background: #fc5366;
    opacity: 0.9;
}
.statistic-panel .wrapper:nth-child(3) {
    width: 25%;
    height: 250px;
    border-radius: 4px;
    background: #11c1d7;
    opacity: 0.9;
}
.statistic-panel .wrapper:nth-child(4) {
    width: 25%;
    height: 250px;
    border-radius: 4px;
    background: #ff5e50;
    opacity: 0.9;
}

.chart {
    display: flex;
    justify-content: space-around;
    .box-card1 {
        margin-top: 12px;
        width: 60%;
        height: 450px;
        text-align: left;
    }
    .box-card2 {
        margin-left: 12px;
        text-align: left;
        width: 40%;
        height: 450px;
        flex-grow: 1;
        margin-top: 12px;
    }
}
.table {
    display: flex;
    justify-content: space-around;
    .box-card1 {
        margin-top: 12px;
        width: 50%;
        height: 400px;
        text-align: left;
    }
    .box-card2 {
        margin-left: 12px;
        text-align: left;
        height: 400px;
        flex-grow: 1;
        margin-top: 12px;
    }
}
</style>