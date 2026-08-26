import { z } from "zod";

const phonePattern = /^(?:(?:\+|00)(?:31|32)|0)[\s().-]*[1-9](?:[\s().-]*\d){7,9}$/;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Vul minimaal 2 tekens in."),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Vul een geldig Nederlands of Belgisch nummer in."),
  email: z.string().trim().email("Vul een geldig e-mailadres in."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Toestemming is vereist." }),
  }),
  utm_source: z.string().trim().max(200).optional().default(""),
  utm_campaign: z.string().trim().max(200).optional().default(""),
  utm_medium: z.string().trim().max(200).optional().default(""),
  fbclid: z.string().trim().max(500).optional().default(""),
});

export type LeadInput = z.infer<typeof leadSchema>;