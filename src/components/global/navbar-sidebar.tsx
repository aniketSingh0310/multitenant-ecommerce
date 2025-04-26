import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0 transition-none">
        <ScrollArea className="h-full flex flex-col overflow-y-auto pb-2">
          <SheetHeader>
            <SheetTitle>Mentis</SheetTitle>
          </SheetHeader>
          {items.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={() => onOpenChange(false)}
           >
              {item.children}
            </Link>
          ))}
          <div className="border-t ">
            <Link href={"/sign-in"} className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium">Sign In</Link>
            <Link href={"/register"} className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium">Start Selling</Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
