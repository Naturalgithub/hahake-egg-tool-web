export default {
  path: "/thirdMap",
  redirect: "/thirdMap/index",
  meta: {
    icon: "homeFilled",
    title: "三方管理",
    showLink: false,
    rank: 10
  },
  children: [
    {
      path: "/thirdMap/index",
      name: "thirdMap",
      component: () => import("@/views/third-map/index.vue"),
      meta: {
        title: "三方对应关系"
      }
    }
    // {
    //   path: "/thirdMgr/index",
    //   name: "thirdMgr",
    //   component: () => import("@/views/third-mgr/index.vue"),
    //   meta: {
    //     title: "三方列表"
    //   }
    // }
  ]
} as RouteConfigsTable;
