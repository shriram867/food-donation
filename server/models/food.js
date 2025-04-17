import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },
    foodTag: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v > 0;
            },
            message: props => `${props.value} is not a valid quantity! Quantity must be greater than 0`
        }
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'pending', 'claimed'],
        default: 'available'
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    requestDate: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveryDate: {
        type: Date
    }
}, { timestamps: true });

// Middleware to remove food items with zero quantity
foodSchema.pre('save', function(next) {
    if (this.quantity <= 0) {
        this.remove();
    }
    next();
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
