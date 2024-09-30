document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar e desenhar o gráfico
    function carregarGrafico() {
        const ctx = document.getElementById('graficoConsumo').getContext('2d');

        // Obtendo os dados do LocalStorage
        const apartamentos = JSON.parse(localStorage.getItem('apartamentos')) || [];
        
        // Preparando os dados para o gráfico
        const labels = apartamentos.map(ap => `Apt ${ap.numeroap}`);
        const kwhTotais = apartamentos.map(ap => ap.kwhTotal);

        const graficoConsumo = new Chart(ctx, {
            type: 'bar', // Tipo de gráfico
            data: {
                labels: labels,
                datasets: [{
                    label: 'Consumo Total de Energia (kWh)',
                    data: kwhTotais,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo das barras
                    borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda das barras
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Aplica a borda com base no consumo total
        const maxKwhTotal = Math.max(...kwhTotais);

        const canvas = document.getElementById('graficoConsumo');
        if (maxKwhTotal > 120) {
            canvas.style.borderColor = 'red'; // Borda vermelha
        } else if (maxKwhTotal > 80) {
            canvas.style.borderColor = 'yellow'; // Borda amarela
        } else {
            canvas.style.borderColor = 'transparent'; // Sem borda
        }
    }

    carregarGrafico();
});
