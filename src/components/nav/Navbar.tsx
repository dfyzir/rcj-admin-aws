import React from "react";
import { useRouter } from "next/router";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import { RCJIcon } from "../icons/RCJIconcopy";
import SignOutButton from "./SignOutButton";
import ThemeToggle from "./ThemeToggle";
import { ThemeProvider } from "@/context/themeContext";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Find Chassis", href: "/" },
    { name: "Chassis List", href: "/chassis-list" },
    { name: "Yard Inventory", href: "/yard-inventory" },
  ];
  const router = useRouter();
  const { pathname } = router;

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      position="sticky"
      className="md:h-28">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <RCJIcon />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        <NavbarItem isActive={pathname === "/" ? true : false}>
          <Link
            href="/"
            aria-current="page"
            className={`uppercase ${
              pathname === "/" ? "text-blue-500 underline" : ""
            }`}>
            Find Chassis
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/chassis-list" ? true : false}>
          <Link
            href="/chassis-list"
            aria-current="page"
            className={`uppercase ${
              pathname === "/chassis-list" ? "text-blue-500 underline" : ""
            }`}>
            Chassis List
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/yard-inventory" ? true : false}>
          <Link
            color="foreground"
            href="/yard-inventory"
            className={`uppercase ${
              pathname === "/yard-inventory" ? "text-blue-500 underline" : ""
            }`}>
            Yard Inventory
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end" justify-content="between">
        <NavbarItem className=" hidden sm:flex">
          <SignOutButton />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="flex flex-col items-start justify-between">
        <div className="mt-10 flex flex-col gap-4 uppercase">
          <NavbarMenuItem>
            <div className="pl-3 mb-10">
              <ThemeToggle />
            </div>
          </NavbarMenuItem>
          {menuItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item}-${index}`}
              isActive={pathname === item.href ? true : false}>
              <Button
                variant="light"
                onPress={() => setIsMenuOpen(!isMenuOpen)}>
                <Link
                  className={`uppercase ${
                    pathname === item.href ? "text-blue-500 underline" : ""
                  }`}
                  href={item.href}>
                  {item.name}
                </Link>
              </Button>
            </NavbarMenuItem>
          ))}
        </div>

        <div className="mb-28">
          <SignOutButton />
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
