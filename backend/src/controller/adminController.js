import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";
import cloudinary from "../lib/cloudinary.js";

//upload to cloudinary func
const uploadToCloudinary = async (file) => {
  try {
    //in express-filupload, tempFilePath = location on disk file stored
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadtoCLoudinary", error);
    throw new Error("Error uploadingtoCLoudinary"); //throw err to catch it in main func
  }
};

//next for fast error handling
export const createSong = async (req, res, next) => {
  //req.files is created by fileupload library
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    //save audio and img to cloudinary
    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    //update album is song belongs to an album
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json(song);
  } catch (error) {
    console.log("Error in createSong", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params; //get id from req param (fetch url)

    const song = await Song.findById(id);

    //if song belongs to album -> update album song arrays
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    //delete song
    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted sucesfully" });
  } catch (error) {
    console.log("Error in deleteSong", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;
    const imageUrl = await uploadToCloudinary(imageFile); //from file location to permanent URL

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();
    res.status(201).json(album);
  } catch (error) {
    console.log("Error in createAlbum", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id }); //delete songs with album id
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    console.log("Error in deleteAlbum", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
