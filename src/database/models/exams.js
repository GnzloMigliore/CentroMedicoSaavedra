module.exports = (sequelize, dataTypes) => {
    let alias = 'exams';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
         patient_id: dataTypes.INTEGER,
         date: dataTypes.STRING,
         altura: dataTypes.STRING,
         peso: dataTypes.STRING,
         masacorporal: dataTypes.STRING,
         perimetro_abs: dataTypes.STRING,
         tension_arterial: dataTypes.STRING,
         frec_cardiaca: dataTypes.STRING,
         frec_resp: dataTypes.STRING,
         temp_axilar: dataTypes.STRING,
         cardiologia:dataTypes.STRING,
         doctor: dataTypes.STRING,

    };

    const exams = sequelize.define(alias, cols)
    
    exams.associate = function(models) {
       exams.hasMany(
            models.patients,
            {
                as: 'patients',
                foreignKey: 'patient_id'
            }
        )
   }
    return exams;
} 