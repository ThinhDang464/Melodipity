import { Album } from "../models/albumModel.js";
export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find({}); //fetch all albums
    res.status(200).json(albums);
  } catch (error) {
    console.log("Error in getAllAlbums", error);
    next(error);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params; //get id from req param (fetch url)
    const album = await Album.findById(albumId).populate("songs"); //fetch album by id and populate songs
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.status(200).json(album);
  } catch (error) {
    console.log("Error in getAlbumById", error);
    next(error);
  }
};
