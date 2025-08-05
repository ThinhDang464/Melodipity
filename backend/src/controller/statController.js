import { Song } from "../models/songModel.js";
import { User } from "../models/userModel.js";
import { Album } from "../models/albumModel.js";
export const getStats = async (req, res, next) => {
  try {
    // const totalSongs = await Song.countDocuments(); //get num of songs
    // const totalUsers = await User.countDocuments(); //get num of users
    // const totalAlbums = await Album.countDocuments(); //get num of albums

    //optimised version to run in parallel await
    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),

        //uniqe artist
        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      totalSongs,
      totalUsers,
      totalAlbums,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    console.log("Error in getStats", error);
    next(error);
  }
};
