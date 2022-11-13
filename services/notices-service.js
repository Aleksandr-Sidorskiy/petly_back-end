const { Notice } = require("../db/notices-model");
const User = require("../db/user-model");
const path = require("path");
const fs = require("fs").promises;
const resizeAvatar = require("../helpers/resize-avatar");

const getByCategory = async (category, skip, limit) => {
  try {
    const data = await Notice.find({ category })
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit);
    return data;
  } catch (error) {
    return error;
  }
};

const getById = async (id) => {
  try {
    const data = await Notice.find({ _id: id });
    return data;
  } catch (error) {
    return error;
  }
};

const getFavorite = async (_id) => {
  try {
    const [data] = await User.find({ _id }, { myFavorite: 1 }).populate({
      path: "myFavorite",
      fields: { myFavorite: 1 },
    });

    return data;
  } catch (error) {
    return error;
  }
};

const addToFavorite = async (_id, noticeId) => {
  try {
    const data = await User.findByIdAndUpdate(
      { _id },
      { $addToSet: { myFavorite: noticeId } },
      {
        fields: { myFavorite: 1 },
        new: true,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const removeFromFavorite = async (_id, noticeId) => {
  try {
    const data = await User.findByIdAndUpdate(
      { _id },
      { $pull: { myFavorite: noticeId } },
      {
        fields: { myFavorite: 1 },
        new: true,
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

const createNotice = async (notice) => {
  try {
    const newAvatarPath = path.resolve(
      `./public/avatars/avatar-${new Date().getTime().toString()}.png`
    );

    await resizeAvatar(notice.petImageUrl);
    await fs.rename(notice.petImageUrl, newAvatarPath);

    notice.petImageUrl = newAvatarPath;
    const data = await Notice.create({ ...notice });

    return data;
  } catch (error) {
    await fs.unlink(notice.petImageUrl);
    return error.message;
  }
};

const getUserNotices = async (_id) => {
  try {
    const data = await Notice.find({ owner: _id });
    return data;
  } catch (error) {
    return error;
  }
};

const removeUserNotice = async (owner, id) => {
  try {
    const data = await Notice.deleteOne({ _id: id, owner });
    return data;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getByCategory,
  getById,
  addToFavorite,
  getFavorite,
  removeFromFavorite,
  createNotice,
  getUserNotices,
  removeUserNotice,
};
