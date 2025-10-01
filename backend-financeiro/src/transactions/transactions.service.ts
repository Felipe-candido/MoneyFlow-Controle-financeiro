import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';


@Injectable()
export class TransactionsService {
    private collection;

    constructor(private firebaseService: FirebaseService){
        this.collection = this.firebaseService.getFirestore().collection('transactions');
    }


    // CRIA UMA NOVA TRANSAÇÃO NO BANCO DE DADOS
    async create(createTransactionDTO: any, userId: string) {
        console.log("=== SERVICE CREATE DEBUG ===");
        console.log("DTO received:", createTransactionDTO);
        console.log("DTO type:", createTransactionDTO.type);
        console.log("User ID:", userId);
        
        const dateString = createTransactionDTO.date;
        const date = new Date(dateString);

        const newTransaction = {
            ...createTransactionDTO,
            date: date,
            userId,
            createdAt: new Date(),
        };

        console.log("Transaction to save:", newTransaction);
        console.log("Transaction type being saved:", newTransaction.type);
        console.log("=============================");

        const docRef = await this.collection.add(newTransaction);
        
        return { id: docRef.id, ...newTransaction };
    }


    // BUSCA TODAS AS TRANSAÇÕES DO USUÁRIO
    async findAll(userId: string) {
        const snapshot = await this.collection.where('userId', '==', userId).get();
        const transactions = snapshot.docs.map(doc => {
            const data = doc.data()
            return{
                id: doc.id,  
                ...doc.data(),
               date: data.date.toDate()
            }
         });
        return transactions;
    }


    // BUSCA TODAS AS TRANSAÇÕES DO MES ATUAL
    // BUSCA TODAS AS TRANSAÇÕES DO MES ATUAL
    async findAllByMonth(userId: string, month: number, year: number) {
        console.log("--------------------------------");
        console.log("Executando busca por mês...");
        console.log("Procurando por userId:", userId);
        console.log("Mês:", month, "Ano:", year);
        console.log("--------------------------------");
    
        // Primeiro, vamos buscar todas as transações do usuário para debug
        const allUserTransactions = await this.collection
            .where('userId', '==', userId)
            .get();
        
        console.log("Total de transações do usuário:", allUserTransactions.docs.length);
        
        // Se não há transações, retorna array vazio
        if (allUserTransactions.docs.length === 0) {
            console.log("Nenhuma transação encontrada para o usuário");
            return [];
        }
    
        // Filtrar transações do mês atual manualmente
        const currentMonthTransactions = allUserTransactions.docs
            .map(doc => {
                const data = doc.data();
                const transactionDate = data.date?.toDate ? data.date.toDate() : new Date(data.date);
                return {
                    id: doc.id,
                    ...data,
                    date: transactionDate
                };
            })
            .filter(transaction => {
                const transactionMonth = transaction.date.getMonth() + 1;
                const transactionYear = transaction.date.getFullYear();
                return transactionMonth === month && transactionYear === year;
            });
        
        console.log("Transações do mês filtradas manualmente:", currentMonthTransactions.length);
        console.log("Transações do mês no service:", currentMonthTransactions);
        
        return currentMonthTransactions;
    }


    // CALCULA O BALANÇO TOTAL (RECEITAS - DESPESAS) DO USUÁRIO
    async calculateBalance(userId: string) {
        let balance = 0;
        let income = 0;
        let expense = 0;

        const transactions = await this.findAll(userId);
        
        transactions.forEach(transaction => {
            if(transaction.type === 'income'){
                income += transaction.amount;
                balance += transaction.amount;
            } else if(transaction.type === 'expense'){
                expense += transaction.amount;
                balance -= transaction.amount;
            }
        });

        return { balance, income, expense }
    }


    // CALCULA O GASTO POR CATEGORIA
    async balanceCategory(userId: string){
        const transactions = await this.findAll(userId)
    }
}
