export default {
  path: "/white",
  redirect: "/white/whiteIndex",
  meta: {
    icon: "homeFilled",
    title: "导航补录",
    showLink: false,
    rank: 0
  },
  children: [
    {
      path: "/white/whiteIndex",
      name: "whiteIndex",
      component: () => import("@/views/white/index.vue"),
      meta: {
        title: "白名单管理"
      }
    }
  ]
} as RouteConfigsTable;
