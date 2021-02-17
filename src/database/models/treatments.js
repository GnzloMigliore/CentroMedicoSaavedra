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
        datetreatment: dataTypes.TEXT,
        dateendtreatment: dataTypes.TEXT,
    };

    const treatments = sequelize.define(alias, cols)
    
    treatments.associate = function(models) {
        treatments.belongsToMany(
            models.patients,
            { 
                as: 'patients',
            through: 'patienttreatments',
            foreignKey: 'treatments_id',
            otherKey: 'patient_id'

            }
        )
   }
    return treatments;
} 