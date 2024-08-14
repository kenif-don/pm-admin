import {createRouter, createWebHashHistory} from "vue-router";

const routes = [{
    path: '/',
    redirect: '/index'
}, {
    path: '/login',
    component: () => import('../pages/system/login')
},  {
    path: "/:pathMatch(.*)*",
    component: () => import('../pages/system/404'),
    hidden: true
},{
    path: '/index',
    component: () => import('../pages/system/index'),
    children: []
}]
//动态路由
const dynamicRoutes = import.meta.glob('../pages/**/*.vue');
for (const path in dynamicRoutes) {
    routes[routes.length - 1].children.push({
        path: path.replace('../pages', '').replace('.vue', ''),
        component: dynamicRoutes[path]
    })
}
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
