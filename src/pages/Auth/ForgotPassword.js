import React, {useState} from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyle.css";


const ForgotPassword = ()=>{
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [auth, setAuth] = useAuth();
    // const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const location = useLocation();



    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,answer,newPassword}) ;
            console.log(res);
            if (res.data.success){
                alert(res.data.message);

                // setAuth({
                //     // previos value as it is ...
                //     ...auth,
                //     user: res.data.user,
                //     token: res.data.token
                // });

                // localStorage.setItem('auth', JSON.stringify(res.data));

                navigate("/");
            }else{
                alert(res.data.message);
            }
        } catch (error) {
            // console.log(error);
            alert("something went wrong");
        }
        // alert("Registered Successfully");
        // toast.success("Register");
    }

    return (
        <Layout title="Forgot Password:">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>
          
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAnswer1"
              placeholder="What is your Favorite Sports? "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="New Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm Password"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
    )
};

export default ForgotPassword;