/*
 * @Author: sheep669
 * @Description: 创建vue模板页
 * @Date: 2022-07-04 09:26:24
 */

let upperCamelCase = require('uppercamelcase');
let fse = require('fs-extra');
let axios = require("axios");
let path = require("path");

/**
 * @Author: sheep669
 * @param {string} origin 复制模板源文件
 * @param {string} replace1 替换符1
 * @param {string} replace2 替换符2
 * @param {string} replaceDesc 替换头描述
 * @param {string} replaceTime 替换时间
 * @param {string} out 文件输出路径
 */
function copyTemplateSync(origin, replace1, replace2, replaceDesc, replaceTime, out) {
    let data = fse.readFileSync(origin).toString();
    let d = data.replace(/replace1/g, replace1)
        .replace(/replace2/g, replace2)
        .replace(/replaceDesc/g, replaceDesc)
        .replace(/replaceTime/g, replaceTime);
    fse.writeFileSync(out, d);
}

/**
 * 创建vue文件
 */
function createVuePage() {
    let target = '../views';
    axios.get('http://localhost:3000/get_menu_data')
        .then(function (res) {
            let children = [];
            let currentTime = new Date().toLocaleString().replace(RegExp("/", "g"), "-");
            res.data.forEach(v => {
                if (!fse.pathExistsSync(path.join(target, v.name) + '/index.vue') && v.name != "root" && !v.children) {
                    fse.createFileSync(path.join(target, v.name) + '/index.vue');
                    copyTemplateSync('./template/no-child-page.vue', "emo-" + v.name, upperCamelCase("emo-" + v.name), v.title, currentTime, path.join(target, v.name) + '/index.vue');
                }
                if (!fse.pathExistsSync(path.join(target, v.name) + '/index.vue') && v.name != "root" && v.children) {
                    fse.createFileSync(path.join(target, v.name) + '/index.vue');
                    copyTemplateSync('./template/has-child-page.vue', v.name, upperCamelCase("emo-" + v.path.substring(1)), v.title, currentTime, path.join(target, v.name) + '/index.vue');
                }
                if (v.children) {
                    children = v.children;
                }
                children.forEach(v2 => {
                    v2.submenu.forEach(v3 => {
                        // v3.component: "/goods/out-stock"
                        if (!fse.pathExistsSync(target + v3.component + '.vue')) {
                            fse.createFileSync(target + v3.component + '.vue')
                            copyTemplateSync("./template/child-page.vue", v3.path.substring(1), upperCamelCase(v3.path.substring(1)), v3.submenu_title, currentTime, target + v3.component + '.vue')
                        }
                    })
                })
            });
            console.log("==========OK==========");
            console.log("All Files Are Ready !");
        })
        .catch(function (err) {
            // 就不将err打印到控制台了,影响心情
            console.log("请使用 json-server --w .\menu.json 开启服务");
        });
};
/**
 * 调用方法
 */
createVuePage();