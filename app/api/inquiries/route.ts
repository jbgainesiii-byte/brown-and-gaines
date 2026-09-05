import { z } from "zod";
import { saveInquiry } from "@/db/inquiries";
const payloadSchema=z.object({
  requestId:z.string().uuid(),
  source:z.enum(["website","event","referral","email","business-card"]).default("website"),
  intake:z.object({stage:z.enum(["Operating business","Launching an offer","Starting a business"]),outcome:z.string().trim().min(10).max(2000),priority:z.enum(["Offer and positioning","Sales and follow-up","Client delivery","Business operations","Not sure yet"]),timing:z.enum(["This month","Next 1–3 months","Exploring"]),budget:z.enum(["Under $2,500","$2,500–$5,000","$5,000–$10,000","$10,000+","Need guidance"])}).optional(),
  name:z.string().trim().min(1).max(120),
  email:z.string().trim().email().max(254),
  business:z.string().trim().min(1).max(180),
  interest:z.enum(["Business strategy","AI & systems","Venue programming","Founder events","Not sure yet"]),
  message:z.string().trim().min(10).max(4000),
  website:z.string().max(1000).optional(),
});
export async function POST(request:Request){
  const origin=request.headers.get("origin");
  if(origin && origin!==new URL(request.url).origin){return Response.json({error:"Please send your inquiry from the Brown & Gaines website."},{status:403})}
  if(!request.headers.get("content-type")?.includes("application/json")){return Response.json({error:"Please use the inquiry form."},{status:415})}
  const declaredLength=Number(request.headers.get("content-length")||0);
  if(declaredLength>25000)return Response.json({error:"Your message is too long. Please shorten it and try again."},{status:413});
  let raw;
  try {const body=await request.text();if(body.length>25000)return Response.json({error:"Your message is too long. Please shorten it and try again."},{status:413});raw=JSON.parse(body)}
  catch{return Response.json({error:"We couldn’t read your inquiry. Please try again."},{status:400})}
  const parsed=payloadSchema.safeParse(raw);
  if(!parsed.success)return Response.json({error:"Please complete every field, use a valid email address, and include at least 10 characters in your message."},{status:400});
  if(parsed.data.website)return Response.json({error:"We couldn’t accept this inquiry. Please try again."},{status:400});
  try {await saveInquiry(parsed.data);return Response.json({reference:"BG-"+parsed.data.requestId.slice(0,8).toUpperCase()},{status:201,headers:{"Cache-Control":"no-store"}})}
  catch(error){console.error("Inquiry persistence failed", error instanceof Error ? error.name : "UnknownError");return Response.json({error:"Your inquiry hasn’t been saved. Please try again in a moment. Your message is still in the form."},{status:503,headers:{"Cache-Control":"no-store"}})}
}
