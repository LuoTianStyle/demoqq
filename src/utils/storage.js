/**
 *
 * setStorage
 * @param key
 * @param val
 * @param type 1 | 2 localStorage | sessionStorage
 */
/**
 *
 * getStorage
 * @param key
 * @param type 1 | 2 localStorage | sessionStorage
 */
/**
 *
 * removeStorage
 * @param key
 * @param type 1 | 2 | 3 localStorage | sessionStorage | all
 */
/**
 *
 * clearStorage
 * @param type 1 | 2 | 3 localStorage | sessionStorage | all
 */
export const setStorage = (key, val, type = 1) => {
  if (type === 1) {
    window.localStorage.setItem(key, JSON.stringify(val))
  } else {
    window.sessionStorage.setItem(key, JSON.stringify(val))
  }
}

export const getStorage = (key, type = 1) => {
  if (type === 1) {
    return JSON.parse(window.localStorage.getItem(key))
  }
  return JSON.parse(window.sessionStorage.getItem(key))
}

export const removeStorage = (key, type = 1) => {
  if (type === 1) {
    window.localStorage.removeItem(key)
  } else if (type === 2) {
    window.sessionStorage.removeItem(key)
  } else {
    window.sessionStorage.removeItem(key)
    window.localStorage.removeItem(key)
  }
}
/**
 *
 * @param type
 */
export const clearStorage = (type = 1) => {
  if (type === 1) {
    window.localStorage.clear()
  } else if (type === 2) {
    window.sessionStorage.clear()
  } else {
    window.sessionStorage.clear()
    window.localStorage.clear()
  }
}
const ls = window.localStorage
const ss = window.sessionStorage

export const Cookie = {
  get(key) {
    let arr = document.cookie.split('; ')
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].trim().split('=')
      if (arr2[0] == key) {
        return arr2[1]
      }
    }
    return ''
  },
  set(key, value, day) {
    let setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (let i in setting) {
        let oDate = new Date()
        oDate.setDate(oDate.getDate() + day)
        document.cookie = i + '=' + setting[i] + ';expires=' + oDate
      }
    } else {
      let oDate = new Date()
      oDate.setDate(oDate.getDate() + day)
      document.cookie = key + '=' + value + ';expires=' + oDate
    }
  },
  remove(key) {
    let setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Array') {
      setting.forEach(key => {
        this.set(key, 1, -1)
      })
    } else {
      this.set(key, 1, -1)
    }
  }
}

export const Local = {
  get(key) {
    if (key) return JSON.parse(ls.getItem(key))
    return null
  },
  set(key, val) {
    const setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i in setting) {
        ls.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      ls.setItem(key, JSON.stringify(val))
    }
  },
  remove(key) {
    ls.removeItem(key)
  },
  clear() {
    ls.clear()
  }
}

export const Session = {
  get(key) {
    if (key) return JSON.parse(ss.getItem(key))
    return null
  },
  set(key, val) {
    const setting = arguments[0]
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i in setting) {
        ss.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      ss.setItem(key, JSON.stringify(val))
    }
  },
  remove(key) {
    ss.removeItem(key)
  },
  clear() {
    ss.clear()
  }
}
