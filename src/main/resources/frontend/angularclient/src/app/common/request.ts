export class Request {
    constructor(
        public request_id: number,
        public inv_id: number,
        public nurse_id: number,
        public req_qty: number,
        public status: string,
        public date_created: string
    ){}
}
