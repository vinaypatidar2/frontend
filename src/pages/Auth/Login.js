import React, {useState} from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyle.css";
import { useAuth } from "../../context/Auth";


const Login = ()=>{
    // const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    // const [address, setAddress] = useState("");
    // const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const location = useLocation();



    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            // console.log("sdfghrtjfgxgzstrhyjtdx"); 
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email, password}) ;
            // console.log(res);
            if (res.data.success){
                alert(res.data.message);

                setAuth({
                    // previos value as it is ...
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });

                localStorage.setItem('auth', JSON.stringify(res.data));

                navigate( location.state ||"/");
            }else{
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("something went wrong");
        }
        // alert("Registered Successfully");
        // toast.success("Register");
    }

    return (
        <Layout title="Login:">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN</h4>
          {/* <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div> */}
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          {/* <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is Your Favorite sports"
              required
            />
          </div> */}
          <button type="submit" className="btn " onClick={()=>{
            navigate("/forgot-password");
          }}>
            Forgot password?
          </button>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
    )
};

export default Login;