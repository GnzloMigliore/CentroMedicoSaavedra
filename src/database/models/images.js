module.exports = (sequelize, dataTypes) => {
    let alias = 'images';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        filename: dataTypes.STRING,
        patient_id: dataTypes.INTEGER,
    };

    const images = sequelize.define(alias, cols)
    
    images.associate = function(models) {
        images.hasMany(
            models.patients,
            {
                as: 'patients',
                foreignKey: 'patient_id'
            }
        )
   }
    return images;
} 