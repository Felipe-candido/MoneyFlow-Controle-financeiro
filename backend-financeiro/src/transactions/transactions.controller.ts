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

    @Get()
    findAll(@Req() req) {
        return this.transactionsService.findAll(req.user.uid);
    }
}
