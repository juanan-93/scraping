const db = require("../../models");
const Sale = db.Sale;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.date_emitted || !req.body.total_base_price || !req.body.total_tax_price || !req.body.total_price || !req.body.ticket_number) {

        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const sale = {

        ticket_number: req.body.ticket_number,
        total_base_price: req.body.total_base_price,
        total_tax_price: req.body.total_tax_price,
        total_price: req.body.total_price,
        date_emitted: req.body.date_emitted,
        hour_emitted: req.body.hour_emitted,
        service_duration: req.body.service_duration,
        
    };

    Sale.create(sale).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    const date_emitted = req.query.date_emitted;
    var condition = date_emitted ? { [Op.and]: [{phone: { [Op.like]: `%${date_emitted}%` }, deletedAt: null }]} : {deletedAt: null};

    Sale.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    Sale.findByPk(id, {where: {deletedAt: null}}).then(data => {

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

    Sale.update(req.body, {
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

    Tax.destroy({
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