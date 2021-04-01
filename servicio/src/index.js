const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const fetch = require("node-fetch");

//Settings
app.set('port', 4000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
const author = {
    name: "Julian",
    lastname: "Abadia",
};

const endpoints = {
    search: "https://api.mercadolibre.com/sites/MLA/search?limit=4&q=",
    items: "https://api.mercadolibre.com/items/",
    categories: "https://api.mercadolibre.com/categories/",
};

/* GET home page. */
app.get("/api/items", async (req, res) => {
    const query = req.query.q;
    const url = endpoints.search + query;

    const fetchData = async () => {
        try {
            const respuesta = await fetch(url);
            const data = await respuesta.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("error", error.message);
        }
    };

    const data = await fetchData();

    const getCategories = async (data) => {
        if (data.results[0].category_id) {
            const respuestaCategoria = await fetch(
                endpoints.categories + data.results[0].category_id
            );
            const categoria = await respuestaCategoria.json();

            return categoria.path_from_root;
        } else {
            const respuestaCategoria = await fetch(
                endpoints.categories + data.available_filters[0].values[0].id
            );
            const infoCat = await respuestaCategoria.json();
            return infoCat.path_from_root;
        }
    };

    const getItems = (data) => {
        const itemsInfo = data.results.map((result) => {
            return {
                id: result.id,
                title: result.title,
                price: {
                    currency: result.currency_id,
                    amount: result.price,
                    decimals: "",
                },
                picture: result.thumbnail,
                condition: result.condition,
                free_shippin: result.shipping.free_shipping,
                location: result.address.state_name,


            };
        });

        return itemsInfo;
    };

    const categories = await getCategories(data);
    const items = getItems(data);

    res.json({
        author: author,
        categories: categories,
        items: items,
    });
});
app.get("/api/items/:id", async (req, res) => {
    const itemId = req.params.id;

    const fetchItemData = async () => {
        const url = endpoints.items + itemId;
        try {
            const respuesta = await fetch(url);
            const data = await respuesta.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log("error", error.message);
        }
    };

    const fetchItemDescription = async () => {
        const url = endpoints.items + itemId + "/description";
        try {
            const respuesta = await fetch(url);
            const data = await respuesta.json();
            console.log(data);
            return data;

        } catch (error) {
            console.log("error", error.message);
        }
    };

    const getCategories = async (data) => {
        const respuestaCategoria = await fetch(
            endpoints.categories + itemInfo.category_id
        );
        const infoCat = await respuestaCategoria.json();

        return infoCat.path_from_root;
    };

    const itemInfo = await fetchItemData();
    const itemDescription = await fetchItemDescription();
    const itemCategories = await getCategories();

    const allInfo = {
        id: itemInfo.id,
        title: itemInfo.title,
        price: {
            currency: itemInfo.currency_id,
            amount: itemInfo.price,
            decimals: "",
        },
        picture: itemInfo.thumbnail,
        condition: itemInfo.condition,
        free_shipping: itemInfo.shipping.free_shipping,
        sold_quantity: itemInfo.sold_quantity,
        description: itemDescription.plain_text,
        categories: itemCategories,
    };

    res.json({
        author: author,
        item: allInfo,
    });
});

//Startin the server
app.listen(app.get('port'), () => {
    console.log(`Server on Port ${app.get('port')}`);
});