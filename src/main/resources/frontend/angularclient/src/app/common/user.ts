export class User {
    constructor(private user_id: int,
                private first_name: string,
                private last_name: string,
                private email: string,
                private address: string,
                private contact_number: int,
                private password: string,
                private dob: Date,
                private gender: string,
                private account_type: string,
                private date_created: Date
    )
}
	