module.exports = (sequelize, dataTypes) => {
    let alias = 'treatments';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        patient_id: dataTypes.INTEGER,
        tratamiento: dataTypes.STRING,
    };

    const treatments = sequelize.define(alias, cols)
    
    treatments.associate = function(models) {
        treatments.hasMany(
            models.patients,
            {
                as: 'patients',
                foreignKey: 'tratmentspatients_id'
            }
        )
   }
    return treatments;
} 