import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';


const serviceAccount = require('../../serviceAccountKey.json');


@Injectable()
export class FirebaseService {
    private db: admin.firestore.Firestore;

    constructor() {
        // Initialize the Firebase app synchronously so other providers can use getFirestore()
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }
        this.db = admin.firestore();
        console.log('Firebase initialized');
    }

    getFirestore(){
        return this.db;
    }

    getAuth(){
        return admin.auth();
    }
}