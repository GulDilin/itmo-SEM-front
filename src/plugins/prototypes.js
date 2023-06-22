import 'core-js/actual/array/group'
import 'core-js/proposals/array-last'

export default {
  install: () => {
    // Object.defineProperty(Object.prototype, 'isEqual', {
    //   value: function (another) {
    //     return JSON.stringify(this) === JSON.stringify(another)
    //   },
    // })

    Object.defineProperty(Array.prototype, 'findIndexBy', {
      value: function (by, every = true) {
        const keys = Array.from(Object.keys(by))
        const isEqual = (it, key) => JSON.stringify(it?.[key]) === JSON.stringify(by?.[key])
        if (every) return this.findIndex(it => keys.every(key => isEqual(it, key)))
        else return this.findIndex(it => keys.some(key => isEqual(it, key)))
      },
    })

    Object.defineProperty(Array.prototype, 'findBy', {
      value: function (by, every = true) {
        let idx = this.findIndexBy(by, every)
        if (idx > -1) return this[idx]
      },
    })

    Object.defineProperty(Array.prototype, 'replaceBy', {
      value: function (by, item, every = true) {
        let idx = this.findIndexBy(by, every)
        if (idx > -1) this.splice(idx, 1, item)
      },
    })

    Object.defineProperty(Array.prototype, 'mergeItemBy', {
      value: function (by, item, every = true) {
        let idx = this.findIndexBy(by, every)
        if (idx === -1) return
        Object.entries(item).forEach(([k, v]) => (this[idx][k] = v))
      },
    })

    Object.defineProperty(Array.prototype, 'removeBy', {
      value: function (by, every = true) {
        let idx = this.findIndexBy(by, every)
        let removed = 0
        if (idx > -1) removed += this.splice(idx, 1)?.length || 0
        return removed
      },
    })

    Object.defineProperty(Array.prototype, 'remove', {
      value: function (val) {
        let idx = this.indexOf(val)
        if (idx > -1) this.splice(idx, 1)
        return this
      },
    })

    Object.defineProperty(Array.prototype, 'isEmpty', {
      get: function () {
        return this.length === 0
      },
    })

    Object.defineProperty(Object.prototype, 'applyFunc', {
      value: function (block) {
        block(this)
        return this
      },
    })

    Object.defineProperty(Document.prototype, 'scrollToElementById', {
      value: function (id) {
        this.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      },
    })

    Object.defineProperty(Document.prototype, 'scrollToElementInContainer', {
      value: function (container, element) {
        if (!element || !container) return
        const parentRect = container.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()
        container.scrollLeft = elementRect.left - parentRect.left
        container.scrollTop = elementRect.top - parentRect.top
      },
    })

    Object.defineProperty(Document.prototype, 'scrollToBottom', {
      value: function (container) {
        console.log({ scrollToBottom: container })
        container?.scrollTo(0, container.scrollHeight)
      },
    })

    Object.defineProperty(Document.prototype, 'scrollToElementInContainerById', {
      value: function (container, id) {
        if (!id) return
        this.scrollToElementInContainer(container, this.getElementById(id))
      },
    })

    Object.defineProperty(Document.prototype, 'getOffsetInPageContent', {
      value: function (element) {
        const containerRect = this.getElementById('page-content').getBoundingClientRect()
        let { top, left } = element.getBoundingClientRect()
        top -= containerRect.top
        left -= containerRect.left
        return { top, left }
      },
    })

    Object.defineProperty(Document.prototype, 'getInnerSize', {
      value: function (el) {
        const cs = getComputedStyle(el)
        const paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
        const paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom)
        const borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth)
        const borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth)
        return {
          width: el.offsetWidth - paddingX - borderX,
          height: el.offsetHeight - paddingY - borderY,
        }
      },
    })

    Object.defineProperty(String.prototype, 'capitalizeWords', {
      value: function () {
        return this.replace(/\b\w/g, l => l.toUpperCase())
      },
    })

    Object.defineProperty(Array.prototype, 'random', {
      get: function () {
        return this[Math.floor(Math.random() * this.length)]
      },
    })

    Object.defineProperty(Array.prototype, 'common', {
      value: function common(other) {
        return this?.filter(v => other.includes(v)) ?? []
      },
    })

    // add if element not in array, remove if element in array
    Object.defineProperty(Array.prototype, 'swapByExistence', {
      value: function swapByExistence(it, predicate) {
        if (this.findBy(predicate)) this.removeBy(predicate)
        else this.push(it)
        return this
      },
    })
  },
}
