import Book from "../models/book.model.js";
import Borrow from "../models/borrow.model.js";
import User from "../models/user.model.js";
import mongoose from 'mongoose';

const borrowBook = async (req, res) => {
    try {
        const {bookId} = req.params
        if (!bookId) {
            return res.status(400).json({
                success: false,
                message: 'Borrow: Book ID is required.'
            })
        }

        const book = await Book.findById(bookId)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Borrow: Book not found with the provided ID.'
            })
        }

        const user = await User.findById(req.user?._id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Borrow: Unauthorized user.'
            })
        }

        const borrowLimit = await Borrow.find({userId: req.user._id, returnDate: null})
        if (borrowLimit.length >= 3) {
            return res.status(400).json({
                success: false,
                message: 'Borrow limit exceeded. A user cannot borrow more than 3 books at a time.'
            })
        }

        const bookBorrowedAlready = await Borrow.findOne({
            userId: user._id,
            bookId: book._id,
            isReturned: false,
            returnDate: null
        })

        if (bookBorrowedAlready && bookBorrowedAlready.isReturned === false) {
            return res.status(400).json({
                success: false,
                message: 'This book has already been borrowed by the user.'
            })
        }

        if (book.available > 0) {
            book.available -= 1
            book.rating += 0.5
            await book.save()
        } else {
            return res.status(400).json({
                success: false,
                message: 'This book is currently unavailable for borrowing.'
            })
        }
        const borrowDate = new Date()
        const borrow = new Borrow({
            bookId:book._id,
            userId:user._id,
            borrowDate: new Date(),
            returnDate: null,
            isReturned: false,
            dueDate : new Date(borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        })  
        await borrow.save()

        return res.status(200).json({
            success: true,
            message: 'Book borrowed successfully.',
            data: borrow
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server error occurred while borrowing the book.',
            error: err.message
        })
    }
}

const returnBook = async (req, res) => {
    try {
        const {borrowId} = req.params
        const returningBook = await Borrow.findById(borrowId)
        if (!returningBook) {
            return res.status(404).json({
                success: false,
                message: 'Return: Borrow record not found with the provided ID.'
            })
        }

        const book = await Book.findById(returningBook.bookId)
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Return: Book not found with the provided ID.'
            })
        }

        book.available += 1

        returningBook.returnDate = new Date()
        returningBook.isReturned = true

        await Promise.all([book.save(), returningBook.save()])

        return res.status(200).json({
            success: true,
            message: 'Book returned successfully.'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error occurred while returning the book.',
            error: err.message
        })
    }
}

const getBorrowBook = async(req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null
        let borrowedBook;
        if (limit) {
            borrowedBook = await Borrow.find().limit(limit)
        } else {
            borrowedBook = await Borrow.find()
        }
        return res.status(200).json({
            success: true,
            message: 'Borrowed books retrieved successfully.',
            data: borrowedBook
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error occurred while fetching borrowed books.',
            error: error
        })
    }

}

const getBorrowedBookDetails = async (req, res) => {
    try {
        const borrow = await Borrow.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {$unwind: '$user'},
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookId',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: '$book'
            }
        ])

        return res.status(200).json({
            success: true,
            message: 'Borrowed book details retrieved successfully.',
            data: borrow
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error occurred while retrieving borrowed book details.',
            error: error.message
        })
    }
}

const getBorrowedBookById = async (req, res) =>{
    try {
        const {userId} = req.params
        const borrowedBook = await Borrow.find({userId: userId})
        if (!borrowedBook) {
            return res.status(404).json({
                success: false,
                message: 'No borrowed books found for this user.'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Borrowed books retrieved successfully for the given user ID.',
            data: borrowedBook
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server error occurred while fetching borrowed books by user ID.',
            error: err
        })
    }
}

const getBorrowBookByUserID = async (req, res) => {
    try {
        const {userId} = req.params
        const borrow = await Borrow.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: 'bookId',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: '$book'
            },
            {
                $project:{
                    _id: 1,
                    bookId: 1,
                    userId: 1,
                    borrowDate: 1,
                    returnDate: 1,
                    isReturned: 1,
                    dueDate:1,
                    'book.title': 1,
                    'book.author': 1,
                    'book.rating': 1,
                    'book.bookImage': 1,
                    'book.description': 1,
                }
            }
        ])

        return res.status(200).json({
            success: true,
            message: 'Borrowed books retrieved successfully for the given user ID.',
            data: borrow
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server error occurred while retrieving borrowed books for the user.',
            error: err
        })
    }
}

const renewBook = async(req, res) => {
    try {
        const {id} = req.params
        const borrowDate = new Date()
        const borrowedBook = await Borrow.findByIdAndUpdate(
            id,
            {
                borrowDate: borrowDate,
                dueDate: new Date(borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000)
            }
        )

        if (!borrowedBook) {
            return res.status(404).json({
                success: false,
                message: 'Borrow record not found.'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Book renewed successfully.'
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Server error occurred while renewing the book.'
        })
    }
}
export { borrowBook, returnBook, getBorrowBook, getBorrowedBookDetails, getBorrowedBookById, getBorrowBookByUserID, renewBook }
