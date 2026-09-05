export type NetlifyFormValue = string | number | null | undefined;

export async function submitNetlifyForm(
  formName: string,
  fields: Record<string, NetlifyFormValue>,
) {
  const body = new URLSearchParams({ "form-name": formName });

  for (const [name, value] of Object.entries(fields)) {
    body.set(name, value == null ? "" : String(value));
  }

  const response = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error("We couldn’t save your information. Please try again.");
  }
}
