"use client";

import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

interface Props {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: Props) => {
  const router = useRouter();

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
