module.exports = (sequelize, dataTypes) => {
    let alias = 'apointments';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: dataTypes.STRING,
        description: dataTypes.STRING,
        doctor: dataTypes.STRING,
        start_date: dataTypes.STRING,
        end_date: dataTypes.STRING,



    };

    const apointments = sequelize.define(alias, cols)
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
    return apointments;
} 