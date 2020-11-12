import React from "react";
import Config from '../../Config/Config';
import { io } from 'socket.io-client';
const { Provider, Consumer } = React.createContext();

function SocketContextProvider({ children }){
    const socket = io(Config.SOCKET_URL, {
        reconnectionDelayMax: 10000
    });
    

    return <Provider value={socket}>{children}</Provider>;
}

export { SocketContextProvider, Consumer as SocketContextConsumer };