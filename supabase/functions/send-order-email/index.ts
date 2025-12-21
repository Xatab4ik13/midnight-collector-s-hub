import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  sendKeyEarly: boolean;
}

const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `WM-${timestamp}-${random}`;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerName, customerEmail, items, total, sendKeyEarly }: OrderEmailRequest = await req.json();

    const orderNumber = generateOrderNumber();
    console.log("Sending order confirmation email to:", customerEmail, "Order:", orderNumber);

    const itemsHtml = items
      .map(
        (item) =>
          `<tr>
            <td style="padding: 12px; border-bottom: 1px solid #333;">${item.name}</td>
            <td style="padding: 12px; border-bottom: 1px solid #333; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #333; text-align: right;">${(item.price * item.quantity).toLocaleString('ru-RU')} ₽</td>
          </tr>`
      )
      .join("");

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
            <h2 style="color: #fff; font-size: 22px; margin: 0 0 8px 0;">Спасибо за покупку, ${customerName}!</h2>
            <p style="color: #888; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
              Ваш платёж успешно получен. Ниже информация о вашем заказе.
            </p>
            
            <!-- Order number -->
            <div style="background-color: #1a1a0f; border: 1px solid #d4af3744; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 1px;">Номер заказа</p>
              <p style="color: #d4af37; font-size: 20px; font-weight: bold; margin: 0; letter-spacing: 2px;">${orderNumber}</p>
            </div>

            <!-- Order details -->
            <div style="background-color: #0a0a0f; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h3 style="color: #d4af37; font-size: 16px; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 1px;">Ваш заказ</h3>
              <table style="width: 100%; border-collapse: collapse; color: #fff;">
                <thead>
                  <tr>
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #333; color: #888; font-weight: 500;">Товар</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #333; color: #888; font-weight: 500;">Кол-во</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #333; color: #888; font-weight: 500;">Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 2px solid #333; text-align: right;">
                <span style="color: #888; font-size: 14px;">Итого: </span>
                <span style="color: #d4af37; font-size: 20px; font-weight: bold;">${total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            ${sendKeyEarly ? `
            <div style="background-color: #1a1a0f; border: 1px solid #d4af3744; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
              <p style="color: #d4af37; font-size: 14px; margin: 0;">
                🔑 Вы выбрали опцию "Вскрыть коробку и отправить ключ раньше"
              </p>
            </div>
            ` : ''}

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

    const emailResponse = await resend.emails.send({
      from: "WoW Midnight <orders@wowmidnight.store>",
      to: [customerEmail],
      subject: `Заказ ${orderNumber} — WoW Midnight`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse, orderNumber }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
