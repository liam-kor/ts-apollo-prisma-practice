import { prisma } from './db';
import { PrismaClient } from '@prisma/client';
import express from 'express';

export interface Context {
    request: {
      req: express.Request;
    };
    prisma: PrismaClient;
  }

export const createContext = async (request: { req: express.Request }) => ({
    request,
    prisma,
});
  