import { Song } from "../models/songModel.js";
export const getAllSongs = async (req, res, next) => {
  try {
    //-1 = descending
    const songs = await Song.find({}).sort({ createdAt: -1 }); //fetch all songs sorted by creation date
    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in getAllSongs", error);
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  //get random music when refresh page - real app would need some machine learning logic
  try {
    //fetch 6 random songs
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        //limit fields
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in getFeaturedSongs", error);
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    //fetch 4 random songs
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        //limit fields
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in getMadeForYouSongs", error);
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    //fetch 4 random songs
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        //limit fields
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log("Error in getTrendingSongs", error);
    next(error);
  }
};
