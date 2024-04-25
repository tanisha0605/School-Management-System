import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["M", "F"],
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    contactDetails: {
        address: String,
        phoneNumber: String,
        email: String
    },
    feesPaid: {
        type: Number,
        default: 0 
    },
    class: {
        type: String   
    }  
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
