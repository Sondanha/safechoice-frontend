// app/report/[sessionId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getReport } from "@/features/report/api";
import type { Report } from "@/shared/types/domain";

export default function ReportPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getReport(sessionId)
      .then((res) => {
        setReport(res);
      })
      .catch((err) => {
        console.error(err);
        setError("리포트를 불러오지 못했습니다");
      });
  }, [sessionId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!report) {
    return <p>Loading...</p>;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Simulation Report</h1>

      <p>
        <b>Session</b>: {report.session_id}
      </p>
      <p>
        <b>Score</b>: {report.score}
      </p>
      <p>
        <b>Summary</b>: {report.summary}
      </p>

      <h3>Trigger Hits</h3>
      <ul>
        {Object.entries(report.feature.trigger_hits).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </main>
  );
}
