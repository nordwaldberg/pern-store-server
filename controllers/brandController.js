const {Brand} = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class BrandController {
    async createBrand(req, res) {
        const name = req.body.name;

        const brand = await Brand.create({name});
        return res.json(brand);
    }

    async getAllBrands(req, res) {
        const brands = await Brand.findAll();
        return res.json(brands);
    }

    async deleteBrand(req, res) {
        const name = req.body.name;

        await Brand.destroy({
            where: { name }
        });

        return res.json(`Brand ${name} was deleted`);
    }
}

module.exports = new BrandController();