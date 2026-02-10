import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, reason, message } = await request.json()

    if (!name || !email || !reason || !message) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      )
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY is not set")
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      )
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Nuevo contacto desde joharios.com: ${reason}`,
        from_name: "Formulario joharios.com",
        name,
        email,
        reason,
        message,
        replyto: email,
      }),
    })

    const result = await response.json()

    if (!result.success) {
      console.error("Web3Forms error:", result)
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
