# Documentação do Projeto "Detona Ralph Game"

## Sumário
1. Estrutura de Estilos (CSS)
   - Reset.css
   - Style.css
2. Estrutura HTML
   - Cabeçalho
   - Corpo
3. Código JavaScript
   - Variáveis e Estruturas
   - Funções
4. Mecânica do Jogo

## 1. Estrutura de Estilos (CSS)

### Reset.css
O arquivo `reset.css` contém um único seletor universal `*`, que é utilizado para remover o espaçamento padrão (margin e padding) de todos os elementos da página. Essa prática garante que a aparência da página seja consistente em diferentes navegadores. Além disso, o `box-sizing: border-box` é aplicado para padronizar o comportamento das bordas e margens, facilitando o dimensionamento dos elementos. O arquivo também define a fonte principal do projeto como "Press Start 2P", que é uma fonte temática e apropriada para o jogo.

### Style.css
O `style.css` contém as regras de estilo que definem a aparência do jogo. As principais classes e seus estilos são:

- **Corpo (`body`)**:
  - **Estilo**: Fundo escuro (`#202020`), que proporciona um contraste adequado com os elementos do jogo.
  - **Alinhamento**: Conteúdo centralizado e com espaçamento interno (`padding`) para manter a página visualmente equilibrada.

- **`.container`**:
  - **Descrição**: Div principal que envolve todo o conteúdo do jogo.
  - **Estilos**: Controla a largura e altura, centralizando o conteúdo na página.

- **`.menu`**:
  - **Função**: Exibe informações como tempo restante, pontuação e vidas do jogador.
  - **Estilo**: Usado `display: flex` para organizar os elementos horizontalmente, permitindo que a informação seja apresentada de maneira clara e acessível.

- **`.main-content`**:
  - **Conteúdo**: Parte central do layout que inclui o ranking, o painel de jogo e os controles de dificuldade.

- **`.panel`**:
  - **Descrição**: Área do jogo, composta por quadrados que representam o "tabuleiro".
  - **Estilos**: Organiza os quadrados de forma a facilitar a interação do jogador.

- **`.square`**:
  - **Descrição**: Quadrados clicáveis do painel.
  - **Comportamento Visual**: Recebem um destaque visual (mudança de cor de fundo) quando se tornam inimigos, indicando ao jogador onde ele deve clicar.

## 2. Estrutura HTML

### Cabeçalho
O documento HTML inicia com a tag `<!DOCTYPE html>` para declarar o tipo de documento, seguido pela definição do idioma como inglês com a tag `<html lang="en">`. No `<head>`, as seguintes importações e definições são feitas:
- **Fontes**: Importação de fontes externas para garantir que a tipografia se mantenha consistente.
- **Estilos**: Inclusão do CSS, como `reset.css` e `style.css`, para aplicar os estilos definidos.
- **Metadados**: Inclusão de metadados importantes, como `viewport` para responsividade e descrição do projeto.
- **Título**: O título da página é "Detona Ralph", que é exibido na aba do navegador.

### Corpo
O corpo da página é estruturado utilizando divs para organizar o conteúdo:
- **`.menu`**:
  - **Elementos**:
    - `#time-left`: Exibe o tempo restante para o jogador.
    - `#score`: Mostra a pontuação atual do jogador.
    - `#lives`: Indica quantas vidas o jogador ainda tem.
    - `#new-game-button`: Um botão para iniciar um novo jogo.
    - `#reset-button`: Um botão para resetar o jogo, permitindo ao jogador recomeçar sem recarregar a página.

- **`.main-content`**:
  - **Ranking**: Mostra os três maiores scores.
  - **Painel do Jogo**: Onde ocorre a interação principal do jogador.

- **`.panel`**:
  - **Organização**: Dividido em três linhas (`.panel-row`), cada linha contendo três quadrados, totalizando nove quadrados que representam o "tabuleiro" onde os inimigos aparecem aleatoriamente.

## 3. Código JavaScript

### 1. Variáveis e Estruturas
O código JavaScript contém um objeto chamado `state`, que armazena informações essenciais para o funcionamento do jogo. Este objeto é dividido em três seções principais:
- **view**: Elementos do DOM que exibem informações do jogo, como pontuação, tempo restante e quadrados do painel.
- **values**: Armazena valores que controlam o estado do jogo, como a velocidade do inimigo, pontuação atual, tempo restante e número de vidas do jogador.
- **actions**: Controla timers e sons de efeitos do jogo, como acertos ou perdas de vida.

### 2. Funções
As funções definidas no código JavaScript desempenham papéis críticos na mecânica do jogo. As principais funções são:
- **`updateHighScores()`**: Atualiza o ranking dos três maiores scores após o término do jogo, garantindo que as melhores pontuações sejam salvas e exibidas.
  
- **`countDown()`**: Controla a contagem regressiva do tempo, verificando quando o jogo deve terminar. Finaliza a partida quando o tempo chega a zero, sinalizando o fim do jogo para o jogador.
  
- **`randomSquare()`**: Seleciona um quadrado aleatório no painel e o marca como inimigo, atualizando sua posição para que o jogador tenha um alvo em que clicar.

- **`loseLife()`**: Reduz as vidas do jogador ao clicar em um quadrado incorreto ou não conseguir acertar o inimigo. Se as vidas acabarem, o jogo termina, informando o jogador sobre a finalização.

- **`addListenerHitBox()`**: Adiciona eventos de clique em cada quadrado do jogo, verificando se o jogador clicou no inimigo correto. Isso permite que o jogador interaja com os elementos do jogo.

- **`newGame()`**: Inicia um novo jogo, resetando o tempo, vidas e pontuação. Além disso, configura a dificuldade com base na seleção feita pelo jogador.

- **`initialize()`**: Função inicial que chama a função para adicionar os eventos de clique e inicia o jogo. Essa função prepara o ambiente para a interação do jogador.

## 4. Mecânica do Jogo
O jogo "Detona Ralph" é um simples "mole whacking game" (semelhante ao clássico "whack-a-mole"), onde o jogador deve clicar no quadrado certo (o inimigo) dentro de um tempo estipulado, acumulando pontos ao longo do jogo. O jogo termina quando o tempo ou as vidas do jogador acabam, e os scores são atualizados. A dinâmica do jogo é rápida e exige atenção do jogador para clicar rapidamente nos inimigos que aparecem aleatoriamente no painel.
