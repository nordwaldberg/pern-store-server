const uuid = require('uuid');
const path = require('path');

const { Product, ProductInfo } = require('../models/models');
const ApiError = require('../errors-handlers/apiError');

class ProductController {
    async createProduct(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            const { img } = req.files;
            const filename = `${name}_` + uuid.v4(5) + '.jpg';

            await img.mv(path.resolve(__dirname, '..', 'static/products', filename));

            const product = await Product.create({ name, price, brandId, typeId, img: filename});

            if (info) {
                info = JSON.parse(info);

                info.forEach(data => {
                   ProductInfo.create({
                       title: data.title,
                       description: data.description,
                       productId: product.id
                   });

                });
            }

            return res.json(`Product ${name} was successfully created`);
        } catch (err) {
            next(ApiError.handleBadRequestError(err.message));
        }

    }

    async getAllProducts(req, res) {
        let { brandId, typeId, page, limit } = req.query;
        page = page || 1;
        limit = limit || 9;

        const offset = page * limit - limit;

        let products;

        if ( !brandId && !typeId ) {
            products = await Product.findAndCountAll({ limit, offset });
        }

        if ( brandId && typeId ) {
            products = await Product.findAndCountAll({ where: { brandId, typeId }, limit, offset});
        }

        if ( !brandId && typeId ) {
            products = await Product.findAndCountAll({ where: { typeId }, limit, offset});
        }

        if ( brandId && !typeId ) {
            products = await Product.findAndCountAll({ where: { brandId }, limit, offset});
        }

        return res.json(products);
    }

    async getProduct(req, res) {
        const { id } = req.params;

        const product = await Product.findOne(
            {
                where: { id },
                include: [ {model: ProductInfo, as: 'info'} ]
            }
        );

        res.json(product);
    }

    async deleteProduct(req, res) {
        const name = req.body.name;

        await Product.destroy({
            where: { name }
        });

        return res.json(`Product ${name} was deleted`);
    }
}

module.exports = new ProductController();