import socketIoClient from 'socket.io-client'
import { HOST } from './const'

let socket = socketIoClient(HOST);

export default socket
