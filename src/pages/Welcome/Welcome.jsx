import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router";
const API_URL = config["API_URL"];
export const Welcome = () => {
    const navigate = useNavigate();
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [OTPCode, setOTPCode] = useState("");
    const [message, setMessage] = useState("");

    const sendLogin = async () => {
        if (validateEmail(email)) {
            try {
                const res = await axios.post(`${API_URL}/login`, {
                    email: email,
                });
                console.log(res);
                if (res.status === 200) {
                    setEmailSent(true);
                    setMessage(res.data.message);
                } else {
                    setMessage(res.data.message);
                }
            } catch (err) {
                console.log(err);
                setMessage("There was an error. Please try again.");
            }
        } else {
            setMessage(email + " is not a valid email address.");
        }
    };

    const sendCode = async () => {
        const res = await axios.post(`${API_URL}/login/code`, {
            email: email,
            code: OTPCode,
        });
        console.log(res);
        if (res.status === 200 && res.data.action === "next") {
            navigate("/main");
        } else if (res.data.action === "back") {
            setMessage(res.data.message);
            setEmailSent(false);
        }
    };

    const validateEmail = (email) => {
        console.log("val");
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    return (
        <div className="">
            <p className="">Welcome</p>
            <br />
            <div>{message}</div>
            {emailSent ? (
                <div className="">
                    Enter code you got from the email that was sent to you:
                    <input
                        className=""
                        type="text"
                        onChange={(e) => {
                            setOTPCode(e.target.value);
                        }}
                        value={OTPCode}
                        placeholder="OTPCode"
                    />
                </div>
            ) : (
                <div className="">
                    Enter email to log in:
                    <input
                        className=""
                        type="text"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        placeholder="Enter your email..."
                    />
                </div>
            )}
            <div className="">
                <button
                    className=""
                    disabled={emailSent ? OTPCode.length !== 6 : !validateEmail(email)}
                    onClick={() => {
                        emailSent ? sendCode() : sendLogin();
                    }}>
                    {emailSent ? "Confirm Code From Email Received" : "Send Email Address"}
                </button>
            </div>
        </div>
    );
};
