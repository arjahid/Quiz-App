import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/authProvider";


const Navbar = () => {
  const {user,signInWithGoogle,signOut}=useContext(AuthContext);
  const handleGoogleSignIn=()=>{
    signInWithGoogle()
      .then((result) => {
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  }
  const handleSignOut=()=>{
    signOut()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }
 
  return (
    <div className="navbar bg-base-100 shadow-sm mt-4">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-2xl text-green-400 font-bold"
        >
          MyQuiz
        </Link>
      </div>

      <div className="flex-none">
        <button
          
          className="btn btn-outline btn-primary mr-4"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          ></div>
          <div></div>
         
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.metadata?.photoURL || "https://img.freepik.com/premium-psd/user-icematte_161669-211.jpg?semt=ais_hybrid&w=740"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
          >
          
            <li className="mb-2">
              <button  className="btn">Settings</button>
            </li>
            <li>
              <button onClick={handleSignOut} className="btn">Logout</button>
            </li>
          </ul>
        </div>
      </div>
       <p className="pl-2"><span>{user?.displayName}</span></p>
    </div>
  );
};

export default Navbar;
