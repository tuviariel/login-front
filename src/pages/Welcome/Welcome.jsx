import { useState } from "react";
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
    const [pending, setPending] = useState(false);

    //sending user's email address to back-end:
    const sendLogin = async () => {
        if (validateEmail(email)) {
            setPending(true);
            try {
                const res = await axios.post(`${API_URL}/login`, {
                    email: email,
                });
                if (res.status === 200) {
                    setEmailSent(true);
                    setMessage(res.data.message);
                } else {
                    setMessage(res.data.message);
                }
            } catch (err) {
                console.log(err);
                setMessage("There was an error. Please try again.");
            } finally {
                setPending(false);
            }
        } else {
            setMessage(email + " is not a valid email address.");
        }
    };

    //sending the OTPCode user entered:
    const sendCode = async () => {
        setPending(true);
        try {
            const res = await axios.post(`${API_URL}/login/code`, {
                email: email,
                code: OTPCode,
            });
            console.log(res);
            if (res.status === 200 && res.data.action === "next") {
                navigate("/main");
            } else if (res.data.action === "back") {
                setPending(false);
                setMessage(res.data.message);
                setEmailSent(false);
            } else if (res.data.action === "stay") {
                setPending(false);
                setMessage(res.data.message);
            }
        } catch (err) {
            console.log(err);
            setMessage("There was an error. Please try again.");
        }
    };

    //validating email address format:
    const validateEmail = (email) => {
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
                    Enter code from email you got:
                    <input
                        className=""
                        type="text"
                        onChange={(e) => {
                            setOTPCode(e.target.value);
                        }}
                        value={OTPCode}
                        placeholder="X X X X X X"
                    />
                </div>
            ) : (
                <div className="">
                    Enter your email to log in:
                    <input
                        className=""
                        type="text"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        placeholder="example@company.com"
                    />
                </div>
            )}
            <div className="">
                <button
                    className=""
                    disabled={
                        pending ? true : emailSent ? OTPCode.length !== 6 : !validateEmail(email)
                    }
                    onClick={() => {
                        emailSent ? sendCode() : sendLogin();
                    }}>
                    {emailSent ? "Confirm Code From Email" : "Send Email Address"}
                </button>
                <div className="">{pending && "Loading..."}</div>
            </div>
        </div>
    );
};
