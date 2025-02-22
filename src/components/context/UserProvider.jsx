import { createContext, useState, useEffect } from "react";
import API from "../../api/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const response = await API.get("/auth/user", { withCredentials: true });
                setUser(response.data.user);
            } catch (error) {
                console.log("No active session", error.response?.data || error);
            } finally {
                setLoading(false);
            }
        };

        checkUserSession();
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get("user");

        if (userParam) {
            const userData = JSON.parse(decodeURIComponent(userParam));
            setUser(userData);
            window.history.replaceState({}, document.title, "/");
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};