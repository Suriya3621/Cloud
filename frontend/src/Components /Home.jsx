import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/config.js";
import { useCookies } from "react-cookie";
import FileUpload from "./Layout /Card/Upload.jsx";
import './Styles /Home.css';

function Home() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // Renamed state to avoid conflict with component
  const [cookies, setCookie] = useCookies(["pass", "name"]);
  const [themeCookies] = useCookies(['theme']);
  const [theme, setTheme] = useState(themeCookies.theme || "light"); // Default theme is "light"
  
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
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      const currentUser = userData.find(user => user.pass === cookies.pass);
      if (currentUser) {
        setCookie("name", currentUser.name, { path: "/" });
      }
    }
  }, [userData, cookies.pass, setCookie]);

  useEffect(() => {
    setTheme(themeCookies.theme);
  }, [themeCookies]);

  const passCookie = cookies.pass;

  const handleFileUpload = (url) => {
    console.log('File available at:', url);
    // You can handle the URL here, e.g., save it to your database
  };

  if (!passCookie) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={`Home ${theme}`}>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-dark" role="status"></div>
        </div>
      ) : (
        userData.length > 0 ? (
          userData.map(x => (
            x.pass === passCookie && (
              <div key={x.id} className="user-data">
                <br />
                <div>{x.name}</div>
                <div>
                  <FileUpload folderPath={x.name} onUpload={handleFileUpload} username={x.name} />
                </div>
              </div>
            )
          ))
        ) : (
          <h1>No users found</h1>
  
        )
      )}
    </div>
  );
}

export default Home;