const mongoose = require('mongoose');

const TemplateSettings = new mongoose.Schema({
    templateFor: {
        type: String
    },
    title: {
        type: String
    },
    subject: {
        type: String
    },
    html: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('templatesetting', TemplateSettings);