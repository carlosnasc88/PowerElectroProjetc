// Iniciar o servidor
const PORT = process.env.PORT || 5500; // Altere para 3001 ou outro número disponível
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
