const News = require("../db/news-model");

const getNews = async (skip, limit) => {
  try {
    const data = await News.find({}).skip(skip).limit(limit);
    return data;
  } catch (error) {
    return error;
  }
};

const searchNews = async (title) => {
  try {
    const data = await News.find({
      title: { $regex: title, $options: "i" },
    });

    return data;
  } catch (error) {
    return error;
  }
};

module.exports = { getNews, searchNews };
