import Product from "../models/product.js"
import ProductStat from "../models/productStat.js"
import Transaction from "../models/transaction.js"
import User from "../models/user.js"

export const client = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find()

            const productsWithStats = await Promise.all(
                products.map(async (product) => {
                    const stat = await ProductStat.find({
                        productId: product._id
                    })
                    return {
                        ...product._doc,
                        stat,
                    }
                })
            )
            res.status(200).json(productsWithStats)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    },
    getCustomers: async (req, res) => {
        try {
            const customers = await User.find({role: "user"}).select("-password")
            res.status(200).json(customers)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    getTransaction: async (req, res) => {
      try {
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
    
        // Function to generate the sort object
        function generateSort() {
          const sortParsed = JSON.parse(sort);
          const sortFormatted = {
            [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
          };
          return sortFormatted;
        }
    
        // Generate the sort object based on the sort parameter
        const sortFormatted = Boolean(sort) ? generateSort() : {};
    
        // Query the transactions
        const transactions = await Transaction.find({
          $or: [
            { cost: { $regex: new RegExp(search, "i") } },
            { userId: { $regex: new RegExp(search, "i") } },
          ],
        })
          .sort(sortFormatted)
          .skip(page * pageSize)
          .limit(pageSize * 1);
    
        // Get the total count of transactions
        const total = await Transaction.countDocuments({
          $or: [
            { cost: { $regex: new RegExp(search, "i") } },
            { userId: { $regex: new RegExp(search, "i") } },
          ]
        });
    
        // Send the response
        res.status(200).json({ transactions, total });
      } catch (error) {
        res.status(404).json({
          message: error.message,
        });
      }
    },
}
