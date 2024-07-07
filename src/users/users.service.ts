import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import {genSaltSync,hashSync} from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  hashPassword = (password : string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash
  }


  async create(createUserDto: CreateUserDto) {
    const hashPassword = this.hashPassword(createUserDto.password)
    let user = await this.UserModel.create({email:createUserDto.email,
      password : hashPassword,name: createUserDto.name})
    return user

  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return "user not found"
    return this.UserModel.findOne({
      _id:id
    })
  }

  update(updateUserDto: UpdateUserDto) {
    return this.UserModel.updateOne({_id:updateUserDto._id}, {
      ...updateUserDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
