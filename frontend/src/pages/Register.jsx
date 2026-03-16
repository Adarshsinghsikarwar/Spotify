import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import "./Auth.css";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await handleRegister(data);
    navigate("/");
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="form-input"
              type="text"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              className="form-input"
              {...register("email", { required: "Email is required" })}
              type="text"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>
          <div className="form-group">
            <label>Create a password</label>
            <input
              className="form-input"
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="radio-group">
            <label className="radio-option">
              <input
                className="radio-input"
                type="radio"
                {...register("userType")}
                value="user"
              />
              <span className="radio-label">User</span>
            </label>
            <label className="radio-option">
              <input
                className="radio-input"
                type="radio"
                {...register("userType")}
                value="artist"
              />
              <span className="radio-label">Artist</span>
            </label>
          </div>

          <button className="submit-button" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
