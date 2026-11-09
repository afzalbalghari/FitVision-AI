"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/cn";
import type { Option } from "@/lib/onboarding";

interface BaseProps<T extends string | number> {
  legend: string;
  hint?: string;
  options: Option<T>[];
  error?: string;
  columns?: "2" | "3" | "5";
}

interface SingleProps<T extends string | number> extends BaseProps<T> {
  multiple?: false;
  value: T;
  onChange: (value: T) => void;
}

interface MultiProps<T extends string | number> extends BaseProps<T> {
  multiple: true;
  value: T[];
  onChange: (value: T[]) => void;
}

const GRID = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-3",
  "5": "grid-cols-3 sm:grid-cols-4 md:grid-cols-7",
} as const;

export function ChoiceGroup<T extends string | number>(props: SingleProps<T> | MultiProps<T>) {
  const { legend, hint, options, error, columns = "2" } = props;

  const isSelected = (value: T) => (props.multiple ? props.value.includes(value) : props.value === value);

  function toggle(value: T) {
    if (props.multiple) {
      props.onChange(props.value.includes(value) ? props.value.filter((v) => v !== value) : [...props.value, value]);
    } else {
      props.onChange(value);
    }
  }

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium">{legend}</legend>
      {hint && <p className="-mt-1 text-xs text-muted">{hint}</p>}
      <div className={cn("grid gap-2", GRID[columns])} role={props.multiple ? "group" : "radiogroup"}>
        {options.map((option) => {
          const selected = isSelected(option.value);
          return (
            <button
              key={option.value}
              type="button"
              role={props.multiple ? "checkbox" : "radio"}
              aria-checked={selected}
              onClick={() => toggle(option.value)}
              className={cn(
                "flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-left transition",
                selected ? "border-accent bg-accent/10" : "border-line bg-surface-2 hover:border-accent-dim",
              )}
            >
              <span>
                <span className="block text-sm font-medium">{option.label}</span>
                {option.description && <span className="mt-0.5 block text-xs text-muted">{option.description}</span>}
              </span>
              {selected && <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />}
            </button>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
