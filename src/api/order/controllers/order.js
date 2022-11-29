'use strict';
/**
 * order controller
 */
const TelegramBot = require('node-telegram-bot-api')

// const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true})
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({strapi})=>({
  async makeOrder(ctx){
    try{
      const { name, phone_number, delivery_type, count_of_people, comment, address, dishes, count, options } = ctx.request.body;
      const entry = await strapi.entityService.create('api::order.order', {
        data:{
          name: name,
          phone_number: phone_number,
          delivery_type: delivery_type,
          count_of_people: count_of_people,
          comment: comment,
          address: address,
          dishes: dishes,
          count_of_dishes: count,
          options: options
        }
      })

      const orderedDishes = await strapi.entityService.findOne('api::order.order', entry.id, {
        populate: "*"
      });

      // await bot.sendMessage(443023633, this.telegramString(orderedDishes), {parse_mode: "HTML"})

      ctx.body = orderedDishes;
    }catch (e){
      console.log(e)
    }
  },

  telegramString(orderedDishes){
    let orderInformation = `<b>Order #${orderedDishes.id}</b>\n`;
    let orderSum = 0
    console.log(orderedDishes.dishes[0].options[0]);
    for (let i = 0; i < orderedDishes.dishes.length; i++) {
      orderInformation += `${i+1}. ${orderedDishes.dishes[i].header}: ${orderedDishes.dishes[i].price} (${orderedDishes.count_of_dishes[i]}) * `+
        `${orderedDishes.dishes[i].price}\n Інгрідієнт на вибір: ${orderedDishes.dishes[i].options[orderedDishes.options[i]]}\n`
      orderSum += orderedDishes.dishes[i].price * orderedDishes.count_of_dishes[i]
    }

    const purchaserInformation = `Сума замовлення: ${orderSum}\n\n<b>Purchaser information:</b>\nName: ${orderedDishes.name}\nPhone: ${orderedDishes.phone_number}\n` +
      `Доставка чи самовивіз: ${orderedDishes.delivery_type}\nАдреса доставки: ${orderedDishes.address}\nКількість приборів: ${orderedDishes.count_of_people}`

    return orderInformation+purchaserInformation
  }
}));
