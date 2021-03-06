# Vamos aprender a Arquitetura flux

### Vamos utilizar o Redux para explicar o Flux.


## Aula 01 - Conceitos de Redux

* Biblioteca que implementa Arquitetura Flux; 
	 - Ela pode ser utilizada com qualquer framework javascript (Angulas, Vue, React), ou até mesmo com JS puro
	 - Redux implementa o Flux, [Flux](https://facebook.github.io/flux/) é uma arquitetura, um conceito que facilita a comunicação entre os elementos em tela.

* Controle de estados globais da aplicação, um estado global é quando não tem um dono específico, ele é pode ser usado em qualquer componente ou estrutura de código para renderizar uma tela;

* Quando utilizar o Redux? 
	-  Meu estado tem mais de um “dono”? Quando o estado é exibindo em outros lugares, não apenas em um componente específico.
	-  Meu estado é manipulado por mais componentes? Se sim, podemos utilizar o Redux.
	- As ações do usuário causam efeitos colaterais nos dados? Exemplo: adicionar um produto no carrinho, deveria disparar uma mensagem para o usuário ou mudar um contador em outro componete da tela.

Redux é utilizado para controlar estados globais, um bom exemplo para utilizar Redux: Carrinho de compras, dados do usuário logado com as permissões, player de música, etc;

Quando o estado não ter um dono específico ou tiver que ser exibido em outros lugares, então o Redux é uma boa solução, geralmente para médio a grande projetos onde os estados se espalham na aplicação.

## Arquitetura Flux

Sempre que queremos acessar ou atualizar um estado nós disparamos uma Ação (Action)

Em um ecommerce, se o usuário clica em catálogo de produtos, um action é disparada (a action é disparada não apenas quando o usuário faz uma ação, pode ser o próprio sistema disparando uma ação, por exemplo quando o componente carrega no `componentDidMount` do React, então podemos disparar um `action` para fazer algo)

A Action tem uma estrutura:

```
{
  type: ADD_TO_CART,
  product: { ... } 
}
```

Que é um tipo e o payload, o valor que ela carrega ou retorna.

Então no nosso caso, estamos enviando uma ação de Adicionar ao carrinho, um produto que o usuário gostou e escolheu.

Essa ação vai para o `Redux Store`, que contém os `reducers` (termo que designa a separação de estados no Redux Store) no redux podemos ter vários estados, e cada reducers separa o estado por funcionalidade, podemos ter um Store com vários reducers.
Podemos ter um Cart Reducer, User Reducer, onde Cart armazena os valores de compra e User armazena os valores do usuário logado, etc.
No exemplo acima, o Cart Reducer recebe a action ADD_TO_CART, ele faz uma mutação no estado, alterando o valor, inclucindo no Carrinho um novo produto.

E agora o componente Carrinho no header  da aplicação ouve a alteração, e ele mesmo pode disparar uma action para atualizar o valor de quantidade inserida no carrinho:

```
{
  type: UPDATE_QUANTITY,
  product: { ... },
  quantity: 5
}
```

Um reducer recebe essa action e faz a alteração no estado novamente e esse valor é replicado para quem ouvir esse estado.

## Princípios

* Toda action deve possuir um "type", informando o tipo da ação e deve ser uma string única.
* O estado do Redux é o único ponto de verdade, se o estado do carrinho estiver no Redux todo os dados referente ao carrinho tem que estar no Redux, não pode ficar no componente e no Redux ao mesmo tempo, isso ocorrer gera inconsistência e fica ruim para manter.
* Não podemos mutar o etado do Redux sem um action; O estado é imutável, apenas o Reducer pode alterar de acordo com as chamadas da Action. 
* As actions e reducers são funções puras, ou seja, não lidam com side-effects assíncrons, isso quer dizer que, elas não vão acessar banco de dados, chamar api, etc. Isso ajuda muito com testes unitários, pois uma função pura, sempre que receber o mesmo parâmetro sempre vai devolver o mesmo resultado. Para lidar com side-effects assíncronos usamos Redux Saga que veremos mais pra frente.
* Qualquer lógica síncrona para regras de negóco deve ficar no reducer e nunca na action, a action não altera dados, ela só carrega os valores, o reducer faz a mutação do estado
* Nem toda aplicação precisa Redux, inicie sem ele e sinta a necessidade depois, é uma das forms mais fáceis de entender Redux, pq colocar Redux de cara, vc vai escrever mais código e não vai entender porque está sendo útil, só é legal colocar de cara se você souber que o projeto vai crescer, se os requisitos estiverem bem claros;


## Exemplo do Carrinho

Cart Reducer, sempre vai iniciar com estado vazio, um `[ ]` vazio por exemplo.

O Cart Reducer sempre vai ouvir as actions que a aplicação disparar, se ele ouvir o tipo da action, ele faz o que precisa fazer, então o Cart Reducer ouve a action do Type: ADD_TO_CART:

```
{
  type: "ADD_TO_CART",
  product: {
    id: 1,
    title: "Novo produto",
    price: 129.9
  }
}
```

E Agora o Cart Reducer colocar o produto no estado:

```
[
  {
    id: 1,
    title: "Novo produto",
    price: 129.9,
    amount: 1,
    priceFormatted: "R$129,90"
  }
]
```

O reducer é capaz de adicionar campos mesmo sem a action tem enviado os campos, veja o `amount` e `priceFormatted`. O reducer sabe que vou precisar do preço formatado então já criou isso pra gente e como é o primeiro produto que coloco no carrinho, logo a quantidade é 1.  E essa quantidade vai ser usado em algum lugar, então temos esses dados a nossa disposição.

E outro momento o usuário pode escolher o mesmo produto de ID 1, e então apenas atualizamos o valor de quantidade.

Chamando outra action do type: UPDATE_AMOUNT, com produto de ID 1 e com quantidade 5.

```
{
    type: “UPDATE_AMOUNT”,
    product: 1,
    amount: 5,
}
```

O Cart Reducer ouve essa actions e manipula o estado da maneira necessidade:

```
[{
    id: 1,
    title: "Novo produto",
    price: 129.9,
    amount: 5,
    priceFormatted: "R$129,90"
}]
```

Pronto, agora atualizou apenas o valor.

Redux é fácil, basta entender o conceito de Actions, Store e Reducers, e principalmente quando utilizar o Redux na aplicação.
 
Código: [https://github.com/tgmarinho/rocketshoes/tree/aula-01-conceitos-redux](https://github.com/tgmarinho/rocketshoes/tree/aula-01-conceitos-redux)