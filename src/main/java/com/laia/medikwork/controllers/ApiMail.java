package com.laia.medikwork.controllers;

import com.laia.medikwork.Models.MailModel;
import com.laia.medikwork.Services.MailServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacto")
@CrossOrigin(origins = "*") // Ajusta según tu frontend
public class ApiMail {

    private final MailServices emailService;

    public ApiMail(MailServices emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<String> recibirFormulario(@RequestBody MailModel form) {
        try {
            emailService.enviarFormularioAEmpresa(form);
            emailService.enviarConfirmacionAlUsuario(form);
            return ResponseEntity.ok("Mensaje enviado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al enviar el correo: " + e.getMessage());
        }
    }
}
