import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';


@Injectable()
export class TransactionsService {
    private collection;

    constructor(private firebaseService: FirebaseService){
        this.collection = this.firebaseService.getFirestore().collection('transactions');
    }

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

    async findAll(userId: string) {
        const snapshot = await this.collection.where('userId', '==', userId).get();
        const transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return transactions;
    }

    async findAllByMonth(userId: string, month: number, year: number) {
        const startDate = new Date(Date.UTC(year, month - 1, 1));
        const endDate = new Date(Date.UTC(year, month, 1));
        
        console.log("--------------------------------");
        console.log("Executando busca por mês em UTC...");
        console.log("Procurando por userId:", userId);
        console.log("Data de início (UTC):", startDate.toISOString()); 
        console.log("Data de fim (UTC):", endDate.toISOString());     
        console.log("--------------------------------");
    
    // Último dia do mês]
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
}
