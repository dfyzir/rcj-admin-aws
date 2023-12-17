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
import { RCJIcon } from "../icons/RCJIcon";
import SignOutButton from "./SignOutButton";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { name: "Chassis List", href: "/" },
    { name: "Yard Inventory", href: "/yard-inventory" },
  ];
  const router = useRouter();
  const { pathname } = router;
  console.log(pathname);

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
        <NavbarItem isActive={pathname === "/" ? true : false}>
          <Link
            href="/"
            aria-current="page"
            className={`uppercase ${
              pathname === "/" ? "text-blue-500 underline" : ""
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
      <NavbarContent justify="end">
        <NavbarItem className=" hidden sm:flex">
          <SignOutButton />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="flex flex-col items-start justify-between">
        <div className="mt-10 flex flex-col gap-4 uppercase">
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
        <div className="mb-10">
          <SignOutButton />
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
