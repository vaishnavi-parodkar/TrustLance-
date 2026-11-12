// Supabase Edge Function: ai-orchestrator
// Handles AI agreement generation, deliverable verification, change classification, schedule recovery, and dispute resolution
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { action, payload } = await req.json();
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY") || "";
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";

    let systemPrompt = "";
    let userPrompt = "";

    switch (action) {
      case "generate_agreement":
        systemPrompt = `You are the TRUSTLANCE Agreement Architect. Extract structured project milestones, duration, deliverables, acceptance criteria, and contractual terms from the user's project description. Return valid JSON only.`;
        userPrompt = `Project Description: ${payload.description}\nBudget: $${payload.budget}\nRequested Duration: ${payload.durationDays} days`;
        break;

      case "verify_deliverable":
        systemPrompt = `You are the TRUSTLANCE Deliverable Auditor. Compare submitted evidence against the original milestone acceptance criteria. Never hallucinate inaccessible links. Return valid JSON only with completed, partial, missing criteria, observations, potential issues, and advisory status.`;
        userPrompt = `Milestone: ${JSON.stringify(payload.milestone)}\nCriteria: ${JSON.stringify(payload.criteria)}\nEvidence: ${JSON.stringify(payload.evidence)}`;
        break;

      case "classify_change_request":
        systemPrompt = `You are the TRUSTLANCE Scope Sentinel. Classify client change requests into: in_scope_correction, new_scope, client_review_delay, or unclear_disputed. Estimate cost and schedule impact if new scope. Return valid JSON only.`;
        userPrompt = `Original Agreement: ${JSON.stringify(payload.agreement)}\nChange Request: ${payload.requestText}`;
        break;

      case "schedule_recovery":
        systemPrompt = `You are the TRUSTLANCE Schedule Recovery & Delay Mitigation Engine. Propose a compressed timeline preserving the final target deadline (e.g. Day 21). Return valid JSON only.`;
        userPrompt = `Current Project State: ${JSON.stringify(payload)}`;
        break;

      case "dispute_copilot":
        systemPrompt = `You are the TRUSTLANCE Dispute Copilot. Generate a neutral, evidence-based dispute report comparing client claims, freelancer claims, agreed contract terms, and evidence logs. Return valid JSON only.`;
        userPrompt = `Dispute Details: ${JSON.stringify(payload)}`;
        break;

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }

    // Call Groq API first, with fallback
    let responseText = "";
    if (GROQ_API_KEY) {
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          response_format: { type: "json_object" },
          temperature: 0.2,
        }),
      });

      if (groqRes.ok) {
        const groqData = await groqRes.json();
        responseText = groqData.choices[0]?.message?.content || "";
      }
    }

    // Fallback to Gemini if Groq unavailable
    if (!responseText && GEMINI_API_KEY) {
      const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}\nRespond in valid JSON only.` }] }],
          generationConfig: { responseMimeType: "application/json" }
        }),
      });
      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
      }
    }

    return new Response(JSON.stringify({ success: true, result: JSON.parse(responseText || "{}") }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
