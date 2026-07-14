TopCare Kernel

Responsibility

- Register Modules
- Start Application
- Execute Modules
- Lifecycle Manager

Flow

main.js

↓

bootstrap()

↓

Kernel

↓

Modules

↓

Renderer

↓

Component

↓

DOM

Rules

Modules never call each other.

Kernel controls execution.

Kernel is the application lifecycle.