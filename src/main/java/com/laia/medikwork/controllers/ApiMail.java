package com.laia.medikwork.controllers;

import com.laia.medikwork.Models.MailModel;
import com.laia.medikwork.Services.MailServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacto")
@CrossOrigin(origins = "*")
public class ApiMail {

    private final MailServices emailService;

    public ApiMail(MailServices emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/smtp-test")
    public String smtpTest() {
        try {
            java.net.Socket socket = new java.net.Socket();
            socket.connect(
                    new java.net.InetSocketAddress("smtp.gmail.com", 587),
                    5000
            );
            socket.close();
            return "Conexion SMTP exitosa";
        } catch (Exception e) {
            return e.toString();
        }
    }

    @PostMapping
    public ResponseEntity<String> recibirFormulario(@RequestBody MailModel form) {
        try {
            emailService.enviarFormularioAEmpresa(form);
            emailService.enviarConfirmacionAlUsuario(form);
            return ResponseEntity.ok("Mensaje enviado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("Error al enviar el correo: " + e.getMessage());
        }
    }
}