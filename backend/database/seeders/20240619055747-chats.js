"use strict";

const { where } = require("sequelize");
const models = require("../../models");

const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    // const user1 = await User.find({
    //   where: {
    //     id: 14,
    //   },
    // });

    // const user2 = await User.find({
    //   where: {
    //     id: 23,
    //   },
    // });

    const chat = await Chat.create();

    await ChatUser.bulkCreate([
      {
        chatId: chat.id,
        userId: 13,
      },
      {
        chatId: chat.id,
        userId: 23,
      },
    ]);

    await Message.bulkCreate([
      {
        message: "Hey Bro",
        chatId: chat.id,
        fromUserId: 13,
      },
      {
        message: "Hey Buddy",
        chatId: chat.id,
        fromUserId: 23,
      },
      {
        message: "Hew are you doing?",
        chatId: chat.id,
        fromUserId: 23,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
