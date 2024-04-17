import mongoose from "mongoose";

const GGdUserSchema = new mongoose.Schema({
	username: {
		type: mongoose.Schema.Types.String,
		unique: true,
	},
	gg_id: {
		type: mongoose.Schema.Types.String,
		required: true,
		unique: true,
	},
});

export const GGdUser = mongoose.model("GGdUser", GGdUserSchema);