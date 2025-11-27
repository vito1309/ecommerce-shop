import { UseCart } from "@/cases/cart/hooks/use-cart"
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "../button";
import { Badge } from "../badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../dropdown-menu";
import { SearchBar } from "@/cases/products/components/search-bar";

export function Header() {

    const { cart } = UseCart();
    const { user, signOut } = useAuth();

    return (
        <header className="w-full border-b bg-white">
            <div className="container mx-auto flex items-center justify-between py-4 px-4 gap-4">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
                    <ShoppingCart className="text-green-600" />
                    <h1 className="text-lg font-bold">
                        <span className="font-light">Mater</span>Shop
                    </h1>
                </Link>

                <SearchBar />

                <div className="flex items-center gap-2">
                    {!user && (
                        <Link to="/signin">
                            <Button
                                variant="outline"
                                className="border-green-600 text-green-600 hover:bg-green-50">
                                Entrar
                            </Button>
                        </Link>
                    )}

                    <Link to="/cart" className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-green-700 relative">
                            <ShoppingCart />
                            {cart.items.length > 0 && (
                                <Badge
                                    className={
                                        cn('absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1',
                                            'font-mono tabular-nums bg-green-600 text-white'
                                        )
                                    }
                                >
                                    {cart.items.length}
                                </Badge>
                            )}
                        </Button>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:text-green-700">
                                <User />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {user && (
                                <>
                                    <div className="px-2 py-1.5 text-sm font-semibold">
                                        {user.name || user.email}
                                    </div>
                                    <DropdownMenuSeparator />
                                </>
                            )}
                            <DropdownMenuItem asChild>
                                <Link to="/orders">Meus Pedidos</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => signOut()}
                                variant="destructive"
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

        </header>
    )
}
