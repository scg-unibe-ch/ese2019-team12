export class Event {

    constructor(
        public id: number,
        public userId: number,
        public name: string,
        public description: string,
        public date: string,
        public services
    ) {}
}
