import React from "react";
import VenueReducer from "../services/VenueReducer";
import { useNavigate,NavLink } from "react-router-dom";
import VenueDataService from "../services/VenueDataService";
function Signup() {
  var navigate = useNavigate();
  const [user, dispatchUser] = React.useReducer(VenueReducer, {
    user: {},
    isSignedUp: false,
    isError: false,
  });
  const performSignup = (user) => {
   
    VenueDataService.signup(user)
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        dispatchUser({
          type: "SIGNUP_SUCCESS",
          payload: response.data,
        });
      })
      .catch((error) =>console.log(error))      
  };
  const onSubmit = (evt) => {
    var incomingUser = {
      name: evt.target.elements.username.value,
      email: evt.target.elements.email.value,
      password: evt.target.elements.password.value,
    };
    performSignup(incomingUser);
    evt.preventDefault();
  };
  React.useEffect(() => {
    if (user.isSignedUp) {
      return navigate("/");
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
                Ad Soyad:
              </label>
              <div className="col-xs-12 col-sm-10">
                <input
                  className="form-control"
                  name="username"
                  defaultValue="asy"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-10 col-sm-2 control-label">
                E-Posta:
              </label>
              <div className="col-xs-12 col-sm-10">
                <input
                  className="form-control"
                  name="email"
                  defaultValue="asy"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-xs-10 col-sm-2 control-label">Şifre:</label>
              <div className="col-xs-12 col-sm-10">
                <input
                  className="form-control"
                  name="password"
                  defaultValue="asy"
                />
              </div>
            </div>
            <div className="form-group">
              <button className="btn-login btn-default pull-right">
                Kayıt Ol
              </button>
              <NavLink  to="/login" className="pull-right-href">Giriş Yap</NavLink>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
