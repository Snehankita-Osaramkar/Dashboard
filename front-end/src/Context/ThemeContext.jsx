import React, { createContext, useReducer } from "react";

// Create Theme Context
export const ThemeContext = createContext();

// Define Action Types
export const THEME_LIGHT = "THEME_LIGHT";
export const THEME_DARK = "THEME_DARK";

const themeAvailable = sessionStorage.getItem("currentTheme");
let newTheme = themeAvailable
  ? themeAvailable
  : sessionStorage.setItem("currentTheme", THEME_LIGHT);


// Reducer Function
const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_LIGHT:
      newTheme = THEME_LIGHT;
      break;
    case THEME_DARK:
      newTheme = THEME_DARK;
      break;
    default:
      newTheme = state;
      break;
  }

  sessionStorage.setItem("currentTheme", newTheme);
  return newTheme;
};

// ThemeProvider Component
export const ThemeProvider = ({ children }) => {
  const themeContextObj = sessionStorage?.getItem("currentTheme");
  const [themeState, dispatch] = useReducer(themeReducer, themeContextObj);

  return (
    <ThemeContext.Provider value={{themeState, dispatch}}>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
};
