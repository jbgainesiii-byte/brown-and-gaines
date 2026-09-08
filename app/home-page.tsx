"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, ArrowDown, Menu } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InquiryDialog } from "@/components/inquiry-dialog";
import { SocialLinks } from "@/components/social-links";
import { Brand } from "@/components/site-brand";

const examples = [
  {id:"offer",tab:"A new offer",title:"An idea is ready.\nThe business behind it isn’t.",intro:"An established service business wants to introduce a new offer. Before building a website or adding another tool, the offer itself needs to stand up.",decision:"Who is it for? What will they pay for? Ryan works through the positioning, pricing logic, and delivery plan.",build:"Johnny connects the buying, onboarding, and delivery experience, so the team has a practical way to run the offer.",measure:"Paid demand, the cost of delivery, and what customers tell us. Use those signals to decide what happens next."},
  {id:"sales",tab:"More consistent sales",title:"Interest is coming in.\nCustomers aren’t following.",intro:"A business receives inquiries through calls, messages, and its website. Too many conversations end without a clear next step.",decision:"Examine the offer, the sales conversation, and where prospects hesitate. Define what a qualified inquiry needs next.",build:"Bring inquiries into one process, assign responsibility, and connect qualification, proposals, and follow-up.",measure:"Track inquiry-to-sale conversion and the points where people drop out. Review whether the new process changes either."},
  {id:"venue",tab:"A fuller room",title:"A great space.\nA quiet Tuesday.",intro:"A café or bar wants a recurring reason for the right people to visit. A full room only matters if it also makes commercial sense.",decision:"Ryan shapes a program around the audience, the venue, and a trading period that needs attention.",build:"Put registration, reminders, event operations, and permission-based follow-up in place around the experience.",measure:"Attendance, spending, repeat visits, and the contribution after event costs. Give the venue a reason to run it again."},
];

