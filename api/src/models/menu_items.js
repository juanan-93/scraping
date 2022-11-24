const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu_items', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    language: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    menuId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'menu_items',
        key: 'id'
      }
    },
    localeSeoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'menu_items',
        key: 'id'
      }
    },
    localeSlugId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'menu_items',
        key: 'id'
      }
    },
    parentKey: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    customUrl: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    private: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'menu_items',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "menuId",
        using: "BTREE",
        fields: [
          { name: "menuId" },
        ]
      },
      {
        name: "localeSeoId",
        using: "BTREE",
        fields: [
          { name: "localeSeoId" },
        ]
      },
      {
        name: "localeSlugId",
        using: "BTREE",
        fields: [
          { name: "localeSlugId" },
        ]
      },
    ]
  });
};
