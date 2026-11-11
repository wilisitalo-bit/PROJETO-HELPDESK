package com.helpdesk.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name = "chamados")
public class Chamado {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@NotBlank(message = "O título é obrigatório.")
@Size(max = 150, message = "O título deve ter no máximo 150 caracteres.")
@Column(name = "titulo", nullable = false, length = 150)
private String titulo;

@NotBlank(message = "A descrição é obrigatória.")
@Column(name = "descricao", nullable = false, columnDefinition = "TEXT")
private String descricao;

@NotBlank(message = "A categoria é obrigatória.")
@Size(max = 50, message = "A categoria deve ter no máximo 50 caracteres.")
@Column(name = "categoria", nullable = false, length = 50)
private String categoria;

@Pattern(
    regexp = "BAIXA|MEDIA|ALTA",
    message = "A prioridade deve ser BAIXA, MEDIA ou ALTA."
)
@Column(name = "prioridade", nullable = false, length = 20)
private String prioridade = "MEDIA";

@Pattern(
    regexp = "ABERTO|EM_ANDAMENTO|FECHADO",
    message = "O status deve ser ABERTO, EM_ANDAMENTO ou FECHADO."
)
@Column(name = "status", nullable = false, length = 30)
private String status = "ABERTO";

@Column(name = "data_abertura", insertable = false, updatable = false)
private LocalDateTime dataAbertura;

public Chamado() {
}

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getTitulo() {
    return titulo;
}

public void setTitulo(String titulo) {
    this.titulo = titulo;
}

public String getDescricao() {
    return descricao;
}

public void setDescricao(String descricao) {
    this.descricao = descricao;
}

public String getCategoria() {
    return categoria;
}

public void setCategoria(String categoria) {
    this.categoria = categoria;
}

public String getPrioridade() {
    return prioridade;
}

public void setPrioridade(String prioridade) {
    this.prioridade = prioridade;
}

public String getStatus() {
    return status;
}

public void setStatus(String status) {
    this.status = status;
}

public LocalDateTime getDataAbertura() {
    return dataAbertura;
}

}