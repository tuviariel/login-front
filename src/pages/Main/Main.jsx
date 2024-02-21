import { useNavigate } from "react-router";

export const Main = () => {
    const navigate = useNavigate();

    return (
        <div className="">
            <div>Logged in...</div>
            <button
                onClick={() => {
                    navigate("/");
                }}>
                Back to Log-in Page
            </button>
        </div>
    );
};
