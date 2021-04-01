import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Producto from "../Producto/Producto"
import Categorias from "../Categorias/Categorias";
import "./Productos.scss";


const Productos = () => {

    const [productos, setProductos] = useState([]);
    const location = useLocation();

    const getSearchParams = () => {
        //Herramienta del navegador
        return new URLSearchParams(location.search);
    };

    useEffect(() => {
        let query = getSearchParams();
        fetch(`http://localhost:4000/api/items?q=${query.get("search")}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(jsonResp => setProductos(jsonResp))
    });


    return (
        <div className="mainContainer">
            <div className="container">
                {productos.items ? (
                    <div className="productBreadcrumb">
                        <Categorias categories={productos.categories} />
                    </div>
                ) : null}
                {productos.items &&
                    productos.items.map((obj, index) => {
                        return (
                            <Link
                                key={index}
                                to={{ pathname: `/items/${obj.id}`, state: { data: obj } }}
                                className="link"
                            >
                                <Producto obj={obj} />
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};

export default Productos;

