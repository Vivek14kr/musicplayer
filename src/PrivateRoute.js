import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children})=>{
    const { loginsuccess, loginUser } = useSelector((state) => ({
      loginsuccess: state.LoginState.loginsuccess,
      loginUser: state.LoginState.loginUser,
    }));
    console.log(loginUser, "loginuser")
  
 
  
    if (loginsuccess == false){
        return <Navigate to="/"/>
    }
    if (loginUser == "user"){
        return <Navigate to="/users" />;
    }
    return children
}