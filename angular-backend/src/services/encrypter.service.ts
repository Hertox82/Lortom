export class Encrypter {

    static decode(c: string) {
        const list = [];
        if (c) {
            const cArr = c.split('.', 2);
            const payload = atob(cArr[1]);
            list.push(cArr[1]);
            list.push(payload);
        }
        return list;
    }
}
