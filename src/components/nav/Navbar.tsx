import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tooltip,
} from "@heroui/react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";

import { RCJIcon } from "../icons/RCJIconcopy";
import ThemeToggle from "./ThemeToggle";
import { SearchIcon } from "../icons/SearchIcon";

export const adminEmails = [
  "dfyzir@gmail.com",
  "rmelendez@rcjtransport.com",
  "accounting@rcjtransport.com",
];

type NavItem = {
  href: string;
  icon: React.ReactNode;
  name: string;
};

const dividerClassName = "border-slate-200/80 dark:border-white/10";
const mobileDrawerWidthClass = "w-[calc(100vw-2rem)] max-w-[336px]";
const mobileDrawerInnerWidthClass = "w-[calc(100vw-4rem)] max-w-[304px]";
const sidebarMotionClass = "duration-200 ease-out";
const sidebarBrandHoverExpandedClass =
  "hover:border-[#316BAD]/24 hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.08)_0%,rgba(0,141,193,0.16)_50%,rgba(49,107,173,0.08)_100%)] hover:text-slate-950 hover:shadow-[0_12px_26px_-22px_rgba(0,141,193,0.18)] dark:hover:border-[#316BAD]/30 dark:hover:bg-[linear-gradient(90deg,rgba(49,107,173,0.14)_0%,rgba(0,141,193,0.22)_50%,rgba(49,107,173,0.14)_100%)] dark:hover:text-white dark:hover:shadow-[0_14px_28px_-22px_rgba(0,141,193,0.26)]";
const sidebarBrandActiveExpandedClass =
  "border-[#316BAD]/30 bg-[linear-gradient(90deg,rgba(49,107,173,0.14)_0%,rgba(0,141,193,0.22)_50%,rgba(49,107,173,0.14)_100%)] text-[#184C7F] shadow-[0_14px_30px_-20px_rgba(0,141,193,0.22)] dark:border-[#316BAD]/36 dark:bg-[linear-gradient(90deg,rgba(49,107,173,0.18)_0%,rgba(0,141,193,0.28)_50%,rgba(49,107,173,0.18)_100%)] dark:text-white dark:shadow-[0_16px_32px_-22px_rgba(0,141,193,0.32)]";
const sidebarBrandHoverCompactClass =
  "hover:border-[#316BAD]/26 hover:bg-[linear-gradient(135deg,rgba(49,107,173,0.14)_0%,rgba(0,141,193,0.20)_50%,rgba(49,107,173,0.14)_100%)] hover:text-[#255D96] hover:shadow-[0_12px_24px_-20px_rgba(0,141,193,0.18)] dark:hover:border-[#316BAD]/30 dark:hover:bg-[linear-gradient(135deg,rgba(49,107,173,0.18)_0%,rgba(0,141,193,0.26)_50%,rgba(49,107,173,0.18)_100%)] dark:hover:text-[#A7E0F2] dark:hover:shadow-[0_14px_28px_-22px_rgba(0,141,193,0.28)]";
const sidebarBrandActiveCompactClass =
  "border-[#316BAD]/32 bg-[linear-gradient(135deg,rgba(49,107,173,0.18)_0%,rgba(0,141,193,0.26)_50%,rgba(49,107,173,0.18)_100%)] text-[#1E5B92] shadow-[0_14px_28px_-20px_rgba(0,141,193,0.20)] dark:border-[#316BAD]/40 dark:bg-[linear-gradient(135deg,rgba(49,107,173,0.22)_0%,rgba(0,141,193,0.30)_50%,rgba(49,107,173,0.22)_100%)] dark:text-[#D8F4FF] dark:shadow-[0_16px_30px_-22px_rgba(0,141,193,0.32)]";
const mobileSidebarPanelMotionClass =
  "transition-[transform,opacity,background-color,color,border-color]";
const mobileSidebarSurfaceMotionClass =
  "transition-[width,max-width,border-color,background-color,box-shadow,padding]";
const mobileSidebarContentMotionClass = "transition-opacity";

