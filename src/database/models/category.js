module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'Categories'
  });

  // Category.associate = (models) => {
  //   Category.hasMany(models.PostCategories, {
  //     foreignKey: "categoryId",
  //     as: "postcategories"
  //   });
  // };

  return Category;
};