package com.laia.medikwork.Services;

import com.laia.medikwork.Models.MailModel;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.context.Context;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailServices {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${app.email.destino}")
    private String emailDestino;

    public MailServices(JavaMailSender mailSender, SpringTemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void enviarFormularioAEmpresa(MailModel form) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");


        helper.setTo(emailDestino);
        helper.setSubject("[CONTACTO-WEB] Nuevo contacto de " + form.getNombre() + " " + form.getApellido());

        Context context = new Context();
        context.setVariable("nombre", form.getNombre());
        context.setVariable("apellido", form.getApellido());
        context.setVariable("telefono", form.getTelefono());
        context.setVariable("correo", form.getCorreo());
        context.setVariable("tipoCliente", form.getTipoCliente());
        context.setVariable("nombreEmpresa", form.getNombreEmpresa());
        context.setVariable("especialidad", form.getEspecialidad());
        context.setVariable("tipoConsulta", form.getTipoConsulta());
        context.setVariable("mensaje", form.getMensaje());

        String html = templateEngine.process("mail/contacto-empresa", context);
        helper.setText(html, true);


        mailSender.send(message);
    }

    public void enviarConfirmacionAlUsuario(MailModel form) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");


        helper.setTo(form.getCorreo());
        helper.setSubject("¡Recibimos tu mensaje, " + form.getNombre() + "!");

        Context context = new Context();
        context.setVariable("nombre", form.getNombre());
        context.setVariable("especialidad", form.getEspecialidad());
        context.setVariable("tipoConsulta", form.getTipoConsulta());
        context.setVariable("mensaje", form.getMensaje());
        context.setVariable("empresaEmail", emailDestino); // para que el usuario pueda responder

        String html = templateEngine.process("mail/confirmacion-usuario", context);
        helper.setText(html, true);

        mailSender.send(message);
    }
}