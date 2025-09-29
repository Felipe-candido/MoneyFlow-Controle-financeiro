import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';


@Injectable()
export class TransactionsService {
    private collection;

    constructor(private firebaseService: FirebaseService){
        this.collection = this.firebaseService.getFirestore().collection('transactions');
    }

    async create(createTransactionDTO: any, userId: string) {
        const newTransaction = {
            ...createTransactionDTO,
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
}
