import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private firebaseService: FirebaseService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Token de autenticação não encontrado');
        }

        try {
            const decodedToken = await this.firebaseService.getAuth().verifyIdToken(token);
            // ANEXA OS DADOS DO USUÁRIO DECODIFICADOS NA REQUISIÇÃO
            request['user'] = decodedToken
        }
        catch (error) {
            console.log("Erro na verificação do token:", error);
            throw new UnauthorizedException('Token de autenticação inválido');
        }

        return true;
    }
    // Método privado para extrair o token do cabeçalho "Authorization"
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}