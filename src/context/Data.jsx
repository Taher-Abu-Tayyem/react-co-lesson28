
import { createContext, useReducer } from "react";
const Data= createContext();


const initialData = { 
  theme: localStorage.getItem("theme") || "light",};
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, theme: action.newValue };

    default:
      return state;
  }
};


export function DataProvider({ children }) {
const [firstState, dispatch] = useReducer(reducer, initialData);


const changeTheme = (newTheme) => {
dispatch({ type: "CHANGE_THEME", newValue: newTheme });
    localStorage.setItem("theme", newTheme);
    localStorage.getItem("theme");
};
return (
<Data.Provider value={{ ...firstState, changeTheme}}>
{children}
</Data.Provider>
);
}
export default Data;
