'use client';

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4">
      {children}
    </div>
  );
}
