import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    emial: {
      type: String,
      unique: [true, "Emial already exist"],
      required: [true, "Emial is required"],
    },
    username: {
      type: String,
      required: [true, "User name is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
