import './Login.css';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function Login() {
    const [name, setName] = useState(localStorage.getItem("name") ? localStorage.getItem("name") : null)
    const history = useHistory();

    const setOfflineName = () => {
        localStorage.setItem("name", name);
        history.push("/chat");
    }

    return (
            <div className="container center_div mt-5">
                <form>
                    <div className="form-group">
                        <label for="name">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <button className="btn btn-primary" onClick={() => setOfflineName()}>Submit</button>
                </form>
            </div>
    );
}

export default Login;
