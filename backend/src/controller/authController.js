import { User } from "../models/userModel.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    //check if user areadye xist
    const user = await User.findOne({ clerkId: id }); //clerkid in db matches provided id from req body

    if (!user) {
      //save to db - signup
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
