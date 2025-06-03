import { Response,ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';

type ErrorType = 
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientValidationError
  | Error
  | string
  | unknown;

interface ErrorResponse {
  status: number;
  message: string;
  details?: unknown;
}

export const handleError:ErrorRequestHandler = (res: Response, error: ErrorType) => {

  let response: ErrorResponse = {
    status: 500,
    message: 'Internal server error'
  };

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    response = handlePrismaError(error);
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    response = {
      status: 400,
      message: 'Validation error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    };
  }
  else if (error instanceof Error) {
    response = {
      status: 500,
      message: error.message
    };
  }
  else if (typeof error === 'string') {
    response = {
      status: 500,
      message: error
    };
  }
   res.status(response.status).json({
    success: false,
    error: response.message,
    ...(process.env.NODE_ENV === 'development' && { stack: error })
  });
return
};

const handlePrismaError = (error: Prisma.PrismaClientKnownRequestError): ErrorResponse => {
  switch (error.code) {
    case 'P2002':
      return {
        status: 409,
        message: 'Unique constraint violation',
        details: error.meta?.target
      };
    case 'P2025':
      return {
        status: 404,
        message: 'Resource not found'
      };
    case 'P2003':
      return {
        status: 400,
        message: 'Foreign key constraint failed'
      };
    default:
      return {
        status: 500,
        message: `Database error: ${error.code}`
      };
  }
};