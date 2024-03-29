import io from 'socket.io-client';
import store from './store';
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  readMessages,
} from './store/conversations';

const socket = io(window.location.origin, {
  autoConnect: false,
});

socket.on('connect', () => {
  console.log('connected to server');

  socket.on('add-online-user', (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on('remove-offline-user', (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on('new-message', (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
  socket.on('read-messages', (data) => {
    store.dispatch(readMessages(data.conversationId, data.userId));
  });
  socket.on('disconnect', () => {
    console.log('User has disconnected');
  });
});

export default socket;
