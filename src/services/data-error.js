export class DataError {
    constructor(message, data) {
        this.message = message;//the message is passed here
        this.data = data;//and the whole object that has the error
    };
}