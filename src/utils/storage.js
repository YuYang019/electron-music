/**
 * localStorage缓存类，简单的加了过期功能
 */

class Storage {
    constructor(opts = {}) {
        this._storage = window.localStorage
        this._expire = opts.expire || 60 * 60 * 1000
    }

    set(key, val) {
        const timestamp = +new Date();
        val = timestamp + JSON.stringify(val);
        this._storage.setItem(key, val)
    }

    get(key) {
        const curTime = +new Date()
        const val = this._storage.getItem(key)

        if (!val) return null;

        const oldTime = +val.slice(0, 13)
        if (curTime - oldTime >= this._expire) {
            this.remove(key)
            return null
        }
        let result = val.slice(13)
        try {
            return JSON.parse(result)
        } catch (err) {
            return result
        }
    }

    remove(key) {
        this._storage.removeItem(key)
    }

    clear() {
        this._storage.clear()
    }
}

export default new Storage()