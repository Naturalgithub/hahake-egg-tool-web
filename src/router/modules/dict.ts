export default {
  path: "/dict",
  redirect: "/dict/index",
  meta: {
    icon: "informationLine",
    title: "字典",
    // showLink: false,
    rank: 0
  },
  children: [
    {
      path: "/dict/index",
      name: "dictIndex",
      component: () => import("@/views/dict/index.vue"),
      meta: {
        title: "字典管理"
      }
    }
  ]
} as RouteConfigsTable;
