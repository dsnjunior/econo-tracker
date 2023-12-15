import type React from "react";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UserMenuProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "name"> {
  avatarUrl: string | null;
  name: string | null;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  avatarUrl,
  name,
  className,
}) => {
  const nameInitials = (() => {
    if (!name) {
      return "--";
    }

    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }

    if (names.length) {
      return names[0][0].toUpperCase();
    }
  })();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("relative h-8 w-8 rounded-full", className)}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl ?? ""} />
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <p className="text-sm font-medium leading-none">{name}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div hx-boost="true">
          <DropdownMenuItem asChild className="cursor-pointer">
            <a
              href="/auth/logout"
              onClick={
                () => {
                  if ('posthog' in window) {
                    // @ts-ignore
                    window.posthog.reset();
                  }
                }
              }
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </a>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
