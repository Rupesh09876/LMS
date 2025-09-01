import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const VerifyJWT = async (req, res, next) => {
    try {
        const token =
            req.header('Authorization')?.replace('Bearer ', '') ||
            req.cookies?.token

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decodedToken._id).select('-password')

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token. User not found.'
            })
        }

        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Authentication failed. Token is invalid or expired.'
        })
    }
}

const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden. You do not have permission to perform this action.'
            })
        }
        next()
    }
}

const isDeleted = () => {
    return (req, res, next) => {
        if (req.user.isDeleted) {
            return res.status(403).json({
                success: false,
                message: 'Account access denied. This user account has been deactivated.'
            })
        }
        next()
    }
}

export { VerifyJWT, checkRole, isDeleted }
