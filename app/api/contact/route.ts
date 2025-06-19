import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate request body
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create Resend client at runtime
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    // Send the email
    const { data, error } = await resend.emails.send({
      // Use your verified domain or keep the default for testing
      from: "Portfolio Contact <onboarding@resend.dev>", // Change this to your domain when verified
      to: ["pathansahil1800@gmail.com"], // Your email where you want to receive messages
      subject: `🚀 New Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 20px;">
          <!-- Header -->
          <div style="background: rgba(255,255,255,0.95); padding: 40px 30px; border-radius: 15px; text-align: center; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 30px;">📧</span>
            </div>
            <h1 style="color: #1f2937; margin: 0; font-size: 28px; font-weight: 700;">New Portfolio Contact!</h1>
            <p style="color: #6b7280; margin: 10px 0 0; font-size: 16px;">Someone is interested in your work</p>
          </div>
          
          <!-- Content -->
          <div style="background: rgba(255,255,255,0.95); padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <!-- Contact Info -->
            <div style="margin-bottom: 25px; padding: 20px; background: linear-gradient(135deg, #f3f4f6, #e5e7eb); border-radius: 12px; border-left: 5px solid #3b82f6;">
              <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px; display: flex; align-items: center;">
                <span style="margin-right: 10px;">👤</span> Contact Information
              </h3>
              <p style="margin: 8px 0; color: #374151; font-size: 16px;">
                <strong>Name:</strong> <span style="color: #3b82f6; font-weight: 600;">${name}</span>
              </p>
              <p style="margin: 8px 0; color: #374151; font-size: 16px;">
                <strong>Email:</strong> 
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-weight: 600; padding: 4px 8px; background: rgba(59, 130, 246, 0.1); border-radius: 6px;">${email}</a>
              </p>
            </div>
            
            <!-- Message -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px; display: flex; align-items: center;">
                <span style="margin-right: 10px;">💬</span> Message
              </h3>
              <div style="background: linear-gradient(135deg, #f8fafc, #f1f5f9); padding: 20px; border-radius: 12px; border-left: 5px solid #10b981; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
                <p style="margin: 0; color: #374151; line-height: 1.7; font-size: 16px; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div style="text-align: center; margin: 30px 0; padding: 20px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 12px;">
              <p style="margin: 0 0 15px; color: #92400e; font-weight: 600; font-size: 16px;">
                🎯 Quick Actions
              </p>
              <a href="mailto:${email}?subject=Re: Portfolio Inquiry&body=Hi ${name},%0D%0A%0D%0AThank you for reaching out! " 
                 style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 0 10px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                📧 Reply Now
              </a>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 2px solid #e5e7eb; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                <span style="margin-right: 8px;">🌟</span>
                This message was sent from your portfolio contact form
                <span style="margin-left: 8px;">🌟</span>
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0;">
                Sent on ${new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        {
          error: "Failed to send email. Please try again or contact me directly.",
        },
        { status: 500 },
      )
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json(
      {
        message: "Message sent successfully! I'll get back to you soon.",
      },
      { status: 200 },
    )
  } catch (err) {
    console.error("Contact form error:", err)
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    )
  }
}
