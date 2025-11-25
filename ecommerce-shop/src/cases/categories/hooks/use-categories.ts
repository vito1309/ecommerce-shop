import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CateogryService } from "../services/category.service";
import type { CategoryDTO } from "../dtos/category.dto";
import { toast } from "react-toastify";


export function useCategories(){ //hook que retorna todos os dados das categories
    return useQuery<CategoryDTO[]>({ //o hook retorna o estado, além dos dados, coisa que a função sozinha não faz
        queryKey: ['categories'], 
        queryFn: CateogryService.list 
    });
}

export function useCategory(id: string){ //retorna apenas os IDs
    return useQuery<CategoryDTO>({
        queryKey:['category', id],
        queryFn: () => CateogryService.getById(id),
        enabled: !!id 
        //O uso do '!' indica a negação de uma informação, assim deixando habilitado que categorias que não possuam ID sejam apresentadas
        //Ao utilizar '!!' a negação informada anteriormente é negada, assim apresentado somente as categorias com ID
        //...ao realizar a busca pelos IDs e for identificado IDs iguais aos carregados anteriormente, 
        //..esta informação é puxada do cache
    });    
}

export function userCreateCategory(){
    const queryClient = useQueryClient();
    return useMutation<CategoryDTO, Error, Omit<CategoryDTO, 'id'>>({//A informação ID será omitida caso de um erro
        mutationFn: (category: Omit<CategoryDTO, 'id'>) => CateogryService.create(category),
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey: ['categories']})
            toast.success('Registro adicionado com sucesso!')
        },
            onError: (error) => {
                toast.error(`Erro ao adicionar: ${error.message}`)
            }
          })
    };


export function userUpdateCategory(){
    return useMutation<CategoryDTO, Error, {id: string, category: CategoryDTO}>({
        mutationFn: ({id, category}) => CateogryService.update(id, category)
    });
}

export function userDeleteCategory(){
    return useMutation<void, Error, string>({//<void> não traz informações
        mutationFn: (id: string) => CateogryService.delete(id)
    });
}