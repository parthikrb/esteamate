import { Publisher, ReleaseUpdatedEvent, Subjects } from "@parthikrb/common";


export class ReleaseUpdatedPublisher extends Publisher<ReleaseUpdatedEvent> {
    readonly subject = Subjects.ReleaseUpdated;
}