import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupabaseModule } from "src/lib/supabase/supabase.module";
import { CustomerModule } from "../customers/customer.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

@Module({
  imports: [SupabaseModule, CustomerModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}