import React, { use } from "react";
import { useForm } from "react-hook-form";
import "./Auth.css";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    handleLogin(data);
    navigate("/");
    
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email address</label>
            <input
              className="form-input"
              {...register("email", { required: "Email is required" })}
              type="text"
              placeholder="Enter email"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-input"
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Enter password"
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <button className="submit-button" type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
