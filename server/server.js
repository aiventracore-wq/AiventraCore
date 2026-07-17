require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const contactRoute = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Security configuration
app.use(helmet());
app.use(cors({
  origin: '*', // Dynamic cross-origin mapping
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic API healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Mount routes
app.use('/api/contact', contactRoute);

// Catch all errors
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]:', err);
  res.status(500).json({
    success: false,
    message: 'A critical unhandled server exception occurred.'
  });
});

// Launch listener
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`-------------------------------------------------`);
    console.log(` AiventraCore Backend service active on port ${PORT}`);
    console.log(` Running mode: ${process.env.NODE_ENV || 'production'}`);
    console.log(`-------------------------------------------------`);
  });
}

module.exports = app;

