export interface Employee {
    id: string;
    employeeId: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

export type Status = 'ACTIVE' | 'PRONLY' | 'INVSNT';
