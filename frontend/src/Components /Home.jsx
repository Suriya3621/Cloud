import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/config.js";
import { useCookies } from "react-cookie";
import FileUpload from "./Layout /Card/Upload.jsx"; // Fixed import path
import './Styles /Home.css'; // Fixed import path
import HelmetConfig from '../App/HelmetConfig.jsx';

function Home() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie,removeCookie] = useCookies(["pass", "name"]);
  const [themeCookies] = useCookies(['theme']);
  const [theme, setTheme] = useState(themeCookies.theme || "light");
  const [wrongPass, setWrongPass] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let results = [];
        const collectionsRef = collection(db, "Users");
        const querySnapshot = await getDocs(collectionsRef);
        querySnapshot.forEach(doc => {
          results.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setUserData(results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      const currentUser = userData.find(user => user.pass === cookies.pass);
      if (currentUser) {
        setCookie("name", currentUser.name, { path: "/" });
        setWrongPass(false); // Reset wrongPass if the user is found
      } else {
        setWrongPass(true); // Set wrongPass if no matching user is found
      }
    }
  }, [userData, cookies.pass, setCookie]);

  useEffect(() => {
    setTheme(themeCookies.theme);
  }, [themeCookies]);

  const passCookie = cookies.pass;

  const handleFileUpload = (url) => {
    console.log('File available at:', url);
    // Handle the URL here
  };
const logout = () => {
    removeCookie("pass", { path: "/" });
    removeCookie("name", { path: "/" });
  };
  if (!passCookie) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={`Home ${theme}`}>
      <HelmetConfig
        title="Home"
        icon="/Icons/cloud-upload.png"
      />
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      ) : (
        <>
          {wrongPass && (
            <div className="alert alert-danger text-center position-absolute" role="alert" style={{ top: "40%", width: "100%" }}>
              Incorrect password. Please try again.
              <br/>
              <button onClick={logout} className="btn btn-danger">Login</button>
            </div>
          )}
          
          {userData.length > 0 && userData.map(x => (
            x.pass === passCookie && (
              <div key={x.id} className="user-data">
                <br />
                <div>{x.name}</div>
                <div>
                  <FileUpload folderPath={x.name} onUpload={handleFileUpload} username={x.name} />
                </div>
              </div>
            )
          ))}
        </>
      )}
    </div>
  );
}

export default Home;