import React, { useEffect, useMemo, useState } from "react";
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
import { useAuthenticator } from "@aws-amplify/ui-react";
export const adminEmails = [
  "dfyzir@gmail.com",
  "rmelendez@rcjtransport.com",
  "accounting@rcjtransport.com",
];
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { user } = useAuthenticator();
  const router = useRouter();

  const [menuItems, setMenuItems] = useState([
    { name: "Find Chassis", href: "/" },
  ]);
  useEffect(() => {
    if (!user) return;
    setMenuItems((prev) => {
      const existingHrefs = new Set(prev.map((i) => i.href));
      const toAdd = [
        { name: "Chassis List", href: "/chassis-list" },
        { name: "Yard Inventory", href: "/yard-inventory" },
      ].filter((item) => !existingHrefs.has(item.href));
      return existingHrefs.size === prev.length ? [...prev, ...toAdd] : prev;
    });
  }, [user]);

  useEffect(() => {
    if (
      user &&
      adminEmails.includes(user.signInDetails?.loginId?.toLowerCase() ?? "")
    ) {
      setMenuItems((prev) => {
        const existingHrefs = new Set(prev.map((i) => i.href));
        const toAdd = [
          { name: "Credit Applications", href: "/credit-applications" },
          { name: "Driver Applications", href: "/driver-applications" },
        ].filter((item) => !existingHrefs.has(item.href));
        return [...prev, ...toAdd];
      });
    }
  }, [user]);

  const { pathname } = router;

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      position="sticky"
      className=" py-2 [&>header]:!max-w-none  [&>header>ul:first-child]:!grow-0 [&>header>ul:nth-child(3)]:!grow-0 [&>header>ul:nth-child(2)]:!grow">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="[@media(min-width:850px)]:hidden"
        />
        <NavbarBrand className="!w-fit grow-0">
          <RCJIcon />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden [@media(min-width:850px)]:flex  "
        justify="center">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            isActive={pathname === item.href ? true : false}>
            <Link
              className={`uppercase ${
                pathname === item.href ? "text-blue-500 underline" : ""
              }`}
              href={item.href}>
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" justify-content="between">
        <NavbarItem className="flex">
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
              <Link
                className={`uppercase ${
                  pathname === item.href ? "text-blue-500 underline" : ""
                }`}
                href={item.href}>
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
