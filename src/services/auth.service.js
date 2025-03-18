import bcrypt from 'bcryptjs';

export const userList = [{
    email: 'test@gmail.com',
    password: await bcrypt.hash('test123', 10),
}];
