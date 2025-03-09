"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useId } from "react";

const iconClassName = "w-4 h-4 shrink-0";

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
    color="currentColor"
    className={iconClassName}
    fill={"none"}
    {...props}
  >
    <path
      d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M12 2V3.5M12 20.5V22M19.0708 19.0713L18.0101 18.0106M5.98926 5.98926L4.9286 4.9286M22 12H20.5M3.5 12H2M19.0713 4.92871L18.0106 5.98937M5.98975 18.0107L4.92909 19.0714"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
    color="currentColor"
    className={iconClassName}
    fill={"none"}
    {...props}
  >
    <path
      d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28105 3.69968 9.92163 2.5C5.66765 3.49698 2.5 7.31513 2.5 11.8731C2.5 17.1899 6.8101 21.5 12.1269 21.5C16.6849 21.5 20.503 18.3324 21.5 14.0784Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TimeHalfPassIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
    color="currentColor"
    className={iconClassName}
    fill={"none"}
    {...props}
  >
    <path
      d="M8.76938 2.5C8.4973 2.59728 8.23058 2.70543 7.96979 2.8239M5.42501 4.46566C5.19851 4.66428 4.98106 4.87255 4.77334 5.08979M3.03178 7.56476C2.84599 7.93804 2.68313 8.32421 2.54498 8.72152M2.01608 11.3914C1.99387 11.7808 1.99471 12.1778 2.01835 12.5673M2.56845 15.2658C2.70147 15.6396 2.85641 16.0035 3.03178 16.3558M4.69086 18.7435C4.93508 19.005 5.19323 19.2539 5.46415 19.4891M7.77635 21.0064C8.17073 21.1954 8.57927 21.3606 9 21.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5M12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5M12 13.5V16M12 10.5V6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const items = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: TimeHalfPassIcon },
];

export default function ThemeSwitcher() {
  const id = useId();
  const { setTheme, theme } = useTheme();

  const handleValueChange = (value: string) => {
    setTheme(value);
  };

  return (
    <fieldset className="space-y-4">
      <RadioGroup
        className="flex rounded-full p-1.5 gap-1 bg-black/[0.03] dark:bg-[#191919]/80"
        value={theme}
        onValueChange={handleValueChange}
      >
        {items.map(({ value, Icon }) => (
          <label key={`${id}-${value}`}>
            <RadioGroupItem
              id={`${id}-${value}`}
              value={value}
              checked={theme === value}
              className="peer sr-only "
            />
            <div
              className={cn(
                "h-6 w-6 flex items-center justify-center shrink-0 rounded-full transition-colors text-icon-secondary",
                {
                  "bg-neutral-200 dark:bg-[#4d4d4d] text-icon": theme === value,
                }
              )}
            >
              <Icon />
            </div>
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
