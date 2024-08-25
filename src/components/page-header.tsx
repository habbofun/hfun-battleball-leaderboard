import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-switcher";
import { TextEffect } from "@/components/ui/text-effect";

export function PageHeader() {
    return (
        <header className="w-full bg-background border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="https://hfun.info" target="_blank" rel="noopener noreferrer">
                    <TextEffect per='char' preset='blur' className="text-3xl font-bold cursor-pointer">
                        HFUN Leaderboard
                    </TextEffect>
                </Link>
                <div className="flex justify-end items-center gap-2">
                    <Button variant="link">
                        <Link href="https://hfun.info" target="_blank" rel="noopener noreferrer">
                            Home
                        </Link>
                    </Button>
                    <Button variant="ghost">
                        <Link href="https://habbofun.org" target="_blank" rel="noopener noreferrer">
                            Website
                        </Link>
                    </Button>
                    <Button variant="ghost">
                        <Link href="https://discord.gg/originses" target="_blank" rel="noopener noreferrer">
                            Discord
                        </Link>
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}