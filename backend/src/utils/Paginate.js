const asyncHandler = require("express-async-handler");

const paginate = asyncHandler(
  async (model, searchQuery, page = 1, limit = 10, populateFields = []) => {
    const query = model
      .find()
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (searchQuery && typeof searchQuery === "string") {
      query.find({
        $text: {
          $search: searchQuery,
          $caseSensitive: false,
          $diacriticSensitive: false,
        },
      });
    }

    if (populateFields.length) {
      query.populate(populateFields);
    }

    const data = await query.exec();

    const totalCount = await model.countDocuments().exec();
    const totalPages = Math.ceil(totalCount / parseInt(limit));

    return {
      data: data,
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: page,
    };
  }
);

module.exports = {
  paginate: paginate,
};
