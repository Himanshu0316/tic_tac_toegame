import React, { useState, useEffect } from 'react'
import styles from './style/Signup.module.css';

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
      ) : (
        <p>hiiiiii</p>
        
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
   
  };


  return (
    <div>
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
            CONTINUE
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