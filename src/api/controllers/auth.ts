import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import crypto from 'crypto';

import { v4 as uuidv4 } from 'uuid';
import { asyncHandler } from '../../helper';
import { prisma } from '../../../lib/prisma';
import { createUserSchema } from '../../schemas/auth';


export const authController = {
  signup: asyncHandler(async (req, res) => {
    const user:Partial<User> = req.body;

    const parsedUser = await createUserSchema.safeParseAsync(user)
    
    if (parsedUser.error){
      res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
      return;
    }

    const {email,name,password}=parsedUser.data
    const sanitizedEmail = email.toLowerCase();
    const sanitizedName = name.toLowerCase()
    const hashedPassword = await bcrypt.hash(password, 12);
    const accessToken = crypto
      .createHash('sha256')
      .update(uuidv4())
      .digest('hex');
   const createdUser = await prisma.user.create({
      data:{
        name:sanitizedName,
        email:sanitizedEmail,
        password:hashedPassword,
        accessToken
      } 
    });

    res.json({
      accessToken: accessToken,
      email: sanitizedEmail,
      user:{
        id:createdUser.id,
        name:createdUser.name,
        emailVerified:createdUser.emailVerified,
        image:createdUser.image
      },
      role: createdUser.subscriptionRole
    });
  }),
  signin: asyncHandler(
    async (req, res) => {
      const {
        email, password 
      } = req.body;
      const sanitizedEmail:string = email.toLowerCase();
      const user = await prisma.user.findFirst({
        where: { email: sanitizedEmail }
      });
  
      if (!user) {
        res.status(401).json({ message: 'Email inválido' });
        return;
      }
      
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      
      res.json({
        email: sanitizedEmail,
        accessToken: user.accessToken,
        user:{
          id:user.id,
          name:user.name,
          emailVerified:user.emailVerified,
          image:user.image
        },
        role:user.subscriptionRole
      });
    }
  ),
  session: asyncHandler(async (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authorization.split(' ')[1];
    const user = await prisma.user.findFirst({
      where:{
        accessToken:token
      }
    });

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    const newAccessToken = crypto
      .createHash('sha256')
      .update(uuidv4())
      .digest('hex');
    
    await prisma.user.update({
      where: { id: user.id }, 
      data: { accessToken: newAccessToken }
    });
    res.json({ 
      accessToken: newAccessToken,
      email: user.email,
      user:{
        id:user.id,
        name:user.name,
        emailVerified:user.emailVerified,
        image:user.image
      },
      role:user.subscriptionRole
    });
  }),
  secure: asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const token = authorization.split(' ')[1];
    const user = await prisma.user.findFirst({
      where:{
        accessToken:token
      },
      include:{
        salons: true,
      }
    }
    );
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    req.user = user
    next();
  })
};