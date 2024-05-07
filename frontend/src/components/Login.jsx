import React from "react";
import VenueReducer from "../services/VenueReducer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
function Login() {
  var navigate = useNavigate();
  var location=useLocation();
  const from = location.state?.from || "/";
  const name=location.state?.name || "";
  
  const [user, dispatchUser] = React.useReducer(VenueReducer, {
    user: {},
    isLoggedIn: false,
    isError: false,
  });
  const performLogin = (user) => {
    VenueDataService.login(user)
      .then((response) => {
        sessionStorage.setItem("token",response.data.token);
        dispatchUser({
          type: "LOGIN_SUCCESS",
          payload: response.data,
        });
      })
      .catch(() => dispatchUser({
        type: "LOGIN_FAILURE"
      }));
  };
  const onSubmit = (evt) => {
    var incomingUser = {
      email: evt.target.elements.email.value,
      password: evt.target.elements.password.value,
    };
    performLogin(incomingUser);
    evt.preventDefault();
  };
  React.useEffect(() => {
    if (user.isLoggedIn) {
      return navigate(from, {state:{name:name}}, {replace: true });
    }
  });
  return (
    <div>
      <div className="row page-header">
        <div className="col-lg-12 " />
      </div>
      <div className="row" align="center">
        <div className="login col-md-6">
          <form
            className="center form-horizontal"
            id="login"
            onSubmit={(evt) => onSubmit(evt)}
          >
            <div className="form-group">
              <label className="col-xs-10 col-sm-2 control-label">
                E-Posta:
              </label>
              <div className="col-xs-12 col-sm-10">
                <input className="form-control" name="email" defaultValue="asy" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-10 col-sm-2 control-label">Şifre:</label>
              <div className="col-xs-12 col-sm-10">
                <input className="form-control" name="password" defaultValue="asy"/>
              </div>
            </div>
            <div className="form-group">
              <button className="btn-login btn-default pull-right">
                Giriş Yap
              </button>
              <NavLink  to="/signup" className="pull-right-href">Kayıt Ol</NavLink>
              {user.isError ? (
                <span className="alert-danger alert" align="center">
                  Kullanıcı adı ya da şifre hatalı!
                </span>
              ) : (
                <span></span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
