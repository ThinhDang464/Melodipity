import { User } from "../models/userModel.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserClerkId = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserClerkId } }); //fetch all users except self
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getAllUsers", error);
    next(error);
  }
};
