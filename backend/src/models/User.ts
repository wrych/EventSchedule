import { DataTypes, Model } from "sequelize";
import ORM from "../data/ORM.js";

interface UserAttributes {
  id?: number;
  email: string;
  emailVerified?: boolean;
  oAuthId?: string;
  oAuthProvider?: string;
  familyName?: string;
  givenName?: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  declare id: number;
  declare email: string;
  declare emailVerified: boolean;
  declare oAuthId: string;
  declare oAuthProvider: string;
  declare familyName: string;
  declare givenName: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
    },
    oAuthId: {
      type: DataTypes.TEXT,
      unique: true,
    },
    oAuthProvider: {
      type: DataTypes.TEXT,
    },
    familyName: {
      type: DataTypes.TEXT,
    },
    givenName: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: ORM,
    modelName: "User",
  }
);

export default User;
