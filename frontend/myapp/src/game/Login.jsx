import React, { useEffect, useState } from 'react'
import styles from './style/Signup.module.css';
import axios from "axios";
import OTPInput from "react-otp-input";
import './style/Otp.css';
import { useDispatch} from "react-redux";
import { userLoginAPI } from "../store/authentication/auth.actions";
import { auth } from "../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
const Login = ({setPage, initialRef, finalRef, setSuccessful}) => {
  const [stage, setStage] = useState(1);
  const [userNumber, setUserNumber] = useState("");
  const [result, setResult] = useState();
  console.log(auth)
  return (
    <div className={styles.Auth}>
      {stage == 1 ? (
          <Stage1
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
            userNumber={userNumber}
            setStage={setStage}
            result={result}
            setSuccessful={setSuccessful}
          />
        ) : (
          <div>SignUp</div>
        )}
        
    </div>
  )
}

export default Login

const Stage1 = ({
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
    // console.log("user is typing", value);
  };
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (userNumber.length < 10) {
      setInvalid(true);
    } else {
      if (isNaN(Number(userNumber))) {
        setInvalid(true);
      } else {
        // sendOtp(2000);
        setLoading(true);

        axios
          .post("/user/checkmobile", { mobile: userNumber })
          .then((res) => {
            if (res.data.status != true) {
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
    const phoneNumber = `+91${userNumber}`;
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
        console.log("error11", error);
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

          <h2 className={styles.h2Tag}>Login</h2>

          <p className={styles.p1Tag}>
            {
              "Get access to your orders, lab tests & doctor consultations"
            }
          </p>
        </div>
        <div className={styles.iptMain}>
          <label className={styles.Labal}>Enter Mobile Number</label>
          <div className={styles.Inputdiv}>
            <div children="+91" ></div>
            
            <input
              ref={initialRef}
              value={userNumber}
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
            ? message
            : "Please enter a valid 10 digit Mobile Number"}
        </p>
        <button
          type="submit"
          isLoading={loading}
          loadingText="sending..."
          className={styles.Btncont}

        >
          {userNumber.length > 1 && !loading ? "SEND OTP" :!loading ?"LOGIN": "Sending..."}
        </button>
      </div>       
        <div  className={styles.Terms}>
          <div className={styles.termPtag}>
            <p className={styles.l1pTag}>
              If Not Registered?
            </p>
            <p
              className={styles.Span}
                
                onClick={() => setPage(false)}
              >
                Signup
              </p>
          </div>
        </div>
      

    </form>
  </div>
  );
};
const Stage2 = ({ userNumber, setStage, result, setSuccessful }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [userOtp, setUserOtp] = useState("");

  // const [count, setCount] = useState(30);

  // useEffect(() => {
  //   let timerId = setInterval(() => {
  //     setCount((count) => count - 1);
  //   }, 1000);
  // }, []);
  //const toast = useToast();
  const handleOnchange = (value) => {
    if (invalid) {
      setInvalid(false);
    }
    setUserOtp(value);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    result
      .confirm(userOtp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        // ...
        console.log("sign in successful", user);
        dispatch(userLoginAPI({ mobile: userNumber, token: user.accessToken }));
        setTimeout(() => {
          setSuccessful(true);
        }, 2000);
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
    <div>
      <form onSubmit={handleVerifyOtp}>
        <div className={styles.Flex}>


          <h2 className={styles.h2Tag}>
            Verify OTP
          </h2>

          <div className={styles.p1flexTag}>
            <p className={styles.p1Tag}>
              Provide OTP sent to&nbsp;
            </p>
            <p style={{ color: "black", fontWeight: "bold" }}>
              {userNumber}
            </p>&nbsp;
            <p
              style={{ color: "red", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => setStage(1)}
            >
              Edit
            </p>
          </div>


          <label className={styles.Label}>One Time Password</label>

          <div className={styles.otpFlex}>
            <OTPInput
              onChange={handleOnchange}
              value={userOtp}
              className={styles.inputStyle}
              inputStyle="inputStyle"
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
              required
            />
          </div>
          <p
            style={{ display: invalid ? "block" : "none" }}

            className={styles.Msg}
          >
            Uh-oh! Incorrect OTP
          </p>

          {/* <Text fontSize={"13px"} mt="20px">
                Resend in 0:30
              </Text>
              <Text
                mt="20px"
                color="#ff6f61"
                fontWeight={"bold"}
                cursor="pointer"
                display={invalid ? "visible" : "none"}
                // onClick={() => ResendOtp(1000)}
              >
                Resend OTP
              </Text> */}
          <button
            className={`${styles.Btncont}  ${styles.Btnfill}`}
            type={"submit"}
            width={"100%"}
            isLoading={loading}
            loadingText="Verifying..."
            colorScheme="orange"
          >
            DONE
          </button>

        </div>
      </form>
    </div>
  );
};