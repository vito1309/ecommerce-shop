import { HttpException, Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        this.supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_KEY!
        )
    }


    async signUp(email: string, password: string){
        const {data, error} =await this.supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        })

        if (error) throw error;
        return data.user;
        }
        
    async signIn(email: string, password: string){
        const {data, error} = await this.supabase.auth.signInWithPassword({
              email,
             password
        })

        if (error) {
            if (error.message.includes( 'Invalid login credentials')) {
                throw new HttpException('Credencial Inválida', 401)
            }
            throw new HttpException(error.message, 400)
        }

        return data;
    }
}