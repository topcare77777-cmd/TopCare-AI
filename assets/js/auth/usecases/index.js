/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * File         : assets/js/auth/usecases/index.js
 * Layer        : Business Use Case Barrel Export
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Description  : Centralized barrel export for authentication use cases.
 * -----------------------------------------------------------------
 */

import { RegisterUseCase } from "./register.usecase.js";
import { LoginUseCase } from "./login.usecase.js";
import { LogoutUseCase } from "./logout.usecase.js";

export {
    RegisterUseCase,
    LoginUseCase,
    LogoutUseCase
};

export default {
    RegisterUseCase,
    LoginUseCase,
    LogoutUseCase
};