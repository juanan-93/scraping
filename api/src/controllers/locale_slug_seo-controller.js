const db = require("../models");
const Locale_slug_seo = db.locale_slug_seo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    if (!req.body.relParent || !req.body.slug ||!req.body.relParent) {

        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }

    const locale_slug_seo = {

        localeSeold: req.body.localeSeold,
        language: req.body.language,
        relParent: req.body.relParent,
        slug: req.body.slug,
        key: req.body.key,
        parentSlug: req.body.parentSlug,
        title: req.body.title,
        keyWords: req.body.keyWords,
        description: req.body.description

    };

    Locale_slug_seo.create(locale_slug_seo).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    const language = req.query.language;
    var condition = language ? { [Op.and]: [{language: { [Op.like]: `%${language}%` }, deletedAt: null }]} : {deletedAt: null};

    Locale_slug_seo.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    Locale_slug_seo.findByPk(id, {where: {deletedAt: null}}).then(data => {

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

    Locale_slug_seo.update(req.body, {
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

    Locale_slug_seo.destroy({
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