const { Router } = require('express');
const router = Router();
const fetch = require("node-fetch");


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
                originalEndpoints.categories + data.results[0].category_id
            );
            const infoCat = await respuestaCategoria.json();

            return infoCat.path_from_root;
        } else {
            const respuestaCategoria = await fetch(
                originalEndpoints.categories + data.available_filters[0].values[0].id
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

module.exports = router;
