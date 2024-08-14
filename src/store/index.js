import Vuex from 'vuex'
import {getRoutes} from '../api/system/resource'
import router from "../router";

function getTreeInfo(tree) {
    if (!tree || !tree.length) {
        return
    }
    let node = tree[0];
    let names = [node.name];
    let index = "0";
    let indexes = [0];
    let path = node.path;
    if(node.children && node.children.length){
        let treeInfo = getTreeInfo(node.children);
        names = names.concat(treeInfo.names);
        index = index + "-" + treeInfo.index;
        indexes = indexes.concat(treeInfo.indexes);
        path = treeInfo.path;
    }
    return {
        names: names,
        index: index,
        indexes: indexes,
        path: path
    }
}
function getCurRoute(routes,indexes,curRoutes,index) {
    let route = routes[indexes[index]];
    if(!route) return
    curRoutes.push(route);
    if (route.children && route.children.length) {
        return getCurRoute(route.children,indexes,curRoutes,index+1)
    }
}
export default new Vuex.Store({
    state: {
        token: localStorage.getItem('v-token'),//token
        loginUser: localStorage.getItem('loginUser') ? JSON.parse(localStorage.getItem('loginUser')) : {},//登录用户
        routes: localStorage.getItem('sys.routes') ? JSON.parse(localStorage.getItem('sys.routes')) : [],//菜单数据
        config: localStorage.getItem('sys.config') ? JSON.parse(localStorage.getItem('sys.config')) : {},//系统配置
        curRoute: localStorage.getItem('sys.cur.route') ? JSON.parse(localStorage.getItem('sys.cur.route')) : {
            index: null,
            indexes: [],
            names: [],
            path: '',
        },//当前路由
    },
    mutations: {
        setCurRoute(state, curRoute) {
            if (!curRoute) {
                return
            }
            state.curRoute = curRoute
            localStorage.setItem('sys.cur.route', JSON.stringify(curRoute))
            //跳转到目标
            if (curRoute.path) {
                router.push(curRoute.path)
            }
        },
        setRoutes(state, routes) {
            if (!routes) {
                return
            }
            state.routes = routes
            localStorage.setItem('sys.routes', JSON.stringify(routes))
        },
        setConfig(state, config) {
            if (!config) {
                return
            }
            state.config = config
            localStorage.setItem('sys.config', JSON.stringify(config))
        },
        setLoginUser(state, loginUser) {
            if (!loginUser) {
                return
            }
            state.loginUser = loginUser
            localStorage.setItem('loginUser', JSON.stringify(loginUser))
        },
        setToken(state, token) {
            if (!token) {
                return
            }
            state.token = token
            localStorage.setItem('v-token', token)
        },
        logout(state) {
            state.token = ''
            state.loginUser = {}
            localStorage.removeItem('v-token')
            localStorage.removeItem('loginUser')
        },
    },
    actions: {
        setCurRoute({commit}, curRoute) {
            return new Promise((resolve, reject) => {
                commit('setCurRoute', curRoute)
                resolve(curRoute)
            })
        },
        getRoutes({commit}) {
            return new Promise((resolve, reject) => {
                getRoutes().then(routes => {
                    commit('setRoutes', routes)
                    //判断当前路由是否有值
                    if (!this.state.curRoute || !this.state.curRoute.index) {
                        //找到第一个菜单设置
                        commit('setCurRoute', getTreeInfo(routes))
                    }
                    resolve(routes)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        selectMenu({commit}, index) {
            return new Promise((resolve, reject) => {
                const indexes = index.split("-");
                const curRoutes = [];
                const routes = this.state.routes;
                getCurRoute(routes,indexes,curRoutes,0)
                const names = [];
                let lastRoute = curRoutes[curRoutes.length-1];
                if(!lastRoute){
                    selectMenu("0-0")
                    return
                }
                curRoutes.flatMap(item => names.push(item.name))
                const curRoute = {
                    index: index,
                    indexes: indexes,
                    names: names,
                    path: lastRoute.path
                };
                commit('setCurRoute', curRoute)
                resolve()
            })
        },
        getConfig({commit}) {
            return new Promise((resolve, reject) => {
                getRoutes().then(config => {
                    commit('setConfig', config)
                    resolve(config)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout')
                resolve()
            })
        }
    },
    modules: {}
})
