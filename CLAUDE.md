# Somerset Window Cleaning Customer Response System

## Overview
AI-powered customer service system that generates professional responses to customer inquiries using Somerset Window Cleaning's business context, scheduling data, and service information.

## System Architecture

### Technology Stack
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with Somerset brand colors
- **AI Provider**: Anthropic Claude 3 Sonnet
- **Deployment**: Vercel (optimized for serverless)
- **Version Control**: GitHub
- **Database**: JSON file storage (upgradeable to PostgreSQL)

### Key Features
1. **Smart Message Processing** - Paste customer emails/messages for AI analysis
2. **Context-Aware Responses** - Uses Somerset business rules and current availability
3. **Confidence Scoring** - AI reliability indicator for each response
4. **Copy-to-Clipboard** - Easy response copying for team use
5. **Feedback System** - Continuous improvement through team input
6. **Business Context Integration** - Service areas, scheduling, and policies

## Business Context Configuration

### Service Areas
- Bath, Bristol, Keynsham, Saltford
- Paulton, Midsomer Norton, Radstock, Peasedown St John
- Timsbury, Farmborough, High Littleton, Clutton
- Temple Cloud, Chew Valley, Pensford, Whitchurch
- Compton Dando, Marksbury

### Services Offered
- Window Cleaning (residential/commercial)
- Gutter Cleaning & Maintenance
- Pressure Washing (driveways/patios)
- Conservatory Cleaning
- Solar Panel Cleaning
- Commercial Contract Cleaning

### Scheduling Intelligence
- Monday-Friday: 8am-5pm operations
- Saturday: Available for larger jobs
- Sunday: Closed
- Weather-dependent rescheduling policy
- Area rotation based on efficiency

## File Structure

### Core Components
```
app/
├── components/
│   ├── MessageInput.tsx       # Customer message input form
│   └── ResponseDisplay.tsx    # AI response with feedback system
├── lib/
│   ├── business-context.ts    # Somerset business rules & data
│   └── schedule-data.ts       # Availability and scheduling logic
├── api/
│   ├── ai/generate-response/  # Anthropic Claude integration
│   └── feedback/              # Response quality tracking
└── types/
    └── index.ts              # TypeScript interfaces
```

### Configuration Files
- `vercel.json` - Deployment configuration for Vercel
- `tailwind.config.js` - Somerset brand colors & styling
- `.env.example` - Environment variable template

## API Integration

### Anthropic Claude Configuration
```typescript
model: 'claude-3-sonnet-20240229'
max_tokens: 1000
temperature: 0.7 (balanced creativity/consistency)
```

### Business Context Prompt
The system uses a comprehensive prompt that includes:
- Current Somerset service areas and offerings
- Real-time scheduling availability
- Company policies and contact information
- Professional tone guidelines
- UK business compliance standards

### Response Quality Metrics
- **Confidence Scoring**: 0.0-1.0 based on business context match
- **Service Area Recognition**: Automatic area detection
- **Schedule Integration**: Available dates included when relevant
- **Contact Information**: Proper Somerset details included

## Deployment Process

### Vercel Deployment Steps
1. **GitHub Integration**: Connect repository to Vercel
2. **Environment Variables**: Set ANTHROPIC_API_KEY in dashboard
3. **Automatic Deployments**: Push to main branch triggers deployment
4. **Custom Domain**: Configure somerset-responses.vercel.app

### Environment Variables Required
```bash
ANTHROPIC_API_KEY=your_claude_api_key
NEXTAUTH_SECRET=random_secret_for_sessions
NODE_ENV=production
```

## Usage Instructions

### For Somerset Team Members
1. **Access System**: Navigate to deployed URL
2. **Input Customer Message**: Paste email or message content
3. **Add Customer Email**: Optional for better context
4. **Generate Response**: Click to process with AI
5. **Review & Copy**: Check confidence, copy response
6. **Provide Feedback**: Rate response quality for improvements

### Response Quality Guidelines
- **High Confidence (80%+)**: Ready to use directly
- **Medium Confidence (60-79%)**: Review and potentially edit
- **Low Confidence (<60%)**: Manual review required

### Feedback System
- **Good**: Response is accurate and professional
- **Needs Improvement**: Issues with accuracy or tone
- **Custom Feedback**: Specific suggestions for enhancement

## Continuous Improvement

### Learning System
- Response feedback collected in `data/feedback.json`
- Confidence patterns analyzed for prompt optimization
- Business context updates based on team input
- Regular review of low-confidence responses

### System Updates
All improvements automatically documented in this CLAUDE.md file:
- New service areas or offerings
- Schedule pattern changes
- Response template improvements
- API configuration updates

## Integration with Existing Somerset Systems

### Current System Compatibility
- **Receipt Management**: Can reference customer history
- **Website Data**: Uses current service information
- **Email System**: Compatible with Gmail forwarding
- **Scheduling**: Integrates with existing calendar systems

### Future Enhancements
- Direct Gmail integration for automatic processing
- Customer database connection for personalization
- Calendar API integration for real-time availability
- Advanced analytics dashboard for response metrics

## Security & Data Management

### Data Handling
- Customer messages processed in memory only
- No permanent storage of customer personal data
- Feedback data stored locally for system improvement
- GDPR compliance for UK customer data

### API Security
- Environment variables for sensitive keys
- HTTPS enforcement in production
- Rate limiting on AI endpoints
- Input validation and sanitization

## Support & Maintenance

### Regular Maintenance Tasks
- Monthly review of feedback data
- Quarterly business context updates
- Annual service area and pricing reviews
- Continuous prompt optimization based on feedback

### Troubleshooting
- **Low Response Quality**: Check business context accuracy
- **API Errors**: Verify Anthropic API key and quotas
- **Deployment Issues**: Check Vercel configuration and logs
- **Feedback Problems**: Verify file system permissions

## Cost Analysis

### Estimated Monthly Costs
- **Anthropic Claude API**: £10-30 (based on usage)
- **Vercel Hosting**: Free tier (sufficient for team use)
- **Total**: £10-30/month for comprehensive AI customer service

### ROI Considerations
- Time saved on response generation: 5-10 minutes per inquiry
- Consistency across team responses
- Professional quality assurance
- Customer satisfaction improvement

## Development Commands

### Local Development
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint checks
```

### Deployment
```bash
git add .
git commit -m "Update customer response system"
git push origin main  # Auto-deploys to Vercel
```

## Change Log

### Version 1.0.0 (Initial Release)
- ✅ Core message processing functionality
- ✅ Anthropic Claude 3 Sonnet integration
- ✅ Somerset business context integration
- ✅ Feedback system for continuous improvement
- ✅ Vercel deployment configuration
- ✅ Responsive design with Somerset branding
- ✅ TypeScript implementation for code reliability
- ✅ Comprehensive error handling and fallbacks

### Planned Updates
- [ ] Gmail integration for direct email processing
- [ ] Advanced analytics dashboard
- [ ] Customer database integration
- [ ] Multi-language support for international inquiries
- [ ] Mobile app for field team use

This system represents a significant advancement in Somerset Window Cleaning's customer service capabilities, providing consistent, professional, and context-aware responses while saving valuable time for the team.