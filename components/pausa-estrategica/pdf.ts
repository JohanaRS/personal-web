import { addPageFooters, C, clean, createBrandDocument, eyebrow, type Writer } from "../pausa/pdf-kit"
import { NEXT_STEP_FIELDS, REPORT_TITLE, SIGNATURE_NAME, SIGNATURE_ROLE, SITE_LABEL } from "./content"
import { filled, longDate, momentById, pdfFileName, priorityItem, type Answers } from "./state"

function section(w: Writer, title: string, value: string) {
  w.ensure(60)
  w.rule()
  w.gap(18)
  w.text(title.toUpperCase(), { style: "bold", size: 9, lineHeight: 13, color: C.oliva })
  w.gap(6)
  w.text(clean(value), { size: 11.5, lineHeight: 17 })
  w.gap(18)
}

export async function downloadPausaEstrategicaPdf(answers: Answers, date = new Date()) {
  const w = await createBrandDocument({
    title: REPORT_TITLE,
    subject: "Pausa estratégica: decidí qué merece tu foco hoy",
    author: SIGNATURE_NAME,
    creator: SITE_LABEL,
  })
  const doc = w.doc
  const moment = momentById(answers.moment)
  const priority = priorityItem(answers)

  eyebrow(w, "PAUSA ESTRATÉGICA · FOCO")
  w.gap(14)
  w.text(REPORT_TITLE, { family: "Fraunces", size: 30, lineHeight: 36 })
  w.gap(4)
  w.text(`${longDate(date)}${moment ? ` · ${moment.label}` : ""}`, { size: 10.5, lineHeight: 15 })
  w.gap(22)

  w.text(NEXT_STEP_FIELDS.nextStep.label.toUpperCase(), { style: "bold", size: 9, lineHeight: 13 })
  w.gap(6)
  w.text(clean(answers.nextStep), { family: "Fraunces", size: 17, lineHeight: 24, fill: C.salvia, padding: 18 })
  w.gap(12)
  if (filled(answers.when)) {
    w.text(NEXT_STEP_FIELDS.when.label.toUpperCase(), { style: "bold", size: 9, lineHeight: 13 })
    w.gap(6)
    w.text(clean(answers.when), { size: 12, lineHeight: 18 })
    w.gap(22)
  }

  if (priority) section(w, "Mi prioridad", priority.text)
  if (filled(answers.why)) section(w, NEXT_STEP_FIELDS.why.label, answers.why)
  if (filled(answers.fitVersion)) section(w, "La versión que cabe hoy", answers.fitVersion)
  if (filled(answers.later)) section(w, NEXT_STEP_FIELDS.later.label, answers.later)

  w.ensure(110)
  w.rule()
  w.gap(26)
  w.text("Con foco y criterio propio,", { size: 10.5, lineHeight: 16 })
  w.gap(4)
  w.text(SIGNATURE_NAME, { family: "Fraunces", size: 20, lineHeight: 26 })
  w.text(SIGNATURE_ROLE, { size: 9.5, lineHeight: 14 })

  addPageFooters(doc, `${SIGNATURE_NAME} · ${SITE_LABEL}`)
  doc.save(pdfFileName(date))
}
