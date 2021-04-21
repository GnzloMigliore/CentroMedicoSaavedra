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
         altura: dataTypes.STRING,
         peso: dataTypes.STRING,
         masacorporal: dataTypes.STRING,
         frec_cardiaca: dataTypes.STRING,
         tension_arterial: dataTypes.STRING,
         frec_resp: dataTypes.STRING,
         temp_axilar: dataTypes.STRING,
         perimetro_abs: dataTypes.STRING,
         tension_art_prom: dataTypes.STRING,
         r2: dataTypes.STRING,
         r3: dataTypes.STRING,
         r4: dataTypes.STRING,
         soplos: dataTypes.STRING,
         fallaizq: dataTypes.STRING,
         fallader: dataTypes.STRING,
         saturacion: dataTypes.STRING,
         date: dataTypes.STRING,
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