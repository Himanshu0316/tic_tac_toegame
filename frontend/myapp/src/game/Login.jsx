import React, { useState } from 'react'
import styles from './style/Signup.module.css';
const Login = ({setPage, initialRef, finalRef, setSuccessful}) => {
  const [stage, setStage] = useState(1);
  const [userNumber, setUserNumber] = useState("");
  const [result, setResult] = useState();
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
        ) : (
        <p>hii</p>
        // stage == 2 ? (
        //   <Stage2
        //     userNumber={userNumber}
        //     setStage={setStage}
        //     result={result}
        //     setSuccessful={setSuccessful}
        //   />
        // ) : (
        //   <Box>SignUp</Box>
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
    setLoading(true);
    setInterval(() => {
      console.log("hii")
    }, 10000);
  }

  return (
    <div>
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
            <p>
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