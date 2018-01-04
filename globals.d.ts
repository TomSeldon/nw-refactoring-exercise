interface Session {
    userId: string;
    permissions: string[];
}

declare const session: Session;
