// Assume current user session is available at the global variable: `session`.
// This contains the `userId` string of the current user, and a `roles` property which is an array of string based roles.

import * as mongodb from 'mongodb';

import { AuditLogEntry } from './audit-log-entry.interface';
import { User } from './user.interface';

export class UserRepository {
    private readonly CONNECTION_STRING: string = 'mongodb://localhost:27017/myproject';
    private readonly DATABASE_NAME: string = 'myproject';

    async getUser(userId: string): Promise<User> {
        // Check current user is allowed to do this
        if (!session.roles.includes('get_user')) {
            throw new Error('Insufficient privileges to perform this action');
        }

        // Try to find the user
        const client = await mongodb.MongoClient.connect(this.CONNECTION_STRING);
        const database = client.db(this.DATABASE_NAME);

        const user = await database.collection('users').findOne({
            _id: new mongodb.ObjectID(userId)
        });

        client.close();

        // Log access to an audit log
        const auditLogEntry: AuditLogEntry = {
            resource: `users/${userId}`,
            action: 'GET',
            requestedByUserId: session.userId,
            requestedAt: new Date().toISOString()
        };

        await database.collection('audit').insertOne(auditLogEntry);

        // Return the user to the caller
        return user;
    }

    /**
     * The following methods are included for completeness, but do not need to be
     * implemented as part of the refactoring exercise.
     */

    async addUser(user: Partial<User>): Promise<User> {
        // noop
        return new Promise<User>((resolve, reject) => reject('Not implemented'));
    }

    async removeUser(userId: string) {
        // noop
        return new Promise<User>((resolve, reject) => reject('Not implemented'));
    }

    async updateUser(user: User): Promise<User> {
        // noop
        return new Promise<User>((resolve, reject) => reject('Not implemented'));
    }
}
