import express from 'express';
import dotenv from 'dotenv';
import { Connection } from '@solana/web3.js';
import cors from 'cors'; // Import CORS package

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize Solana connection
const solanaConnection = new Connection(process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com');

app.use(cors()); // Enable CORS
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to GeoChain API');
});

app.get('/api/solana-status', async (req, res) => {
  try {
    const blockHeight = await solanaConnection.getBlockHeight();
    res.json({ status: 'online', blockHeight });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to connect to Solana' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
