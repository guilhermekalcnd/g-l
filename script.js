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
    const dataInicio = new Date('2023-01-01'); // Ajuste para a data que começaram a namorar
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
            "Na carro e depois hamburgueria",
            "No parque",
            "No restaurante"
        ],
        correta: 1 
    },
    {
        pergunta: "Quem se apaixonou primeiro?",
        opcoes: [
            "Gui",
            "Laura",
            "Os dois ao mesmo tempo"
        ],
        correta: 2 
    },
    {
        pergunta: "Qual dessas frases define melhor nosso relacionamento?",
        opcoes: [
            "Rir juntos é o nosso idioma.",
            "Do nosso jeitinho, a gente se entende.",
            "Melhores amigos e namorados.",
            "A gente se completa e nem percebe."
        ],
        correta: 2 
    },
    {
        pergunta: "Como seria nossa viagem dos sonhos?",
        opcoes: [
            "Viagem de carro sem destino certo",
            "Resort all inclusive - Caribe ou Maldivas",
            "Viagem de carro sem destino certo",
            "Algo simples, só nós dois e paisagem bonita"
        ],
        correta: 1 
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

// Função para criar corações flutuantes no quiz
function createQuizHeart() {
    const quizSection = document.querySelector('.quiz-section');
    const heart = document.createElement('div');
    heart.className = 'quiz-heart';
    heart.innerHTML = '❤️';
    
    // Posição aleatória na largura da seção
    const startX = Math.random() * quizSection.offsetWidth;
    heart.style.left = startX + 'px';
    heart.style.bottom = '0';
    
    quizSection.appendChild(heart);
    
    // Remove o coração depois da animação
    heart.addEventListener('animationend', () => heart.remove());
}

// Criar corações periodicamente na seção do quiz
function startQuizHearts() {
    setInterval(createQuizHeart, 300); // Cria um novo coração a cada 300ms
}

// Modificar a função verificarResposta para adicionar mais corações quando acertar
function verificarResposta(respostaIndex) {
    const pergunta = perguntas[perguntaAtual];
    const botoes = quizOpcoes.getElementsByClassName('quiz-opcao');
    
    Array.from(botoes).forEach(botao => {
        botao.disabled = true;
    });
    
    if (respostaIndex === pergunta.correta) {
        quizResultado.textContent = '❤️ Arrasou diva!!❤️';
        botoes[respostaIndex].classList.add('correta');
        // Criar vários corações quando acertar
        for (let i = 0; i < 10; i++) {
            setTimeout(createQuizHeart, i * 100);
        }
    } else {
        quizResultado.textContent = '💔 Poxa Diva, você errou!';
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
        quizPergunta.textContent = 'Arrasou diva, Quiz completo! 💑';
        quizOpcoes.innerHTML = '';
        quizResultado.textContent = '❤️';
        proximaPerguntaBtn.style.display = 'none';
    }
};

// Iniciar os corações quando a página carregar
window.addEventListener('load', () => {
    mostrarPergunta();
    startQuizHearts();
});

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