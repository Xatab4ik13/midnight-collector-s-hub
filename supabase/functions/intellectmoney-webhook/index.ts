import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
    const paymentId = formData.get('paymentId'); // IntellectMoney's payment ID
    const hash = formData.get('hash');

    console.log('IntellectMoney callback received:', {
      eshopId,
      orderId,
      paymentId,
      paymentStatus,
      recipientAmount,
      userName,
      userEmail,
    });

    // Verify the payment status
    if (paymentStatus === '5' || paymentStatus === '3') {
      // Payment successful (5 = completed, 3 = paid)
      console.log('Payment successful for order:', orderId, 'IntellectMoney paymentId:', paymentId);

      // Send notification to Telegram
      const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
      const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

      if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
        const message = `
✅ <b>Оплата получена!</b>

🆔 <b>Заказ:</b> ${orderId}
🔖 <b>ID платежа IntellectMoney:</b> ${paymentId || 'Не указан'}
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

      // Send confirmation email to customer with IntellectMoney's order/payment ID
      if (userEmail) {
        const displayOrderId = paymentId || orderId; // Use IntellectMoney's paymentId if available
        
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="color: #d4af37; font-size: 28px; margin: 0; letter-spacing: 2px;">WoW MIDNIGHT</h1>
                <p style="color: #666; font-size: 14px; margin-top: 8px;">Коллекционное издание</p>
              </div>

              <!-- Main content -->
              <div style="background-color: #111118; border-radius: 16px; padding: 32px; border: 1px solid #222;">
                <h2 style="color: #fff; font-size: 22px; margin: 0 0 8px 0;">Спасибо за покупку${userName ? `, ${userName}` : ''}!</h2>
                <p style="color: #888; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                  Ваш платёж успешно получен. Ниже информация о вашем заказе.
                </p>
                
                <!-- Order number -->
                <div style="background-color: #1a1a0f; border: 1px solid #d4af3744; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
                  <p style="color: #888; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Номер заказа</p>
                  <p style="color: #d4af37; font-size: 20px; font-weight: bold; margin: 0; letter-spacing: 2px;">${displayOrderId}</p>
                </div>

                <!-- Order details -->
                <div style="background-color: #0a0a0f; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                  <h3 style="color: #d4af37; font-size: 16px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px;">Детали заказа</h3>
                  <table style="width: 100%; border-collapse: collapse; color: #fff;">
                    <tr>
                      <td style="padding: 12px; border-bottom: 1px solid #333; color: #888;">Товар</td>
                      <td style="padding: 12px; border-bottom: 1px solid #333; text-align: right;">${serviceName || 'Предзаказ WoW Midnight'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px; color: #888;">Сумма</td>
                      <td style="padding: 12px; text-align: right; color: #d4af37; font-weight: bold; font-size: 18px;">${recipientAmount} ${recipientCurrency}</td>
                    </tr>
                  </table>
                </div>

                <!-- Next steps -->
                <div style="background-color: #0a0a0f; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                  <h3 style="color: #fff; font-size: 16px; margin: 0 0 12px 0;">Что дальше?</h3>
                  <ul style="color: #888; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                    <li>Мы свяжемся с вами для подтверждения адреса доставки</li>
                    <li>Вы получили чек и номер заказа — сохраните его</li>
                  </ul>
                </div>

                <!-- Telegram button -->
                <div style="text-align: center;">
                  <a href="https://t.me/wowmidnighstore_bot" target="_blank" style="display: inline-block; background-color: #0088cc; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 500;">
                    📱 Связаться в Telegram
                  </a>
                </div>
              </div>

              <!-- Footer -->
              <div style="text-align: center; margin-top: 40px; color: #666; font-size: 12px;">
                <p style="margin: 0;">© 2025 wowmidnight.store</p>
              </div>
            </div>
          </body>
          </html>
        `;

        try {
          const emailResponse = await resend.emails.send({
            from: "WoW Midnight <orders@wowmidnight.store>",
            to: [userEmail as string],
            subject: `Заказ ${displayOrderId} — WoW Midnight`,
            html: emailHtml,
          });
          console.log('Confirmation email sent:', emailResponse);
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }
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
