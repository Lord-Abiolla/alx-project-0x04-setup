import { ReactNode } from "react";

export interface PageRouteProps {
    pageRoute: string
}

export interface LayoutProps {
    children: ReactNode;
}

export interface ButtonProps {
    buttonLabel: string
    buttonSize?: string
    buttonBackgroundColor?: 'red' | 'blue' | 'orange' | 'green'
    action?: () => void
}
