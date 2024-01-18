const express = require("express");
const {
  createChatOrGenerateMessages,
  updateMessage,
  deleteMessage,
  createMessage,
} = require("../controller/chatController");
const cors = require("cors");

router = express.Router();

router.options(cors());

router.options("/api/chat", cors());
router.post("/api/chat", createChatOrGenerateMessages);
/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: get messages or create a new chat
 *     description: Endpoint to create a new chat
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender:
 *                 type: string
 *                 description: Sender's ID.
 *               receiver:
 *                 type: string
 *                 description: Receiver's ID.
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */

router.options("/api/messages", cors());
router.post("/api/messages", createMessage);
/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Create a new message
 *     description: Endpoint to create a new message
 *     tags: [Message]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *     responses:
 *       201:
 *         description: Mesage Sent.
 *       500:
 *         description: Internal Server Error
 *
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *               sender:
 *                 type: string
 *                 description: Sender's ID.
 *               receiver:
 *                 type: string
 *                 description: Receiver's ID.
 *               text:
 *                 type: string
 *                 description: Message content.
 *       required:
 *         - sender
 *         - receiver
 *         - text
 */

router.options("/api/chats/:chatId/messages/:messageId", cors());
router.patch("/api/chats/:chatId/messages/:messageId", updateMessage);
/**
 * @swagger
 * /api/chats/{chatId}/messages/{messageId}:
 *   patch:
 *     summary: Update a message in a chat
 *     tags: [Message]
 *     parameters:
 *       - name: chatId
 *         in: path
 *         description: ID of the chat
 *         required: true
 *         schema:
 *           type: string
 *       - name: messageId
 *         in: path
 *         description: ID of the message
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateMessage'
 *     responses:
 *       200:
 *         description: update Successful
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal Server Error
 * components:
 *   schemas:
 *     updateMessage:
 *       type: object
 *       properties:
 *               text:
 *                 type: string
 *                 description: Message content.
 *       required:
 *         - text
 *
 */

router.options("/api/chats/:chatId/messages/:messageId", cors());
router.delete("/api/chats/:chatId/messages/:messageId", deleteMessage);
/**
 * @swagger
 * /api/chats/{chatId}/messages/{messageId}:
 *   delete:
 *     summary: delete a message from the chat
 *     tags: [Message]
 *     parameters:
 *       - name: chatId
 *         in: path
 *         description: ID of the chat
 *         required: true
 *         schema:
 *           type: string
 *       - name: messageId
 *         in: path
 *         description: ID of the message
 *         required: true
 *         schema:
 *           type: string

 *     responses:
 *       200:
 *         description: deletion Successful
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal Server Error
 *
*/

module.exports = router;
