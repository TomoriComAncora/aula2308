const express = require("express");
const app = express();
const PORT = 3000; // Escolha a porta que desejar
app.use(express.json());

let data = [];

app.post("/cadastro", (req, res) => {
  const novoRegistro = req.body;
  data.push(novoRegistro);
  res.status(201).json({ message: "Registro Criado com sucesso" });
});

app.get("/listar", (req, res) => {
  res.status(201).json({ mensagem: "Aqui está a lista de usuários", data });
});

app.get("/listar/:usuarioId", (req, res) => {
  const { usuarioId } = req.params;
  const usuario = data.find(usuario => usuario.id === Number(usuarioId));

  if (usuario) {
    return res.status(200).json({ mensagem: "Usuário encontrado", usuario });
  }
  return res.status(401).json({ mensagem: "Usuário não encontrado" });
});

app.put("/editar/:usuarioId", (req, res) => {
  const { usuarioId } = req.params;
  const { nome, telefone } = req.body;
  const usuario = data.find((usuario) => usuario.id === Number(usuarioId));
  if (usuario) {
    data = data.map((usuario) => {
      if (usuario.id === Number(usuarioId)) {
        return { ...usuario, nome, telefone };
      }
      return usuario;
    });
    res.status(200).json({ mensagem: "alterado com sucesso", data });
  }
  res.status(401).json({ mensagem: "usuário não encontrado" });
});

app.delete("/deletar/:id", (req, res) => {
  const id = req.params.id;

  if (!data[id]) {
    res.status(404).json({ mensagem: "Registro não encontrado" });
  } else {
    data.splice(id, 1);
    res.json({ mensagem: "Registro deletado com sucesso" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
