# LEI-201920-ComputacaoDistribuida-Projeto-REST
## Ponto de Situação

**1. Objetivos Alcançado**

- Layouts para que o Gestor de parques: 

    1.  possa ver os lugares livres do parque que pretende;
    2.  possa dar check in e check out ao Client;
    3.  possa criar "Clintes Habituais", os quais terão um identificador próprio, associado às suas matriculas e possa "carregar o seu saldo" para poder sair e entrar do parque mais facilmente

**2. Plano de desenvolvimento da aplicação**

- O serviço de FrontEnd comunicará unicamente com o serviço de Socket por sockets e, por sua vez,
- O serviço de Socket comunicará por rest ao serviço Rest da Aplicação
- O serviço Rest comunicará com a Base de Dados que se encontra no MongoDB


**3. Código desenvolvido até ao momento**

- Criado no branch: ENTREGA01
