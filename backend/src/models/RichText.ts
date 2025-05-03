import { DataTypes, Model } from "sequelize";
import ORM from "../data/ORM.js";

interface RichTextSnapshotAttributes {
    id?: number;
    ownerType: string;
    ownerId: number;
    version: number;
    docJson: object;
    createdBy: number;
}

class RichTextSnapshot extends Model<RichTextSnapshotAttributes> implements RichTextSnapshotAttributes {
    declare id?: number;
    declare ownerType: string;
    declare ownerId: number;
    declare version: number;
    declare docJson: object;
    declare createdBy: number;
}

RichTextSnapshot.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        ownerType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        version: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        docJson: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize: ORM,
        modelName: "RichTextSnapshot",
        indexes: [{ fields: ["ownerType", "ownerId"] }],
    }
);


interface RichTextStepAttributes {
    id?: number;
    snapshotId: number;
    stepIndex: number;
    stepJson: string;
    createdBy: number;
}

class RichTextStep extends Model<RichTextStepAttributes> implements RichTextStepAttributes {
    declare id?: number;
    declare snapshotId: number;
    declare stepIndex: number;
    declare stepJson: string;
    declare createdBy: number;
}

RichTextStep.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        snapshotId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stepIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stepJson: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize: ORM,
        modelName: "RichTextStep",
    }
);














