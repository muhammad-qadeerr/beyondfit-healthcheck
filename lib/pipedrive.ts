import type { LeadInput } from "@/lib/leadSchema";

type PipedriveResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

function getConfig() {
  const apiToken = process.env.PIPEDRIVE_API_TOKEN;
  const companyDomain = process.env.PIPEDRIVE_COMPANY_DOMAIN;

  if (!apiToken || !companyDomain) {
    throw new Error("Pipedrive configuration is incomplete");
  }

  const normalizedDomain = companyDomain
    .replace(/^https?:\/\//, "")
    .replace(/\.pipedrive\.com.*$/, "")
    .replace(/\/$/, "");

  return {
    baseUrl: `https://${normalizedDomain}.pipedrive.com/api/v1`,
    apiToken,
  };
}

async function request<T>(path: string, body: unknown): Promise<T> {
  const { baseUrl, apiToken } = getConfig();
  const response = await fetch(
    `${baseUrl}${path}?api_token=${encodeURIComponent(apiToken)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );
  const result = (await response.json()) as PipedriveResponse<T>;

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.error || `Pipedrive request failed (${response.status})`);
  }

  return result.data;
}

function customFields(input: LeadInput) {
  const mappings = [
    [process.env.PIPEDRIVE_LEAD_CUSTOM_FIELD_UTM_SOURCE, input.utm_source],
    [process.env.PIPEDRIVE_LEAD_CUSTOM_FIELD_UTM_CAMPAIGN, input.utm_campaign],
    [process.env.PIPEDRIVE_LEAD_CUSTOM_FIELD_UTM_MEDIUM, input.utm_medium],
    [process.env.PIPEDRIVE_LEAD_CUSTOM_FIELD_FBCLID, input.fbclid],
  ];

  return Object.fromEntries(
    mappings.filter((entry): entry is [string, string] => Boolean(entry[0] && entry[1])),
  );
}

export async function createPipedriveLead(input: LeadInput) {
  const person = await request<{ id: number }>("/persons", {
    name: input.name,
    phone: [{ value: input.phone, primary: true }],
    email: [{ value: input.email, primary: true }],
  });

  return request<{ id: string }>("/leads", {
    title: `Health Check - ${input.name}`,
    person_id: person.id,
    custom_fields: customFields(input),
  });
}