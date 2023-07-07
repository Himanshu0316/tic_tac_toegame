import React, { useState, useEffect } from 'react'
import styles from './style/Signup.module.css';
import axios from 'axios';
import { auth } from "../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userSignupAPI } from "../store/authentication/auth.actions";
const Signup = ({ setPage, initialRef, finalRef, setSuccessful }) => {
  const [stage, setStage] = useState(1);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    token: "",
  });
  const [userNumber, setUserNumber] = useState("");
  const [result, setResult] = useState();
  return (
    <div className={styles.Auth}>
      {stage == 1 ? (
        <Stage1
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          userNumber={userNumber}
          setUserNumber={setUserNumber}
          setStage={setStage}
          setPage={setPage}
          result={result}
          setResult={setResult}
          initialRef={initialRef}
          finalRef={finalRef}
        />
      ) : 
      stage == 2 ? (
        <Stage2
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          userNumber={userNumber}
          setStage={setStage}
          result={result}
          setSuccessful={setSuccessful}
        />
      ) : (
        <Stage3
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          setSuccessful={setSuccessful}
        />
        
      )}
    </div>
  )
}

export default Signup

const Stage1 = ({
  userDetails,
  setUserDetails,
  userNumber,
  setUserNumber,
  setStage,
  setPage,
  setResult,
  initialRef,
}) => {
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [message, setMessage] = useState("");
  const handleOnchange = (e) => {
    if (invalid) {
      setInvalid(false);
    }
    if (message.length) {
      setMessage("");
    }
    const { value } = e.target;
    setUserNumber(value);
    setUserDetails({ ...userDetails, ["mobile"]: value });
    // console.log("user is typing", userDetails);
  };
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (userDetails.mobile.length < 10) {
      setInvalid(true);
    } else {
      if (isNaN(Number(userDetails.mobile))) {
        setInvalid(true);
      } else {
        // sendOtp(2000);
        setLoading(true);
        axios
          .post("/user/checkmobile", { mobile: userDetails.mobile })
          .then((res) => {
            if (res.data.status == true) {
              setMessage(res.data.message);
              setInvalid(true);
              setLoading(false);
            } else {
              onSignInSubmit();
            }
          })
          .catch(() => {
            setLoading(false);
          });
      }
    }
  };

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      },
      auth
    );
  };
  const onSignInSubmit = (e) => {
    // e.preventDefault();
    // setupRecaptcha();
    const phoneNumber = `+91${userDetails.mobile}`;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
        setResult(confirmationResult);
        setStage(2);
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        setInvalid(true);
        setLoading(false);
        console.log("error11 is:", error);
      });
  };
  useEffect(() => {
    setupRecaptcha();
  }, []);


  return (
    <div>
      <div id="recaptcha-container"></div>
      <form onSubmit={handleSendOtp}>
      
        <div className={styles.Flex}>
          <div >

            <h2 className={styles.h2Tag}>Sign Up</h2>

            <p className={styles.p1Tag}>
              {
                "Please enter your Mobile number to receive One Time Password (OTP)"
              }
            </p>
          </div>
          <div className={styles.iptMain}>
            <label className={styles.Labal}>Enter Mobile Number</label>
            <div className={styles.Inputdiv}>
              <div children="+91" ></div>
              
              <input
                ref={initialRef}
                value={userDetails.mobile}
                type={"text"}
                maxLength="10"
                onChange={handleOnchange}
                required
              />
            </div>
          </div>
          <p
            className={styles.Msg}
            style={{ display: invalid ? "block" : "none" }}

          >

            {message
              ? "hii"
              : "Please enter a valid 10 digit Mobile Number"}
          </p>
          <button
            type="submit"
            isLoading={loading}
            loadingText=""
            className={styles.Btncont}

          >
           {loading ? "CONTINUE..." : "SIGNUP"}
          </button>
        </div>       
          <div  className={styles.Terms}>
            <div className={styles.termPtag}>
              <p>
                Have an account?
              </p>
              <p
                className={styles.Span}
                  
                  onClick={() => setPage(true)}
                >
                  Login
                </p>
            </div>
          </div>
        

      </form>
    </div>
  );
};
const Stage2 = ({
  setStage,
  result,
  setSuccessful,
  userDetails,
  setUserDetails,
}) => {
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [count, setCount] = useState(30);

  useEffect(() => {
    let timerId = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
  }, []);
 // const toast = useToast();
  const handleOnchange = (value) => {
    setInvalid(false);
    setUserOtp(value);
  };

  const handleVeriryOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    result
      .confirm(userOtp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
        console.log("sign in successful", user.accessToken);

        setUserDetails({ ...userDetails, ["token"]: user.accessToken });
        setStage(3);
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        setInvalid(true);
        console.log("sign in error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <h1>hh</h1>
    
  );
};

const Stage3 = ({ setSuccessful, userDetails, setUserDetails }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const { isAuth, userData, signUpData } = useSelector((state) => state.auth);
  console.log(isAuth, userData);
  const handleOnchange = (e) => {
    setInvalid(false);
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(userSignupAPI(userDetails));

    setTimeout(() => {
      setSuccessful(true);
    }, 2000);
  };
  // console.log(signUpData);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.Flex}>
          
            
              <h2 className={styles.h2Tag}>
                Enter your personal details
              </h2>
            
            
              <p className={styles.p1Tag} >
                We are almost ready! Just need your extra details
              </p>
            
                <div className={styles.iptMain}>
                  <label className={styles.Labal}>
                    First Name{" "}*
                  </label>
                  <input
                  className={styles.Inputs}
                    name={"firstName"}
                    value={userDetails.firstName}
                    type={"text"}
                    onChange={handleOnchange}
                    required
                  />
                </div>
                <div className={styles.iptMain}>
                  <label className={styles.Labal}>
                    Last Name{" "}*
                  </label>
                  <input
                  className={styles.Inputs}
                    name={"lastName"}
                    value={userDetails.lastName}
                    type={"text"}
                    onChange={handleOnchange}
                    required
                  />
                </div>
           
              <div className={styles.iptMain}>
                <label className={styles.Labal}>
                  Enter Email ID{" "}*
                </label>
                <input
                className={styles.Inputs}
                  name="email"
                  value={userDetails.email}
                  type={"email"}
                  onChange={handleOnchange}
                  required
                />
              </div>
          
            <button
            className={`${styles.Btncont}  ${styles.Btnfill}`}
              width={"100%"}
              isLoading={loading}
              loadingText="Signing in..."
              colorScheme="orange"
            >
              CONTINUE
            </button>
           
        </div>
      </form>
    </div>
  );
};