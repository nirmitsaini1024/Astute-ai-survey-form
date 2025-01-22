import { NextResponse } from "next/server"
import dbConnect from "../../../lib/mongodb"
import BusinessForm from "../../../lib/models/BusinessForm"

export async function POST(req: Request) {
  try {
    await dbConnect()
    const formData = await req.json()
    const newBusinessForm = new BusinessForm(formData)
    await newBusinessForm.save()
    return NextResponse.json({ message: "Form submitted successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error submitting form:", error)
    return NextResponse.json({ error: "Error submitting form" }, { status: 500 })
  }
}

