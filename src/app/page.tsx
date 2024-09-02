import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { TextEffect } from "@/components/ui/text-effect";

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <PageHeader />
            <main className="flex-grow flex flex-col justify-center items-center space-y-4">
                <Link href="/">
                    <TextEffect
                        per="char"
                        preset="fade"
                        className="text-6xl font-bold"
                    >
                        HFUN.
                    </TextEffect>
                </Link>
                <p className="text-sm text-muted-foreground text-center">
                    Browse the page with the menu above
                </p>
            </main>
        </div>
    );
}
