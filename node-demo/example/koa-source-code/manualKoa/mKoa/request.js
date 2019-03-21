module.exports = {
  get url() {
    // req 是node原始请求对象；
    return this.req.url;
  }
}
