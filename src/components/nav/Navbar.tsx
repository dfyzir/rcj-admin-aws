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
import {
  fetchUserAttributes,
  FetchUserAttributesOutput,
} from "aws-amplify/auth";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = useState<
    FetchUserAttributesOutput | undefined
  >(undefined);
  const { user } = useAuthenticator();
  const router = useRouter();

  const menuItems = useMemo(() => [{ name: "Find Chassis", href: "/" }], []);
  useEffect(() => {
    if (user) {
      menuItems.push(
        { name: "Chassis List", href: "/chassis-list" },
        { name: "Yard Inventory", href: "/yard-inventory" },
        {
          name: "Credit Applications",
          href: "/credit-applications",
        }
      );
    }
  }, [user, menuItems]);
  useEffect(() => {
    const getUserInfo = async () => {
      if (user) {
        const fetchedUser = await fetchUserAttributes();
        setCurrentUser(fetchedUser);
      }
    };
    getUserInfo();
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
        <>
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
          {user && (
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
          )}
        </>
        {user && (
          <>
            <NavbarItem
              isActive={pathname === "/yard-inventory" ? true : false}>
              <Link
                color="foreground"
                href="/yard-inventory"
                className={`uppercase ${
                  pathname === "/yard-inventory"
                    ? "text-blue-500 underline"
                    : ""
                }`}>
                Yard Inventory
              </Link>
            </NavbarItem>

            {currentUser &&
              (currentUser.email === "dfyzir@gmail.com" ||
                currentUser.email?.toLowerCase() ===
                  "Rmelendez@rcjtransport.com".toLowerCase() ||
                currentUser.email?.toLowerCase() ===
                  "accounting@rcjtransport.com".toLowerCase()) && (
                <>
                  <NavbarItem
                    isActive={
                      pathname === "/credit-applications" ? true : false
                    }>
                    <Link
                      href="/credit-applications"
                      aria-current="page"
                      className={`uppercase ${
                        pathname === "/credit-applications"
                          ? "text-blue-500 underline"
                          : ""
                      }`}>
                      Credit Applications
                    </Link>
                  </NavbarItem>
                  <NavbarItem
                    isActive={
                      pathname === "/driver-applications" ? true : false
                    }>
                    <Link
                      href="/driver-applications"
                      aria-current="page"
                      className={`uppercase ${
                        pathname === "/driver-applications"
                          ? "text-blue-500 underline"
                          : ""
                      }`}>
                      Driver Applications
                    </Link>
                  </NavbarItem>
                </>
              )}
          </>
        )}
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
