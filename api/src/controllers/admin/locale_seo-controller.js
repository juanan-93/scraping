const db = require("../../models");
const Locale_seo = db.locale_seo;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    //dentro del if van los que tienen el allowNull: false

    if (!req.body.title || !req.body.rel_parent ||!req.body.language ||!req.body.group ||!req.body.key ||!req.body.redirection ) {

        res.status(400).send({
            message: "Faltan campos por rellenar."
        });

        return;
    }
// dentro de esta varioable introducimos los datos que queremos guardar en la base de datos(todos los campos de las mirgraciones )
    const locale_seo = {
        title: req.body.title,
        rel_parent: req.body.rel_parent,
        language: req.body.language,
        group: req.body.group,
        key: req.body.key,
        subdomain: req.body.subdomain,
        url: req.body.url,
        keywords: req.body.keywords,
        description: req.body.description,
        redirection: req.body.redirection,
        menu: req.body.menu,
        changefreq: req.body.changefreq,
        priority: req.body.priority,
        sitemap: req.body.sitemap
      

    };

    Locale_seo.create(locale_seo).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al insertar el dato."
        });
    });
};

exports.findAll = (req, res) => {

    const title = req.query.title;
    var condition = title ? { [Op.and]: [{title: { [Op.like]: `%${title}%` }, deletedAt: null }]} : {deletedAt: null};

    Locale_seo.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Algún error ha surgido al recuperar los datos."
        });
    });
};

exports.findOne = (req, res) => {

    const id = req.params.id;

    Locale_seo.findByPk(id, {where: {deletedAt: null}}).then(data => {

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

    Locale_seo.update(req.body, {
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

    Locale_seo.destroy({
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