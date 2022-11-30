import { Inventory } from "./inventory";
import { User } from "./user";

export class Request {
    constructor(
        public request_id: number,
        public inv_id: number,
        public product: Inventory,
        public nurse_id: number,
        public nurse: User,
        public req_qty: number,
        public status: string,
        public date_created: string
    ){}
}
