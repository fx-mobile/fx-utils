export default {
    setItem(name, content) {
        if (!name) return
        // content undefined是节点缺失，所以禁止保存
        if (typeof content === 'undefined') throw TypeError('sessionStorage.setItem的值为undefined')
        sessionStorage.setItem(name, JSON.stringify(content))
    },
    getItem(name) {
        if (!name) return
        return JSON.parse(sessionStorage.getItem(name))
    },
    removeItem(name) {
        if (!name) return
        sessionStorage.removeItem(name)
    }
}