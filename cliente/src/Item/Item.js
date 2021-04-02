import React, { useState, useEffect } from 'react';
import "./Item.scss";
import Categorias from "../Categorias/Categorias";

const Item = (props) => {

    const [item, setItem] = useState();



    useEffect(() => {
        fetch(`http://localhost:4000/api/items/${props.match.params.id}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(jsonRes => setItem(jsonRes))
    }, [props.match.params.id]);


    return (
        <div className="Item">
            {item ? (
                <>
                    <div className="itemCategoria">
                        <Categorias categories={item.item.categories} />
                    </div>
                    <div className="itemData">
                        <div className="itemTop">
                            <div className="itemImage">
                                <img className="img" src={item.item.picture} alt="" />
                            </div>
                            <div className="itemInfo">
                                <div className="itemDetails">
                                    <span className="estadoItem">
                                        {item.item.condition === "new" ? "Nuevo " : "Usado"}
                                    </span>
                                    {item.item.sold_quantity !== 0 ? (
                                        <span className="ventasItem">
                                            - {item.item.sold_quantity} vendidos
                                        </span>
                                    ) : null}
                                </div>
                                <div className="itemName">{item.item.title}</div>
                                <div className="itemPrice">$ {item.item.price.amount}</div>
                                <button className="itemBuy">Comprar</button>
                            </div>
                        </div>
                        <div className="itemDescriptionProducto">
                            <div className="itemDescriptionTitulo">
                                Descripción del producto
                  </div>
                            <div className="itemDescription">
                                {" "}
                                {item.item.description}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default Item;