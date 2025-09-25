import { Controller, Post, Body, UseGuards, Req, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

// DTO PARA CRIAÇÃO E VALIDAÇÃO DE USUARIO
class UserDTO {
    nome: string;
}

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('profile') // ROTA PARA CRIAR PERFIL DE USUARIO
    @UseGuards(AuthGuard)
    async createProfile(@Req() req, @Body() body: UserDTO){
        // CRIA O PERFIL DO USUARIO COM BASE NO UID E EMAIL DO TOKEN, QUE JA FOI VALIDADO PELO AUTHGUARD
        const { uid, email } = req.user;
        const { nome } = body;
        
        const userProfile = await this.usersService.create({
            uid,
            email,
            nome,
        })

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Perfil criado com sucesso',
            data: userProfile,
        }
    }   
}
