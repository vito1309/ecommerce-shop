import { UseCart } from "@/cases/cart/hooks/use-cart"
import { useAuth } from "@/cases/auth/hooks/use-auth";
import { ShoppingCart, User, Heart } from "lucide-react";
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
        <header className="w-full border-b border-gray-200 bg-white shadow-sm" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div className="container mx-auto flex items-center justify-between py-4 px-4 gap-4">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <ShoppingCart className="text-green-600 w-6 h-6" />
                    <h1 className="text-xl font-bold text-gray-900">
                        <span className="font-light">Mater</span><span className="font-bold">Shop</span>
                    </h1>
                </Link>

                <SearchBar />

                <div className="flex items-center gap-3">
                    {!user && (
                        <Link to="/signin">
                            <Button
                                variant="outline"
                                className="border-green-600 text-green-600 hover:bg-green-50 font-medium">
                                Entrar
                            </Button>
                        </Link>
                    )}

                    <Link to="/favorites">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-red-600 font-medium transition-colors">
                            <Heart className="w-5 h-5" />
                        </Button>
                    </Link>

                    <Link to="/cart" className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-green-700 relative transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            {cart.items.length > 0 && (
                                <Badge
                                    className={
                                        cn('absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1',
                                            'font-mono tabular-nums bg-green-600 text-white font-bold text-xs'
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
                                className="hover:text-green-700 transition-colors">
                                <User className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {user && (
                                <>
                                    <div className="px-2 py-1.5 text-sm font-bold text-gray-900">
                                        {user.name || user.email}
                                    </div>
                                    <DropdownMenuSeparator />
                                </>
                            )}
                            <DropdownMenuItem asChild>
                                <Link to="/orders" className="font-medium">Meus Pedidos</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => signOut()}
                                variant="destructive"
                                className="font-medium"
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
