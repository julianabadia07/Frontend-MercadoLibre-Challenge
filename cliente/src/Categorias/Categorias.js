import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


import "./Categorias.scss";

const Categorias = (props) => {
    return (
        <div className="Categorias">
            {props.categories.map((category) => {
                return (
                    <span className="categoriasItem" key={category.id}>
                        <a className="categoriasLink" href="">
                            {category.name}
                        </a>
                        {<FontAwesomeIcon className="categoriasIcon" icon={faChevronRight} />}
                    </span>
                );
            })}
        </div>
    );
};

export default Categorias;

