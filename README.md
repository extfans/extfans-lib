# extfans扩展公用库

## 项目结构
* src(各种模块代码)
* src/components(vue组件)
* src/consts(常量)
* src/filters(vue filter)
* src/modules(模块)
* src/utils(简单工具类)

## 本地调试
```bash
# 在该项目根目录执行
npm install
npm link
# 切换到依赖@extfans/lib的扩展项目
cd ${project}
npm link @extfans/lib
```

## npm发布
使用`infinitynewtab`账号进行发布

## 使用中的项目
1. http://git.infinitynewtab.com/Starlab/extfans-weather-extension
