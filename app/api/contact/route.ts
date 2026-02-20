import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send email using a service
    // Option 1: Using Resend (recommended for Vercel)
    // You'll need to install: npm install resend
    // And set RESEND_API_KEY in your environment variables
    
    // For now, we'll use a simple approach with fetch to an email service
    // You can replace this with Resend, SendGrid, or any other email service
    
    const emailBody = `
New inquiry from AgentEX landing page:

Name: ${name}
Email: ${email}

Message:
${message}

---
This message was sent from the AgentEX domain inquiry form.
    `.trim()

    // Try to use Resend if available
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        await resend.emails.send({
          from: 'contact@agentex.com',
          to: 'nichedotsol@gmail.com',
          subject: `New Domain Inquiry from ${name}`,
          text: emailBody,
          replyTo: email,
        })
        
        return NextResponse.json(
          { message: 'Message sent successfully' },
          { status: 200 }
        )
      } catch (resendError) {
        console.error('Resend error:', resendError)
        // Fall through to logging
      }
    }

    // Fallback: Log the submission (for development/testing)
    // In production, make sure to set up an email service
    console.log('Contact form submission:', { name, email, message })
    console.log('Email body:', emailBody)
    console.log('⚠️  Email service not configured. Set RESEND_API_KEY to enable email sending.')

    // Return success even without email service (for development)
    // In production, you should configure an email service
    return NextResponse.json(
      { message: 'Message received (email service not configured)' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
