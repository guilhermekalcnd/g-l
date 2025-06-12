const modal = document.getElementById("modal");
const btn = document.querySelector(".surpresa-btn");
const span = document.querySelector(".fechar");

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Efeito de coração flutuante
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('no-heart')) return;
    
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = e.pageX + 'px';
    heart.style.top = e.pageY + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1500);
});

// Efeito de typing na descrição
const descricao = document.querySelector('.descricao');
const textoOriginal = descricao.innerHTML;
descricao.innerHTML = '';

function typeWriter(texto, elemento, i = 0) {
    if (i < texto.length) {
        elemento.innerHTML += texto.charAt(i);
        setTimeout(() => typeWriter(texto, elemento, i + 1), 50);
    }
}

// Inicia o efeito de typing quando a página carrega
window.addEventListener('load', () => {
    typeWriter(textoOriginal, descricao);
});

// Contador de tempo juntos
function atualizarTempoJuntos() {
    const dataInicio = new Date('2023-09-29'); // Ajuste para a data que começaram a namorar
    const agora = new Date();
    const diff = agora - dataInicio;
    
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('tempo-juntos').innerHTML = `
        ${dias} dias, ${horas} horas e ${minutos} minutos juntos ❤️
    `;
}

setInterval(atualizarTempoJuntos, 60000); // Atualiza a cada minuto
atualizarTempoJuntos(); // Primeira atualização

// Quiz Romântico
const perguntas = [
    {
        pergunta: "Qual foi o local do nosso primeiro encontro?",
        opcoes: [
            "No shopping",
            "Na carro",
            "No parque",
            "No restaurante"
        ],
        correta: 1 // Índice da resposta correta (ajuste conforme necessário)
    },

    {
        pergunta: "Qual foi a primeira música que dançamos juntos?",
        opcoes: [
            "Perfect - Ed Sheeran",
            "All of Me - John Legend",
            "At Last - Etta James",
            "Can't Help Falling in Love - Elvis"
        ],
        correta: 0 // Ajuste conforme necessário
    }
];

let perguntaAtual = 0;
const quizPergunta = document.getElementById('quiz-pergunta');
const quizOpcoes = document.getElementById('quiz-opcoes');
const quizResultado = document.getElementById('quiz-resultado');
const proximaPerguntaBtn = document.getElementById('proxima-pergunta');

function mostrarPergunta() {
    const pergunta = perguntas[perguntaAtual];
    quizPergunta.textContent = pergunta.pergunta;
    
    quizOpcoes.innerHTML = '';
    pergunta.opcoes.forEach((opcao, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-opcao';
        button.textContent = opcao;
        button.onclick = () => verificarResposta(index);
        quizOpcoes.appendChild(button);
    });
    
    quizResultado.textContent = '';
    proximaPerguntaBtn.style.display = 'none';
}

function verificarResposta(respostaIndex) {
    const pergunta = perguntas[perguntaAtual];
    const botoes = quizOpcoes.getElementsByClassName('quiz-opcao');
    
    Array.from(botoes).forEach(botao => {
        botao.disabled = true;
    });
    
    if (respostaIndex === pergunta.correta) {
        quizResultado.textContent = '❤️ Acertou! Você me conhece mesmo! ❤️';
        botoes[respostaIndex].classList.add('correta');
    } else {
        quizResultado.textContent = '💔 Ops! Essa não foi a resposta certa...';
        botoes[respostaIndex].classList.add('incorreta');
        botoes[pergunta.correta].classList.add('correta');
    }
    
    proximaPerguntaBtn.style.display = 'block';
}

proximaPerguntaBtn.onclick = () => {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        quizPergunta.textContent = 'Parabéns! Você completou o quiz do nosso amor! 💑';
        quizOpcoes.innerHTML = '';
        quizResultado.textContent = 'Você é realmente especial! ❤️';
        proximaPerguntaBtn.style.display = 'none';
    }
};

// Inicia o quiz quando a página carrega
window.addEventListener('load', mostrarPergunta);

// Smooth scroll para as seções
document.querySelectorAll('nav ul li').forEach(item => {
    item.addEventListener('click', function() {
        const targetId = this.textContent.toLowerCase();
        const targetSection = document.querySelector(`.${targetId}-section`) || 
                            document.querySelector(`.${targetId}tos`) || 
                            document.querySelector('.hero');
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});