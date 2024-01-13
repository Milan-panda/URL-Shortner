const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  urlId: { type: mongoose.Schema.Types.ObjectId, ref: 'Url', required: true },
  timestamps: [{ type: Date, default: Date.now }],
  userAgent: String,
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
