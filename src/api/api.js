/* eslint-disable no-unused-vars */
import axios from "axios";

// const BACKEND_ENDPOINT = "http://localhost:3000/api";
// const BACKEND_ENDPOINT = "https://chittychittybangbang.onrender.com/api";
const BACKEND_ENDPOINT = "https://assignment-githubexplorer-server-1.onrender.com";

//================================>save-user or search if already exist<==============

export const fetchuser = async (username) => {
  try {
    const res = await axios.get(`${BACKEND_ENDPOINT}/save-user/${username}`);
    // console.log(res);
    return res.data;
  } catch (error) {
    return error.response;
  }
};

// fetchuser("g1");

//====================================>
export const fetchRepoArray = async (repoUrl) => {
  try {
    const res = await axios.get(`${repoUrl}`);

    return res.data;
  } catch (error) {
    console.error(error.message);
    return error.response;
  }
};
// fetchRepoArray("https://api.github.com/users/kiss/repos");
