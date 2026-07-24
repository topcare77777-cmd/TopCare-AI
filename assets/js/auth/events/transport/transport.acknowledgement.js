/**
 * TopCare AI Platform V2.0.0
 * Transport Acknowledgement Settlement Status (ACK, NACK, REQUEUE)
 * Path: assets/js/auth/events/transport/transport.acknowledgement.js
 */

const TransportAckStatus = Object.freeze({
    ACK: 'ACK',
    NACK: 'NACK',
    REQUEUE: 'REQUEUE'
});

class TransportAcknowledgement {
    constructor(status, reason = null) {
        this.status = status;
        this.reason = reason;
        this.timestamp = new Date().toISOString();
        Object.freeze(this);
    }

    static ack() { return new TransportAcknowledgement(TransportAckStatus.ACK); }
    static nack(reason) { return new TransportAcknowledgement(TransportAckStatus.NACK, reason); }
    static requeue(reason) { return new TransportAcknowledgement(TransportAckStatus.REQUEUE, reason); }
}