export default function NavBar() {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { route, user, signOut } = useAuthenticator();
  const router = useRouter();
  const { pathname } = router;
  const isAuthenticated = route === "authenticated" && !!user;
  const accountEmail = isAuthenticated
    ? (user?.signInDetails?.loginId?.toLowerCase() ?? user?.username ?? "")
    : "";
  const accountInitials = getInitials(accountEmail);

  const isAdmin = isAuthenticated && adminEmails.includes(accountEmail);

  const menuItems = useMemo<NavItem[]>(() => {
    const items: NavItem[] = [
      {
        href: "/",
        icon: <SearchIcon size={20} />,
        name: "Find Chassis",
      },
    ];

    if (isAuthenticated) {
      items.push(
        {
          href: "/chassis-list",
          icon: <TableNavIcon />,
          name: "Chassis List",
        },
        {
          href: "/yard-inventory",
          icon: <WarehouseNavIcon />,
          name: "Yard Inventory",
        },
      );
    }

    if (isAdmin) {
      items.push(
        {
          href: "/credit-applications",
          icon: <DocumentNavIcon />,
          name: "Credit Applications",
        },
        {
          href: "/driver-applications",
          icon: <UsersNavIcon />,
          name: "Driver Applications",
        },
      );
    }

    return items;
  }, [isAdmin, isAuthenticated]);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsDrawerOpen(false);
      setIsDesktopExpanded(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const desktopWidthClass = isDesktopExpanded ? "lg:w-72" : "lg:w-24";

  const handleNavItemClick = () => {
    setIsDrawerOpen(false);
    setIsDesktopExpanded(false);
  };

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 text-slate-900 backdrop-blur transition-colors dark:border-white/10 dark:bg-slate-950/90 dark:text-white lg:hidden">
        <div className="flex px-4 py-3">
          <MobileNavTrigger
            isOpen={isDrawerOpen}
            onToggle={() => setIsDrawerOpen((prev) => !prev)}
          />
        </div>
      </div>

      <div
        className={`fixed inset-x-0 bottom-0 top-[78px] z-[60] lg:hidden ${
          isDrawerOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}>
        <button
          type="button"
          aria-label="Close navigation"
          className={`absolute inset-0 bg-slate-950/30 backdrop-blur-sm transition-opacity ${sidebarMotionClass} dark:bg-slate-950/70 ${
            isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsDrawerOpen(false)}
        />
        <aside
          className={`relative flex h-full min-h-0 ${mobileDrawerWidthClass} transform-gpu flex-col border-r bg-white px-4 py-5 text-slate-900 shadow-2xl ${mobileSidebarPanelMotionClass} ${sidebarMotionClass} dark:bg-slate-950 dark:text-white ${dividerClassName} ${
            isDrawerOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-2 opacity-0"
          }`}>
          <nav
            className={`flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain pt-1 pr-1 ${mobileSidebarContentMotionClass} ${sidebarMotionClass} ${
              isDrawerOpen ? "opacity-100" : "opacity-0"
            }`}>
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                onNavigate={handleNavItemClick}
                pathname={pathname}
                showLabel
              />
            ))}
          </nav>

          <div
            className={`-mx-4 mt-4 shrink-0 flex flex-col gap-4 border-t px-4 pt-5 ${dividerClassName} ${mobileSidebarContentMotionClass} ${sidebarMotionClass} ${
              isDrawerOpen ? "opacity-100" : "opacity-0"
            }`}>
            <div className="flex">
              <ThemeToggle />
            </div>
            <AccountMenu
              authenticated={isAuthenticated}
              email={accountEmail}
              initials={accountInitials}
              onSignOut={signOut}
              showLabel
            />
          </div>
        </aside>
      </div>

      <aside className="hidden lg:block lg:h-screen lg:w-24 lg:shrink-0">
        {isDesktopExpanded ? (
          <button
            type="button"
            aria-label="Close expanded sidebar"
            onClick={() => setIsDesktopExpanded(false)}
            className="fixed inset-0 left-24 z-40 bg-transparent"
          />
        ) : null}

        <div
          className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r bg-white px-3 py-4 text-slate-900 shadow-[16px_0_50px_-28px_rgba(15,23,42,0.24)] transition-[width,background-color,color,border-color] ${sidebarMotionClass} dark:bg-slate-950 dark:text-white dark:shadow-[16px_0_50px_-28px_rgba(15,23,42,0.95)] ${dividerClassName} ${desktopWidthClass}`}>
          <button
            type="button"
            aria-label={
              isDesktopExpanded ? "Collapse sidebar" : "Expand sidebar"
            }
            onClick={() => setIsDesktopExpanded((prev) => !prev)}
            className={`mb-6 flex items-center justify-center rounded-3xl border border-transparent px-2 py-2 text-left transition ${
              isDesktopExpanded
                ? sidebarBrandHoverExpandedClass
                : sidebarBrandHoverCompactClass
            }`}>
            <span className="flex items-center justify-center overflow-hidden">
              <RCJIcon />
            </span>
          </button>

          <nav className="mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain pr-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                onNavigate={handleNavItemClick}
                pathname={pathname}
                showLabel={isDesktopExpanded}
              />
            ))}
          </nav>

          <div
            className={`-mx-3 mt-4 shrink-0 flex flex-col gap-4 border-t px-3 pt-5 ${dividerClassName} `}>
            <div className="flex w-full justify-start">
              <ThemeToggle compact={!isDesktopExpanded} />
            </div>
            <AccountMenu
              authenticated={isAuthenticated}
              email={accountEmail}
              initials={accountInitials}
              onSignOut={signOut}
              showLabel={isDesktopExpanded}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

function MobileNavTrigger({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Close navigation" : "Open navigation"}
      aria-expanded={isOpen}
      onClick={onToggle}
      className={`group flex items-center overflow-hidden rounded-3xl border px-3 py-2 text-left ${mobileSidebarSurfaceMotionClass} ${sidebarMotionClass} ${
        isOpen
          ? `${mobileDrawerInnerWidthClass} gap-4 justify-between border-slate-300 bg-slate-100 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.32)] dark:border-white/15 dark:bg-white/[0.08] dark:shadow-[0_20px_40px_-28px_rgba(2,6,23,0.95)]`
          : "w-[156px] justify-between border-transparent bg-transparent px-0 py-0 shadow-none hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
      }`}>
      <span
        className={`flex items-center overflow-hidden text-current ${mobileSidebarContentMotionClass} ${sidebarMotionClass} ${
          isOpen ? "min-w-0 flex-1" : "shrink-0"
        }`}>
        <RCJIcon />
      </span>
      <span
        className={`ml-3 flex h-10 w-10 shrink-0 items-center justify-center text-slate-700 transition-all ${sidebarMotionClass} dark:text-white ${
          isOpen
            ? "rounded-2xl border border-slate-200/80 bg-slate-100/70 group-hover:border-slate-300 group-hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.05] dark:group-hover:border-white/15 dark:group-hover:bg-white/[0.08]"
            : "rounded-none border-transparent bg-transparent"
        }`}>
        <MobileMenuGlyph open={isOpen} />
      </span>
    </button>
  );
}

function NavLink({
  item,
  onNavigate,
  pathname,
  showLabel,
}: {
  item: NavItem;
  onNavigate: () => void;
  pathname: string;
  showLabel: boolean;
}) {
  const isActive = pathname === item.href;
  const activeClass = showLabel
    ? sidebarBrandActiveExpandedClass
    : sidebarBrandActiveCompactClass;
  const hoverClass = showLabel
    ? sidebarBrandHoverExpandedClass
    : sidebarBrandHoverCompactClass;

  const content = (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`group flex items-center rounded-3xl border px-4 py-3 transition ${
        showLabel
          ? "w-full min-w-0 justify-start gap-3 px-3 lg:px-4"
          : "justify-center"
      } ${
        isActive
          ? activeClass
          : `border-transparent bg-transparent text-slate-500 dark:text-white/70 ${hoverClass}`
      }`}>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
        {item.icon}
      </span>
      <span
        className={`overflow-hidden whitespace-nowrap font-semibold uppercase transition-all ${
          showLabel
            ? "min-w-0 flex-1 text-[0.82rem] tracking-[0.11em] opacity-100 sm:text-sm sm:tracking-[0.13em]"
            : "max-w-0 text-sm tracking-[0.14em] opacity-0"
        }`}>
        {item.name}
      </span>
    </Link>
  );

  if (showLabel) {
    return content;
  }

  return (
    <Tooltip content={item.name} placement="right" delay={100}>
      {content}
    </Tooltip>
  );
}

function AccountMenu({
  authenticated,
  email,
  initials,
  onSignOut,
  showLabel,
}: {
  authenticated: boolean;
  email: string;
  initials: string;
  onSignOut: () => void;
  showLabel: boolean;
}) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (authenticated) {
      setShowAuthModal(false);
    }
  }, [authenticated]);

  const accountHoverClass = showLabel
    ? sidebarBrandHoverExpandedClass
    : sidebarBrandHoverCompactClass;

  const avatarBadge = (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#316BAD]/22 bg-[linear-gradient(135deg,rgba(49,107,173,0.18)_0%,rgba(0,141,193,0.24)_50%,rgba(49,107,173,0.18)_100%)] text-sm font-semibold uppercase tracking-[0.12em] text-[#255D96] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_12px_24px_-18px_rgba(0,141,193,0.30)] transition-all group-hover:border-[#316BAD]/30 group-hover:bg-[linear-gradient(135deg,rgba(49,107,173,0.24)_0%,rgba(0,141,193,0.32)_50%,rgba(49,107,173,0.24)_100%)] group-hover:text-[#1E5B92] group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_14px_26px_-18px_rgba(0,141,193,0.38)] dark:border-[#316BAD]/28 dark:bg-[linear-gradient(135deg,rgba(49,107,173,0.24)_0%,rgba(0,141,193,0.30)_50%,rgba(49,107,173,0.24)_100%)] dark:text-[#D8F4FF] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_24px_-18px_rgba(0,141,193,0.38)] dark:group-hover:border-[#316BAD]/34 dark:group-hover:bg-[linear-gradient(135deg,rgba(49,107,173,0.30)_0%,rgba(0,141,193,0.38)_50%,rgba(49,107,173,0.30)_100%)] dark:group-hover:text-white dark:group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_14px_26px_-18px_rgba(0,141,193,0.42)]">
      {initials}
    </span>
  );

  const compactTriggerClassName = `group flex w-full items-center justify-center rounded-3xl border border-transparent px-2 py-2 text-slate-900 transition dark:text-white ${accountHoverClass}`;
  const expandedTriggerClassName = `group flex w-full items-center gap-3 rounded-3xl border border-transparent px-2 py-2 text-left text-slate-900 transition dark:text-white ${accountHoverClass}`;

  const expandedTriggerContent = (
    <>
      {avatarBadge}
      <span className="min-w-0 flex-1 overflow-hidden">
        {authenticated ? (
          <>
            <span className="block truncate text-xs uppercase tracking-[0.14em] text-slate-400 dark:text-white/45">
              Account
            </span>
            <span className="block truncate text-sm font-medium text-slate-700 dark:text-white/85">
              {email}
            </span>
          </>
        ) : (
          <>
            <span className="block truncate text-xs uppercase tracking-[0.14em] text-slate-400 dark:text-white/45">
              Guest
            </span>
            <span className="block truncate text-sm font-medium text-slate-700 dark:text-white/85">
              Sign in
            </span>
          </>
        )}
      </span>
      <span className="ml-auto shrink-0 text-slate-400 transition dark:text-white/45">
        <DropdownChevronIcon />
      </span>
    </>
  );

  const trigger = showLabel ? (
    <button type="button" className={expandedTriggerClassName}>
      {expandedTriggerContent}
    </button>
  ) : (
    <button type="button" className={compactTriggerClassName}>
      {avatarBadge}
    </button>
  );

  if (!authenticated) {
    const signInButton = (
      <button
        type="button"
        onClick={() => setShowAuthModal(true)}
        className={showLabel ? expandedTriggerClassName : compactTriggerClassName}>
        {showLabel ? expandedTriggerContent : avatarBadge}
      </button>
    );

    return (
      <>
        {showLabel ? (
          signInButton
        ) : (
          <Tooltip content="Sign in" placement="right" delay={100}>
            {signInButton}
          </Tooltip>
        )}
        {showAuthModal && typeof document !== "undefined"
          ? ReactDOM.createPortal(
              <div className="fixed inset-0 z-[120] flex items-center justify-center">
                <button
                  type="button"
                  aria-label="Close sign in dialog"
                  className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm dark:bg-slate-950/75"
                  onClick={() => setShowAuthModal(false)}
                />
                <div className="relative z-[121] max-w-[92vw]">
                  <Authenticator
                    hideSignUp
                    className="[&>div>div>div]:dark:!bg-slate-900"
                  />
                </div>
              </div>,
              document.body,
            )
          : null}
      </>
    );
  }

  const dropdown = (
      <Dropdown
        placement={showLabel ? "top-start" : "right-end"}
        onOpenChange={setIsDropdownOpen}>
        <DropdownTrigger>{trigger}</DropdownTrigger>
      <DropdownMenu
        aria-label="Account menu"
        classNames={{
          list: "gap-1 p-1",
        }}
        itemClasses={{
          base: "rounded-xl border border-transparent transition-all data-[hover=true]:border-[#316BAD]/22 data-[hover=true]:bg-gradient-to-r data-[hover=true]:from-[rgba(49,107,173,0.08)] data-[hover=true]:via-[rgba(0,141,193,0.14)] data-[hover=true]:to-[rgba(49,107,173,0.08)] data-[hover=true]:text-[#255D96] dark:data-[hover=true]:border-[#316BAD]/28 dark:data-[hover=true]:from-[rgba(49,107,173,0.16)] dark:data-[hover=true]:via-[rgba(0,141,193,0.22)] dark:data-[hover=true]:to-[rgba(49,107,173,0.16)] dark:data-[hover=true]:text-white",
        }}>
        <DropdownItem
          key="email"
          isReadOnly
          className="opacity-100"
          textValue={email}>
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-[0.14em] text-default-500">
              Signed in as
            </span>
            <span className="text-sm font-medium">{email}</span>
          </div>
        </DropdownItem>
        <DropdownItem key="signout" color="danger" onPress={onSignOut}>
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );

  if (showLabel) {
    return dropdown;
  }

  return (
    <Tooltip
      content={email}
      placement="right"
      delay={100}
      isDisabled={isDropdownOpen}>
      {dropdown}
    </Tooltip>
  );
}

function getInitials(value: string) {
  if (!value) {
    return "RC";
  }

  const localPart = value.split("@")[0] ?? value;
  const cleaned = localPart
    .split(/[._\- ]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "");

  return cleaned.join("") || localPart.slice(0, 2).toUpperCase();
}

function TableNavIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8">
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10.5h17M9 4.5v15" />
    </svg>
  );
}

function WarehouseNavIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 10.5 12 4l9 6.5" />
      <path d="M5 10.5v8h14v-8" />
      <path d="M9 18.5v-5h6v5" />
    </svg>
  );
}

function DocumentNavIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M7 3.5h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" />
      <path d="M14 3.5v4h4" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}

function UsersNavIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M15.5 10a2.5 2.5 0 1 0 0-5" />
      <path d="M3.5 19a5 5 0 0 1 10 0" />
      <path d="M14 18a4 4 0 0 1 6.5-2.9" />
    </svg>
  );
}

function MobileMenuGlyph({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center">
      <span
        aria-hidden="true"
        className={`absolute h-[2px] w-5 rounded-full bg-current transition-all ${sidebarMotionClass} ${
          open ? "rotate-45" : "-translate-y-[6px]"
        }`}
      />
      <span
        aria-hidden="true"
        className={`absolute h-[2px] w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
          open ? "scale-x-0 opacity-0" : "opacity-100"
        }`}
      />
      <span
        aria-hidden="true"
        className={`absolute h-[2px] w-5 rounded-full bg-current transition-all ${sidebarMotionClass} ${
          open ? "-rotate-45" : "translate-y-[6px]"
        }`}
      />
    </span>
  );
}

function DropdownChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
