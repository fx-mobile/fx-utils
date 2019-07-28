
export default {
    setItem(name, content) {
        if (!name) return
        // content undefined是节点缺失，所以禁止保存
        if (typeof content === 'undefined') throw TypeError('localStorage.setItem的值为undefined')
        window.localStorage.setItem(name, JSON.stringify(content))
    },
    getItem(name) {
        if (!name) return
        return JSON.parse(window.localStorage.getItem(name))
    },
    removeItem(name) {
        if (!name) return
        window.localStorage.removeItem(name)
    }
}