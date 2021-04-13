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
        firstlast_name: dataTypes.STRING,
        gender: dataTypes.STRING,        
        date: dataTypes.STRING,
        email: dataTypes.STRING,
        dni: dataTypes.STRING,
        medical_insurance: dataTypes.STRING,
        insurance_number: dataTypes.INTEGER,
        adress: dataTypes.STRING,
        adress_number: dataTypes.STRING,
        telephone: dataTypes.INTEGER,
        nhc: dataTypes.STRING,
        diabetes: dataTypes.STRING,
        date_diabetes: dataTypes.TEXT,
        date_end_diabetes: dataTypes.TEXT,
        action_diabetes: dataTypes.STRING,
        coments_diabetes: dataTypes.TEXT,
        dlp: dataTypes.STRING,
        date_dlp: dataTypes.TEXT,
        date_end_dlp: dataTypes.TEXT,
        action_dlp: dataTypes.STRING,
        coments_dlp: dataTypes.TEXT,
        hta: dataTypes.STRING,
        date_hta: dataTypes.TEXT,
        date_end_hta: dataTypes.TEXT,
        action_hta: dataTypes.STRING,
        coments_hta: dataTypes.TEXT,
        crm: dataTypes.STRING,
        date_crm: dataTypes.TEXT,
        date_end_crm: dataTypes.TEXT,
        action_crm: dataTypes.STRING,
        coments_crm: dataTypes.TEXT,
        atc: dataTypes.STRING,
        date_atc: dataTypes.TEXT,
        date_end_atc: dataTypes.TEXT,
        action_atc: dataTypes.STRING,
        coments_atc: dataTypes.TEXT,
        iam: dataTypes.STRING,
        date_iam: dataTypes.TEXT,
        date_end_iam: dataTypes.TEXT,
        action_iam: dataTypes.STRING,
        coments_iam: dataTypes.TEXT,
        acv: dataTypes.STRING,
        date_acv: dataTypes.TEXT,
        date_end_acv: dataTypes.TEXT,
        action_acv: dataTypes.STRING,
        coments_acv: dataTypes.TEXT,
        date_end_acv: dataTypes.TEXT,
        aortic_aneurysm: dataTypes.STRING,
        date_aerotic: dataTypes.TEXT,
        date_end_aerotic: dataTypes.TEXT,
        action_aerotic: dataTypes.STRING,
        coments_aerotic: dataTypes.TEXT,
        ic: dataTypes.STRING,
        date_ic: dataTypes.TEXT,
        date_end_ic: dataTypes.TEXT,
        date_end_diabetes: dataTypes.TEXT,
        action_ic: dataTypes.STRING,
        coments_ic: dataTypes.TEXT,
        evp: dataTypes.STRING,
        date_evp: dataTypes.TEXT,
        date_end_evp: dataTypes.TEXT,
        action_evp: dataTypes.STRING,
        coments_evp: dataTypes.TEXT,
        epoc: dataTypes.STRING,
        date_epoc: dataTypes.TEXT,
        date_end_epoc: dataTypes.TEXT,
        action_epoc: dataTypes.STRING,
        coments_epoc: dataTypes.TEXT,
        irc: dataTypes.STRING,
        date_irc: dataTypes.TEXT,
        date_end_irc: dataTypes.TEXT,
        action_irc: dataTypes.STRING,
        coments_irc: dataTypes.TEXT,
        obesity: dataTypes.STRING,
        date_obesity: dataTypes.TEXT,
        date_end_obesity: dataTypes.TEXT,
        action_obesity: dataTypes.STRING,
        coments_obesity: dataTypes.TEXT,
        medicalhistory_id:  dataTypes.STRING,
        patient_id: dataTypes.INTEGER,
    };

    const patients = sequelize.define(alias, cols)
   
    patients.associate = function(models) {
        patients.belongsTo(
            models.medicalhistories,
            {
                as: 'medicalhistories',
                foreignKey: 'medicalhistory_id'
            }
        )   
      
            patients.belongsTo(
                models.exams,
                {
                    as: 'exams',
                    foreignKey: 'patient_id'
                }
            ) 
              
        patients.belongsToMany(
            models.treatments,
            {
                as: 'treatments',
                through: 'patienttreatments',
                foreignKey: 'patient_id',
                otherKey: 'treatments_id',
            }
        )   
   }

    return patients
    ;

}