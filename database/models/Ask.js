const Sequelize = require('sequelize');
const connection = require('../index');

const Ask = connection.define('asks', {
  title: {
    type: Sequelize.STRING, // Textos curtos
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT, // Textos longos
    allowNull: false
  }
});

Ask.sync({ force: false }).then(() => {
  console.log('Tabela Asks ✔️');
}); // Não força caso já exista

module.exports = Ask;
