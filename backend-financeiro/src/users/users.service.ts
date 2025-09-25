import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';  
import { Timestamp } from 'firebase-admin/firestore';

export interface UserProfile{
    uid: string;
    email: string;
    nome: string;
    createdAt: FirebaseFirestore.Timestamp;
}

@Injectable()
export class UsersService {
    private userCollection;

    constructor(private firebaseService: FirebaseService){
        // ACESSA A COLEÇÃO NO FIRESTONE
        this.userCollection = this.firebaseService.getFirestore().collection('users');
    }

    async create (userProfile: Omit<UserProfile, 'createdAt'>): Promise<UserProfile> {
        const newUser: UserProfile = {
            ...userProfile,
            createdAt: Timestamp.now(),
        };

        await this.userCollection.doc(userProfile.uid).set(newUser)

        return newUser;
    }
}
