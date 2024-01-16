import userModel from "../schema.js";
import errorHandle from "../error/error.js";

export const Home = (req, res) => {
  res.json({ message: "App is running" });
};

export const Upload = (req, res, next) => {
  const baseUrl = `${req.protocol}://${req.get("host")}`;
  try {
    res.json({
      success: true,
      image_url: `${baseUrl}/images/${req.file.filename}`,
    });
  } catch (error) {
    if(error.name =="TypeError"){
      return next(new errorHandle("No image file selected. Please choose an image to upload.", 400));
    }
    return next(error)
  }
};

export const Allproduct = async (req, res, next) => {
  try {
    const all = await userModel.find({});
    res.json(all);
  } catch (error) {
    return next(error);
  }
};
export const Addproduct = async (req, res, next) => {
  const { name, image, category, new_price, old_price, date, avilable } =
    req.body;

  if (!name || !image || !category || !new_price || !old_price) {
    return next(new errorHandle("Please fill full form!", 400));
  }
  try {
    const all = await userModel.find({});
    let id = all.length > 0 ? all.slice(-1)[0].id + 1 : 1;
    await userModel.create({
      id,
      name,
      image,
      category,
      new_price,
      old_price,
      date,
      avilable,
    });
    res.status(201).json({
      success: true,
      message: `${name} add successfully!`,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      const ValidationError = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new errorHandle(ValidationError.join(", "), 400));
    }
    return next(error);
  }
};
export const Updateproduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, image, category, new_price, old_price } = req.body;
  try {
    const Findone = await userModel.findOne({ id: id });
    if (!Findone) {
      return next(new errorHandle("Product not found", 404));
    }
    await userModel.findOneAndUpdate(
      { id: id },
      {
        name: name || Findone.name,
        image: image || Findone.image,
        category: category || Findone.category,
        new_price: new_price || Findone.new_price,
        old_price: old_price || Findone.old_price,
      }
    );
    res.status(200).json({
      success: true,
      message: `Update successfully!`,
    });
  } catch (error) {
    return next(error);
  }
};
export const Delproduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const Findone = await userModel.findOneAndDelete({ id: id });
    return !Findone
      ? next(new errorHandle("Product not found", 404))
      : res.status(200).json({
          success: true,
          message: `${Findone.name} deleted successfully!`,
        });
  } catch (error) {
    return next(error);
  }
};
