import { addPageFooters, C, clean, createBrandDocument, eyebrow } from "./pdf-kit"
import {
  DISCLAIMER,
  PENDING_LABEL,
  QUESTIONS,
  REPORT_SECTIONS,
  REPORT_TITLE,
  SIGNATURE_NAME,
  SIGNATURE_ROLE,
  SITE_LABEL,
  USE_MODES,
} from "./content"
import { filled, isPending, longDate, pdfFileName, type PausaAnswers } from "./state"

function useModeLabel(answers: PausaAnswers) {
  return USE_MODES.find((mode) => mode.id === answers.useMode)?.label ?? ""
}

export async function downloadPausaPdf(answers: PausaAnswers, date = new Date()) {
  const w = await createBrandDocument({
    title: REPORT_TITLE,
    subject: "PAUSA: una pausa estratégica para usar IA con criterio propio",
    author: SIGNATURE_NAME,
    creator: SITE_LABEL,
  })
  const doc = w.doc

  eyebrow(w, "PAUSA · IA CON CRITERIO PROPIO")
  w.gap(14)
  w.text(REPORT_TITLE, { family: "Fraunces", size: 30, lineHeight: 36 })
  w.gap(4)
  w.text(longDate(date), { size: 10.5, lineHeight: 15 })
  w.gap(18)

  w.text("La tarea", { style: "bold", size: 9, lineHeight: 13, color: C.oliva })
  w.gap(4)
  w.text(clean(answers.task) || PENDING_LABEL, {
    family: "Fraunces",
    size: 15,
    lineHeight: 21,
    color: filled(answers.task) ? C.carbon : C.arcilla,
  })
  w.gap(20)

  w.text("MI PRÓXIMO PASO", { style: "bold", size: 9, lineHeight: 13, color: C.carbon })
  w.gap(6)
  const nextStep = clean(answers.nextStep) || PENDING_LABEL
  const detail = clean(answers.nextStepDetail)
  w.text(detail ? `${nextStep}\n\n${detail}` : nextStep, {
    family: "Fraunces",
    size: 15,
    lineHeight: 22,
    fill: C.salvia,
    padding: 20,
  })
  w.gap(28)

  for (const section of REPORT_SECTIONS) {
    w.ensure(90)
    w.rule()
    w.gap(22)
    w.text(section.title, { family: "Fraunces", size: 18, lineHeight: 24 })
    w.gap(10)
    for (const id of section.ids) {
      const step = QUESTIONS.find((q) => q.id === id)
      if (!step) continue
      w.ensure(70)
      w.text(`${step.letter} · ${step.name.toUpperCase()} · ${step.moment.toUpperCase()}`, {
        style: "bold",
        size: 8.5,
        lineHeight: 12,
        color: C.oliva,
      })
      w.gap(2)
      w.text(step.question, { style: "bold", size: 11, lineHeight: 16 })
      w.gap(4)
      if (id === "uso" && answers.useMode) {
        w.text(`Elegí avanzar: ${useModeLabel(answers).toLowerCase()}.`, { size: 10.5, lineHeight: 16 })
        w.gap(2)
      }
      const pending = isPending(answers, id)
      const pendingNote = pending && filled(answers[id]) ? `${PENDING_LABEL}\n\nNota previa: ${clean(answers[id])}` : null
      w.text(pending ? (pendingNote ?? PENDING_LABEL) : clean(answers[id]), {
        size: 10.5,
        lineHeight: 16,
        color: pending ? C.arcilla : C.carbon,
        style: pending && !pendingNote ? "bold" : "normal",
      })
      w.gap(16)
    }
  }

  w.ensure(140)
  w.gap(6)
  w.rule()
  w.gap(26)
  w.text("Con criterio propio,", { size: 10.5, lineHeight: 16 })
  w.gap(4)
  w.text(SIGNATURE_NAME, { family: "Fraunces", size: 20, lineHeight: 26 })
  w.text(SIGNATURE_ROLE, { size: 9.5, lineHeight: 14, color: C.carbon })
  w.gap(18)
  w.text(DISCLAIMER, { size: 8.5, lineHeight: 12.5 })

  addPageFooters(doc, `${SIGNATURE_NAME} · ${SITE_LABEL}`)

  doc.save(pdfFileName(date))
}
