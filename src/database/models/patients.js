module.exports = (sequelize, dataTypes) => {
    let alias = 'patients';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        gender: dataTypes.STRING,        
        date: dataTypes.STRING,
        email: dataTypes.STRING,
        dni: dataTypes.STRING,
        medical_insurance: dataTypes.STRING,
        insurance_number: dataTypes.INTEGER,
        adress: dataTypes.STRING,
        adress_number: dataTypes.STRING,
        telephone: dataTypes.INTEGER,
        diabetes: dataTypes.STRING,
        dlp: dataTypes.STRING,
        hta: dataTypes.STRING,
        crm: dataTypes.STRING,
        atc: dataTypes.STRING,
        iam: dataTypes.STRING,
        acv: dataTypes.STRING,
        aortic_aneurysm: dataTypes.STRING,
        ic: dataTypes.STRING,
        evp: dataTypes.STRING,
        epoc: dataTypes.STRING,
        irc: dataTypes.STRING,
        obesity: dataTypes.STRING,
        nhc: dataTypes.STRING,
        dlp: dataTypes.STRING,
        section: dataTypes.STRING,
        medical_visit: dataTypes.STRING,
        coments: dataTypes.STRING
    };

    const patients = sequelize.define(alias, cols)
    //Relaciones entre Users y Address
    /*users.associate = function(models) {
       users.belongsToMany(
            models.patients,
            {
                as: 'patients',
                through: 'patients',
                foreignKey: 'patients_id'
            }
        )
   }*/
    return patients
    ;
} 