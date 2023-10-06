import Product from "../models/ProductModel.js";
import path from "path";

export const getProduct = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.maessage);
  }
};

export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.maessage);
  }
};

export const saveProduct = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No file uploaded" });

  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const extension = path.extname(file.name);
  const fileName = file.md5 + extension;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg", ".gif"];

  if (!allowedType.includes(extension.toLowerCase()))
    return res.status(400).json({ msg: "File type not allowed" });

  if (fileSize > 5_000_000)
    return res.status(400).json({ msg: "Image must be less then 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });

    try {
      await Product.create({
        name,
        image: fileName,
        url,
      });
      res.status(201).json({ msg: "Image uploaded successfully" });
    } catch (error) {
      console.log(error.maessage);
    }
  });
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};
