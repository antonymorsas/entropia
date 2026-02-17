import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "danger-outline";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
    fullWidth?: boolean;
}

export default function Button({
    children,
    className = "",
    variant = "primary",
    size = "md",
    isLoading = false,
    fullWidth = false,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md focus:ring-blue-600",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-200",
        outline: "bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-300",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900 focus:ring-gray-100",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-sm focus:ring-red-600",
        "danger-outline": "bg-transparent border border-red-200 hover:bg-red-50 text-red-600 focus:ring-red-200",
    };

    const sizes = {
        sm: "text-xs px-3 py-1.5 gap-1.5",
        md: "text-sm px-5 py-2.5 gap-2",
        lg: "text-base px-6 py-3 gap-2.5",
        icon: "p-2",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    const combinedClassName = `
    ${baseStyles} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${widthStyles} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

    return (
        <button
            className={combinedClassName}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
}
