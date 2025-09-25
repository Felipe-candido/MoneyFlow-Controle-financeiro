// MÓDULO PARA GERENCIAR A CONEXÃO COM O FIREBASE
import { Injectable, OnModuleInit } from "@nestjs/common";
import * as admin from "firebase-admin";
import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';


@Module({
    providers: [FirebaseService],
    exports: [FirebaseService],
})
export class FirebaseModule {}
