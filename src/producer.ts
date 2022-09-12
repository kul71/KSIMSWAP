export default class producer {
    create(msg:string) {
        console.log(msg);
        const omsg =  JSON.parse(msg);
        console.log(omsg);
    }
}
export {};
