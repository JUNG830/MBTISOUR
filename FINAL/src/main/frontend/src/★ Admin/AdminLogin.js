import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import AdminAPI from '../0. API/AdminAPI';
import Loading from '../other/Loading';
import './AdminLogin.css';
import logo from '../images/logo.png';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

export default function AdminLogin() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  /* 아이디 변경 */
  const onChangeId = (e) => {
    let temp_id = e.target.value;
    setId(temp_id);
  }

  /* 비밀번호 변경 */
  const onChangePwd = (e) => {
    let temp_pwd = e.target.value;
    setPwd(temp_pwd);
  }

  /* Login 버튼 클릭 */
  const onClickLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AdminAPI.adminLogin(id, pwd);
      window.sessionStorage.setItem("isAdminLogin", "TRUE");
      if (response.data === true) {
        console.log(response.data);
        navigate("/AdminMain");
      } else { alert("안 돼 돌아가")}
    } catch (e) {
      console.log(e);
    }
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="AdminLogin-card-container">

    <div className="AdminLogin-card">

      <div className="AdminLogin-card-logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="AdminLogin-card-header">
        <h1>Sign In</h1>
        <div>Please login to user platform</div>
      </div>



      <form className="AdminLogin-card-form">
        <div className="AdminLogin-form-item">
          <PersonOutlineRoundedIcon className="form-item-icon"/>
          <input type="text" placeholder="Enter ID" required autoFocus 
            value={id} onChange={onChangeId}/>
        </div>
        <div className="AdminLogin-form-item">
          <LockRoundedIcon className="form-item-icon"/>
          <input type="password" placeholder="Enter Password" required 
            value={pwd} onChange={onChangePwd}/>
        </div>
        <div className="AdminLogin-form-item-other">
          <div className="checkbox">
            <input type="checkbox" id="rememberMeCheckbox" />
            <label htmlFor="rememberMeCheckbox">Remember me</label>
          </div>
          <a href="#">I forgot my password!</a>
        </div>
        <button type="submit" onClick={onClickLogin}>Sign In</button>
      </form>



      <div className="AdminLogin-card-footer">
        Don't have an account? <a href="#">Create a free account</a>.
      </div>



      <div className="AdminLogin-card-social">
        <div>Other Sign-in Platform</div>

        <div className="AdminLogin-card-social-btn">
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-facebook" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
            </svg>
          </a>
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
            </svg>
          </a>
        </div>

      </div>


    </div>
    </div>
  );
}
