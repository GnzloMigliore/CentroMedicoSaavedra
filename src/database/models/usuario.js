module.exports = (sequelize, dataTypes) => {
    let alias = 'users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        username: dataTypes.STRING,        
        email: dataTypes.STRING,
        roles: dataTypes.STRING,
        password: dataTypes.STRING,
        telephone: dataTypes.INTEGER,
        puesto: dataTypes.STRING,
        gender: dataTypes.STRING
    };

    const users = sequelize.define(alias, cols)
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
    return users;
} 