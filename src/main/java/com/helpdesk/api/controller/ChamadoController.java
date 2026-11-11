package com.helpdesk.api.controller;

import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.helpdesk.api.entity.Chamado;
import com.helpdesk.api.service.ChamadoService;

@RestController
@RequestMapping("/api/chamados")
public class ChamadoController {

    private final ChamadoService chamadoService;

    public ChamadoController(ChamadoService chamadoService) {
        this.chamadoService = chamadoService;
    }

    @GetMapping
    public List<Chamado> listarTodos() {
        return chamadoService.listarTodos();
    }

    @GetMapping("/total")
    public Map<String, Long> contarChamados() {
        return Map.of(
                "totalChamados",
                chamadoService.contarChamados()
        );
    }

    @GetMapping("/{id}")
    public Chamado buscarPorId(@PathVariable Long id) {
        return chamadoService.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Chamado criar(@Valid @RequestBody Chamado chamado) {
        return chamadoService.salvar(chamado);
    }

    @PutMapping("/{id}")
    public Chamado atualizar(
            @PathVariable Long id,
            @Valid @RequestBody Chamado dados) {

        Chamado chamado = chamadoService.buscarPorId(id);

        chamado.setTitulo(dados.getTitulo());
        chamado.setDescricao(dados.getDescricao());
        chamado.setCategoria(dados.getCategoria());
        chamado.setPrioridade(dados.getPrioridade());
        chamado.setStatus(dados.getStatus());

        return chamadoService.salvar(chamado);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        chamadoService.excluir(id);
    }
}

