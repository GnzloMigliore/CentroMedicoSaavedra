module.exports = (sequelize, dataTypes) => {
    let alias = 'medicalhistories';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        visitamedica: dataTypes.STRING,
    };

    const medicalhistories = sequelize.define(alias, cols)
    
    medicalhistories.associate = function(models) {
        medicalhistories.hasOne(
            models.patients,
            {
                as: 'patients',
                foreignKey: 'medicalhistory_id'
            }
        )
   }
    return medicalhistories;
} 