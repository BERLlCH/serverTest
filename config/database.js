const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: 'db',
      port: 5432,
      database: "neptune",
      user: "postgres",
      password: 'qwerty123',
    },
    useNullAsDefault: true,
  },
});
