import axios from 'axios';
import socket from '../../socket';
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
  readMessages,
} from '../conversations';
import { gotUser, setFetchingStatus } from '../user';

// const axios = axios.create({
//   baseURL: 'https://practice-chat-application.herokuapp.com/',
// });

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get('/auth/user');
    dispatch(gotUser(data));
    if (data.id) {
      socket.connect();
      socket.emit('go-online', data.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/register', credentials);
    dispatch(gotUser(data));
    socket.connect();
    socket.emit('go-online', data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/login', credentials);
    dispatch(gotUser(data));
    socket.connect();
    socket.emit('go-online', data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || 'Server Error' }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await axios.delete('/auth/logout');
    dispatch(gotUser({}));
    socket.emit('logout', id);
    socket.disconnect();
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/conversations');
    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async (body) => {
  const { data } = await axios.post('/api/messages', body);
  return data;
};

const sendMessage = (data, body) => {
  socket.emit('new-message', {
    message: data.message,
    recipientId: body.recipientId,
    sender: data.sender,
  });
};

const sendReadStatusToOtherUser = (body, userId) => {
  socket.emit('read-messages', {
    conversationId: body.conversationId,
    otherUserId: body.senderId,
    userId,
  });
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body) => async (dispatch) => {
  try {
    const data = await saveMessage(body);

    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message));
    }

    sendMessage(data, body);
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};

export const updateReadStatus = (conversation, userId) => async (dispatch) => {
  try {
    const reqBody = {
      conversationId: conversation.id,
      senderId: conversation.otherUser.id,
    };
    const lastMsgIdx = conversation.messages.length - 1;
    if (
      conversation.messages[lastMsgIdx].read === false &&
      conversation.messages[lastMsgIdx].senderId === reqBody.senderId
    ) {
      dispatch(readMessages(conversation.id, userId));
      await axios.patch('/api/messages/unread-messages', reqBody);
      sendReadStatusToOtherUser(reqBody, userId);
    }
  } catch (error) {
    console.error(error);
  }
};
