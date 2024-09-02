import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Globe, MessageCircle } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";

export function NavigationDrawer({ children }: { children: React.ReactNode }) {
    return (
        <Drawer>
            {children}
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <div className="flex flex-col items-stretch p-4 space-y-4">
                        <NavigationLink
                            href="https://hfun.info"
                            icon={<Home className="mr-2 h-4 w-4" />}
                            text="Home"
                        />
                        <NavigationLink
                            href="https://habbofun.org"
                            icon={<Globe className="mr-2 h-4 w-4" />}
                            text="Website"
                        />
                        <NavigationLink
                            href="https://discord.gg/originses"
                            icon={<MessageCircle className="mr-2 h-4 w-4" />}
                            text="Discord"
                        />
                        <DrawerClose asChild>
                            <Button variant="default" className="w-full mt-4">
                                Close
                            </Button>
                        </DrawerClose>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function NavigationLink({
    href,
    icon,
    text,
}: {
    href: string;
    icon: React.ReactNode;
    text: string;
}) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
        >
            <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                    {icon}
                    {text}
                </span>
                <ArrowRight className="h-4 w-4" />
            </Button>
        </Link>
    );
}
