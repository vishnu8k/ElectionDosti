import Link from "next/link";
import { MessageCircle, BookOpen, ShieldCheck, MapPin } from "lucide-react";

const features = [
  {
    id: "chat",
    label: "AI Chat Assistant",
    description: "Get instant answers about elections",
    icon: MessageCircle,
    gradient: "from-india-navy to-blue-900",
    border: "border-blue-800",
    iconBg: "bg-white/10",
  },
  {
    id: "education",
    label: "Election Education",
    description: "Learn about the voting process",
    icon: BookOpen,
    gradient: "from-india-green to-green-700",
    border: "border-green-700",
    iconBg: "bg-white/10",
  },
  {
    id: "myth-buster",
    label: "Myth Buster",
    description: "Fact-check election rumours",
    icon: ShieldCheck,
    gradient: "from-india-saffron to-orange-600",
    border: "border-orange-600",
    iconBg: "bg-white/10",
  },
  {
    id: "booth",
    label: "Booth Finder",
    description: "Find your polling station",
    icon: MapPin,
    gradient: "from-purple-700 to-purple-900",
    border: "border-purple-700",
    iconBg: "bg-white/10",
  },
];

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-gradient-to-br from-india-saffron/10 via-white to-india-green/10">
      <div className="z-10 max-w-5xl w-full text-center space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-india-navy tracking-tight">
            Welcome to <span className="text-india-saffron">ElectionDosti</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Your multilingual AI companion for navigating the Indian elections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link key={f.id} href={`/${locale}/${f.id}`} className="group">
                <div
                  className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-br ${f.gradient} text-white p-6 h-40 shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:shadow-2xl border border-white/10 cursor-pointer`}
                >
                  <div className={`${f.iconBg} rounded-full p-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-base leading-tight">{f.label}</p>
                    <p className="text-xs text-white/70 mt-1">{f.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground pt-4">
          Available in English · हिन्दी · தமிழ் · తెలుగు · ಕನ್ನಡ · বাংলা
        </p>
      </div>
    </main>
  );
}
