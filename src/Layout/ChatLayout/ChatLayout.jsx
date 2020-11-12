import { NavLink } from "react-router-dom";
import Chat from "../../Components/Chat/Chat";
import { SocketContextConsumer } from "../../Context/SocketContext/SocketContext";

function ChatLayout() {
  return (
    <>
      <SocketContextConsumer>
        {(socket) => (
          <div className="container-fluid">
            <div className="row">
              <div className="col-4 mt-5">
                <div
                  className="list-group pointer"
                  id="list-tab"
                  role="tablist"
                >
                  <NavLink
                    activeClassName="active"
                    to="/chat/john"
                    className="list-group-item list-group-item-action"
                  >
                    John
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    to="/chat/adam"
                    className="list-group-item list-group-item-action"
                  >
                    Adam
                  </NavLink>
                </div>
              </div>
              <div className="col-8 mt-5">
                <Chat socket={socket} />
              </div>
            </div>
          </div>
        )}
      </SocketContextConsumer>
    </>
  );
}

export default ChatLayout;
