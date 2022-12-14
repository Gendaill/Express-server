const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { number } = require('joi');

class userService {

    constructor() {
        this.user = [];
        this.generate();
    }

    generate() {
        const limit = 50;
        for (let index = 0; index < limit; index++) {
            this.user.push({
                id: faker.datatype.uuid(),
                avatar: faker.image.avatar(),
                birthday: faker.date.birthdate({refDate: number }),
                email: faker.internet.email(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                sex: faker.name.sexType(),
            });
        }
    }

    async create(data) {
        const newuser = {
            id: faker.datatype.uuid(),
            ...data,
        }
        this.user.push(newuser);
        return newuser;
    }

    find() {
        return new Promise((resolve) => {
            resolve(this.user);
        })
    }

    async findOne(id) {
        const user = this.user.find(item => item.id === id);
        if (!user) {
            throw new boom.notFound(`User ${id} not found`);
        }
        return user;
    }

    async  update(id, changes){
        const index = this.user.findIndex(item => item.id === id);
        if (index === -1) {
            throw new boom.notFound(`User ${id} not found`);
        }
        const user = this.user[index];
        this.user[index] = {
          ...user,
          ...changes
        };
        return this.user[index];
      }

    async delete(id) {
        const index = this.user.findIndex(item => item.id === id);
        if (index === -1) {
            throw new boom.notFound(`User ${id} not found`);
        }
        this.user.splice(index, 1);
        return { id };
      }
}

module.exports = userService;