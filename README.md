# Ethereum Wallet Clone

A modern, feature-rich Ethereum wallet application built with Next.js, TypeScript, and ethers.js. This project provides a user-friendly interface for managing Ethereum wallets, sending transactions, and viewing transaction history.

## Features

- 🚀 **Wallet Management**
  - Create new wallets
  - Import existing wallets using private keys
  - View wallet balances
  - Copy wallet addresses to clipboard

- 💸 **Transaction Features**
  - Send ETH to any address
  - View transaction history
  - Real-time balance updates
  - Transaction status tracking

- 🔒 **Security**
  - Private key encryption
  - Secure transaction signing
  - CSRF protection
  - Environment variable management

- 🧪 **Development Tools**
  - Ganache integration for local testing
  - Transaction testing interface
  - Error handling and logging
  - Responsive design

## Tech Stack

- **Frontend**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - React Hot Toast
  - ethers.js

- **Development**
  - Ganache (local Ethereum blockchain)
  - Docker
  - Jenkins (CI/CD)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Ganache (for local development)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wallet-clone.git
   cd wallet-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_GANACHE_URL=http://127.0.0.1:7545
   NEXT_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

4. Start Ganache:
   ```bash
   # Using Docker
   docker-compose -f docker-compose.ganache.yml up -d
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── lib/                # Library functions
├── stores/             # State management
├── services/           # API services
├── context/            # React context providers
├── hooks/              # Custom React hooks
└── tests/              # Test files
```

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

### Starting Production Server

```bash
npm start
```

## Docker Deployment

1. Build the Docker image:
   ```bash
   docker-compose build
   ```

2. Start the services:
   ```bash
   docker-compose up -d
   ```

## CI/CD with Jenkins

The project includes Jenkins configuration for continuous integration and deployment:

1. Start Jenkins:
   ```bash
   docker-compose -f docker-compose.jenkins.yml up -d
   ```

2. Access Jenkins at [http://localhost:8082](http://localhost:8082)

3. Default credentials:
   - Username: `admin`
   - Password: `admin`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [ethers.js](https://docs.ethers.org/) - Ethereum library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Ganache](https://trufflesuite.com/ganache/) - Local Ethereum blockchain 