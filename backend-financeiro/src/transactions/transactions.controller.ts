import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '../auth/auth.guard'; 
import { Interface } from 'readline';
import { Transaction } from 'firebase-admin/firestore';

class TransactionDTO{
    amount: number;
    category: string;
    description?: string;
    date: Date; 
    type: 'income' | 'expense';
}


@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post('add')
    create(@Body() transaction: TransactionDTO, @Req() req) {
        return this.transactionsService.create(transaction, req.user.uid);
    }

    @Get('all')
    findAll(@Req() req) {
        return this.transactionsService.findAll(req.user.uid);
    }

    @Get('month')
    findAllByMonth(@Req() req) {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        console.log("Mês atual:", month, "Ano atual:", year, req.user.uid);
        return this.transactionsService.findAllByMonth(req.user.uid, month, year);
    }
}
