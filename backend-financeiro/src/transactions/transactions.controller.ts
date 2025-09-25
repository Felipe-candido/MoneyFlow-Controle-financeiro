import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '../auth/auth.guard'; 


@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    create(@Body() createDTO: any, @Req() req) {
        return this.transactionsService.create(createDTO, req.user.uid);
    }

    @Get()
    findAll(@Req() req) {
        return this.transactionsService.findAll(req.user.uid);
    }
}
