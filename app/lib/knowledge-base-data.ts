// Static knowledge base data for Somerset Window Cleaning
// This replaces file system operations for serverless compatibility

interface KnowledgeEntry {
  id: string
  category: string
  content: string
  timestamp: string
  version: number
}

export const knowledgeBaseData: KnowledgeEntry[] = [
  {
    id: "kb_1725898800_customer-data",
    category: "customer-service",
    content: `CUSTOMER INFORMATION COLLECTION:

Essential Information Required:
- Full name
- Complete address
- Email address
- Mobile phone number
- Postcode (required for text messages)
- Preferred notification method (email or mobile phone)

COMMUNICATION COST MANAGEMENT:
- Keep text message conversations SHORT due to cost
- Email has no additional cost - use freely for detailed communication
- Text messages MUST sign off with "Many thanks SWC" to keep costs down
- Prefer email for detailed quotes and explanations

UK SPELLING REQUIREMENTS:
- ALWAYS use UK spelling in all responses
- Examples: colour (not color), realise (not realize), centre (not center), organisation (not organization)
- Use UK terminology: postcode (not zip code), mobile (not cell phone), pavement (not sidewalk)
- Date format: DD/MM/YYYY or written as "1st January 2025"
- Currency: £ symbol, pounds sterling

GOOGLE REVIEWS:
- When customers give praise for work carried out, ALWAYS ask for Google review
- [Google review link to be added later]
- This is important for business growth and reputation`,
    timestamp: "2025-09-09T16:40:00Z",
    version: 1
  },
  {
    id: "kb_1725898900_services",
    category: "services",
    content: `SOMERSET WINDOW CLEANING SERVICES:

Window Cleaning:
- 4-weekly service (PREFERRED - better revenue)
- 8-weekly service
- 12-weekly service (charge more)
- One-off cleans (charge more than regular service)

Gutter Services - IMPORTANT: Two different services:
1. GUTTER CLEARING - Internal parts of gutters only
2. GUTTER AND FASCIA CLEANING - External parts of gutters, fascia, and soffit cleaning

CRITICAL: When customer mentions "gutter cleaning" - ALWAYS clarify which service they require as they are completely different services with different pricing.

Internal Window Cleaning:
- Try NOT to offer internal window cleaning
- Only offer if customer specifically requests it
- Can be done on customer request`,
    timestamp: "2025-09-09T16:40:00Z", 
    version: 1
  },
  {
    id: "kb_1725899000_pricing",
    category: "pricing",
    content: `PRICING GUIDELINES:

Property Assessment Required:
- Number of bedrooms
- Type of property (terraced, semi-detached, detached, etc.)
- Does property have conservatory?

IMPORTANT PRICING NOTES:
- Prices based on STANDARD property sizes
- If property is much bigger than expected, we reserve right to charge more
- Any price increases must be agreed with customer BEFOREHAND
- Never surprise customers with unexpected charges

Service Frequency Pricing:
- 4-weekly: Standard rates (preferred)
- 8-weekly: Standard rates
- 12-weekly: Charge MORE than standard
- One-off cleans: Charge MORE than regular service (significantly more)

Front-Only Service:
- When we can't access back (locked gates, dogs, etc.), we do front only
- Charge approximately 2/3 of full clean price
- Still need to travel to property so can't be free
- Ensure back windows done on next visit`,
    timestamp: "2025-09-09T16:40:00Z",
    version: 1
  },
  {
    id: "kb_1725899100_policies", 
    category: "policies",
    content: `SERVICE POLICIES:

WORK GUARANTEE (FOR COMPLAINT SITUATIONS ONLY):
- All work guaranteed for 48 HOURS
- If customer reports issues within 48 hours, we return to resolve
- DO NOT mention guarantee in initial customer quotes/communication
- Only mention when handling complaints or service issues

COMPLAINT HANDLING:
- ALWAYS apologise first
- Offer immediate solution
- Most common complaint: "You missed the back windows"
- THEN mention 48-hour guarantee policy

MISSED BACK WINDOWS - Common Reasons:
- Gate was locked
- Dog present in back garden
- Access issues
- Safety concerns

When backs are missed:
- Charge approximately 2/3 of full price for front-only service
- Explain why backs couldn't be done
- Guarantee backs will be done on next visit
- Better to collect some payment than return another day with no payment

INITIAL CUSTOMER COMMUNICATION:
- Focus on services, pricing, and scheduling
- Keep responses concise and sales-focused
- Do not over-complicate with policies unless relevant`,
    timestamp: "2025-09-09T16:40:00Z",
    version: 1
  },
  {
    id: "kb_1725899200_general",
    category: "general", 
    content: `GENERAL BUSINESS PRACTICES:

Customer Retention Strategy:
- Present 4-weekly and 8-weekly options neutrally
- DO NOT hard sell or push 4-weekly over 8-weekly
- Let customer choose what works for them
- Avoid saying "preferred option" or "better value" for 4-weekly
- Present both options professionally without bias

Service Quality Management:
- Always deliver on promises
- If access issues prevent full service, communicate clearly
- Maintain professional communication
- Address complaints promptly and professionally

Cost Management:
- Text messages cost money - keep them short
- Use email for detailed communication
- Standard text sign-off: "Many thanks SWC"

Reputation Management:
- Request Google reviews after praise
- Maintain high service standards
- Quick complaint resolution
- Professional communication always`,
    timestamp: "2025-09-09T16:40:00Z",
    version: 1
  },
  {
    id: "kb_1725899300_scheduling",
    category: "scheduling",
    content: `SOMERSET WINDOW CLEANING DETAILED SCHEDULING SYSTEM:

4-WEEK ROTATION CYCLE (2025 Pattern - Continues Forward):

WEEK 1 - NORTH:
- Monday: BS40, BS48, BS49, BS22, BS23, BS24, BS21 (Weston, Backwell, Blagdon, Yatton, Clevedon)
- Tuesday: BS25, BS29 (Banwell, Winscombe)
- Wednesday: BS26 (Axbridge)
- Thursday: BS26, BS27 (Axbridge, Cheddar)
- Friday: BS27 (Cheddar)

WEEK 2 - EAST:
- Monday: BA7, BA9, BA10, BA11, BA8 (Wincanton, Bruton, Castle Cary, Frome, Templecombe)
- Tuesday: BS39, BA3, BA4 (Paulton, Radstock, Shepton)
- Wednesday: BA5, BA4 (Shepton, Wells)
- Thursday: BA5 (Wells)
- Friday: BA5 (Wells)

WEEK 3 - SOUTH:
- Monday: TA18, TA19, TA20, BA22, TA17, TA12, TA13, TA14, DT9 (Yeovil, Ilminster, Chard, Crewkerne, Ilchester, Stoke-Sub-Hamdon, Martock, Sherbourne)
- Tuesday: TA10, TA11 (Langport, Somerton)
- Wednesday: TA10, TA11 (Langport, Somerton)
- Thursday: BA6 (Glastonbury)
- Friday: BA6 (Glastonbury)

WEEK 4 - WEST:
- Monday: TA7, TA6, TA2, TA3, TA9, TA8, TA1 (Bridgwater, Taunton, Mark, Highbridge)
- Tuesday: BS28 (Wedmore)
- Wednesday: BS28 (Wedmore)
- Thursday: BS28, BA6 (Wedmore, Meare only)
- Friday: BA16 (Street)

CUSTOMER COMMUNICATION GUIDELINES:
- DO NOT mention specific rotation names (North, East, South, West) to customers
- DO NOT provide specific timing or scheduling details unless absolutely necessary
- Keep scheduling responses general: "We service your area regularly"
- For 4-weekly customers: served every cycle
- For 8-weekly customers: served every 2nd cycle

SERVICE FREQUENCY OFFERING:
- ONLY offer 4-weekly and 8-weekly initially
- DO NOT mention 12-weekly or one-off unless customer specifically asks
- Present 4-weekly and 8-weekly options neutrally
- Only mention 12-weekly and one-off if customer brings them up

POSTCODE-TO-WEEK MATCHING (INTERNAL USE ONLY):
- BS20s, BS40s: Week 1 (North)
- BA3-BA11, BS39: Week 2 (East)  
- TA10-TA20, BA22, DT9, BA6: Week 3 (South)
- TA1-TA9, BS28, BA16: Week 4 (West)

NOTE FOR AI SYSTEM:
- Use postcode info internally but keep customer communication simple
- Avoid complex scheduling explanations
- Focus on service options and pricing questions
- Keep responses concise and sales-focused`,
    timestamp: "2025-09-09T16:45:00Z",
    version: 1
  }
]