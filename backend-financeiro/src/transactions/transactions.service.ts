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
        const dateString = createTransactionDTO.date;
        const date = new Date(dateString);

        const newTransaction = {
            ...createTransactionDTO,
            date: date,
            userId,
            createdAt: new Date(),
        };

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
    async findAllByMonth(userId: string, month: number, year: number) {
        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 1));
        
        console.log("--------------------------------");
        console.log("Executando busca por mês em UTC...");
        console.log("Procurando por userId:", userId);
        console.log("Data de início (UTC):", startDate.toISOString()); 
        console.log("Data de fim (UTC):", endDate.toISOString());     
        console.log("--------------------------------");
    
        const snapshot = await this.collection
            .where('userId', '==', userId)
            .where('date', '>=', startDate)
            .where('date', '<', endDate)
            .get();
        
        const transactions = snapshot.docs.map(doc => { 
            const data = doc.data()
            return{
                id: doc.id, 
                ...data,
                date: data.date.toDate() // Converte Firestore Timestamp para Date';
            }
        });
        
        console.log("Transações do mês no service:", transactions);
        console.log("quantidadae:", transactions.length);
        return transactions;
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
