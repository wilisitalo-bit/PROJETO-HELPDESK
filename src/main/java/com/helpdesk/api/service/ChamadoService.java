package com.helpdesk.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.helpdesk.api.entity.Chamado;
import com.helpdesk.api.repository.ChamadoRepository;
import com.helpdesk.api.exception.RecursoNaoEncontradoException;

@Service
public class ChamadoService {

    private final ChamadoRepository chamadoRepository;

    public ChamadoService(ChamadoRepository chamadoRepository) {
        this.chamadoRepository = chamadoRepository;
    }

    public List<Chamado> listarTodos() {
        return chamadoRepository.findAll();
    }

    public Chamado buscarPorId(Long id) {
        return chamadoRepository.findById(id)
                .orElseThrow(() ->
                        new RecursoNaoEncontradoException(
                                "Chamado não encontrado: " + id
                        )
                );
    }

    public Chamado salvar(Chamado chamado) {
        return chamadoRepository.save(chamado);
    }

    public void excluir(Long id) {
        if (!chamadoRepository.existsById(id)) {
            throw new RecursoNaoEncontradoException(
                    "Chamado não encontrado: " + id
            );
        }

        chamadoRepository.deleteById(id);
    }

    public long contarChamados() {
        return chamadoRepository.count();
    }
}

