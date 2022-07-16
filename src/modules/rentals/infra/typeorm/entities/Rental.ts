import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

// @Entity('rentals')
class Rental {
    // @PrimaryColumn()
    id: string;

    // @Column()
    car_id: string;

    // @Column()
    user_id: string;

    start_date: Date;

    end_date: Date;

    expected_return_date: Date;

    // @Column()
    total: number;

    // @CreateDateColumn()
    created_at: Date;

    // @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Rental };
