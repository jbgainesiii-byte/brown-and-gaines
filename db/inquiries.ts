import { env } from "cloudflare:workers";
export type Inquiry = {requestId:string;name:string;email:string;business:string;interest:string;message:string;source?:string;intake?:unknown};
export async function saveInquiry(item:Inquiry){
  if(!env.DB) throw new Error("Inquiry database unavailable");
  await env.DB.prepare("INSERT INTO inquiries (id, name, email, business, interest, message, source, intake_json, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', ?) ON CONFLICT(id) DO NOTHING")
    .bind(item.requestId,item.name,item.email,item.business,item.interest,item.message,item.source||"website",item.intake?JSON.stringify(item.intake):null,Date.now()).run();
}
