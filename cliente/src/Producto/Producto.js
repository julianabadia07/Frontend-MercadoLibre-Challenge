import React from "react";
import TruckIcon from "../img/shippin.png";
import "./Producto.scss";

const Producto = (props) => {
  return (
    <div className="Producto">
      <div className="productoData">
        <div className="image">
          <img className="img" src={props.obj.picture} />
        </div>
        <div className="productoDetails">
          <span className="price span">
            $ {props.obj.price.amount}
              {props.obj.free_shippin ? (
              <img className="truckIcon" src={TruckIcon} alt="free shipping" />
            ) : (
              ""
            )}
          </span>
          <span className="productoName">{props.obj.title}</span>
        </div>
      </div>
      <div className="productoLocation">{props.obj.location}</div>
    </div>
  );
};

export default Producto;
