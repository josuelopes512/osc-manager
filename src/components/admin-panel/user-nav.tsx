"use client";

import { LayoutGrid, LogOut, User } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { signOut, useSession } from "next-auth/react";

export function UserNav() {
	const { data } = useSession();
	const user = data?.userData;

	return (
		<DropdownMenu>
			<TooltipProvider disableHoverableContent>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="relative h-8 w-8 rounded-full"
							>
								<Avatar className="h-8 w-8">
									<AvatarImage src="#" alt="Avatar" />
									<AvatarFallback className="bg-transparent">
										{user?.name?.[0] ?? ""}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent side="bottom">Perfil</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user?.name}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="hover:cursor-pointer" asChild>
						<Link href="/" className="flex items-center">
							<LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
							Dashboard
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="hover:cursor-pointer"
					onClick={() => {
						signOut();
					}}
				>
					<LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
