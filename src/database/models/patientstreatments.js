module.exports = (sequelize, dataTypes) => {
    let alias = 'patienttreatments';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        patient_id: {
            type: dataTypes.INTEGER,
        },
        treatments_id: {
            type: dataTypes.INTEGER,
        }
    };

    let config = {
        tableName: 'patienttreatments'
    }
    
    const patienttreatment = sequelize.define(alias, cols, config)
    patienttreatment.associate = function(models) {
        patienttreatment.belongsTo(
            models.treatments,
            {
                as : 'treatments',
                foreignKey: 'treatments_id'
            }
        ),
        patienttreatment.belongsTo(
            models.patients,
            {
                as : 'patients',
                foreignKey: 'patient_id'
            }
        )
    };

    return patienttreatment;
}