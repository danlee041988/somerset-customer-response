# Somerset Customer Response System

AI-powered customer service system for Somerset Window Cleaning that generates professional responses to customer inquiries using business context and scheduling data.

## Quick Start

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd somerset-customer-response
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Anthropic API key to .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Environment Setup

### Required Environment Variables
- `ANTHROPIC_API_KEY`: Your Anthropic Claude API key
- `NEXTAUTH_SECRET`: Random secret for session handling

### Getting an Anthropic API Key
1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key
5. Add it to your `.env.local` file

## Features

- ✅ **Smart Message Processing**: Paste customer emails for AI analysis
- ✅ **Context-Aware Responses**: Uses Somerset business rules and availability
- ✅ **Confidence Scoring**: AI reliability indicator for each response
- ✅ **Copy-to-Clipboard**: Easy response copying for team use
- ✅ **Feedback System**: Continuous improvement through team input
- ✅ **Business Context Integration**: Service areas, scheduling, and policies

## Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial Somerset customer response system"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables in dashboard
   - Deploy automatically

3. **Set Environment Variables in Vercel**
   - `ANTHROPIC_API_KEY`: Your Claude API key
   - `NEXTAUTH_SECRET`: Random secret string

## Usage

1. **Access the System**: Navigate to your deployed URL
2. **Input Customer Message**: Paste the customer's email or message
3. **Optional Customer Email**: Add for better context
4. **Generate Response**: Click to process with AI
5. **Review & Copy**: Check confidence score and copy response
6. **Provide Feedback**: Rate response quality for continuous improvement

## System Architecture

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **AI Provider**: Anthropic Claude 3 Sonnet
- **Deployment**: Vercel serverless platform
- **Data Storage**: JSON files (upgradeable to database)

## Business Context

The system includes comprehensive Somerset Window Cleaning business data:
- Service areas across Somerset
- Available services and descriptions
- Current scheduling patterns
- Company policies and contact information
- Professional response templates

## Support

For technical support or questions about the system, refer to the detailed documentation in `CLAUDE.md` or contact the development team.

## License

This system is proprietary to Somerset Window Cleaning.