class User {
    id: string;
    email: string;
    contactNumber: string;
    fullName: string;
    isActive: boolean;

    constructor(id: string, contactNumber: string, isActive: boolean, email: string = "", fullName: string = "") {
        this.id = id;
        this.contactNumber = contactNumber;
        this.email = email;
        this.fullName = fullName;
        this.isActive = isActive;
    }

    getId(): string {
        return this.id;
    }

    getContactNumber(): string {
        return this.contactNumber;
    }

    getEmail(): string {
        return this.email;
    }

    getFullName(): string {
        return this.fullName;
    }

    getIsActive(): boolean {
        return this.isActive;
    }

    setId(id: string): void {
        this.id = id;
    }

    setContactNumber(contactNumber: string): void {
        this.contactNumber = contactNumber;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setFullName(fullName: string): void {
        this.fullName = fullName;
    }
    
    setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }

    static fromJson(json: any): User {
        return new User(json.id, json.contactNumber, json.isActive, json.email, json.fullname);
    }
}

export default User;