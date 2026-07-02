import { Loader2 } from "lucide-react";

const Loader = ({ message = "Procesando..." }: { message?: string }) => (
  <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
    <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center border border-secondary/10">
      <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
      <p className="text-sm font-medium text-secondary/80">{message}</p>
    </div>
  </div>
);

export default Loader;
