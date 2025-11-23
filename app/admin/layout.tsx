// Layout spécifique pour les pages admin (sans Header/Footer)
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

