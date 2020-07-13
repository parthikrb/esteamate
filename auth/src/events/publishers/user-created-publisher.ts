import { Publisher, Subjects, UserCreatedEvent } from '@parthikrb/common';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
    readonly subject = Subjects.UserCreated;
}