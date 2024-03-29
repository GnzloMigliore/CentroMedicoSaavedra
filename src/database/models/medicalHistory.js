module.exports = (sequelize, dataTypes) => {
    let alias = 'medicalhistories';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        patient_id: dataTypes.INTEGER,
        visitamedica: dataTypes.STRING,
        fechavisita: dataTypes.STRING,
        doctor: dataTypes.STRING,
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
    };

    const medicalhistories = sequelize.define(alias, cols)
    
    medicalhistories.associate = function(models) {
        medicalhistories.hasMany(
            models.patients,
            {
                as: 'patients',
                foreignKey: 'medicalhistory_id'
            }
        )
   }
    return medicalhistories;
} 