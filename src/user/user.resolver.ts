import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserCreateInput } from 'src/@generated/user/user-create.input';
import { User } from 'src/@generated/user/user.model';
import { GqlAuthGuard } from 'src/auth/gqlAuth.guard';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users', nullable: false })
  async getUsers() {
    return this.userService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user', nullable: true })
  async getUserById(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User, { name: 'createUser' })
  async createUser(@Args('data') data: UserCreateInput): Promise<User> {
    return this.userService.createUser(data);
  }
}
