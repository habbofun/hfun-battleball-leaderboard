import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-switcher";
import { TextEffect } from "@/components/ui/text-effect";
import { Menu } from "lucide-react";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { NavigationDrawer } from "@/components/navigation-drawer";

export function PageHeader() {
    return (
        <header className="w-full bg-background border-b">
            <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link href="/" rel="noopener noreferrer">
                        <TextEffect
                            per="char"
                            preset="blur"
                            className="text-3xl font-bold cursor-pointer"
                        >
                            HFUN
                        </TextEffect>
                    </Link>
                    <Badge variant="default" className="mr-2">
                        Beta
                    </Badge>
                </div>
                <div className="flex items-center space-x-2">
                    <ModeToggle />
                    <NavigationDrawer>
                        <DrawerTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DrawerTrigger>
                    </NavigationDrawer>
                </div>
            </div>
        </header>
    );
}
