import { SidebarForm } from "@/components/layout/sidebar-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useCategory, userCreateCategory, userDeleteCategory, userUpdateCategory } from "../hooks/use-categories";
import { useEffect, useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { id } from "zod/v4/locales";


const formSchema = z.object({
  name: z.string().min(2, 'Informe pelo menos 2 caracteres').max(60, 'Máximo de 60 caracteres atingidos'),
})


export function CategoryForm() {
    const navigate = useNavigate()
    const {id} = useParams<{id: string}>();
    const {data, isLoading} = useCategory(id ?? '');

    const createCategory = userCreateCategory();
    const updateCategory = userUpdateCategory();
    const deleteCategory = userDeleteCategory()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: ''
        }
    });

    useEffect(()=>{
        if(data){
            form.reset({
                name: data.name
            }
            )
        
        }
    }, [data, form])    
    
    function onSubmit(value: z.infer<typeof formSchema>){
        if (id){
            updateCategory.mutate({
                id, 
                category: {
                    name: value.name
                }
            },{
                onSettled: () => {
                    navigate('/categories')
                }
            });
        } else   {
            createCategory.mutate(
               
                {name: value.name},
            {
                onSettled: () => {
                    navigate('/categories')
                }
            });
        }
    }

    function onDelete(){
        if (id) {
            deleteCategory.mutate(id,{
                onSettled: () => {
                    navigate('/categories')
                }
            })
        }
    }




return (
        <SidebarForm 
            {...(id && {onDelete: onDelete})}
            isLoading={isLoading}
            title={id ? "Atualizar Categoria" : "Cadastro de Categoria" }
            onSave={form.handleSubmit(onSubmit)}
        >
            <Form {...form}>
                <form className="space-y-4 ">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </form>
            </Form>
        </SideBarForm>
    )
}