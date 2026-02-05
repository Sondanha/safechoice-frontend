// app/simulate/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createSession } from "@/features/session/api";
import { sendEvent } from "@/features/simulation/api";
import { Step, StepOption } from "@/shared/types/domain";
import { useRouter } from "next/navigation";

export default function SimulatePage() {
  const [step, setStep] = useState<Step | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    createSession().then((res) => {
      setSessionId(res.session_id);
      setStep(res.step);
      setStepIndex(0);
    });
  }, []);

  if (!step || !sessionId) return <div>로딩</div>;

  const handleClick = async (opt: StepOption) => {
    console.log("HANDLE CLICK", step.id, opt.id);

    const res = await fetch("http://127.0.0.1:8000/events/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        type: "click",
        payload: {
          current_step_id: step.id,
          option_id: opt.id,
          step_index: stepIndex + 1,
        },
        timestamp: new Date().toISOString(),
      }),
    });

    console.log("DIRECT FETCH STATUS", res.status);
  };

  return (
    <div>
      <p>{step.message.text}</p>

      {step.options.map((opt, idx) => (
        <button
          key={`${opt.id}-${idx}`}
          type="button"
          onClick={() => handleClick(opt)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
