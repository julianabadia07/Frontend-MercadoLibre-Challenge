import React, { useState } from "react";
import "./Search.scss";
import searchLogo from "../img/ic_Search.png";
import MLlogo from "../img/Logo_MELI.png";
import { useHistory } from "react-router-dom";

const Search = (props) => {
    const [value, setValue] = useState("");
    const history = useHistory();

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = () => {
        history.push({ pathname: "/items", search: `?search=${value}` });
    };

    return (
        <header className="header">
            <form>
                <a href="//#endregion">
                    <img src={MLlogo} alt="logo MercadoLibre" className="logo" />
                </a>
                <input
                    className="Search"
                    type="search"
                    placeholder="Nunca dejes de buscar"
                    onChange={(e) => handleChange(e)}
                    aria-label="Nunca dejes de buscar"
                />
                <button
                    className="searchButton"
                    type="submit"
                    onClick={(e) => e.preventDefault(handleSubmit())}
                >
                    <img src={searchLogo} alt="" />
                </button>
            </form>
        </header>
    );
};

export default Search;
