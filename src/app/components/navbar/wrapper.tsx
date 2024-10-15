"use client";

import brazilLogo from "@/assets/images/brazil-logo.png";
import logo from "@/assets/images/logo.png";
import usaLogo from "@/assets/images/usa-logo.png";

import { getData } from "@/lib/functions.api";
import { setLocale } from "@/lib/i18n";
import { Chip } from "@nextui-org/chip";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuToggle,
	User,
} from "@nextui-org/react";
import { capitalize } from "@nextui-org/shared-utils";
import type { Wallet } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkIfAdmin } from "components/navbar/constants";
import NavbarItems from "components/navbar/items";
import type { NavbarProps } from "components/navbar/types";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { FaMoon, FaSignOutAlt, FaSun, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

const NavbarWrapper = ({
	menuItems,
	pathname,
	theme,
	setTheme,
	profile,
}: NavbarProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();
	const [selectedLanguage, setSelectedLanguage] = React.useState<any>(
		new Set(["portuguese"]),
	);

	const t = useTranslations("Navbar");

	const { mutateAsync: mutateLogout } = useMutation({
		mutationFn: () => signOut({ callbackUrl: "/" }),
		mutationKey: ["logout-google"],
	});

	const { data: wallet } = useQuery({
		queryFn: async () => getData<Wallet>({ url: "/wallet" }),
		queryKey: ["wallet-navbar-get"],
		refetchOnWindowFocus: false,
		enabled: !!profile,
	});

	const locale = useLocale();

	const isAdmin = useMemo(() => {
		if (!profile) return false;
		return checkIfAdmin(profile);
	}, [profile]);

	return (
		<Navbar
			onMenuOpenChange={setIsMenuOpen}
			isMenuOpen={isMenuOpen}
			classNames={{
				item: [
					"[&>.nav-link]:data-[active=true]:text-foreground-700",
					"[&>.nav-link]:data-[active=true]:underline [&>.nav-link]:data-[active=true]:underline-offset-8",
					"[&>.nav-link]:hover:text-foreground-700 [&>.nav-link]:transition-all [&>.nav-link]:duration-300 [&>.nav-link]:ease-in-out",
					"[&>.nav-link]:hover:underline [&>.nav-link]:hover:underline-offset-8",
					"flex flex-col ",
				],
				wrapper: "max-w-none w-screen px-4 md:px-8 2xl:px-16 bg-main",
			}}
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close" : "Open"}
					className="md:hidden"
				/>
				<NavbarBrand
					className="text-2xl light:text-gray-800 dark:text-white"
					as={Link}
					href="/"
				>
					<Image
						src={logo}
						alt="Logo"
						width={150}
						height={150}
						className="h-[4.8rem] w-[5.2rem]"
					/>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden gap-4 md:flex" justify="center">
				{menuItems.map((item) => (
					<NavbarItems key={item.path} item={item} pathname={pathname} />
				))}
				{isAdmin && (
					<NavbarItems
						item={{
							name: "Registros",
							path: "/records",
							icon: "records",
						}}
						pathname={pathname}
					/>
				)}
			</NavbarContent>
			<NavbarMenu className={"pt-8"}>
				{menuItems.map((item) => (
					<NavbarItems key={item.path} item={item} pathname={pathname} />
				))}
				{isAdmin && (
					<NavbarItems
						item={{
							name: "Registros",
							path: "/records",
							icon: "records",
						}}
						pathname={pathname}
					/>
				)}
			</NavbarMenu>
			<NavbarContent justify="end">
				{!profile && (
					<>
						<NavbarItem>
							<Link
								className="nav-link cursor-pointer text-white"
								color="foreground"
								// href={item.path}
								onClick={() => router.push("/login")}
								title="Login or Register"
							>
								<span className="uppercase">Login</span>
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Dropdown placement="bottom-end" className="w-lg">
								<DropdownTrigger>
									<Button isIconOnly variant="light" radius="full">
										{locale === "en" ? (
											<Image
												src={usaLogo}
												alt="USA Flag"
												width={30}
												height={30}
												className="rounded-full object-cover"
											/>
										) : (
											<Image
												src={brazilLogo}
												alt="Brazil Flag"
												width={30}
												height={30}
												className="rounded-full object-cover"
											/>
										)}
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									aria-label="Language"
									variant="flat"
									selectionMode="single"
									selectedKeys={selectedLanguage}
									onSelectionChange={setSelectedLanguage}
								>
									<DropdownItem
										key="english"
										onClick={() => {
											setLocale("en");
											router.refresh();
										}}
										startContent={
											<Image
												src={usaLogo}
												alt="USA Flag"
												width={30}
												height={30}
												className="rounded-full object-cover"
											/>
										}
										textValue="Language: English"
									>
										English
									</DropdownItem>
									<DropdownItem
										key="portuguese"
										onClick={() => {
											setLocale("pt");
											router.refresh();
										}}
										startContent={
											<Image
												src={brazilLogo}
												alt="Brazil Flag"
												width={30}
												height={30}
												className="rounded-full object-cover"
											/>
										}
										textValue="Language: Português"
									>
										Português
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</NavbarItem>
					</>
				)}
				{profile && (
					<NavbarItem key="wallet">
						<div className="flex items-center gap-2">
							<Chip
								classNames={{
									content: "font-bold",
									base: "border-2",
								}}
								color="primary"
							>
								{wallet?.balance && wallet?.balance !== 0
									? wallet?.balance?.toLocaleString(undefined, {
											maximumSignificantDigits: 6,
											minimumFractionDigits: 3,
										})
									: 0}{" "}
								R$
							</Chip>
						</div>
					</NavbarItem>
				)}
				{profile && (
					<NavbarItem key="profile" title={profile?.name ?? ""}>
						<Dropdown placement="bottom-end" className="w-lg">
							<DropdownTrigger>
								<User
									name={""}
									avatarProps={{
										name: profile?.email || "",
										showFallback: true,
										className: "mr-2 cursor-pointer",
										src: profile?.image || undefined,
									}}
									classNames={{
										description:
											"hidden cursor-pointer 2xs:block text-foreground-700",
										name: "hidden cursor-pointer 2xs:block",
									}}
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label="Perfil" variant="flat">
								<DropdownItem
									key="email"
									startContent={<FaUser />}
									textValue={profile?.email}
									onClick={() => router.push("/profile")}
								>
									<div className="flex flex-col">
										<span>{t("my-profile")}</span>
										<span className="text-xs italic">{profile?.email}</span>
									</div>
								</DropdownItem>
								<DropdownItem
									key="theme"
									onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
									startContent={theme === "dark" ? <FaMoon /> : <FaSun />}
									textValue={`Theme: ${capitalize(theme ?? "light")}`}
								>
									{t("theme")}: {capitalize(theme ?? "light")}
								</DropdownItem>
								<DropdownItem
									key="language"
									onClick={() => {
										setLocale(locale === "en" ? "pt" : "en");
										router.refresh();
									}}
									startContent={
										locale === "en" ? (
											<Image
												src={usaLogo}
												alt="USA Flag"
												width={14}
												height={14}
												className="rounded-full object-cover"
											/>
										) : (
											<Image
												src={brazilLogo}
												alt="Brazil Flag"
												width={14}
												height={14}
												className="rounded-full object-cover"
											/>
										)
									}
									textValue={`Language: ${locale === "en" ? "English" : "Português"}`}
								>
									{locale === "en" ? "English" : "Português"}
								</DropdownItem>
								<DropdownItem
									onClick={() =>
										mutateLogout()
											.then(async () => {
												toast.success("Logout successful");
											})
											.catch(() => {
												toast.error("Logout failed");
											})
									}
									key="logout"
									color="danger"
									startContent={<FaSignOutAlt className="text-danger" />}
									textValue={t("logout")}
								>
									{t("logout")}
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</NavbarItem>
				)}
			</NavbarContent>
		</Navbar>
	);
};

export default NavbarWrapper;
