"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMenuList } from "@/lib/menu-list";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface MenuProps {
	isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
	const pathname = usePathname();
	const menuList = getMenuList(pathname);

	return (
		<ScrollArea className="[&>div>div[style]]:!block">
			<nav className="pt-4 h-full w-full">
				<ul
					className={cn(
						"flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)]",
						"lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2",
					)}
				>
					{menuList.map(({ groupLabel, menus }) => (
						<li
							className={cn("w-full", groupLabel ? "pt-5" : "")}
							key={groupLabel}
						>
							{(isOpen && groupLabel) || isOpen === undefined ? (
								<p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
									{groupLabel}
								</p>
							) : (
								<p className="pb-2" />
							)}
							{menus.map(({ href, label, icon: Icon, active, submenus }) =>
								!submenus || submenus.length === 0 ? (
									<div className="w-full" key={label}>
										<TooltipProvider disableHoverableContent>
											<Tooltip delayDuration={100}>
												<TooltipTrigger asChild>
													<Button
														variant={
															(active === undefined &&
																pathname.startsWith(href)) ||
															active
																? "secondary"
																: "ghost"
														}
														className="w-full justify-start h-10 mb-1"
														asChild
													>
														<Link href={href}>
															<span
																className={cn(isOpen === false ? "" : "mr-4")}
															>
																<Icon size={18} />
															</span>
															<p
																className={cn(
																	"max-w-[200px] truncate",
																	isOpen === false
																		? "-translate-x-96 opacity-0"
																		: "translate-x-0 opacity-100",
																)}
															>
																{label}
															</p>
														</Link>
													</Button>
												</TooltipTrigger>
												{isOpen === false && (
													<TooltipContent side="right">{label}</TooltipContent>
												)}
											</Tooltip>
										</TooltipProvider>
									</div>
								) : (
									<div className="w-full" key={label}>
										<CollapseMenuButton
											icon={Icon}
											label={label}
											active={
												active === undefined
													? pathname.startsWith(href)
													: active
											}
											submenus={submenus}
											isOpen={isOpen}
										/>
									</div>
								),
							)}
						</li>
					))}
					<li className="w-full grow flex items-end">
						<TooltipProvider disableHoverableContent>
							<Tooltip delayDuration={100}>
								<TooltipTrigger asChild>
									<Button
										onPress={() => {
											signOut();
										}}
										variant="outline"
										className="w-full justify-center h-10 mt-5"
									>
										<span className={cn(isOpen === false ? "" : "mr-4")}>
											<LogOut size={18} />
										</span>
										<p
											className={cn(
												"whitespace-nowrap",
												isOpen === false ? "opacity-0 hidden" : "opacity-100",
											)}
										>
											Sair
										</p>
									</Button>
								</TooltipTrigger>
								{isOpen === false && (
									<TooltipContent side="right">Sair</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</li>
				</ul>
			</nav>
		</ScrollArea>
	);
}
