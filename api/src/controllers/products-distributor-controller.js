const db = require("../models");
const ProductsDistributor = db.ProductsDistributor;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.date || !req.body.category || !req.body.name || !req.body.weight || !req.body.weight_unit || !req.body.price || !req.body.offer || !req.body.offer_type || !req.body.offer_afiliate || !req.body.weight_standard || !req.body.price_standard || !req.body.price_standard_calculate) {

        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const productsDistributor = {
        
        date: req.body.date,
        category: req.body.category,
        name: req.body.name,
        weight: req.body.weight,
        weight_unit: req.body.weight_unit,
        price: req.body.price,
        offer: req.body.offer,
        offer_type: req.body.offer_type,
        offer_afiliate: req.body.offer_afiliate,
        weight_standard: req.body.weight_standard,
        price_standard: req.body.price_standard,
        price_standard_calculate: req.body.price_standard_calculate,
        
    };

    ProductsDistributor.create(productsDistributor).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    const date = req.query.date;
    var condition = date ? { [Op.and]: [{date: { [Op.like]: `%${date}%` }, deletedAt: null }]} : {deletedAt: null};

    ProductsDistributor.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    ProductsDistributor.findByPk(id, {where: {deletedAt: null}}).then(data => {

        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({
                message: `No se puede encontrar el elemento con la id=${id}.`
            });
        }

    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al recuperar la id=" + id
        });
    });
};

exports.update = (req, res) => {

    const id = req.params.id;

    ProductsDistributor.update(req.body, {
        where: { [Op.and]: [{id: id} , {deletedAt: null}] }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "El elemento ha sido actualizado correctamente."
            });
        } else {
            res.status(404).send({
                message: `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al actualiazar la id=" + id
        });
    });
};

exports.delete = (req, res) => {

    const id = req.params.id;

    ProductsDistributor.destroy({
        where: { id: id }
    }).then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "El elemento ha sido borrado correctamente"
            });
        } else {
            res.status(404).send({
                message: `No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Algún error ha surgido al borrar la id=" + id
        });
    });
};