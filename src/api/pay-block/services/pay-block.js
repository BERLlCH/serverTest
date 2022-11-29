'use strict';

/**
 * pay-block service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pay-block.pay-block');
