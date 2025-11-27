import { Button } from "@/components/ui/button";
import { useCategories, useCategory } from "../hooks/use-categories";
import type { CategoryDTO } from "../dtos/category.dto";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export function CategoryMenu() {

        const{data:categories, isLoading} = useCategories();

        const[visibleItems, setVisibleItems] = useState<CategoryDTO[]>([])
        const[hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([])

        const[searchParams, setSearchParams] = useSearchParams();
        const categoryId = searchParams.get('categoryId') ?? undefined;

        const {data: activeCategory} = useCategory(categoryId!);


        useEffect(() => {
        if (Array.isArray(categories)) {
            setVisibleItems(categories.slice(0, 5));
            setHiddenItems(categories.slice(5));
        } else {
            setVisibleItems([]);
            setHiddenItems([]);
        }
        }, [categories]);


    function handleSelect(categoryId?: string) {
        const newParams = new URLSearchParams(searchParams)

        if (categoryId) {
            newParams.set('categoryId', categoryId)
        } else {
            newParams.delete('categoryId');
        }

        setSearchParams(newParams)
    }

    return(
        <nav className="w-full py-6 flex items-center justify-between">
            <div className="flex flex-col">
                <h5 className="font-semibold text-2xl text-slate-900">Vitrine Principal</h5>
                <p className="text-sm text-gray-500 font-medium">Tudo o que você precisa está aqui!</p>
            </div>
            <div className="flex items-center justify-end gap-4">
                <Button 
                    variant="ghost" 
                    onClick={() => handleSelect()}
                    className={`font-medium transition-all duration-300 relative group ${!categoryId ? "text-blue-600" : "text-gray-700 hover:text-gray-900"}`}
                >
                    Todos
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300 ${!categoryId ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
                </Button>
                {visibleItems.map((category) =>(
                    <Button
                        key={category.id}
                        variant="ghost"
                        onClick={() => handleSelect(category.id)}
                        className={`font-medium transition-all duration-300 relative group ${activeCategory?.id === category.id ? "text-blue-600" : "text-gray-700 hover:text-gray-900"}`}
                    >
                        {category.name}
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300 ${activeCategory?.id === category.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
                    </Button>
                ))}


                {hiddenItems.length > 0 && (

                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>                
                        <Button variant="ghost" className="font-medium text-gray-700 hover:text-gray-900">
                            Mais
                            <ChevronDown size={16}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {hiddenItems.map((category) => (
                            <DropdownMenuItem
                                key={category.id}
                                onClick={() => handleSelect(category.id)}
                                className={`font-medium ${activeCategory?.id === category.id ? "text-blue-600 bg-blue-50" : ""}`}
                            >
                                {category.name}
                            </DropdownMenuItem>
                            
                        ))}
                    </DropdownMenuContent>
                    </DropdownMenu>
)}
            </div>
        </nav>
    )
}