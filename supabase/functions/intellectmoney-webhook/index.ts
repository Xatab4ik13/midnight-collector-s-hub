import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse form data from IntellectMoney callback
    const formData = await req.formData();
    
    const eshopId = formData.get('eshopId');
    const orderId = formData.get('orderId');
    const serviceName = formData.get('serviceName');
    const recipientAmount = formData.get('recipientAmount');
    const recipientCurrency = formData.get('recipientCurrency');
    const paymentStatus = formData.get('paymentStatus');
    const userName = formData.get('userName');
    const userEmail = formData.get('userEmail');
    const hash = formData.get('hash');

    console.log('IntellectMoney callback received:', {
      eshopId,
      orderId,
      paymentStatus,
      recipientAmount,
      userName,
      userEmail,
    });

    // Verify the payment status
    if (paymentStatus === '5' || paymentStatus === '3') {
      // Payment successful (5 = completed, 3 = paid)
      console.log('Payment successful for order:', orderId);

      // Send notification to Telegram
      const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
      const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        const message = `
✅ <b>Оплата получена!</b>

🆔 <b>Заказ:</b> ${orderId}
💰 <b>Сумма:</b> ${recipientAmount} ${recipientCurrency}
👤 <b>Имя:</b> ${userName || 'Не указано'}
📧 <b>Email:</b> ${userEmail || 'Не указано'}
📦 <b>Услуга:</b> ${serviceName || 'Предзаказ'}
        `.trim();

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
          }),
        });
      }

      return new Response('OK', { status: 200, headers: corsHeaders });
    } else {
      console.log('Payment not successful, status:', paymentStatus);
      return new Response('OK', { status: 200, headers: corsHeaders });
    }
  } catch (error) {
    console.error('Error processing IntellectMoney webhook:', error);
    return new Response('Error', { status: 500, headers: corsHeaders });
  }
});
