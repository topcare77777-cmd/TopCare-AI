/**
 * TopCare AI Platform V2.0.0
 * Result Object Pattern with AggregateError and robust serializeError support
 * Path: assets/js/auth/common/result.object.js
 */

function serializeError(error) {
    if (!error) return { code: "UNKNOWN_ERROR", message: "An unknown error occurred", details: null, inner: null, stack: null, errors: null };
    if (typeof error === 'string') {
        return { code: "UNKNOWN_ERROR", message: error, details: null, inner: null, stack: null, errors: null };
    }
    
    // Handle AggregateError specifically
    if (error instanceof AggregateError || (error.errors && Array.isArray(error.errors))) {
        return {
            code: error.code || "AGGREGATE_EXCEPTION",
            message: error.message || "Multiple errors occurred",
            details: error.details || null,
            inner: error.cause ? serializeError(error.cause) : null,
            stack: error.stack || null,
            errors: error.errors.map(err => serializeError(err))
        };
    }

    if (error instanceof Error) {
        return {
            code: error.code || "EXCEPTION",
            message: error.message,
            details: error.details || null,
            inner: error.cause ? serializeError(error.cause) : null,
            stack: error.stack || null,
            errors: null
        };
    }

    return {
        code: error.code || "UNKNOWN_ERROR",
        message: error.message || "An error occurred",
        details: error.details || null,
        inner: error.inner ? serializeError(error.inner) : null,
        stack: error.stack || null,
        errors: error.errors ? error.errors.map(err => serializeError(err)) : null
    };
}

class Result {
    constructor(isSuccess, value, error) {
        if (isSuccess && error) {
            throw new Error("InvalidOperation: A successful result cannot contain an error.");
        }
        if (!isSuccess && !error) {
            throw new Error("InvalidOperation: A failing result must contain an error.");
        }
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this._value = value;
        this._error = isSuccess ? null : deepFreeze(serializeError(error));

        deepFreeze(this);
    }

    get value() {
        if (!this.isSuccess) {
            throw new Error("Can't retrieve the value from a failed result.");
        }
        return this._value;
    }

    get error() {
        return this._error;
    }

    static ok(value) {
        return new Result(true, value, null);
    }

    static fail(error) {
        return new Result(false, null, error);
    }

    map(fn) {
        if (this.isFailure) return this;
        try {
            return Result.ok(fn(this._value));
        } catch (e) {
            return Result.fail(e);
        }
    }

    bind(fn) {
        if (this.isFailure) return this;
        try {
            return fn(this._value);
        } catch (e) {
            return Result.fail(e);
        }
    }

    tap(fn, onError = null) {
        if (this.isSuccess) {
            try {
                fn(this._value);
            } catch (e) {
                if (onError) {
                    onError(e);
                }
            }
        }
        return this;
    }

    ensure(predicate, errorObj = { code: "ASSERTION_FAILED", message: "Condition not met." }) {
        if (this.isFailure) return this;
        try {
            const isValid = predicate(this._value);
            return isValid ? this : Result.fail(errorObj);
        } catch (e) {
            return Result.fail(e);
        }
    }

    recover(fn) {
        if (this.isSuccess) return this;
        try {
            return Result.ok(fn(this._error));
        } catch (e) {
            return Result.fail(e);
        }
    }

    finally(fn) {
        try {
            fn();
        } catch (e) {}
        return this;
    }

    match(onSuccess, onFailure) {
        if (this.isSuccess) {
            return onSuccess(this._value);
        }
        return onFailure(this._error);
    }
}