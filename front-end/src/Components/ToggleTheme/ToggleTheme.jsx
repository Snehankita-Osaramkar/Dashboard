import { Moon, Sun } from "lucide-react";
import React, { useContext } from "react";
import "./ToggleTheme.scss";
import { THEME_DARK, THEME_LIGHT, ThemeContext } from "../../Context/ThemeContext";

const ToggleTheme = () => {
    const { themeState, dispatch } = useContext(ThemeContext);

    const handleToggle = () => {
        dispatch({ type: themeState === THEME_LIGHT ? THEME_DARK : THEME_LIGHT });
    };

    return (
        <div className="themeContainer" onClick={handleToggle}>
            {themeState === THEME_LIGHT ? <Moon className="icon" /> : <Sun className="icon" />}
        </div>
    );
};

export default ToggleTheme;
