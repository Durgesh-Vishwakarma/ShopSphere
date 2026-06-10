const getPayPalBaseUrl = () => {
  if (process.env.PAYPAL_API_BASE_URL) {
    return process.env.PAYPAL_API_BASE_URL;
  }

  return process.env.NODE_ENV === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
};

const getPayPalCredentials = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const appSecret = process.env.PAYPAL_APP_SECRET || process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !appSecret) {
    throw new Error('PayPal credentials are not configured on the server');
  }

  return { clientId, appSecret };
};

const getPayPalAccessToken = async () => {
  const { clientId, appSecret } = getPayPalCredentials();
  const baseUrl = getPayPalBaseUrl();
  const auth = Buffer.from(`${clientId}:${appSecret}`).toString('base64');

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Unable to authenticate with PayPal');
  }

  const data = await response.json();
  return data.access_token;
};

export const verifyPayPalOrder = async (orderId) => {
  if (!orderId) {
    throw new Error('PayPal order id is required');
  }

  const accessToken = await getPayPalAccessToken();
  const baseUrl = getPayPalBaseUrl();

  const response = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Unable to verify PayPal order');
  }

  const data = await response.json();
  const capture = data?.purchase_units?.[0]?.payments?.captures?.[0];

  return {
    verified: data.status === 'COMPLETED',
    status: data.status,
    updateTime: data.update_time || null,
    payerEmail: data?.payer?.email_address || null,
    amount: capture?.amount?.value ? Number(capture.amount.value) : null,
  };
};
