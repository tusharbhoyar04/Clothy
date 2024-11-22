import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style/Register.css'
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { registerUser } from "../Redux/action";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "", phone_number: "", avatar: null});
    const register = useSelector(state => state.register);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
  
    useEffect(() => {
      if (register.success) {
        navigate('/login')
      }
      else if (register.isError) {
        navigate('/register');
      }
    }, [register])
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('fullname', form.name);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('phone_number', form.phone_number);
      formData.append('avatar', form.avatar);
      dispatch(registerUser(formData, toast));
    }
  
    const [backgroundImage, setBackgroundImage] = useState('');
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setBackgroundImage(`url(${e.target.result})`);
        };
        reader.readAsDataURL(file);
        setForm({ ...form, avatar: file });
      }
    };
  
    return (
      <div className="register-body">
        <div className="register-container">
          <div className="card-preview-container">
            <div className="photo-preview" style={{ backgroundImage: backgroundImage }}>
            </div>
          </div>
  
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <span>Full Name</span>
              <input type="text" name="name" className="input-field" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }) }} required />
            </div>
            <div className="input-group">
              <span>Email</span>
              <input type="email" className="input-field" name="email" value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }) }} required />
            </div>
            <div className="input-group">
              <span>Password</span>
              <input type="password" className="input-field" name="password" value={form.password} onChange={(e) => { setForm({ ...form, password: e.target.value }) }} />
            </div>
            <div className="input-group">
              <span>Phone Number</span>
              <input type="tel" className="input-field" name="phone_number" value={form.phone_number} onChange={(e) => { setForm({ ...form, phone_number: e.target.value }) }} />
            </div>
            <div className="input-group">
              <span>Upload Photo</span>
              <input type="file" accept="image/*" name="avatar" onChange={handleFileUpload} />
            </div>
  
            <div className="login-link-container">
              <p>
                Already have an account? &nbsp;
                <Link to="/login"><b>Login</b></Link>
              </p>
            </div>
            <input type="submit" value="Register" className="submit-button" />
          </form>
        </div>
      </div>
    );
  };
  
  export default Register;
