import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-india-saffron/10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center text-india-navy mb-8">
          Welcome to ElectionDosti
        </h1>
        <p className="text-center text-lg mb-12 text-foreground">
          Your multilingual AI companion for the Indian elections.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href={`/${locale}/chat`} className="w-full">
            <Button className="w-full h-24 text-lg" variant="default">AI Chat Assistant</Button>
          </Link>
          <Link href={`/${locale}/education`} className="w-full">
            <Button className="w-full h-24 text-lg" variant="secondary">Election Education</Button>
          </Link>
          <Link href={`/${locale}/myth-buster`} className="w-full">
            <Button className="w-full h-24 text-lg border-india-green" variant="outline">Myth Buster</Button>
          </Link>
          <Link href={`/${locale}/booth`} className="w-full">
            <Button className="w-full h-24 text-lg border-india-saffron" variant="outline">Booth Finder</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
