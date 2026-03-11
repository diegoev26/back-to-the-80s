import { TitleProps } from "@/app/admin/_interfaces/ui.interfaces";

const Title = ({ text, subtitle }: TitleProps) => {
  return (
    <div className="w-full bg-white dark:bg-dark px-4 py-4 border-b border-gray-100 dark:border-white/10 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
          <h1 className="text-xl font-semibold tracking-tight text-dark dark:text-white font-primary first-letter:uppercase">
            {text}
          </h1>

          {subtitle && (
            <div className="hidden sm:block h-3 w-px bg-gray-300 dark:bg-secondary self-center" />
          )}

          {subtitle && (
            <p className="text-xs sm:text-sm text-secondary dark:text-gray-400 font-light italic transition-colors">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center">
          <div className="h-0.5 w-5 bg-primary" />
          <div className="h-0.5 w-1 bg-gray-200 dark:bg-white/20 ml-0.5" />
        </div>
      </div>
    </div>
  );
};

export default Title;
