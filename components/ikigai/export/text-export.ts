import {
  BRAND_LINE,
  CLOSING_FIELDS,
  CLOSING_MESSAGE,
  COMPASS,
  DIMENSIONS,
  INTERSECTIONS,
  intersectionFieldId,
  NEXT_STEP_FIELDS,
  PURPOSE_FIELD,
  SITE_LABEL,
  type Field,
} from "../content"
import { exportFileName, longDate, parseKeywords, personName, sessionDate, type Answers } from "../state"
import { downloadBlob } from "./assets"

const answerOf = (answers: Answers, id: string) => (answers[id] ?? "").trim() || "_Sin respuesta_"

function qa(answers: Answers, field: Field) {
  return `**${field.label}**\n\n${answerOf(answers, field.id)}\n`
}

export function buildMarkdown(answers: Answers) {
  const name = personName(answers)
  const out: string[] = []
  out.push(`# Mi Ikigai profesional${name ? ` — ${name}` : ""}`)
  out.push(`${longDate(sessionDate(answers))} · ${BRAND_LINE} · ${SITE_LABEL}\n`)

  out.push("## 1. Mis cuatro dimensiones\n")
  for (const d of DIMENSIONS) {
    out.push(`### ${d.name}\n`)
    out.push(`_${d.intro}_\n`)
    d.questions.forEach((q) => out.push(qa(answers, q)))
    const kws = parseKeywords(answers[d.keywords.id])
    out.push(`**${d.keywords.label}:** ${kws.length ? kws.join(", ") : "_Sin respuesta_"}\n`)
  }

  out.push("## 2. Mis intersecciones\n")
  for (const i of INTERSECTIONS) {
    out.push(`### ${i.name} (${i.formula})\n`)
    out.push(qa(answers, { id: intersectionFieldId(i.id), label: i.question }))
  }

  out.push("## 3. Mi propósito profesional\n")
  out.push(`> ${answerOf(answers, PURPOSE_FIELD.id).replace(/\n/g, "\n> ")}\n`)

  out.push("## 4. Mi brújula profesional\n")
  for (const c of COMPASS) {
    out.push(`### ${c.title}\n`)
    c.fields.forEach((f) => out.push(qa(answers, f)))
  }

  out.push("## 5. Reflexiones y próximos pasos\n")
  CLOSING_FIELDS.forEach((f) => out.push(qa(answers, f)))
  out.push(qa(answers, NEXT_STEP_FIELDS.step))
  out.push(`**${NEXT_STEP_FIELDS.date.label}:** ${answerOf(answers, NEXT_STEP_FIELDS.date.id)}\n`)

  out.push("---\n")
  out.push(`_${CLOSING_MESSAGE}_`)
  return out.join("\n")
}

export async function copyAllAnswers(answers: Answers) {
  await navigator.clipboard.writeText(buildMarkdown(answers))
}

export function downloadMarkdown(answers: Answers) {
  const blob = new Blob([buildMarkdown(answers)], { type: "text/markdown;charset=utf-8" })
  downloadBlob(blob, exportFileName(answers, "report", "md").replace("reporte-", "respuestas-"))
}
