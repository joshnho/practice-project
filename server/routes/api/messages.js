const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    let conversation = await Conversation.findByPk(conversationId);

    if (conversation) {
      const { dataValues } = conversation;
      const convoUsers = [dataValues.user1Id, dataValues.user2Id];
      // check if current sender is part of conversation
      if(convoUsers.includes(senderId) && convoUsers.includes(recipientId)){
        const message = await Message.create({
          senderId,
          text,
          conversationId,
          read: false
        });
        return res.json({ message, sender });
      } else {
        return res.sendStatus(401);
      }
    }
  
    // create conversation
    conversation = await Conversation.create({
      user1Id: senderId,
      user2Id: recipientId,
    });
    if (onlineUsers.includes(sender.id)) {
      sender.online = true;
    }
    
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      read: false
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// Set messages in current conversation to read
router.post("/read", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401)
    }
    const { conversationId, senderId } = req.body
    const messages = await Message.update(
      { read: true },
      {where: {
        conversationId: {
          [Op.eq]: conversationId
        },
        senderId: {
          [Op.eq]: senderId
        },
        read: {
          [Op.eq]: false
        }
      }}
    )
    res.json(messages)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
