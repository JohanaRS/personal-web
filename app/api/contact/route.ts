import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, reason, message } = await request.json()

    // Validate required fields
    if (!name || !email || !reason || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      )
    }

    // Send email using a simple fetch to a mail service
    // For now, we'll use Formspree as a simple solution
    const formspreeEndpoint = "https://formspree.io/f/xwpkvpvp" // Replace with actual endpoint
    
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        reason,
        message,
        _replyto: email,
        _subject: `Nuevo contacto de ${name}: ${reason}`,
      }),
    })

    if (!response.ok) {
      throw new Error("Error al enviar el mensaje")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    )
  }
}
