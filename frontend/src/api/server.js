import { createServer, Model, Response, RestSerializer } from 'miragejs';
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
        },

        //routes
        routes() {
            this.namespace = "api"

            this.get("/products", (schema, request) => {
                return schema.products.all()
            })

        },

        //Dummy Data
        seeds(server) {
            productsData.map((product) => server.create("product", product))
        },

    })

    return server;

}