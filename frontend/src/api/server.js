import { createServer, Model, RestSerializer } from 'miragejs';
import productsData from './products';

export function makeServer() {

    let server = createServer({

        //Send data in JSON Format
        serializers: {
            application: RestSerializer
        },

        //Models
        models: {
            products: Model,
            cart: Model,
        },

        //routes
        routes() {
            this.namespace = "api"

            this.get("/products", (schema, request) => {
                return schema.products.all()
            })
            this.get('/product/:id', (schema, request) => {
                const id = request.params.id;
                return schema.products.find(id)
            })
            this.post('/cart', (schema, request) => {
                const data = JSON.parse(request.requestBody);
                return schema.cart.create(data)
            })
        },

        //Dummy Data
        seeds(server) {
            productsData.map((product) => server.create("product", product))
        },

    })

    return server;

}