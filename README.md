# Secrets of Flowers Site

## Live PayPal checkout

The frontend needs the live PayPal client id at build time:

```bash
VITE_PAYPAL_CLIENT_ID=your-live-paypal-client-id
VITE_FLOWERS_API_BASE=https://webdev-backends.onrender.com/flowers
```

Set these in the Vercel project environment variables, then redeploy the site.

The backend must also have live PayPal credentials configured on Render:

```bash
PAYPAL_MODE=live
PAYPAL_CLIENT_ID=your-live-paypal-client-id
PAYPAL_CLIENT_SECRET=your-live-paypal-secret
```

Booking emails are sent by the backend through Resend:

```bash
RESEND_API_KEY=your-resend-api-key
BOOKING_EMAIL_FROM=Secrets of Flowers <mairead@secretsofflowers.com>
SHOP_OWNER_EMAIL=mairead@secretsofflowers.com
```
