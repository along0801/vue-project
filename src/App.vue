<template>
  <div class="app-container">
    <!-- 顶部 Header 区域 -->
    <div class="header">
      <mt-header fixed title="along Vue 项目">along Vue 项目</mt-header>
    </div>

    <!-- 中间的 路由 router-view 区域 -->
    <div class="content">
      <transition>
        <router-view></router-view>
      </transition>
    </div>

    <!-- 底部的 Tabbar 区域 -->
    <div class="footer">
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item-Tim" to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item-Tim" to="/member">
          <span class="mui-icon mui-icon-contact"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item-Tim" to="/shopcar">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge" id="badge">0</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item-Tim" to="/search">
          <span class="mui-icon mui-icon-search"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
  background-color: #fff;
  /* Tim 解决移动端 底部导航出不来问题 start */
  width: 100%;
  height: 100%;
  position: relative;
  /* Tim 解决移动端 底部导航出不来问题 end */
}

.mint-header.is-fixed {
  z-index: 99;
}

.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

/* Tim 解决移动端 底部导航出不来问题 start */
.header {
  position: absolute;
  height: 30px;
  width: 100%;
  top: 0;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 40px;
  /*height: calc(100% - 50px);*/
  overflow-x: hidden;
  overflow-y: auto;
}

.footer {
  position: absolute;
  height: 50px;
  width: 100%;
  bottom: 0;
}

/* Tim 解决移动端 底部导航出不来问题 end */

// 改类名，解决 tabbar 无法切换的问题
.mui-bar-tab .mui-tab-item-Tim.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-Tim {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-Tim .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-Tim .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>