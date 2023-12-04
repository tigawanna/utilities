import { LayoutProps } from "rakkasjs"
export default function DashboardLayout({children}: LayoutProps) {
return (
<div className="w-full h-full min-h-screen flex items-center justify-center">
 {children}
</div>
)}
