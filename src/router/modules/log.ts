export default {
  path: "/log",
  redirect: "/log/index",
  meta: {
    icon: "homeFilled",
    title: "日志",
    // showLink: false,
    rank: 0
  },
  children: [
    {
      path: "/log/index",
      name: "logindex",
      component: () => import("@/views/log/index.vue"),
      meta: {
        title: "日志管理"
      }
    }
  ]
} as RouteConfigsTable;
