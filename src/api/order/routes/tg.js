module.exports = {
  routes:[
    {
      method: 'POST',
      path: "/makeorder",
      handler: 'order.makeOrder',
      config:{
        auth: false
      }
    }
  ]
}
