import {ElMessage, ElMessageBox} from "element-plus";
import {v4 as uuid} from "uuid";

const jfUtils = {
    back(vm){
        vm.$router.go(-1)
    },
    eventSource:null,
    initEvent(uri,onMsg){
        let host = import.meta.env.VITE_HTTP_API || import.meta.env.VITE_HTTP_HOST
        this.eventSource = new EventSource(host+uri);
        this.eventSource.onmessage = (event) => {
            onMsg && onMsg(event.data);
        };
        this.eventSource.onerror = (event) => {
            this.eventSource.close();
            setTimeout(()=>{
                this.initEvent(uri,onMsg)
            },1000)
        };
    },
    /** 对象数组中某属性的值比较 */
    indexOf(arr,key,val){
        for(let index in arr){
            if(arr[index][key] === val){
                return index;
            }
        }
        return -1;
    },
    clone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    fullscreen(){
        if(document.fullscreenElement){
            document.exitFullscreen();
            return
        }
        document.documentElement.requestFullscreen();
    },
    /** 获取uuid随机串 */
    uuid() {
        return uuid();
    },
    uuid2() {
        return uuid().replaceAll("-", "");
    },
    msg(msg, fn) {
        ElMessage({
            message: msg,
            type: "success",
            onClose: () => {
                fn && fn();
            }
        })
    },
    err(msg, fn) {
        ElMessage.error({
            message: msg,
            onClose: () => {
                fn && fn();
            }
        })
    },
    config(msg,fn){
        ElMessageBox.confirm(
            msg,
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }
        ).then(()=>{
            fn && fn();
        })
    },
    openAddChild(vm,item) {
        if (!(item instanceof PointerEvent) && item) {
            vm.form = {...item}
        } else {
            vm.form = {}
        }
        vm.dialogVisible = true
    },
    /**打开弹窗*/
    openDialog(vm, item, fn) {
        if (!(item instanceof PointerEvent) && item) {
            vm.form = {...item}
        } else {
            vm.form = {}
        }
        vm.dialogVisible = true
        fn && fn(vm.form)
    },
    onImport(vm,file,fn){
        vm.api.onImport(file).then(()=>{
            this.paging(vm)
        })
    },
    export(vm,fn){
        vm.api.doExport(vm.page).then(()=>{
            fn && fn(data)
        })
    },
    /** 高级查询 */
    query(vm,fn) {
        vm.page.page = 1;
        this.paging(vm)
        fn && fn();
    },
    /** 列表分页 */
    paging(vm, fn) {
        vm.api.paging(vm.page).then(data => {
            vm.page = data;
            vm.data = data.data;
            vm.page.data = null;
            fn && fn(vm.data);
        })
    },
    tree(vm, fn) {
        vm.api.tree(vm.query).then(data => {
            vm.data = data
            fn && fn(vm.data);
        })
    },
    handlePage(page,vm, fn) {
        vm.page.page = page;
        this.paging(vm)
        fn && fn();
    },
    reset(vm, fn) {
        vm.page.page = 1;
        vm.page.clzObj = {};
        vm.data = [];
        this.paging(vm)
        fn && fn();
    },
    resetTree(vm, fn) {
        vm.query = {}
        this.tree(vm)
        fn && fn();
    },
    /** 仅有一个form页时的获取方法 */
    get(vm,fn){
        vm.api.get().then(data=>{
            vm.form = data
            fn && fn()
        })
    },
    /** 仅有一个form页时的修改方法 */
    editOne(vm, fn) {
        vm.api.edit(vm.form).then(() => {
            this.msg("保存成功!")
            this.get(vm);
            fn && fn();
        })
    },
    onsubmit(vm,fn) {
        if (vm.form.id) {
            vm.api.edit(vm.form).then(() => {
                this.msg("保存成功!")
                vm.dialogVisible = false;
                this.paging(vm);
                fn && fn();
            })
            return;
        }
        vm.api.add(vm.form).then(() => {
            this.msg("保存成功!")
            vm.dialogVisible = false;
            this.paging(vm);
            fn && fn();
        })
    },
    onsubmitTree(vm,key,fn) {
        if(vm.form[key] && vm.form[key].length > 0){
            vm.form[key] = vm.form[key][vm.form[key].length-1]
        }
        if (vm.form.id) {
            vm.api.edit(vm.form).then(() => {
                this.msg("保存成功!")
                vm.dialogVisible = false;
                this.tree(vm);
                fn && fn();
            })
            return;
        }
        vm.api.add(vm.form).then(() => {
            this.msg("保存成功!")
            vm.dialogVisible = false;
            this.tree(vm);
            fn && fn();
        })
    },
    del(vm,id,name,fn) {
        let msg = name ? "此操作将永久删除该【"+name+"】数据":"此操作将永久删除该数据";
        ElMessageBox.confirm(
            msg+', 是否继续?',
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }
        ).then(()=>{
            vm.api.del({id:id}).then(() => {
                this.msg(name+"删除成功!")
                this.paging(vm);
                fn && fn();
            })
        })
    },
    delTree(vm,id,name,fn) {
        let msg = name ? "此操作将永久删除该【"+name+"】数据":"此操作将永久删除该数据";
        ElMessageBox.confirm(
            msg+', 是否继续?',
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }
        ).then(()=>{
            vm.api.del({id:id}).then(() => {
                this.msg(name+"删除成功!")
                this.tree(vm);
                fn && fn();
            })
        })
    },
    rowFormatDate(row,col) {
        let now = new Date(row[col.property])
        let year = now.getFullYear(),
            month = now.getMonth() + 1,
            date = now.getDate(),
            hour = now.getHours(),
            minute = now.getMinutes(),
            second = now.getSeconds();
        return year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date);
    },
    rowFormatDatetime(row,col) {
        let now = new Date(row[col.property])
        let year = now.getFullYear(),
            month = now.getMonth() + 1,
            date = now.getDate(),
            hour = now.getHours(),
            minute = now.getMinutes(),
            second = now.getSeconds();
        return year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date) + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
    },
    rowFormatTime(row,col) {
        let now = new Date(row[col.property])
        let year = now.getFullYear(),
            month = now.getMonth() + 1,
            date = now.getDate(),
            hour = now.getHours(),
            minute = now.getMinutes(),
            second = now.getSeconds();
        return (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second);
    }
}
export default jfUtils