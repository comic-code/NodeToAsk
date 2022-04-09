const Sequelize = require('sequelize');
const connection = require('../index');

const Response = connection.define('responses', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  askId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
})

Response.sync({ force: false }).then(() => console.log('Tabela Responses ✔️'));

module.exports = Response;