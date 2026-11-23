Page({
  data: { count: 0 },
  increment() {
    this.setData({ count: this.data.count + 1 })
  },
  reset() {
    this.setData({ count: 0 })
  }
})
