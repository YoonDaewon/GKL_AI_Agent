"use client";

import { useRouter, usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/providers/language-provider";

interface Props {
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}

export const AppLayout = ({ children, headerRight }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const isChatPage = pathname === "/chat";
  const { language, setLanguage } = useLanguage();

  return (
    <div className="h-full w-screen">
      <div className="flex w-screen items-center justify-between px-4 py-3 desktop:p-4">
        <div className="flex items-center space-x-[60px]">
          <div className="cursor-pointer" onClick={() => router.push("/")}>
            <div className="text-sm font-bold">Sevenluck Concierge</div>
            {/* <Image
              src="/logo/jesse_profile.png"
              alt="logo"
              width={32}
              height={32}
            /> */}
          </div>
        </div>
        {isChatPage && (
          <div className="flex items-center gap-2">
            <span className="text-sm">Language</span>
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value as "ko" | "en")}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="언어 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ko">한국어</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        {headerRight && !isChatPage && (
          <div className="flex items-center">{headerRight}</div>
        )}
        {/* <div className="cursor-pointer desktop:hidden">
          <AlignJustify
            className="size-6"
            onClick={() => changeMobileMenuVisibility(!isMenuOpen)}
          />
          <MobileMenu
            open={isMenuOpen}
            onOpenChange={changeMobileMenuVisibility}
          />
        </div> */}
      </div>
      <Separator className="h-px w-full bg-border" />
      <div className="h-[calc(100svh-48px)] w-screen desktop:h-[calc(100svh-64px)]">
        {children}
      </div>
    </div>
  );
};
