export class User {
    constructor(//public user_id: any,
                public user_id: number,
                public first_name: string,
                public last_name: string,
                public email: string,
                public address: string,
                //public contact_number: any,
                public contact_number: string,
                public password: string,
                //public dob: Date,
                public dob: string,
                public gender: string,
                public account_type: string,
                //public date_created: Date
                public date_created: string
    ) {}
}
	