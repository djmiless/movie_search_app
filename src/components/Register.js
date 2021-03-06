import React from "react";
import './Login.css'

function Register ({loadLogin}){

    return(
    <div className="container">
        <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
                <div className="col-lg-12 login-key">
                    <i className="fa fa-key" aria-hidden="true"></i>
                </div>
                <div className="col-lg-12 login-title">
                    <h2>MOVIE SEARCHER REGISTER</h2>
                </div>

                <div className="col-lg-12 login-form">
                    <div className="col-lg-12 login-form">
                        <form>
                            <div className="form-group">
                                <label className="form-control-label">EMAIL</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">USERNAME</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">PASSWORD</label>
                                <input type="password" className="form-control" i/>
                            </div>

                            <div className="form-group">
                                <p className="lower-text" onClick={() => {loadLogin()}}> Already Registered ? <strong className="lower-text-2">Login</strong></p>
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="col-lg-6 login-btm login-text">
                                </div>
                                <div className="col-lg-6 login-btm login-button">
                                    <button type="submit" className="btn btn-outline-primary">SIGN UP</button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <div className="col-lg-3 col-md-2"></div>
            </div>
        </div>


    </div>
    )
}

export default Register;