export default function HomePage() {
  const [menuOpen,setMenuOpen]=useState(false);
  const [contactOpen,setContactOpen]=useState(false);
  const [interest,setInterest]=useState("Not sure yet");
  const [essayOpen,setEssayOpen]=useState(false);
  const [privacyOpen,setPrivacyOpen]=useState(false);
  const [requestId,setRequestId]=useState("");
  function contact(topic="Not sure yet") {if(topic!=="Founder events"&&topic!=="Venue programming"){window.location.assign("/start");return;}setMenuOpen(false);setInterest(topic);setRequestId(crypto.randomUUID());setContactOpen(true)}
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div id="top" />
    <header className="site-header">
      <div className="header-inner"><Brand />
        <nav className="desktop-nav" aria-label="Main navigation"><a href="#expertise">Our expertise</a><a href="/in-practice/crm">In practice</a><a href="/events">Events</a><a href="/our-firm">Our firm</a></nav>
        <button className="header-contact" onClick={()=>contact()}>Start a conversation <ArrowUpRight size={17}/></button>
        <button className="menu-button" aria-label="Open navigation" onClick={()=>setMenuOpen(true)}><Menu size={25}/></button>
      </div>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-inner container">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line"/>Business strategy & implementation</p>
            <h1 id="hero-heading">Build what<br/>your business<br/><em>needs next.</em></h1>
            <p className="hero-description">The decisions. The systems. The people.<br/>We bring them together to move your business forward.</p>
            <button className="button button-white" onClick={()=>contact()}>Discuss your business <ArrowUpRight size={19}/></button>
            <p className="hero-location">Founded in Detroit. Built around your business.</p>
          </div>
          <div className="hero-art">
            <img src="/images/architecture.webp" alt="Sculptural concrete stairway beside a cobalt blue wall, rising into the light" width="1024" height="1280" fetchPriority="high"/>
            <div className="art-caption"><span>A considered foundation.<br/>Room for what comes next.</span><span className="art-mark" aria-hidden="true">B<span>&</span>G</span></div>
          </div>
        </div>
        <div className="hero-bottom container"><a href="#expertise">Explore Brown & Gaines <ArrowDown size={16}/></a><span>Strategy. Applied AI. Human connection.</span></div>
      </section>

      <section className="intro-section container" id="expertise" aria-labelledby="expertise-heading">
        <div className="section-top"><p className="eyebrow">Our expertise</p></div>
        <div className="intro-heading"><h2 id="expertise-heading">Your ambition deserves<br/>a way to happen.</h2><p>A new offer. A better customer experience. A business that can grow beyond the owner’s daily involvement.<br/><br/>We work with you to decide what needs to change, build what it requires, and put it into practice.</p></div>
        <div className="expertise-grid">
          <article className="expertise-item"><span className="item-number">01</span><h3>Business<br/>strategy</h3><p>Get clear on what you’re building and how it will work. Business plans, offer development, and coaching grounded in the decisions in front of you.</p><button className="text-link" onClick={()=>contact("Business strategy")}>Find your direction <ArrowUpRight size={18}/></button></article>
          <article className="expertise-item"><span className="item-number">02</span><h3>AI &<br/>systems</h3><p>Put the right tools behind the plan. Custom workflows, websites, and applied AI designed around how your business and your people actually work.</p><button className="text-link" onClick={()=>contact("AI & systems")}>Put your plan to work <ArrowUpRight size={18}/></button></article>
          <article className="expertise-item"><span className="item-number">03</span><h3>Events &<br/>programming</h3><p>Ryan Brown & Company is our product for curated gatherings, recurring formats, and commissioned programming for venues and organizations.</p><a className="text-link" href="#gather">Bring people together <ArrowUpRight size={18}/></a></article>
        </div>
      </section>

      <section className="case-feature"><div className="container case-feature-grid"><div><p className="eyebrow">In practice · Illustrative example</p><h2>The next job may already<br/>be in your pipeline.</h2><p>See how a clearer follow-up process could turn more quotes into booked work—and whether the numbers justify the investment.</p><a className="button button-blue" href="/in-practice/crm">Explore the example →</a></div><div className="case-feature-preview"><span className="eyebrow">The question worth asking</span><p>20 quotes.<br/>5 booked jobs.<br/><em>What would one more mean?</em></p><span>Explore the CRM and adjustable ROI model.</span></div></div></section>
<section className="perspective-section" aria-labelledby="perspective-heading"><div className="container perspective-inner">
        <div className="perspective-meta"><p className="eyebrow">The Brown & Gaines perspective</p><span>ON BUSINESS & AI</span></div>
        <div className="perspective-copy"><h2 id="perspective-heading">AI amplifies<br/>what’s already there.</h2><p>Apply it to the wrong process and you get worse results faster. That’s why our work starts with the business decision.</p><button className="text-link light-link" onClick={()=>setEssayOpen(true)}>Read our point of view <ArrowRight size={19}/></button></div>
        <span className="perspective-ampersand" aria-hidden="true">&</span>
      </div></section>

      <section id="work" className="work-section container" aria-labelledby="work-heading">
        <div className="section-top"><p className="eyebrow">Inside the work</p></div>
        <div className="work-heading"><h2 id="work-heading">A business problem.<br/>A considered response.</h2><p>See how strategy and implementation come together in a Brown & Gaines engagement.</p></div>
        <Tabs defaultValue="offer" className="work-tabs">
          <TabsList className="example-tabs" aria-label="Explore example engagements">{examples.map(x=><TabsTrigger key={x.id} className="example-trigger" value={x.id}>{x.tab}</TabsTrigger>)}</TabsList>
          {examples.map(x=><TabsContent key={x.id} value={x.id} className="example-content"><div className="example-story"><p className="eyebrow">Illustrative engagement</p><h3>{x.title.split("\n").map((l,i)=><span key={l}>{l}{i===0&&<br/>}</span>)}</h3><p>{x.intro}</p><span className="example-note">An example of our approach, not a client case study.</span></div><div className="example-steps"><div><span>01</span><article><h4>The decision</h4><p>{x.decision}</p></article></div><div><span>02</span><article><h4>The build</h4><p>{x.build}</p></article></div><div><span>03</span><article><h4>The evidence</h4><p>{x.measure}</p></article></div></div></TabsContent>)}
        </Tabs>
      </section>

      <section className="gather-section" id="gather" aria-labelledby="gather-heading">
        <div className="gather-photo"><img src="/images/founder-dinner.webp" alt="An intimate dinner setting with founders in lively conversation" width="1536" height="1024" loading="lazy"/><span className="photo-note">The spirit of gathering · Concept imagery</span></div>
        <div className="gather-copy"><p className="eyebrow">Ryan Brown & Company · A Brown & Gaines product</p><h2 id="gather-heading">Good things<br/>happen in<br/><em>the right room.</em></h2><p>A table of founders. A workshop that gets practical. A neighborhood venue with a new reason to visit.</p><p>Ryan Brown & Company packages those experiences into rooms people want to enter—and reasons to return.</p><div className="gather-links"><a className="text-link light-link" href="/events">View upcoming events <ArrowUpRight size={19}/></a><button className="text-link light-link" onClick={()=>contact("Venue programming")}>Bring a program to your venue <ArrowUpRight size={19}/></button></div></div>
      </section>

      <section className="firm-section container" id="firm" aria-labelledby="firm-heading">
        <div className="section-top"><p className="eyebrow">The firm</p></div>
        <div className="firm-layout"><div><h2 id="firm-heading">Two perspectives.<br/>One shared<br/><em>commitment.</em></h2><p className="firm-intro">A business plan should change how a business runs. A new system should serve the people using it. That belief brings Brown & Gaines together.</p><a className="text-link firm-page-link" href="/our-firm">Meet the partnership →</a></div>
        <div className="founders"><article><figure className="home-founder-photo"><img src="/images/ryan-brown.png" width="1122" height="1402" alt="Ryan Brown, co-founder of Brown & Gaines" loading="lazy"/></figure><div className="founder-top"><span className="founder-initial" aria-hidden="true">RB</span><span className="eyebrow">Co-founder</span></div><h3>Ryan Brown</h3><p className="founder-role">Business strategy & coaching</p><p>Ryan leads the business decisions: the plan, the offer, and the work of helping owners and teams put change into practice. She also leads Ryan Brown & Company, the firm’s events and venue-programming product.</p></article><article><figure className="home-founder-photo"><img src="/images/johnny-gaines.png" width="1122" height="1402" alt="Johnny B. Gaines III, co-founder of Brown & Gaines" loading="lazy"/></figure><div className="founder-top"><span className="founder-initial" aria-hidden="true">JG</span><span className="eyebrow">Co-founder</span></div><h3>Johnny B. Gaines III</h3><p className="founder-role">Applied AI & systems</p><p>Johnny builds the systems behind the strategy, connecting tools, workflows, and customer experiences around the way each business needs to operate.</p></article></div></div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading"><div className="container contact-inner"><div><p className="eyebrow">Let’s begin with your business</p><h2 id="contact-heading">What needs<br/>to happen next?</h2></div><div><p>You don’t need a finished brief.<br/>Tell us what you’re working toward<br/>and where you’re getting stuck.</p><button className="button button-white" onClick={()=>contact()}>Discuss your business <ArrowUpRight size={19}/></button></div></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-top"><Brand large/><div><span className="eyebrow">Business strategy & implementation</span><p>Detroit, Michigan</p></div><a href="#top" className="back-top">Back to top <ArrowUpRight size={17}/></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Brown & Gaines</span><SocialLinks/><button onClick={()=>setPrivacyOpen(true)}>Privacy & inquiries</button></div></footer>

    <Sheet open={menuOpen} onOpenChange={setMenuOpen}><SheetContent className="mobile-sheet"><SheetTitle className="sheet-brand">Brown & Gaines</SheetTitle><SheetDescription>Business strategy & implementation</SheetDescription><nav aria-label="Mobile navigation">{[["Our expertise","expertise"],["In practice","/in-practice/crm"],["Events","/events"],["Our firm","/our-firm"]].map(([name,id])=><a key={id} href={id.startsWith("/")?id:`#${id}`} onClick={()=>setMenuOpen(false)}>{name}<ArrowUpRight size={19}/></a>)}</nav><button className="button button-blue" onClick={()=>contact()}>Start a conversation <ArrowUpRight size={19}/></button></SheetContent></Sheet>

    <InquiryDialog key={requestId} open={contactOpen} onOpenChange={setContactOpen} initialInterest={interest} requestId={requestId}/>

    <Dialog open={essayOpen} onOpenChange={setEssayOpen}><DialogContent className="essay-dialog"><p className="eyebrow">The Brown & Gaines perspective</p><DialogTitle>AI amplifies what’s already there.</DialogTitle><DialogDescription>Our approach to business strategy and applied AI.</DialogDescription><div className="essay-body"><p className="essay-lead">Before asking what AI can do, ask what the business needs to do differently.</p><p>A business can respond to inquiries instantly and still lose the sale. It can produce a polished proposal for an offer that isn’t clear. It can generate more work than the team can deliver.</p><p>Speed makes those problems more visible. It doesn’t resolve them.</p><h3>Start with the decision.</h3><p>Who is the customer? What are they buying? What should happen after they express interest? Who is responsible for the next step? These are business decisions. They need answers before they need software.</p><h3>Build around the people.</h3><p>A system becomes useful when it fits the work, has a clear owner, and handles the situations people encounter. That includes knowing when a person should take over. The team needs to understand it and be able to question it.</p><h3>Make the change observable.</h3><p>Agree on what improvement would look like before building. Then look for evidence: whether customers take the next step, whether the team uses the process, and whether the economics make sense.</p><p>At Brown & Gaines, we bring strategy and implementation into the same conversation. We use AI where it earns its place.</p></div><button className="button button-blue" onClick={()=>{setEssayOpen(false);contact("AI & systems")}}>Discuss your business <ArrowUpRight size={19}/></button></DialogContent></Dialog>

    <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}><DialogContent className="privacy-dialog"><DialogTitle>Privacy & inquiries</DialogTitle><DialogDescription>How this website handles the information you provide.</DialogDescription><div className="essay-body"><p>The inquiry form collects your name, email address, business name, area of interest, and message. Brown & Gaines stores those details to review your request and respond.</p><p>Submitting an inquiry does not subscribe you to a newsletter or event mailing list. No payment information is requested.</p><p>Please do not submit passwords, financial account details, health information, or confidential client material. To request a correction or deletion, send an inquiry with your reference number and describe your request.</p></div></DialogContent></Dialog>
  </>;
}
