## CADASTRO DO CARRO
---

**Requitos Funcionais**

 > 1. Deve ser possível cadastar un novo carro.
 > 2. Deve ser possível listar todas as categorias.

**Requitos não Funcionais**

**Regra de Negócio**

> 1. Não deve ser possível cadastrar um carro com uma placa já existente.
> 2. O carro deve ser cadastrado, por padrão, com disponibilidade.
> 3. * O usuário responsável pelo cadastro deve ser um usuário administrador.

## LISTAGEM DE CARRO
---

**Requitos Funcionais**

> 1. Deve ser possível listar todos os carros disponíveis.
> 2. Dev ser possível listar todos os carros disponíveis pelo nome da categoria
> 3. Dev ser possível listar todos os carros disponíveis pelo nome da marca
> 4. Dev ser possível listar todos os carros disponíveis pelo nome do carro.

**Requitos não Funcionais**

**Regra de Negócio**

> 1. O usuário náo precisar estar logado no sistema.

## CADASTRO DE ESPECIFICAÇÃO DO CARRO
---

**Requitos Funcionais**

> 1. Deve ser possível cadastrar uma especificação para um carro.


**Requitos não Funcionais**

**Regra de Negócio**

> 1. Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
> 2. Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
> 3. O usuário responsável pelo cadastro deve ser um usuário administrador.

## CADASTRO DE IMAGES DO CARRO
---

**Requitos Funcionais**

> 1. Deve ser possível cadastrar a imagem do carro

**Requitos não Funcionais**

> 1. Utilizar o multer para upload dos arquivos

**Regra de Negócio**

> 1. Usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
> 2. O usuário responsável pelo cadastro deve ser um usuário administrador.


## ALUGUEL DE CARRO
---

**Requitos Funcionais**

> 1. Deve ser possível cadastrar um aluguel

**Requitos não Funcionais**


**Regra de Negócio**

> 1. O aluguel deve ter duração mínima de 24 horas.
> 2. Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usúario.
> 3. Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
