import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div>
      {user && (
        <div className="navbar">
          <div className="links">
            {user && <Link to={"/posts"}>Posts</Link>}
            {user && <Link to={"/createpost"}>Create Post</Link>}
          </div>
          <div className="user">
            {user && (
              <>
                <p>{user?.displayName}</p>
                <img
                  src={user?.photoURL || ""}
                  width="50"
                  height="50"
                  referrerPolicy="no-referrer"
                />
                <button onClick={signUserOut} className="logOut">
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
