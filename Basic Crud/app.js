import mongoose from "mongoose"

mongoose
  .connect("mongodb://127.0.0.1:27017/sandbox", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected successfully..."))
  .catch((err) => console.log(err))

const Schema = mongoose.Schema

const productSchema = new Schema({
  type: String,
  itemName: String,
  features: [String],
  category: [categorySchema],
  manufacture_details: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Manufacturer",
  },
  skus: [
    {
      sku: String,
      price: {
        base: Number,
        currency: String,
      },
      discount: {},
      shipping_details: {
        weight: Number,
        width: Number,
        height: Number,
        depth: Number,
      },
      quantity: Number,
      options: {
        size: String,
        features: [String],
        colors: [String],
        image: String,
      },
    },
  ],
})

//collection creation
const Product = mongoose.model("Product", productSchema)
const Inventory = mongoose.model("Product", productSchema)
const Supplier = mongoose.model("Product", productSchema)
const Manufacturer = mongoose.model("Product", productSchema)
const Discount = mongoose.model("Product", productSchema)
const Promotion = mongoose.model("Product", productSchema)
const Shipper = mongoose.model("Product", productSchema)

// create document or insert
const data = new sandbox({
  item: "V Neck T-Shirt",
  features: ["Handmade", "Pakistan"],
  category: [{ mainCategory: "men", subCategory: "Tshirt" }],
  skus: [
    {
      sku: "BVNTSS", //Black V Nech tshirt small"
      price: {
        base: 10.88,
        currency: "USD",
      },
      quantity: 10,
      options: {
        size: "Small",
        colors: ["Black"],
        features: ["Jet Black Attraction", "Shines in Dark"],
        image: "/tshirt/BVNTSS",
      },
    },
    {
      sku: "BVNTSM", //Black V Nech tshirt medium"
      category: [{ mainCategory: "men", subCategory: "jeans" }],
      price: {
        base: 10.88,
        currency: "USD",
      },
      quantity: 10,
      options: {
        size: "Small",
        colors: ["Black"],
        features: ["Jet Black Attraction", "Shines in Dark"],
        image: "/tshirt/BVNTSM",
      },
    },
  ],
})

data.save()
