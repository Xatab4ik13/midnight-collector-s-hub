import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate hash for IntellectMoney
function generateHash(params: Record<string, string>, secretKey: string): string {
  const orderedKeys = [
    'eshopId',
    'orderId', 
    'serviceName',
    'recipientAmount',
    'recipientCurrency',
    'userName',
    'userEmail',
  ];

  const hashString = orderedKeys.map(key => params[key] || '').join('::') + '::' + secretKey;
  
  // MD5 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(hashString);
  return Array.from(new Uint8Array(data))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, amount, serviceName, userName, userEmail, userPhone, backUrl, resultUrl } = await req.json();

    const eshopId = Deno.env.get('INTELLECTMONEY_ESHOP_ID');
    const secretKey = Deno.env.get('INTELLECTMONEY_SECRET_KEY');

    if (!eshopId || !secretKey) {
      console.error('Missing IntellectMoney credentials');
      return new Response(
        JSON.stringify({ error: 'Payment configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Creating IntellectMoney payment:', { orderId, amount, userName, userEmail });

    // Build payment URL parameters
    const params = new URLSearchParams({
      eshopId: eshopId,
      orderId: orderId,
      serviceName: serviceName || 'Предзаказ WoW Midnight',
      recipientAmount: amount.toString(),
      recipientCurrency: 'RUB',
      userName: userName || '',
      userEmail: userEmail || '',
      userPhone: userPhone || '',
      backUrl: backUrl || 'https://wowmidnight.store/cart',
      resultUrl: resultUrl || `https://oyqheglwdvckgubhnuwt.supabase.co/functions/v1/intellectmoney-webhook`,
    });

    const paymentUrl = `https://merchant.intellectmoney.ru/ru/?${params.toString()}`;

    console.log('Payment URL generated:', paymentUrl);

    return new Response(
      JSON.stringify({ paymentUrl }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error creating IntellectMoney payment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
