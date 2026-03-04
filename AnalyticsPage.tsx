import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-body">
        {label}
      </label>
    )}
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
      )}
      <input
        className={`
          w-full rounded-xl border transition-all duration-200 font-body text-sm
          px-4 py-2.5 ${icon ? 'pl-10' : ''}
          border-slate-200 dark:border-slate-600
          bg-white dark:bg-slate-800
          text-slate-800 dark:text-slate-100
          placeholder:text-slate-400 dark:placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent
          ${error ? 'border-red-400 focus:ring-red-400' : ''}
          ${className}
        `}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-500 font-body">{error}</p>}
  </div>
)

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', ...props }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 font-body">{label}</label>
    )}
    <select
      className={`
        w-full rounded-xl border px-4 py-2.5 font-body text-sm transition-all duration-200
        border-slate-200 dark:border-slate-600
        bg-white dark:bg-slate-800
        text-slate-800 dark:text-slate-100
        focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:border-transparent
        ${className}
      `}
      {...props}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  </div>
)
