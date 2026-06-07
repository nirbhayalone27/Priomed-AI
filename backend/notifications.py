import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

def send_whatsapp_alert(sample_id, sample_type, risk_score):
    try:
        sid = os.getenv("TWILIO_ACCOUNT_SID")
        token = os.getenv("TWILIO_AUTH_TOKEN")
        
        if not sid or not token or sid == "tera_twilio_sid_yahan_daal":
            print("⚠️ Twilio credentials missing in .env - Skipping actual WhatsApp send.")
            return

        client = Client(sid, token)
        message = client.messages.create(
            from_=f'whatsapp:{os.getenv("TWILIO_FROM_NUMBER")}',
            body=f"🚨 *PRIOMED AI CRITICAL ALERT* 🚨\n\nSample ID: {sample_id}\nType: {sample_type}\nAI Risk Score: {risk_score}/100\n\nProcess this sample IMMEDIATELY!",
            to=f'whatsapp:{os.getenv("TARGET_WHATSAPP_NUMBER")}'
        )
        print(f"✅ Real WhatsApp Sent! Message SID: {message.sid}")
    except Exception as e:
        print(f"❌ Twilio API Error: {e}")
