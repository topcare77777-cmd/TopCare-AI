/**
 * TopCare AI Platform V2.0.0
 * IEventSerializer Contract Interface for pluggable message serialization (JSON, Protobuf, MessagePack)
 * Path: assets/js/auth/events/transport/serializer/event.serializer.interface.js
 */

class IEventSerializer {
    serialize(envelope) { throw new Error("Not implemented"); }
    deserialize(rawPayload) { throw new Error("Not implemented"); }
}

class JsonEventSerializer extends IEventSerializer {
    serialize(envelope) {
        return JSON.stringify(envelope);
    }

    deserialize(rawPayload) {
        if (typeof rawPayload === 'string') {
            return JSON.parse(rawPayload);
        }
        return rawPayload;
    }
}