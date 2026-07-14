# Universal Renderer

Seluruh section di TopCare AI menggunakan renderer yang sama.

Renderer bertugas:

- mengambil template HTML
- mengambil JSON
- mengirim data ke Component
- merender ke DOM

Module hanya memanggil render().

Component hanya menghasilkan HTML.

Framework menangani lifecycle.

Kernel menangani registrasi module.