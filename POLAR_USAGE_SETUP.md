# Polar Usage-Based Billing Setup

This guide explains how to set up usage-based billing in Polar to track credit consumption for Homeify AI.

## Overview

Every time a user generates a floor plan, we:
1. Deduct credits from your database
2. Send an event to Polar with the event name `ai_generation`
3. Polar tracks this usage for billing purposes

## Setup Steps

### 1. Create a Meter in Polar Dashboard

1. Go to your [Polar Dashboard](https://polar.sh/dashboard)
2. Navigate to **Products** → **Meters**
3. Click **Create Meter**
4. Configure the meter:
   - **Name**: `AI Generation Credits`
   - **Event Name**: `ai_generation` (must match exactly!)
   - **Filter**: No additional filters needed
   - **Aggregation**: Sum the `credits_used` field
   - **Description**: "Tracks AI floor plan generation credit usage"

### 2. Create a Metered Price

1. Go to your Product in Polar Dashboard
2. Add a new price
3. Select **Metered Price**
4. Link it to your `AI Generation Credits` meter
5. Set your pricing:
   - Example: $0.10 per credit
   - Or: $10 for 100 credits

### 3. (Optional) Add Meter Credits Benefit

If you want to give customers included credits with their subscription:

1. Create a new **Benefit**
2. Select **Meter Credits**
3. Choose your `AI Generation Credits` meter
4. Set the number of units (e.g., 20 credits for Pro plan)
5. Attach this benefit to your Pro subscription product

## How It Works

### Event Structure

When a user generates a floor plan, we send this event to Polar:

```json
{
  "event": "ai_generation",
  "external_customer_id": "user_123",
  "metadata": {
    "credits_used": 1,
    "timestamp": "2025-01-15T10:30:00.000Z"
  }
}
```

### Implementation Details

**File**: `/lib/polar-usage.ts`
```typescript
export async function ingestCreditUsage(
  externalCustomerId: string,
  creditsUsed: number = 1
)
```

**Used in**: `/app/api/generate/route.ts`
- Called after successful generation
- Called in both development mode (dummy data) and production mode

### Database vs Polar

- **Your Database**: Tracks real-time credit balance for instant validation
- **Polar**: Tracks usage for billing and payment processing

This dual-tracking ensures:
- Users can't generate without credits (database check)
- You can bill based on actual usage (Polar tracking)
- Usage is auditable and matches billing

## Testing

1. Set `USE_DUMMY_DATA = true` in `/app/api/generate/route.ts`
2. Generate a floor plan
3. Check Polar Dashboard → Events to see the ingested event
4. Check your meter to see the aggregated usage

## Monitoring

### View Customer Usage

In your Polar Dashboard:
- **Events**: See all ingested events in real-time
- **Meters**: View aggregated usage per customer
- **Customer Portal**: Customers can view their own usage

### View in Your App

Use the Better Auth client:
```typescript
const { data: customerMeters } = await authClient.usage.meters.list();
```

This shows the customer their current usage and remaining balance.

## Troubleshooting

### Events not appearing in Polar

1. Check that the event name matches exactly: `ai_generation`
2. Verify your Polar access token is correct
3. Check server logs for Polar API errors

### Meter not aggregating

1. Ensure the meter filter matches your events
2. Verify you're summing the correct field: `credits_used`
3. Check the meter configuration in Polar Dashboard

### Usage not matching database

- Polar tracks billable usage
- Your database tracks remaining balance
- These are intentionally separate for real-time validation vs billing

## Production Checklist

Before going live:

- [ ] Set `USE_DUMMY_DATA = false` in generate API
- [ ] Create production meter in Polar Dashboard
- [ ] Set up metered pricing on your Pro product
- [ ] Test with a real subscription
- [ ] Verify events are ingesting correctly
- [ ] Confirm meter aggregation is working
- [ ] Test customer portal shows correct usage

## Environment Variables

Ensure these are set:

```env
POLAR_ACCESS_TOKEN=polar_xxx
POLAR_WEBHOOK_SECRET=whsec_xxx
POLAR_PRODUCT_ID=prod_xxx
```

## Support

For Polar-specific issues:
- [Polar Documentation](https://docs.polar.sh)
- [Polar GitHub](https://github.com/polarsource/polar)
- [Polar Discord](https://discord.gg/polar)

For Better Auth integration:
- [Better Auth Polar Plugin Docs](https://www.better-auth.com/docs/plugins/polar)
