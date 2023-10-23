export default {
  path: "/hd",
  redirect: "/hd/hdIndex",
  meta: {
    icon: "homeFilled",
    title: "惠达测试",
    // showLink: false,
    rank: 0
  },
  children: [
    {
      path: "/hd/hdIndex",
      name: "hdIndex",
      component: () => import("@/views/hd/index.vue"),
      meta: {
        title: "补录管理"
      }
    }
  ]
} as RouteConfigsTable;
