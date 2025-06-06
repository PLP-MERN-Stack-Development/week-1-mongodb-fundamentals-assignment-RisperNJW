db.books.find({ genre: "Fiction" })

db.books.find({ published_year: { $gt: 2000 } })

db.books.find({ author: "George Orwell" })

db.books.updateOne(
    { title: "1984" },
    { $set: { price: 15.99 } }
)

db.books.deleteOne({ title: "The Catcher in the Rye" })
 
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

db.books.find({}, { title: 1, author: 1, price: 1 })

db.books.find().sort({ price: 1 })

db.books.find().sort({ price: -1 })

db.books.find().limit(5)

db.books.find().skip(5).limit(5)

db.books.aggregate([
    { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

db.books.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
])

db.books.aggregate([
    {
        $group: {
            _id: {
                $concat: [
                    { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
                    "s"
                ]
            },
            count: { $sum: 1 }
        }
    }
])

db.books.createIndex({ title: 1 })

db.books.createIndex({ author: 1, published_year: -1 })

db.books.find({ title: "1984" }).explain("executionStats")
