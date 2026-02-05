// shared/types/domain.ts
export interface StepOption {
  id: string;
  label: string;
  trigger?: string;
  verification?: boolean;
}

export interface Step {
  id: string;
  message: {
    sender: string;
    text: string;
  };
  options: StepOption[];
}

export interface SessionResponse {
  session_id: string;
  step: Step;
}

export interface EventResponse {
  step?: Step;
  ended: boolean;
}
