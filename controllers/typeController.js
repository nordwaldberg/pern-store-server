const { Type } = require('../models/models');
const ApiError = require('../errors-handlers/apiError');

class TypeController {
    async createType(req, res) {
        const name = req.body.name;

        const type = await Type.create({name});
        return res.json(type);
    }

    async getAllTypes(req, res) {
        const types = await Type.findAll();
        return res.json(types);
    }

    async deleteType(req, res) {
        const name = req.body.name;

        await Type.destroy({
            where: { name }
        });

        return res.json(`Type ${name} was deleted`);
    }
}

module.exports = new TypeController();