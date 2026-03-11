import { TimelineStep } from "@/app/admin/_interfaces/ui.interfaces";
import { Check } from "lucide-react";

const Timeline = ({ steps }: { steps: TimelineStep[] }) => {
  return (
    <div className="flex items-center w-full py-4">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`flex items-center ${idx !== steps.length - 1 ? "flex-1" : ""}`}
        >
          <div className="relative flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                step.isCompleted
                  ? "bg-success border-success text-white"
                  : step.isCurrent
                    ? "border-primary text-primary"
                    : "border-secondary/20 text-secondary/40"
              }`}
            >
              {step.isCompleted ? (
                <Check size={16} />
              ) : (
                <span className="text-xs font-bold">{idx + 1}</span>
              )}
            </div>
            <span
              className={`absolute -bottom-6 whitespace-nowrap text-[10px] font-bold uppercase tracking-tighter ${
                step.isCurrent ? "text-primary" : "text-secondary/60"
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx !== steps.length - 1 && (
            <div
              className={`h-px flex-1 mx-2 ${step.isCompleted ? "bg-success" : "bg-secondary/20"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
export default Timeline;
