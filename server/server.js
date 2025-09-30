require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const mailRoutes = require('./routes/mailRoutes');

const app = express();

// ✅ Trust proxy for Render (required for express-rate-limit behind proxy)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// ✅ Security middleware
app.use(helmet());

app.use(cors({
  origin: '*',
  methods: ['POST', 'OPTIONS']
}));

// ✅ Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// ✅ Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ✅ Mail route
app.use('/api/mail', mailRoutes);

// ✅ Debug route to check IP forwarding
app.get('/debug/ip', (req, res) => {
  res.json({
    ip: req.ip,
    ips: req.ips,
    xForwardedFor: req.headers['x-forwarded-for'] || null
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
