import { Table, Column, DataType,Model } from 'sequelize-typescript';


@Table({
    tableName: 'users',
    timestamps: true, // createdAt and updatedAt fields will be added automatically
    modelName: 'User', // project management database ma user table create garne ho
})
// user table ko structure define garne ho
class User extends Model{
    @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    })
    declare id : string;
 @Column({
    type: DataType.STRING,
    allowNull: false,
 })
 declare username : string;

    @Column({
        type: DataType.STRING
    })
    declare email :string;

    @Column({
        type : DataType.STRING
    })
    declare password :string;

    @Column({
        type : DataType.ENUM('teacher', 'institute','super-admin','student'),
        defaultValue : 'student'
    })
    declare role: string;
    @Column({
        type: DataType.STRING
    })
    declare currentInstituteNumber: string 


   


}
export default User;