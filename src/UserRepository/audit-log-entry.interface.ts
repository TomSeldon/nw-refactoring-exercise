export interface AuditLogEntry {
    resource: string;
    action: string;
    requestedByUserId: string;
    requestedAt: string;
}
