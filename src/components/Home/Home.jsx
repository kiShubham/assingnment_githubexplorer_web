/* eslint-disable no-unused-vars */
// import React from "react";
import { useEffect, useState } from "react";
import style from "./Home.module.css";
import githubLogo from "../../assets/cat.svg";
import UserPanel from "../UserPanel/UserPanel";
import Navbar from "../Navbar/Navbar";
import RepoList from "../RepoList/RepoList";
import { fetchuser, fetchRepoArray } from "../../api/api";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const location = useLocation();
  const newUsername = location.state;
  // console.log(newUsername);

  const [userData, setUserData] = useState({});
  const [repoData, setRepoData] = useState([]);
  const [input, setInput] = useState("");

  const fetchUserData = async (username) => {
    const res = await fetchuser(username);

    if (res.status === 500) {
      window.alert("no such username exist");
      return null;
    }
    // console.log(res.user.repoUrl);
    const repoArray = await fetchRepoArray(res.user.repoUrl);
    return { data: res.user, repoArray };
  };

  // useEffect will only update the data when we are goind back from the repodetail page or followerspage;
  useEffect(() => {
    async function fetchnew(username) {
      const res = await fetchUserData(username);
      if (res) {
        setUserData(res.data);
        setRepoData(res.repoArray);
      }
    }
    if (newUsername) fetchnew(newUsername);
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input) {
      const res = await fetchUserData(input);
      if (res) {
        setUserData(res.data);
        setRepoData(res.repoArray);
      }
      setInput(""); // Clear the input field after fetching user data
    }
  };
  const isEmpty = (obj) => {
    return Object.entries(obj).length === 0;
    // return true if Empty
  };

  return (
    <div className={style.Home}>
      <Navbar />
      <div className={style.middleSection}>
        <div className={style.userLogin}>
          <img src={githubLogo} alt="" className={style.logo} />
          <form onSubmit={handleSubmit} className={style.form}>
            <input
              type="username"
              name="username"
              id="username"
              required
              placeholder="enter github username"
              onChange={handleChange}
            />
            <button type="submit">submit</button>
          </form>
        </div>
        {isEmpty(userData) ? null : <UserPanel userData={userData} />}
      </div>
      <div>{repoData.length ? <RepoList repoArray={repoData} /> : null}</div>
    </div>
  );
};
