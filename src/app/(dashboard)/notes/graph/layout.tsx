export default function GraphLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-full w-full">
      {children}
    </div>
  )
}