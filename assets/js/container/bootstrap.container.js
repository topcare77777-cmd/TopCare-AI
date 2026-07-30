/**
 * file: assets/js/container/bootstrap.container.js
 */

import { Container } from './container.service.js';
import { ApiClient } from '../api/index.js';
import { Repository } from '../repository/index.js';
import { UserService } from '../services/index.js';

// Wiring enterprise dependencies into the DI Container SSOT
Container.register("ApiClient", ApiClient);
Container.register("Repository", Repository);
Container.register("UserService", UserService);