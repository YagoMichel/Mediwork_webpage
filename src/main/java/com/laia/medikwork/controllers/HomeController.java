package com.laia.medikwork.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

//    private final DoctorService doctorService;

//    public HomeController(DoctorService doctorService) {
//        this.doctorService = doctorService;
//    }

    @GetMapping("/")
    public String index(Model model) {
        //model.addAttribute("doctoresDestacados", doctorService.listarDestacados(3));
        return "public/index";
    }

    @GetMapping("/nosotros")
    public String nosotros() {
        return "public/nosotros";
    }

    @GetMapping("/servicios")
    public String servicios() {
        return "public/servicios";   // HTML estático, sin modelo
    }

    @GetMapping("/doctores")
    public String doctores(Model model) {
        //model.addAttribute("doctores", doctorService.listarTodos());
        return "public/doctores";
    }

    @GetMapping("/contacto")
    public String contacto() {
        return "public/contacto";
    }

    @GetMapping("/privacidad")
    public String privacidad() {
        return "public/privacidad";
    }
    @GetMapping("/terminos")
    public String terminos() {
        return "public/terminos";
    }
    @GetMapping("/seguridad-correo")
    public String seguridadCorreo() {
        return "public/seguridad-correo";
    }
    @GetMapping("/optica")
    public  String optica() {
        return "public/optica";
    }
    @GetMapping("/nutriologia")
    public  String nutrologia() {
        return "public/nutriologia";
    }
    @GetMapping("/ultrasonido")
    public  String ultrasonido() {
        return "public/ultrasonido";
    }
}

