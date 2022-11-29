const db = require("../../models");
const Menu_items = db.menu_items;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.language ||!req.body.name || !req.body.customUrl || !req.body.private || !req.body.order ) {

        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const menu_items = {

        name: req.body.name,
        language: req.body.language,
        menuId: req.body.menuId,
        localeSeoId: req.body.localeSeoId,
        localeSlugId: req.body.localeSlugId,
        parentKey: req.body.parentKey,
        description: req.body.description,
        customUrl: req.body.customUrl,
        private: req.body.private,
        order: req.body.order,

    };

    Menu_items.create(menu_items).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    const name = req.query.name;
    var condition = name ? { [Op.and]: [{name: { [Op.like]: `%${name}%` }, deletedAt: null }]} : {deletedAt: null};

    Menu_items.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    Menu_items.findByPk(id, {where: {deletedAt: null}}).then(data => {

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

    Menu_items.update(req.body, {
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

    Menu_items.destroy({
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