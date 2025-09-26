"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/common/mobile-sheet";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MobileMenu = ({ open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-screen desktop:hidden" side="left">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                {/* <Image
                  src="/logo/nexus_main_logo.png"
                  alt="logo"
                  width={72}
                  height={32}
                /> */}
                <p className="text-sm font-bold">Agent Jesse</p>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                <X className="size-6" />
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
