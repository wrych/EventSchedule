import { DataTypes, Model } from "sequelize";
import ORM from "../data/ORM.js";
import User from "./User.js";

interface EventAttributes {
    id?: number;
    hash?: string;
    ownerId: number;
    eventName: string;
    descriptionId: number;
    startDatetime: Date;
    endDatetime: Date;
}

class Event extends Model<EventAttributes> implements EventAttributes {
    declare id?: number;
    declare hash?: string;
    declare ownerId: number;
    declare eventName: string;
    declare descriptionId: number;
    declare startDatetime: Date;
    declare endDatetime: Date;
}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        hash: {
            type: DataTypes.STRING,
            unique: true,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eventName: {
            type: DataTypes.TEXT,
        },
        descriptionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startDatetime: {
            type: DataTypes.DATE,
        },
        endDatetime: {
            type: DataTypes.DATE,
        },
    },
    {
        sequelize: ORM,
        modelName: "Event",
        indexes: [{ fields: ["hash"] }],
    }
);

Event.belongsTo(User, { foreignKey: "ownerId" });
User.hasMany(Event, { foreignKey: "ownerId" });

export default Event;
