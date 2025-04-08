import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import Google_Logo from "./Google_logo.png";
import { googleAuth } from "./api";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";

function GoogleLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // 👉 Get current path

  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult["code"]);
        const { email, name, image } = result.data.user;

        const token = result.data.token;

        const obj = { email, name, image, token };
        localStorage.setItem("user-info", JSON.stringify(obj));
        dispatch(setUser(result.data.user));

        navigate("/");
        console.log("result.data.user- :", result.data.user);
        console.log(token);
      }
    } catch (error) {
      console.error("Error while requesting google code : ", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  // 🔁 Dynamically decide text based on route
  const isSignupPage = location.pathname === "/signup";
  const buttonText = isSignupPage
    ? "Sign up with Google"
    : "Sign in with Google";

  return (
    <div>
      {/* Divider with centered "Or" */}
      <div className="flex items-center justify-center my-2">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500 font-medium">Or</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      {/* Google Sign-In Button */}
      <div className="flex justify-center">
        <Button
          onClick={googleLogin}
          className="flex items-center gap-3 bg-gray-100 text-gray-800
               hover:bg-gray-200 rounded-full my-2 shadow-md
               shadow-gray-300 w-[75%] py-2 text-base"
        >
          <img
            src={Google_Logo}
            alt="google_icon"
            className="w-5 h-5 rounded-full"
          />
          <span className="flex-1 text-center">{buttonText}</span>
        </Button>
      </div>
    </div>
  );
}

export default GoogleLogin;
